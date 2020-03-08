<template>
  <div class="navbar">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/shop' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="navbar-content">
      <div class="menu">
        <div class="menu-item active">基本信息</div>
        <div class="menu-item">添加商品</div>
        <div class="menu-item">财务列表</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  watch: {
    $router() {
      console.log(123)
    }
  }
};
</script>

<style lang="scss" scoped>
// .breadcrumb {
//   position: absolute;
//   left: 20px;
// }
// .navbar {
//   width: 100%;
//   background-color: #fff;
//   height: 50px;
//   line-height: 50px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
// }

// .logo {
//   font-size: 16px;
// }

// .menu {
//   display: flex;
//   align-items: center;
//   font-size: 14px;
//   &-item {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 0 20px;
//     position: relative;
//     border-bottom: 3px solid transparent;
//     cursor: pointer;
//     &.active {
//       border-color: #409eff;
//     }
//   }
//   &-link {
//     opacity: 0.8;
//     &.active,
//     &.router-link-exact-active {
//       opacity: 1;
//     }
//   }
// }

// .avatar {
//   width: 22px;
//   height: 22px;
//   border-radius: 50%;
//   overflow: hidden;
//   background-color: #fff;
//   display: inline-block;
//   margin: 0 5px;
// }
</style>