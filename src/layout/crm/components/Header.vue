<template>
  <div class="header">
    <span class="logo">Zhai | CRM</span>
    <div class="menu">
      <span class="menu-item">
        <router-link to="/shop" class="menu-link">商品列表</router-link>
      </span>
      <span class="menu-item">
        <img src="" alt="" class="avatar">用户名
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  height: 50px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.logo {
  font-size: 16px;
}

.menu {
  display: flex;
  align-items: center;
  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
  &-link {
    opacity: 0.8;
    &.active, &.router-link-exact-active {
      opacity: 1;
    }
  }
}

.avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  display: inline-block;
  margin: 0 5px;
}
</style>