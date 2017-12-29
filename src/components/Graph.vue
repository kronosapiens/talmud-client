<template>
  <div>

    <svg>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="2" orient="auto" markerUnits="strokeWidth" >
          <path d="M0,0 L0,4 L4,2 z"></path>
        </marker>
      </defs>
    </svg>

    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" :link-cb="lcb"/>

  </div>
</template>

<script>
  import D3Network from 'vue-d3-network'

  function unpackLinks(preferences) {
    return preferences.map(p =>
      p.winner ? { sid: p.a_id, tid: p.b_id } : { sid: p.b_id, tid: p.a_id }
      )
  }

  function unpackNodes(preferences) {
    const nodeSet = new Set()
    preferences.forEach(p => { nodeSet.add(p.a_id); nodeSet.add(p.b_id) })
    return Array.from(nodeSet).map(x => { return { id: x } })
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
        options:
        {
          force: 3000,
          nodeSize: 20,
          nodeLabels: true,
          linkWidth:5
        }
      }
    },
    created () {
      fetch('http://localhost:3000/preferences')
      .then(response => response.json())
      .then(preferences => {
        this.nodes = unpackNodes(preferences)
        this.links = unpackLinks(preferences)
        console.log(this.nodes)
        console.log(this.links)
      })
    }
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

  canvas {
    position:absolute;top:0;
    left:0
  }

  body {
    font-family: 'PT Sans', sans-serif;
    background-color: #eee;
  }

  h1,a {
    color: #1aad8d;
    text-decoration: none;
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
