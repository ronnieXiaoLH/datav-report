<template>
  <div class="common-cart">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot></slot>
    </div>
    <div class="line"></div>
    <div class="total">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'common-cart',
  props: {
    title: String,
    value: [String, Number]
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.common-cart {
  .title {
    font-size: 12px;
    color: #999;
  }
  .value {
    margin-top: 5px;
    font-size: 25px;
    color: #000;
    letter-spacing: 1px;
  }
  .chart {
    height: 50px;
  }
  .line {
    margin: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .total {
    font-size: 12px;
    color: #333;
  }
}
</style>
<style lang="scss">
.emphasis {
  margin-left: 5px;
  color: #333;
  font-weight: 700;
}
.increase,
.decrease {
  width: 0;
  height: 0;
  border-width: 3px;
  border-style: solid;
}
.increase {
  border-color: transparent transparent red transparent;
  margin: 0 0 3px 5px;
}
.decrease {
  border-color: green transparent transparent transparent;
  margin: 3px 0 0 5px;
}
</style>
