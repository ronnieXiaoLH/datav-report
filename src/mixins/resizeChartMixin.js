export default {
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.$refs.chart.resize()
    }
  }
}
