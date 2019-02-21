<template>
  <div class="container">
    <div id="steps">
      <el-steps :active="active" align-center>
        <el-step
          v-for="i in 5"
          @click.native="e => clickHandler(e, i)"
          :title="compStepTitles[i-1]"
          :key="i"
        ></el-step>
      </el-steps>
    </div>
    <div id="builder">
      <keep-alive>
        <component v-bind:is="compSteps[active-1]"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Step1 from "@/components/Step1.vue";
import Step2 from "@/components/Step2.vue";
import Step3 from "@/components/Step3.vue";
import Step4 from "@/components/Step4.vue";
import Step5 from "@/components/Step5.vue";

export default {
  name: "builder",
  components: {
    step1: Step1,
    step2: Step2,
    step3: Step3,
    step4: Step4,
    step5: Step5
  },
  data: function() {
    return {
      active: 1,
      compSteps: ["step1","step2","step3", "step4", "step5"], 
      compStepTitles: ['Query','Bindings','Text','Preview','Export']
    };
  },
  methods: {
    clickHandler(e, i) {
      //alert(i+' button clicked');
      this.active = i;

      // scroll to the top of new step
      document.getElementById("builder").scrollTop = 0;
    }
  }
};
</script>


<style>
.container {
  display: grid;
  grid-template-rows: 80px minmax(0, 1fr);
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

#builder {
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  min-height: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  /*
  overflow: auto;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  */
}

#steps {
  width: 40%;
  padding: 20px;

  /*
  position: sticky;
        top: 0;
        left: 0;
        */
}

.step-num {
  color: var(--primary);
  font-size: 2em;
  padding-bottom: 15px;
}
</style>