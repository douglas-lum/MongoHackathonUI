<template>
  <v-card color="grey lighten-4" flat>
      <v-container fluid>
        <v-toolbar color="blue-grey" dark>
          <v-toolbar-title>Create a New Report</v-toolbar-title>
        </v-toolbar>

        <!--Title Field-->
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Report Title</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
            v-model="title"
            label="Title"
          ></v-text-field>
          </v-flex>
        </v-layout>

          <!--Source-->
          <v-layout row>
          <v-flex xs2>
            <v-subheader>Source</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-select
              label="Source"
              hint="Select a source"
              persistent-hint
              :items="sourceOptions"
              v-model="sourceSelect"
              autocomplete=""
            ></v-select>
          </v-flex>
        </v-layout>

        <!--Report body-->
         <v-layout row>
            <v-flex xs2>
              <v-subheader>Content</v-subheader>
            </v-flex>
            <v-flex xs10>
              <v-text-field
                name="input-1"
                label="Report Content"
                textarea
                v-model="content"
              ></v-text-field>
            </v-flex>
          </v-layout>
        <v-flex xs fluid right>
        <v-btn dark color="teal darken-1" @click.native="submit">Submit<v-icon dark right>check</v-icon></v-btn>
        <v-btn dark color="red darken-1" @click.native="reset">Reset<v-icon dark right>block</v-icon></v-btn>
        </v-flex>
      </v-container>

      <!--Alert upon submitting edits-->
      <v-container>
         <div>
          <v-alert outline color="success" icon="check_circle" :value="isCreateSuccessful">
             A new report has been successfully added!
          </v-alert>
          <v-alert outline color="error" icon="warning" :value="isCreateUnsuccessful">
             Error! Report has not been added!
          </v-alert>
        </div>
      </v-container>
  </v-card>
</template>

<script>
/* eslint-disable */

import axios from "axios";
export default {
  data() {
    return {
      docid: "",
      title: "",
      content: "",
      sourceSelect: "",
      sourceOptions: [],
      isCreateSuccessful: false,
      isCreateUnsuccessful: false
    };
  },
  methods: {
    submit() {
      const vm = this
      var data = new FormData();
      data.append("title", this.title);
      data.append("docid", this.docid);
      data.append("content", this.content);
      data.append("source", this.sourceSelect);
      data.append("date", new Date().getTime());
      console.log(this.sourceSelect);
      console.log("Submitting to MongoDB");
      console.log();
      if (this.title.length > 0 & this.content.length > 0) {
      axios
        .create({
          // baseURL: "http://192.168.2.224:8080",
          baseURL: "http://35.227.62.44:8080",
          headers: {
            Authorization: "Bearer {token}"
          }
        })
        .post(`createReport`, data)
        .then(res => {
          console.log(res)
          if (res.data == "created") {
            vm.isCreateSuccessful = true;
          } else {
            vm.isCreateUnsuccessful = true;
          }
        });
      }
      else {
        alert('Make sure all fields are filled up before you click on Submit.')
      }
    },
    reset: function() {
      this.title = "";
      this.sourceSelect = "";
      this.content = "";
    }
  },
  beforeRouteEnter(to, from, next) {
    axios.create({
      // baseURL: "http://192.168.2.227:8080",
      baseURL: "http://35.227.62.44:8080",
      headers: {
        Authorization: "Bearer {token}"
      }
    });
    // axios.get("http://192.168.2.227:8080/getSourceList", "").then(res => {
   axios.get("http://35.227.62.44:8080/getSourceList", "").then(res => {
      next(vm => {
        vm.sourceOptions = res.data.slice(1, -1).split(", ");
    });
    });
  }
};
</script>