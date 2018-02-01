import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Home from '@/components/Home'
import Edit from '@/components/Edit'
import Search from '@/components/Search'
import New from '@/components/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/Edit/:docid',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/New',
      name: 'New',
      component: New
    }
  ]
})
