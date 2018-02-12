<template>
<v-app id="/Test">
<v-container fluid>
    <v-layout row wrap>
    <v-flex lg12>
    <v-card>
    <v-toolbar color="blue-grey" dark>
        <v-toolbar-title>MongoDB Load Test</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
    <h1 class="title">Simulate a load test on the database </h1>
    <h2 class="subheading mb-5">Specify a number of connections to simulate</h2>
    <v-text-field type=number label="Number of Connections to run" v-model="count" hint="between 1 to 2,000" persistent-hint v-on:keyup.enter="performTest(count)"></v-text-field>
    <v-slider
        color="primary"
        label=""
        hint=""
        min="1"
        max="2000"
        thumb-label
        v-model="count"
      ></v-slider>
    <v-progress-linear
    v-bind:indeterminate= true
    v-bind:active = loadactiveState
    ></v-progress-linear>
    </v-card-text>
    </v-card>
        <v-flex xs fluid right>
        <v-btn dark color="teal darken-1" @click="performTest(count)">Run<v-icon dark right>check</v-icon></v-btn>
        <v-btn dark color="red darken-1" @click="reset()">Reset<v-icon dark right>block</v-icon></v-btn>
        </v-flex>
    </v-flex>
  </v-layout>
  </v-container>
  <v-container>
    <div>
    <v-alert outline color="success" icon="check_circle" :value="isTestSuccessful">
        The load test was completed in {{results/1000000}} milliseconds
    </v-alert>
    <v-alert outline color="error" icon="warning" :value="isTestUnsuccessful">
        Error! Load test failed
    </v-alert>
  </div>
</v-container>
</v-app>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
var results

export default {
  data () {
    return {
      count:'',
      results:'',
      loadactiveState: false,
      isTestSuccessful: false,
      isTestUnsuccessful: false
    };
  },
  methods: {
    performTest: function (value) {
      const vm = this
      vm.loadactiveState = true
      axios({
        method: 'post',
        url: 'http://35.227.62.44:8080/massConnect?connections=' + value
        // url: 'http://192.168.2.227:8080/massConnect?connections=' + value
      }).then(function (response) {
        vm.loadactiveState = false
        results = response.data
        if (results > 0 ) {
            vm.results = results
            vm.isTestSuccessful = true
        } else {
          vm.isTestUnsuccessful = true
        }
      });
    },
    reset: function() {
      this.count = 1;
      this.loadactiveState = false
    }  
  },
}
</script>
