import Vue from 'vue'
import Router from 'vue-router'
import SearchView from '@/components/SearchView'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'SearchView',
      component: SearchView
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
