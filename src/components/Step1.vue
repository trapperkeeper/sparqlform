<template>
  <div class="container">
    <div class="step-num">1. Create the Query</div>
    <div id="endpoint-input">
      <span id="input-label">Endpoint:</span>
      <el-input placeholder="Enter URL of SPARQL endpoint" v-model="endpoint"></el-input>
    </div>
    <div ref="qe" id="query-editor"></div>
    <!--
    <div class="variables">
      <ul>
        <li v-for="(item,ind) in variables" :key="ind">{{item}}</li>
      </ul>
    </div>
    -->
    <div ref="qr" id="query-results"></div>
  </div>
</template>

<script>
export default {
  name: "step1",
  components: {},
  data: function() {
    return {
      endpoint: null,
      yasqe: null,
      yasr: null
    };
  },
  watch: {
    endpoint: function(newval, oldval) {
      this.yasqe.options.sparql.endpoint = newval;
    },
    query: {
      handler: function(val, oldVal) {
        this.$store.commit("query", val);
        this.$store.commit("variables", this.variables);
      },
      immediate: true
    },
  },
  computed: {
    variables: function() {
      if (this.yasqe == undefined) {
        return [];
      }
      // hack necessary to remove old variables
      /*
      var cleanVariables = [];
      var currquery = this.query;
      this.yasqe.getVariablesFromQuery().forEach( function(val){
        //var regex = new RegExp(_.escapeRegExp(val));
        var regexString = _.escapeRegExp(val)+'[\\s\\.\\)}]';
        var regex = new RegExp(regexString, 'ig');
        if(currquery.match(regex)!=undefined){
          cleanVariables.push(val);
        }
      });
      return cleanVariables;//this.yasqe.getVariablesFromQuery();
      */

     return this.yasqe.getVariablesFromQuery();
    },
    query: function() {
      if (this.yasqe == undefined) {
        return "";
      }

      return this.yasqe.getValue();
    }
    /*
    query: {
      // getter
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    }
    */
  },
  created: function() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted: function() {
    this.yasqe = YASQE(document.getElementById("query-editor"), {
      sparql: {
        showQueryButton: true
      },
      viewportMargin: Infinity
    });
    this.yasr = YASR(document.getElementById("query-results"), {
      outputPlugins: ["error", "boolean", "rawResponse", "table"],
      //this way, the URLs in the results are prettified using the defined prefixes in the query
      getUsedPrefixes: this.yasqe.getPrefixesFromQuery
    });

    //link both together
    this.yasqe.options.sparql.callbacks.complete = this.yasr.setResponse;

    this.endpoint = this.yasqe.options.sparql.endpoint;
  },
  methods: {
    handleResize: function() {
      this.yasr.draw();
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

#endpoint-input {
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

#endpoint-input .el-input {
  padding: 5px;
}

#input-label {
  padding: 5px;
}

/*
#endpoint-input .el-input, #input-label, #query-editor, button {
  font-size: 20px !important;
}
*/

/*
.yasqe, .yasr {
  font-family: 'Courier New', Courier, monospace !important;
  font-size: 1.5rem !important;
}
*/

#query-editor,
#query-results {
  display: grid;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
