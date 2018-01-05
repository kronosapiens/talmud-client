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
      v-bind:options="dropdownOptions()"
      v-bind:style="dropdownStyle()"
      >
    </b-form-select>

    <b-row>
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
  import D3Network from 'vue-d3-network'
  import { fetchIdentities, fetchPreferences, getJwt, getUser } from '../services/server'
  import { toIdentityMap, toMatrix, powerMethod } from '../services/eigenvector'
  import { toIdentitySet } from '../services/eigenvector'

  const graphOptions = {
    force: 3000,
    nodeLabels: true,
    linkWidth:5
  }

  export default {
    name: 'Explore Graph',
    components: { D3Network },
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
        tableFields: ['name', 'value'],
        allLinks: [],
        allIdentities: [],
        tableIdentities: [],
        graphNodes: [],
        graphLinks: [],
        graphOptions: graphOptions
      }
    },
    watch: {
      exploreSelected: function () {
        this.render()
      }
    },
    methods: {
      dropdownStyle: function () {
        if (['country', 'city'].includes(this.exploreSelected)) {
          return {}
        } else {
          return { visibility: 'hidden'}
        }
      },
      dropdownOptions: function () {
        return ['banana', 'apple']
      },
      render: function () {
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
          console.log('render country!')

        } else if (selected == 'city') {
          console.log('render city!')

        } else {
          console.log('Selection invalid!')
        }
      },
      renderLinks: function (links) {
        let matrix = toMatrix(links)
        let eigenvector = powerMethod(matrix, .95)

        let trueMap = new Map()
        toIdentityMap(links).forEach((v, k) => trueMap.set(v, k))

        let eigenlist = eigenvector.map((value, ix) => {
          let displayValue = Math.round(value * 1000) / 1000
          let trueIx = trueMap.get(ix)
          let identity = this.allIdentities.find(identity => identity.id == trueIx)
          return { name: identity.name, value: displayValue, id: identity.id }
        }).sort((a, b) => b.value - a.value)

        this.graphLinks = links
        this.graphNodes = eigenlist
        this.tableIdentities = eigenlist.slice(0, 8)
      },
      lcb (link) {
        link._svgAttrs = { 'marker-end': 'url(#arrowhead)'}
        return link
      },
      ncb (node) {
        node._size = 10 + Math.sqrt(400 * node.value)
        return node
      },
    },
    created () {
      fetchPreferences()
        .then(preferences => {
          fetchIdentities()
            .then(identities => {
              this.allLinks = preferences.links
              this.allIdentities = identities
              this.render()
            })
        })
    }
  }
</script>

<!-- <style scoped>  TODO: Breaks graph, fix. -->
  <style>

    .net {
      height:95%;
      margin:0
    }

    .node {
      stroke:teal;
      stroke-opacity:.7;
      stroke-width:3px;
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
