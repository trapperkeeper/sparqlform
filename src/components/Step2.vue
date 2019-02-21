<template>
  <div class="container">
    <div class="step-num">2. Choose Binding Points</div>
    <!--
    <div class="interactive-query">
      <pre><h1>test</h1>{{query}}</pre>
    </div>
    <pre>{{tokenizedQuery}}</pre>
    -->
    <pre id="query"><template v-for="(token,i) in tokenizedQuery"><span v-if="i%2==0" :key="i">{{token}}</span><a
  href="#"
  v-else
  @click="varClick($event, token)"
  v-bind:class="getBindPtClass(token)"
  :key="i"
>{{token}}</a></template></pre>
    <!--
    <div id='triples' v-for="(triple,ind) in triples" :key="ind">
      <div>{{triple.subject}}</div>
      <div>{{triple.predicate}}</div>
      <div>{{triple.object}}</div>
    </div>
    -->
    <!--
      <pre>{{query}}</pre>
    <div>{{parsedQuery}}</div>
    <div>{{markedUpQuery}}</div>
    <pre v-html="markedUpQuery"></pre>
    -->
     <div class="bindings">Bindings Selected: {{bindings}}</div>
  </div>
</template>

<script>
//import sparqljs from "sparqljs";
import Vue from "vue";
var jp = require("jsonpath");

export default {
  name: "step2",
  components: {},
  data: function() {
    return {
      parser: null,
      generator: null,
      bindings: []
      //bindSet: new Set(),
      //parsedQuery: null,
    };
  },
  computed: {
    query: function() {
      return this.$store.getters.query;
    },
    /*
    parsedQuery: function() {
      return this.parser.parse(this.query);
    },
    triples: function() {
      var triples = jp.query(this.parsedQuery, "$.where[*].triples[*]");
      return triples;
    },
    */
    variables: function() {
      return this.$store.getters.variables;
    },
    tokenizedQuery: function() {
      // form regex to split query
      var bindArray = [];

      // get variables that can be bind points
      // regex = /\?\w+/gi
      var variables = this.query.match(/\?\w+/g);
      variables.forEach(function(variable) {
        var escapedVar = _.escapeRegExp(variable);
        bindArray.push(escapedVar);
      });

      // get literals that can be bind points
      var literals = this.query.match(/["'].*["']/g);
      literals.forEach(function(lit) {
        var escapedLit = _.escapeRegExp(lit);
        bindArray.push(escapedLit);
      });

      // get iris that can be bind points
      var fullIRIs = this.query.match(/(?<!:\s*)<.*>/g);
      // /\w*:\w+/gi - for prefixed iris
      var prefixedIRIs =this.query.match(/\w*:\w+/g);
      var iris = [...fullIRIs||[],...prefixedIRIs||[]];
      iris.forEach(function(iri) {
        var escapedIri = _.escapeRegExp(iri);
        bindArray.push(escapedIri);
      });

      var regexStr = "(" + bindArray.join("(?!\\w)|") + "(?!\\w))";
      var regex = new RegExp(regexStr, "g");
      console.log(regex);
      var tokens = this.query.split(regex);
      return tokens;
    },
    markedUpQuery: function() {
      var muQuery = _.cloneDeep(this.parsedQuery);

      var subjects = jp.query(muQuery, "$.where[*].triples[*].subject");
      var predicates = jp.query(muQuery, "$.where[*].triples[*].predicate");
      var objects = jp.query(muQuery, "$.where[*].triples[*].object");
      var bindSet = new Set(subjects);
      bindSet.addItems(predicates);
      bindSet.addItems(objects);

      //var triples = jp.query(muQuery, "$.where[*].triples[*]");

      //var tripString = JSON.stringify(triples);
      /*
      triples.forEach(function(triple) {
        console.log(triple);
        triple.subject =
          "<button class=\"bindpoint\" v-on:click=\"alert('"+triple.subject+"')\">" + triple.subject + "</button>";
        triple.predicate =
          "<button class='bindpoint'>" + triple.predicate + "</button>";
        triple.object =
          "<button class='bindpoint'>" + triple.object + "</button>";
      });
      

      
      // Regenerate a SPARQL query from a JSON object
      var generatedQuery = this.generator.stringify(muQuery);
      return generatedQuery;
      */

      var delArray = [];
      bindSet.forEach(function(binding) {
        var escapedBinding = _.escapeRegExp(binding);
        delArray.push(escapedBinding);
        //binding = "<button class='bindpoint'>"+binding+"</button>";
      });
      var regexStr = "(" + delArray.join("|") + ")";
      var regex = new RegExp(regexStr, "g");
      console.log(regex);

      console.log(this.query.match("/^.*s+wheres*{(.*)}.*$/ig"));
      //return this.query.split(regex);
      return this.yas;

      /*
      var muQuery = _.cloneDeep(this.query);
      bindSet.forEach(function(point) {
        console.log(point);
        muQuery = muQuery.replaceAll(point,"<button class='bindpoint'>"+point+"</button>");
      });
      */

      //return muQuery;
    }
  },
  watch: {
    variables: function() {
      // if the variables change, we need to remove any bindings that no longer make sense
      var vm = this;
      this.bindings = this.bindings.filter(function(value, index, arr) {
        return vm.variables.includes(value);
      });
    }
  },
  created: function() {
    var SparqlParser = require("sparqljs").Parser;
    this.parser = new SparqlParser();
    var SparqlGenerator = require("sparqljs").Generator;
    this.generator = new SparqlGenerator();
  },
  mounted: function() {
    console.log("step 2 mounted (again?)");
  },
  methods: {
    varClick: function(event, variable) {
      // toggle whether or not variable should be a bind point
      if (this.bindings.includes(variable)) {
        // if already in bindPoints, remove
        this.bindings = this.bindings.filter(function(value, index, arr) {
          return value !== variable;
        });
      } else {
        // if not in bindPoints, add
        this.bindings.push(variable);
      }
    },
    getBindPtClass: function(variable) {
      if (this.bindings.includes(variable)) {
        return "bind-point-selected";
      } else {
        return "bind-point";
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 60px min-content auto minmax(0, 1fr);
  box-sizing: border-box;
  padding: 15px;
}

#query {
  font-family: 'Courier New', Courier, monospace;
  color: var(--primary);
  font-size: large;
  font-weight: 600;
  
}

.bind-point {
  text-decoration: none;
  color: var(--accent);
}

.bind-point-selected {
  text-decoration: none;
  color: #409EFF;
}

.bindings {

}

.variable {
  color: blue;
}
</style>