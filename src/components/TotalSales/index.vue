<template>
  <div class="total-sales">
    <common-cart :title="title"
                 :value="salesToday">
      <template>
        <div class="compare-wrapper">
          <div class="compare">
            <span>日同比</span>
            <span class="emphasis">{{ salesGrowthLastDay }}</span>
            <div class="increase"></div>
          </div>
          <div class="compare">
            <span>月同比</span>
            <span class="emphasis">{{ salesGrowthLastMonth }}</span>
            <div class="decrease"></div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <span>昨日销售额 </span>
        <span class="emphasis">{{ salesLastDay }}</span>
      </template>
    </common-cart>
  </div>
</template>

<script>
import CommonCartMixin from '../../mixins/commonCartMixin'
import CommonDataMixin from '../../mixins/commonDataMixin'
export default {
  name: 'total-sales',
  mixins: [CommonCartMixin, CommonDataMixin],
  data () {
    return {
      title: '累计销售额'
    }
  }
}
</script>
<style lang='scss' scoped>
.total-sales {
  .compare-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .compare {
      display: flex;
      align-items: center;
      margin-top: 3px;
      font-size: 12px;
      color: #666;
    }
  }
  span {
    font-size: 12px;
  }
}
</style>
