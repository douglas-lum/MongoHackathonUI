<template>
    <v-app id="searchPanel">
        <div>
              <v-container fluid>
                  <v-layout row wrap>
                  <v-flex lg12>
                  <v-card>
                  <v-toolbar color="blue-grey" dark>
                      <v-toolbar-title>Search for a Report</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                  <h1 class="title">Search for a report using keywords or DOCID</h1>
                  <h2 class="subheading mb-5">Enter one or more of the following</h2>
                  <v-text-field label="Keywords" v-model="searchTerms" hint="E.g. economics or politics" persistent-hint v-on:keyup.enter="performSearch(searchTerms)"></v-text-field>
                  <v-progress-linear
                  v-bind:indeterminate= true
                  v-bind:active = loadactiveState
                  ></v-progress-linear>
                  <v-layout row wrap align-right>
                      <v-flex class="text-lg-right">
                          <v-btn color="teal darken-1" dark @click="performSearch(searchTerms)">Search
                              <v-icon dark right>search</v-icon>
                          </v-btn>
                          <v-btn color="red darken-1" dark @click="clearSearch()">Reset
                              <v-icon dark right>block</v-icon>
                          </v-btn>
                      </v-flex>
                  </v-layout>
                  <p></p>
                  <div id="datatable" v-show="displayTable">
                    <template>
                    <v-data-table
                        v-bind:headers="headers"
                        :items="items"
                        hide-actions
                        class="elevation-1"
                        v-model="selected"
                        item-key="docid"
                        >
                        <template slot="headers" slot-scope="props">
                          <tr>
                            <th>
                              <v-checkbox
                                primary
                                hide-details
                                @click.native="toggleAll"
                                :input-value="props.all"
                                :indeterminate="props.indeterminate"
                              ></v-checkbox>
                            </th>
                            <th v-for="header in props.headers" :key="header.text"
                              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '', 'text-xs-left']"
                              @click="changeSort(header.value)"
                            >
                              <!-- <v-icon>arrow_upward</v-icon> -->
                              {{ header.text }}
                            </th>
                          </tr>
                        </template>
                        <template slot="items" slot-scope="props">
                        <tr :active="props.selected" @click="props.selected = !props.selected">
                          <td>
                            <v-checkbox
                              primary
                              hide-details
                              :input-value="props.selected"
                              >
                            </v-checkbox>
                          </td>
                          <td class="text-xs-left"><router-link :to="{name: 'Edit',  params: { docid: props.item.docid }}">{{ props.item.docid }}</router-link></td>
                          <td class="text-xs-left">{{ props.item.title }}</td>
                        </tr>
                        </template>
 </v-data-table>
                    <div class="text-xs-center pt-2">
                        <v-pagination v-model="pagination.page" :length="pages" :total-visible="11"></v-pagination>
                    </div>
                    </template>
                  </div>
                  <div>
                    <v-alert outline color="error" icon="warning" :value="isSearchWithNoResults">
                      No results found. Please try searching using different keywords or DOCID.
                    </v-alert>
                  </div>
                  </v-card-text>
                  </v-card>
                  </v-flex>
                  </v-layout>
              </v-container>
        </div>
    </v-app>
</template>
<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'SearchView',
  data () {
    return {
      sortBy: 'docid',
      orderByDocid: 1,
      orderByTitle: 1,
      displayTable: false,
      isSearchWithNoResults: false,
      searchTerms: '',
      pagination: {
        sortBy: 'docid',
        rowsPerPage: 10,
        descending: true,
        page: 1},
      headers: [
        {text: 'Docid',
          align: 'left',
          value: 'docid'
        },
        {text: 'Title',
          align: 'left',
          value: 'title'}
      ],
      items: [],
      selected: [],
      loadactiveState: false,
      searchCount: ''
    }
  },
  methods: {
    performSearch: function (value) {
      var vm = this
      vm.loadactiveState = true
      vm.displayTable = false
      vm.isSearchWithNoResults = false
      vm.items= []
      vm.pagination.page=1
      function getSearchResults() {
        return axios.post('http://35.227.62.44:8080/searchNextReport?searchTerm=' + value + '&page=' + vm.pagination.page);
      }

      function getSearchCount() {
        return axios.post('http://35.227.62.44:8080/searchReportCount?searchTerm=' + value);
      }
      axios.all([getSearchResults(), getSearchCount()]).then(axios.spread(function(response, searchCount){
          vm.loadactiveState = false
          var results = response.data
          var totalCount = searchCount.data
          console.log('Success! ' + totalCount + ' results found')
          // console.log(totalCount + ' results found')
          if (results.length > 0) {
             for (var i = 0; i < results.length; i++) {
               vm.items.push({selected: false, docid: results[i].docid, title: results[i].title})
             }
             vm.displayTable = true
             vm.isSearchWithNoResults = false
             vm.searchCount = totalCount;
           } else {
             vm.items = []
             vm.displayTable = false
             vm.isSearchWithNoResults = true
           }}))
           .catch(function (error) {
            console.log(error)
      })
      // axios({
      //   method: 'post',
      //   // url: 'http://192.168.2.227:8080/searchNextReport?searchTerm=' + value + '&page=' + this.pagination.page
      //   url: 'http://35.227.62.44:8080/searchNextReport?searchTerm=' + value + '&page=' + this.pagination.page
      // }).then(function (response) {
      //   vm.loadactiveState = false
      //   var results = response.data
      //   if (results.length > 0) {
      //     for (var i = 0; i < results.length; i++) {
      //       console.log(results[i].docid)
      //       vm.items.push({selected: false, docid: results[i].docid, title: results[i].title})
      //     }
      //     vm.displayTable = true
      //     vm.isSearchWithNoResults = false
      //   } else {
      //     vm.items = []
      //     vm.displayTable = false
      //     vm.isSearchWithNoResults = true
      //   }
      // }).catch(function (error) {
      //   console.log(error)
      // })
    },
    performSearchWithPagination: function (value, number) {
      var vm = this
      var orderBy
      vm.loadactiveState = true
      vm.items= []
      axios({
        method: 'post',
        // url: 'http://35.227.62.44:8080/searchReport?searchTerm=' + value
        // url: 'http://192.168.2.227:8080/searchNextReport?searchTerm=' + value + '&page=' + number
        url: 'http://35.227.62.44:8080/searchNextReport?searchTerm=' + value + '&page=' + number
      }).then(function (response) {
        vm.loadactiveState = false
        var results = response.data
        if (results.length > 0) {
          for (var i = 0; i < results.length; i++) {
            vm.items.push({selected: false, docid: results[i].docid, title: results[i].title})
          }
          vm.displayTable= true
          vm.isSearchWithNoResults = false
        } else {
          vm.items = []
          vm.displayTable = false
          vm.isSearchWithNoResults = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    clearSearch: function () {
      this.searchTerms = ''
      this.items = []
      this.displayTable = false
      this.pagination.sortBy = 'docid'
      this.pagination.descending = true
      this.pagination.page = 1
      this.isSearchWithNoResults = false
      this.loadactiveState= false
    },
    toggleAll () {
      if (this.selected.length === this.items.length) {
        this.selected = []
      } else {
        this.selected = this.items.slice()
      }
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  },
  computed: {
    pages () {
      // return 50
      return this.pagination.rowsPerPage ? Math.ceil(this.searchCount / this.pagination.rowsPerPage) : 0
    }
  },
  watch: {
    'pagination.page': function (pageNumber) {
      var vm = this
      vm.performSearchWithPagination(this.searchTerms, pageNumber)
    }
  }
}
</script>