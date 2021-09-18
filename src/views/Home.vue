<template>
  <div class="home">
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <div>
        Close
      </div>
      <chart :torque-data="finalResult.Close" />
      <br>
      <div>
        Open
      </div>
      <chart :torque-data="finalResult.Open" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Chart: () => import('@/components/Chart.vue')
  },
  data: () => {
    return {
      torqueData: [],
      loading: false,
      finalResult: {
        Open: [],
        Close: []
      }
    }
  },
  async mounted() {
    await this.getTorqueData("Close")
    await this.getTorqueData("Open")
  },
  methods: {
    async getTorqueData (status = "") {
      this.loading = true
      this.$store.dispatch('getTorque').then(response => {
        this.torqueData = response.data.sort((a, b) => { return a.Position - b.Position }).filter(item => item.Direction === status)
        const positions = this.torqueData.map(item => item.Position).filter((value, index, self) => self.indexOf(value) === index)
        const result = []
        const resultLastTorque = []
        positions.forEach(index => {
          this.torqueData.forEach((item) => {
            if (!result[index]) {
              result.push({ values: [ item.AverageTorque ], addedArray: [ item.Position ]})
              resultLastTorque.push({ values: [ item.LastTorque ] })
            } else {
              if (!result[index].addedArray.includes(item.Position)) {
                result[index].values.push(item.AverageTorque)
                result[index].addedArray.push(item.Position)
                resultLastTorque[index].values.push(item.LastTorque)
              }
            }
          })
        })

        const finalResult = []

        result.forEach((item, index) => {
          finalResult.push(
            {
              values: item.values,
              lineColor: '#e53935',
              marker: {
                backgroundColor: '#e53935'
              },
              scales: 'scale-x, scale-y'
            }
          )

          finalResult.push(
            {
              values: resultLastTorque[index].values,
              lineColor: '#000',
              marker: {
                backgroundColor: '#000'
              },
              scales: 'scale-x, scale-y'
            }
          )
        })

        this.finalResult[`${status}`] = finalResult
        this.loading = false
      })
    }
  }
}
</script>
