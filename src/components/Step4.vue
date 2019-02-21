<template>
  <div class="container">
    <div class="step-num">4. Preview Form</div>
  </div>
</template>

<script>
export default {
  name: "step4",
  components: {},
  data: function() {
    return {

    };
  },
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 60px min-content auto minmax(0, 1fr);
  box-sizing: border-box;
  padding: 15px;
}
</style>