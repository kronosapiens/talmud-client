<template>
  <div>
    <h2>{{ title }}</h2>
    <b-row>

      <b-col cols="8">
        <d3-network
          ref='net'
          :net-nodes="nodes"
          :net-links="links"
          :options="options"
          :link-cb="lcb"
          :node-cb="ncb"
          />

        <svg width="0" height="0">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="3.5" refY="1.5" orient="auto" markerUnits="strokeWidth" >
              <path d="M0,0 L0,3 L3,1.5 z"></path>
            </marker>
          </defs>
        </svg>
      </b-col>

      <b-col cols="4">
        <b-table striped hover :items="identities" :fields="fields"></b-table>
      </b-col>

    </b-row>
  </div>
</template>

<script>
  import D3Network from 'vue-d3-network'
  import { fetchIdentities, fetchPreferences } from '../services/server'
  import { toIdentityMap, toMatrix, powerMethod } from '../services/eigenvector'
  import { toIdentitySet } from '../services/eigenvector'

  const graphOptions = {
    force: 3000,
    nodeLabels: true,
    linkWidth:5
  }

  export default {
    name: 'explore',
    components: { D3Network },
    methods:{
      lcb (link) {
        link._svgAttrs = { 'marker-end': 'url(#arrowhead)'}
        return link
      },
      ncb (node) {
        node._size = 10 + Math.sqrt(400 * node.value)
        return node
      }
    },
    data () {
      return {
        title: 'Explore',
        fields: ['name', 'value'],
        identities: [],
        nodes: [],
        links: [],
        options: graphOptions
      }
    },
    created () {
      fetchPreferences()
      .then(preferences => {
        let links = preferences.links
        let matrix = toMatrix(links)
        let eigenvector = powerMethod(matrix)

        fetchIdentities()
        .then(identities => {
          let idMap = toIdentityMap(links)
          let trueMap = new Map()
          idMap.forEach((v, k) => trueMap.set(v, k))

          let eigenlist = eigenvector.map((value, ix) => {
            let displayValue = Math.round(value * 1000) / 1000
            let trueIx = trueMap.get(ix)
            let identity = identities.find(identity => identity.id == trueIx)
            return { name: identity.name, value: displayValue, id: identity.id }
          }).sort((a, b) => b.value - a.value)

          this.links = links
          this.nodes = eigenlist
          this.identities = JSON.parse(JSON.stringify(eigenlist)) // Poor man's deep copy
        })
      })
    }
  }
</script>

<!-- <style scoped>  TODO: Breaks graph, fix. -->
  <style>

    .net {
      height:100%;
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
