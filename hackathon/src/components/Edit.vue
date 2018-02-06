<template>
  <v-card color="grey lighten-4" flat>
      <v-container fluid>
        <v-toolbar color="blue-grey" dark>
          <v-toolbar-title>Edit Report</v-toolbar-title>
        </v-toolbar>
       <!--DOCID Field-->
        <v-layout row>
          <v-flex xs2>
            <v-subheader>DOCID:</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              name="input-1-3"
              single-line
              v-model="docid"
              disabled
            ></v-text-field>
          </v-flex>
        </v-layout>

   <!--Date Field-->
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Last Updated:</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              name="input-1-3"
              single-line
              v-model="date"
              disabled
            ></v-text-field>
          </v-flex>
        </v-layout>

        <!--Title Field-->
        <v-layout row>
          <v-flex xs2>
            <v-subheader>Report Title:</v-subheader>
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
            <v-subheader>Source:</v-subheader>
          </v-flex>
          <v-flex xs10>
            <v-select
              hint="Select a source"
              persistent-hint
              :items="sourceOptions"
              v-model="sourceSelect"
              autocomplete
            ></v-select>
          </v-flex>
        </v-layout>

        <!--Report body-->
         <v-layout row>
            <v-flex xs2>
              <v-subheader>Content:</v-subheader>
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
        <v-btn dark color="teal darken-1" @click.native="submit">Submit</v-btn>
        <v-btn dark color="grey darken-1" @click.native="reset">Reset</v-btn>
        </v-flex>
      </v-container>
      <v-container>
         <div>
          <v-alert outline color="success" icon="check_circle" :value="isUpdateSuccessful">
             Report {{docid}} has been successfully updated
          </v-alert>
          <v-alert outline color="error" icon="warning" :value="isUpdateUnsuccessful">
             Error! Report has not been updated
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
      title:"",
      date:"",
      content: "",
      sourceSelect: "",
      sourceOptions: [],
      isUpdateSuccessful: false,
      isUpdateUnsuccessful: false
    };
  },
  beforeRouteEnter(to, from, next) {
   function getSourceList(){
    //  return axios.get('http://192.168.2.224:8080/getSourceList', "");
      return axios.get('http://35.227.62.44:8080/getSourceList', "");
    }

    function openReport(){
      // return axios.post("http://192.168.2.224:8080/openReport?docid=" + to.params.docid, "");
      return axios.post("http://35.227.62.44:8080/openReport?docid=" + to.params.docid, "");
    }

    axios.all([getSourceList(), openReport()]).then(axios.spread(function(sourceList, report){
      next (vm => {
        var sourceListData = sourceList.data;
        var reportData = report.data;

        vm.sourceOptions = sourceListData.slice(1,-1).split(', ');
        vm.docid = reportData.docid;
        vm.date = Date(reportData.date);
        vm.title = reportData.title;
        vm.content = reportData.content;
        vm.sourceSelect = reportData.source;
        console.log(vm.sourceSelect);
      });
    }));
  },
  methods: {
    submit() {
      const vm = this
      var data = new FormData();
      data.append("title", this.title);
      data.append("docid", this.docid);
      data.append("content", this.content);
      data.append("source", this.sourceSelect);
      data.append("date", (new Date).getTime());
      console.log(this.sourceSelect);
      console.log("Submitting to MongoDB");
      console.log();
      axios
        .create({
          // baseURL: "http://192.168.2.224:8080",  
          baseURL: "http://35.227.62.44:8080",
          headers: {
            Authorization: "Bearer {token}"
          }
        })
        .post(`updateReport`, data)
        .then(res => {
          if (res.data == "updated") {
            vm.isUpdateSuccessful = true
        } else {
          vm.isUpdateUnsuccessful = true
        }
        });
    }
  }
};
</script>