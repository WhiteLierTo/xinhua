<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="true"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      @select="handleNav"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (route.params.highlight == 1) {
        return "/wait";
      } else if (route.params.highlight == 2) {
        return "/process";
      } else if (route.params.highlight == 3) {
        return "/endlist";
      } else if (route.params.highlight == 4) {
        return "/search";
      } else if (route.params.highlight == 5) {
        return "/verify";
      } else if (route.params.highlight == 6) {
        return "/comment";
      } else if (route.name == "draft") {
        return "/draft";
      }
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    }
  },
  methods: {
    handleNav(val) {}
  }
};
</script>
<style lang="scss">
#app .sidebar-container a {
  display: inline;
}
.el-menu-item.is-active {
  background-color: #4383e4 !important;
}
#app .sidebar-container .is-active > .el-submenu__title {
  color: #333 !important;
}
</style>
