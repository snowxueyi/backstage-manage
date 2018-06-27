<template>
  <div id="app">
      <router-view v-loading="loading"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    ...mapState(["title", "loading","path"]),
  },
  beforeCreate() {
    var head = document.getElementsByTagName("HEAD").item(0);
    var style = document.createElement("link");
    style.href = "https://at.alicdn.com/t/font_688987_lhk72wi8yl3j714i.css";
    style.rel = "stylesheet";
    style.type = "text/css";
    head.appendChild(style);
  },
  mounted() {
    // console.log(this);
  },
  methods: {
    changecompont: function(i) {
      // console.log(i);
    }
  },
  components: {
  }
};
</script>

<style lang="less">
  .el-table thead th {
      background: #f5f5f5;
  }
</style>
