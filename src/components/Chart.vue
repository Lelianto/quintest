<template>
  <div v-if="torqueData.length !== 0" class="hello">
    <zingchart :data="opanChartData"></zingchart>
  </div>
</template>

<script>
import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';

export default {
  name: 'HelloWorld',
  components: {
    zingchart: zingchartVue
  },
  props: {
    torqueData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    opanChartData : (props) => {
      return {
        type: 'bar',
        series: props.torqueData
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
