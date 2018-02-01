<template>
  <v-app id="app">
    <!--Centre Header-->
    <v-toolbar
      color="indigo"
      dark
      fixed
      app
      clipped-right>
      <v-toolbar-title>MongoDB Hackathon</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <!--Left Bar-->
    <v-navigation-drawer
      fixed
      permanent
      app
      dark
      absolute
      :mini-variant.sync="mini"
      width=230
    > <v-toolbar
       color="black"
       dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Menu
          </v-list-tile-title>
          <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in options" :key="item.title" v-bind:to="item.action">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }} </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      right
      temporary
      fixed
    ></v-navigation-drawer>
    <!--Content-->
    <v-content>
    <router-view>
      <v-container fluid></v-container>
    </router-view>
  </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  options: [],
  data () {
    return {
      options: [
      {title: 'Home', icon: 'home', action: '/Home'},
      {title: 'Search', icon: 'search', action: '/Search'},
      {title: 'Add New Report', icon: 'add', action: '/New'},
      {title: 'Test Page', icon: 'code', action: '/Test'}
      ],
      mini: true
    }
  }
}
</script>
