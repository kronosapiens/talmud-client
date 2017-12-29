<template>
  <div>
    <h2>{{ title }}</h2>

    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" :link-cb="lcb"/>

    <svg width="0" height="0">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="2" orient="auto" markerUnits="strokeWidth" >
          <path d="M0,0 L0,4 L4,2 z"></path>
        </marker>
      </defs>
    </svg>

  </div>
</template>

<script>
  import D3Network from 'vue-d3-network'
  import { fetchPreferences } from '../services/server'

  const graphOptions = {
    force: 3000,
    nodeSize: 20,
    nodeLabels: true,
    linkWidth:5
  }

  export default {
    name: 'graph',
    components: { D3Network },
    methods:{
      lcb (link) {
        link._svgAttrs = { 'marker-end': 'url(#arrowhead)'}
        return link
      }
    },
    data () {
      return {
        title: 'Graph',
        nodes: [],
        links: [],
        options: graphOptions
      }
    },
    created () { fetchPreferences(this) }
  }
</script>

<style>

  .net {
    height:100%;
    margin:0
  }

  .node {
    stroke:rgba(18,120,98,.7);
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
    stroke:rgba(18,120,98,.3)
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

  #arrowhead path{
    fill: rgba(18, 120, 98, 0.8);
  }
</style>
