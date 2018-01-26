// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material-design-icons/styles.css'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  VueRouter,
  components: { App },
  template: '<App/>'
}).$mount('#app')
