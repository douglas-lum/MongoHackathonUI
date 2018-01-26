<template>
  <v-app id="mongo">
    <v-navigation-drawer
      fixed
      v-model="drawerRight"
      :stateless="right"
      right
      clipped
      app
    >
    <!--Right Bar-->
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Other Options</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
    <v-navigation-drawer
      fixed
      v-model="drawer"
      :stateless="left"
      app
      dark
      absolute
      :mini-variant.sync="mini"
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
    <v-list color="primary" dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-content>
     <v-container fluid>
      <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar color="blue-grey" dark>
            <v-toolbar-title>Search for a new report</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>block</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <h1 class="title">Search for a report using keywords, DOCID or Source</h1>
            <h2 class="subheading mb-5">Enter one or more of the following</h2>
            <v-text-field
              label="Keywords"
              value=""
              hint="E.g. economics or politics"
              persistent-hint
            ></v-text-field>
            <v-text-field
              label="Document ID"
              hint="E.g. PDF123456"
              persistent-hint
            ></v-text-field>
            <v-select
              label="Source"
              hint=""
              persistent-hint
              :items="options"
              v-model="select"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-right>
      <v-flex class="text-xs-right">
      <v-btn color="blue-grey" dark @click="performSearch()">Search
       <v-icon dark right>check_circle</v-icon>
      </v-btn>
     <v-btn color="red" dark>
       Reset
      <v-icon dark right>block</v-icon>
        </v-btn>
     </v-flex>
    </v-layout>
  </v-container>
     </v-content>
    <v-navigation-drawer
      right
      temporary
      v-model="right"
      fixed
    ></v-navigation-drawer>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      Keywords: '',
      select: [],
      options: [
        {
          value: 1,
          text: 'AFP'
        },
        {
          value: 2,
          text: 'Reuters'
        },
        {
          value: 3,
          text: 'Bernama'
        }
      ],
      items: [
        {title: 'Search', icon: 'search'},
        {title: 'Add New Report', icon: 'add'}
      ],
      mini: true,
      right: null
    }
  },
  methods: {
    performSearch: function () {
      alert('Search function had been invoked.')
    }
  }
}
</script>
