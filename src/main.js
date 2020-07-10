import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VueEcharts from 'vue-echarts'
import './plugins/vcharts'
import './style/index.css'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

Vue.component('v-chart', VueEcharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
