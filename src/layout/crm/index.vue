<template>
  <div class="crm">
    <CrmHeader/>
    <CrmNavbar/>
    <div class="crm-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CrmHeader from "./components/Header.vue";
import CrmNavbar from "./components/Navbar.vue";
export default {
  components: {
    CrmHeader,
    CrmNavbar
  }
};
</script>

<style lang="scss" scoped>
.crm {
  width: 100%;
  height: 100%;
  &-content {
    padding: 10px;
    width: 100%;
    height: calc(100% - 50px);
    background-color: #f3f3f3;
    padding: 12px 15px;
    overflow: auto;
  }
}

@media screen and (max-width: 720px) {
  .crm-content {
    padding: 0;
  }
}
</style>