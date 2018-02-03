<template>
  <div>
    <b-form-group>
    <b-form-radio-group
      buttons
      button-variant="outline-info"
      size="lg"
      v-model="exploreSelected"
      v-bind:options="exploreOptions"
      />
    </b-form-group>

    <b-form-select
      class="mb-3"
      v-model="dropdownSelected"
      v-bind:options="dropdownOptions"
      v-bind:style="dropdownStyle"
      >
    </b-form-select>

    <b-row class="graph-box">
      <b-col sm="8">
        <d3-network
          ref='net'
          v-bind:net-nodes="graphNodes"
          v-bind:net-links="graphLinks"
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

      <b-col sm="4">
        <b-table
          striped hover
          v-bind:items="tableIdentities"
          v-bind:fields="tableFields"
          ></b-table>
      </b-col>

    </b-row>
  </div>
</template>

<script>
  import d3Network from 'vue-d3-network'
  import zipcodes from 'zipcodes'

  import { fetchPreferences, getUser } from '../services/server'
  import { identities } from '../services/identities'
  import { toIdentityMap, toMatrix, powerMethod } from '../services/eigenvector'
  import { toIdentitySet } from '../services/eigenvector'

  const graphOptions = {
    force: 3000,
    nodeLabels: true,
    linkWidth: 4
  }

  export default {
    name: 'page-explore-graph',
    components: { d3Network },
    data () {
      return {
        title: 'exploreGraph',
        exploreSelected: 'world',
        exploreOptions: [
          { text: 'Me', value: 'me' },
          { text: 'World', value: 'world' },
          { text: 'Country', value: 'country' },
          { text: 'US City', value: 'city' }
        ],
        dropdownSelected: '',
        tableFields: ['name', 'importance'],
        allLinks: [],
        allIdentities: [],
        tableIdentities: [],
        graphNodes: [],
        graphLinks: [],
        graphOptions: graphOptions
      }
    },
    computed: {
      dropdownStyle: function () {
        if (!['country', 'city'].includes(this.exploreSelected)) {
          return { visibility: 'hidden'}
        } else {
          return {}
        }
      },
      dropdownOptions: function () {
        if (this.exploreSelected == 'country') {
          var options = this.allLinks.map(link => link.cc)
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
            let city = zipcodes.lookup(zip).city
            zipMap.set(city, zip)
          }
        })
        return zipMap
      }
    },
    watch: {
      exploreSelected: function () {
        if (['me', 'world'].includes(this.exploreSelected)) {
          this.renderGraph()
        }
      },
      dropdownSelected: function () {
        this.renderGraph()
      }
    },
    methods: {
      renderGraph: function () {
        let selected = this.exploreSelected
        if (selected == 'me') {
          let user = getUser()
          if (user) {
            let links = this.allLinks.filter(link => link.uid == user.id)
            this.renderLinks(links)
          } else {
            alert('Please log in first!')
          }

        } else if (selected == 'world') {
          let links = this.allLinks.filter(link => true) // HACK: Force graph render
          this.renderLinks(links)

        } else if (selected == 'country') {
          let links = this.allLinks.filter(link => link.cc == this.dropdownSelected)
          this.renderLinks(links)

        } else if (selected == 'city') {
          let zip = this.zipMap.get(this.dropdownSelected)
          let links = this.allLinks.filter(link => link.zip == zip)
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
          let identity = this.allIdentities.find(el => el.id == trueMap.get(ix))
          return {
              id: identity.id,
              name: identity.name,
              value: value,
              importance: (Math.round(value * 1000) / 10).toString() + '%',
            }
        }).sort((a, b) => b.value - a.value)

        this.graphLinks = links
        this.graphNodes = eigenlist
        this.tableIdentities = eigenlist.slice(0, 8)
        this.$emit('input', this.expandEigenlist(eigenlist))
      },
      expandEigenlist: function (eigenlist) {
        let eigenlistAll = new Array(
          Math.max(...this.allIdentities.map(el => parseInt(el.id))) + 1
          ).fill(0.0)
        console.log("list length", eigenlistAll.length)
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
    },
    created () {
      this.allIdentities = identities
      let idSet = new Set(identities.map(el => el.id))
      fetchPreferences()
        .then(preferences => {
          this.allLinks = preferences.links // [{sid, tid, ...}]
            .filter(link => idSet.has(link.sid) && idSet.has(link.tid))
          this.renderGraph()
        })
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
