<template>
    <v-app id="searchPanel">
        <div>
            <v-content>
                <v-container fluid>
                    <v-layout row wrap>
                    <v-flex xs12>
                    <v-card>
                    <v-toolbar color="blue-grey" dark>
                        <v-toolbar-title>Search for a new report</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <h1 class="title">Search for a report using keywords or DOCID</h1>
                    <h2 class="subheading mb-5">Enter one or more of the following</h2>
                    <v-text-field label="Keywords" v-model="searchTerms" hint="E.g. economics or politics" persistent-hint></v-text-field>
                    <v-layout row wrap align-right>
                        <v-flex class="text-xs-right">
                            <v-btn color="blue-grey" dark @click="performSearch(searchTerms)">Search
                                <v-icon dark right>check_circle</v-icon>
                            </v-btn>
                            <v-btn color="red" dark @click="clearSearch()">Reset
                                <v-icon dark right>block</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <p></p>
                    <div id="datatable" v-show="displayTable">
                      <template>
                      <v-data-table
                          v-bind:headers="headers"
                          v-bind:pagination.sync="pagination"
                          :items="items"
                          hide-actions
                          class="elevation-1"
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
                                <v-icon>arrow_upward</v-icon>
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
                                :input-value="props.selected" >
                              </v-checkbox>
                            </td>
                            <router-link to="{name: 'Edit' }" tag="td">{{ props.item.name }}</router-link>
                            <!-- <td class="text-xs-left"><router-link :to="{name: 'Edit' }">{{ props.item.docid }}</router-link></td> -->
                            <td class="text-xs-left">{{ props.item.title }}</td>
                          </tr>
                          </template>
                      </v-data-table>
                      <div class="text-xs-center pt-2">
                          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
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
            </v-content>
        </div>
    </v-app>
</template>
<script>
import axios from 'axios'

var results

export default {
  name: 'SearchView',
  data () {
    return {
      displayTable: false,
      isSearchWithNoResults: false,
      searchTerms: '',
      pagination: {
        sortBy: 'docid',
        rowsPerPage: 1,
        page: 1,
        descending: true},
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
      selected: []
    }
  },
  methods: {
    performSearch: function (value) {
      const vm = this
      axios({
        method: 'post',
        url: 'http://192.168.2.224:8080/searchReport?searchTerm=' + value
        // url: 'http://35.227.62.44:8080/searchReport?searchTerm=' + value
      }).then(function (response) {
        results = response.data
        if (results.length > 0) {
          for (var i = 0; i < results.length; i++) {
            vm.items.push({selected: false, docid: results[i].docid, title: results[i].title})
          }
          vm.displayTable = true
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
      this.isSearchWithNoResults = false
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
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    }
  }
}
</script>
