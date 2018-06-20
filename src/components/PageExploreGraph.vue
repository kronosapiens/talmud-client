<template>
  <div>

    <b-form-row>
      <b-col cols="auto"></b-col> <!-- Add small margin -->

      <b-col cols="auto">
        <b-btn variant="outline-info" size="xl" disabled>{{ n }}</b-btn>
      </b-col>

      <b-col cols="auto">
        <b-btn
          variant="outline-info"
          size="xl"
          v-bind:pressed.sync="allowInteraction"
          >+🔎</b-btn>
      </b-col>

      <b-col>
        <b-form-radio-group
          buttons
          button-variant="outline-info"
          size="md"
          v-model="exploreSelected"
          v-bind:options="exploreOptions"
          />
      </b-col>

      <b-col>
        <b-form-select
          class="mb-3"
          v-model="dropdownSelected"
          v-bind:options="dropdownOptions"
          v-bind:style="dropdownStyle"
          >
        </b-form-select>
      </b-col>

      <b-col cols="auto"></b-col> <!-- Add small margin -->
    </b-form-row>


    <b-row class="graph-box" no-gutters>
      <b-col md="6" lg="7" xl="8">
        <d3-network
          ref='net'
          v-bind:net-nodes="graphNodesDisplay"
          v-bind:net-links="graphLinksDisplay"
          v-bind:options="graphOptions"
          v-bind:link-cb="lcb"
          v-bind:node-cb="ncb"
          />

        <svg width="0" height="0">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="3.5"
              refY="1.5"
              orient="auto"
              markerUnits="strokeWidth"
              >
              <path d="M0,0 L0,3 L3,1.5 z"></path>
            </marker>
          </defs>
        </svg>
      </b-col>

      <b-col md="6" lg="5" xl="4">
        <b-table
          striped hover
          v-bind:items="tableNodes"
          v-bind:fields="tableFields"
          >
          <template slot="name" slot-scope="row">
            <b-button
              v-if="allowInteraction"
              size="sm"
              v-bind:variant="row.item.style"
              v-on:click="toggleIdentity"
              >
             {{ row.item.name }}
            </b-button>
            <b-button
              v-else
              size="sm"
              variant="success"
              disabled
              >
             {{ row.item.name }}
            </b-button>
          </template>
        </b-table>
      </b-col>

    </b-row>
  </div>
</template>

<script>
  import countryData from 'country-data'
  import d3Network from 'vue-d3-network'

  import {
    toIdentityMap,
    toIdentitySet,
    toMatrix,
    fromMatrix,
    powerMethod
  } from '../services/eigenvector'
  import { identities } from '../services/identities'
  import { store } from '../services/store'
  import { zipcodes } from '../services/zipcodes'

  const graphOptions = {
    force: 3000,
    nodeLabels: true,
    linkWidth: 4
  }

  export default {
    name: 'page-explore-graph',
    components: { d3Network },
    props: ['initialSelected', 'allLinks'],
    data () {
      return {
        title: 'exploreGraph',
        exploreSelected: this.initialSelected,
        exploreOptions: [
          { text: 'Me', value: 'me' },
          { text: 'World', value: 'world' },
          { text: 'Country', value: 'country' },
          { text: 'US City', value: 'city' }
        ],
        dropdownSelected: '',
        tableFields: ['name', 'share'],
        tableNodes: [],
        graphNodes: [],
        graphLinks: [],
        graphOptions: graphOptions,
        allowInteraction: false,
        n: 0,
      }
    },
    computed: {
      activeNodes: function () {
        return new Set(this.tableNodes.filter(el => el.active).map(el => el.id))
      },
      graphLinksDisplay: function () {
        if (!this.allowInteraction)
          return this.graphLinks

        return this.graphLinks.filter(link =>
          this.activeNodes.has(link.sid) && this.activeNodes.has(link.tid)
        )
      },
      graphNodesDisplay: function () {
        if (!this.allowInteraction)
          return this.graphNodes

        return this.graphNodes.filter(el => this.activeNodes.has(el.id))
      },
      dropdownStyle: function () {
        if (!['country', 'city'].includes(this.exploreSelected)) {
          return { visibility: 'hidden'}
        } else {
          return {}
        }
      },
      dropdownOptions: function () {
        if (this.exploreSelected == 'country') {
          var options = this.countryMap.keys()
        } else if (this.exploreSelected == 'city') {
          var options = this.zipMap.keys()
        } else {
          var options = []
        }
        return Array.from(new Set(options))
      },
      zipMap: function () {
        const zipMap = new Map()
        this.allLinks.map(link => {
          let zip = link.zip
          if (zip) {
            let city = zipcodes[zip] ? zipcodes[zip][0] : "Other"
            let zipSet = zipMap.get(city) || new Set()
            zipMap.set(city, zipSet.add(zip))
          }
        })
        return zipMap
      },
      countryMap: function () {
        const allCountryMap = new Map(
          countryData.countries.all.map(c => [c.alpha2, c.name])
        )
        return new Map(
          this.allLinks.map(link => [allCountryMap.get(link.cc), link.cc])
        )
      }
    },
    watch: {
      allLinks: function () {
        this.renderGraph()
      },
      exploreSelected: function () {
        if (['me', 'world'].includes(this.exploreSelected)) {
          this.renderGraph()
        }
      },
      dropdownSelected: function () {
        this.renderGraph()
      },
      allowInteraction: function () {
        if (this.allowInteraction) {
          store.setAlert("Interactive mode... ACTIVATE ⚡⚡⚡")
        } else {
          store.setAlert("Disabling interactive mode 💤")
        }
      }
    },
    methods: {
      toggleIdentity: function (event) {
        let name = event.target.innerText
        let identity = this.tableNodes.find(el => el.name == name)
        identity.active = !identity.active
        identity.style = identity.active ? 'success' : 'outline-success'
      },
      renderGraph: function () {
        let selected = this.exploreSelected
        if (selected == 'me') {
          let user = store.getUser()
          if (user) {
            let links = this.allLinks.filter(link => link.uid == user.id)
            if (links.length) {
              this.renderLinks(links)
            }
          } else {
            store.setAlertDanger('Must log in to view!')
          }

        } else if (selected == 'world') {
          let links = this.allLinks.filter(link => true) // HACK: Force graph render
          this.renderLinks(links)

        } else if (selected == 'country') {
          let cc = this.countryMap.get(this.dropdownSelected)
          let links = this.allLinks.filter(link => link.cc == cc)
          this.renderLinks(links)

        } else if (selected == 'city') {
          let zipMap = this.zipMap.get(this.dropdownSelected)
          let links = this.allLinks.filter(link => zipMap.has(link.zip))
          this.renderLinks(links)

        } else {
          console.log('Selection invalid!')
        }
      },
      renderLinks: function (links) {
        let matrix = toMatrix(links)
        let eigenvector = powerMethod(matrix, .85)

        let trueMap = new Map() // MatrixIx -> TrueIx
        toIdentityMap(links).forEach((v, k) => trueMap.set(v, k))

        let eigenlist = eigenvector.map((value, ix) => {
          let identity = identities.find(el => el.id == trueMap.get(ix))
          return {
              id: identity.id,
              name: identity.name,
              value: value,
              share: (Math.round(value * 1000) / 10).toString() + '%',
              active: true,
              style: 'success',
            }
        }).sort((a, b) => b.value - a.value)

        let uniqueLinks = fromMatrix(matrix)
        uniqueLinks.forEach(link => {
          link.sid = trueMap.get(link.sid)
          link.tid = trueMap.get(link.tid)
        })

        this.n = links.length
        this.graphLinks = uniqueLinks
        this.graphNodes = eigenlist
        this.tableNodes = eigenlist.slice(0, 7)
        this.$emit('input', this.expandEigenlist(eigenlist))
      },
      expandEigenlist: function (eigenlist) {
        let eigenlistAll = new Array(
          Math.max(...identities.map(el => parseInt(el.id))) + 1
          ).fill(0.0)
        eigenlist.forEach(el => eigenlistAll[parseInt(el.id)] = el.value)
        return eigenlistAll
      },
      lcb (link) {
        link._svgAttrs = { 'marker-end': 'url(#arrowhead)'}
        return link
      },
      ncb (node) {
        node._size = 6 + Math.sqrt(800 * node.value)
        return node
      },
    }
  }
</script>

<!-- <style scoped>  TODO: Breaks graph, fix. -->
  <style>

    .graph-box {
      border-right:1px solid teal;
      border-top:1px solid teal
    }

    .net {
      height:95%;
      margin:0
    }

    .node {
      stroke:teal;
      stroke-opacity:.7;
      stroke-width:2px;
      transition:fill .5s ease;
      fill:#dcfaf3
    }

    .node.selected {
      stroke:#caa455
    }

    .node.pinned {
      stroke:rgba(190,56,93,.6)
    }

    .link {
      stroke:teal;
      stroke-opacity:.6;
    }

    .link, .node {
      stroke-linecap:round
    }

    .link:hover, .node:hover {
      stroke:#be385d;stroke-width:5px
    }

    .link.selected {
      stroke:rgba(202,164,85,.6)
    }

    .curve {
      fill:none
    }

    .link-label, .node-label {
      fill:#127862
    }

    .link-label {
      -webkit-transform:translateY(-.5em);
      -ms-transform:translateY(-.5em);
      transform:translateY(-.5em);
      text-anchor:middle
    }

    #arrowhead path{
      fill:teal;
      opacity:.8;
    }

    ul.menu {
      list-style: none;
      position: absolute;
      z-index: 100;
      min-width: 20em;
      text-align: left;
    }

    ul.menu li{
      margin-top: 1em;
      position: relative;
    }


  </style>
