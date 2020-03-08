<template>
  <div class="panel">
    <div class="panel-header">
      <el-button type="primary" icon="el-icon-plus" @click="$router.push('./EditGoods')">添加商品</el-button>
    </div>
    <div class="panel-content">
      <el-table :data="shop.goods" stripe class="table" v-if="shop">
        <el-table-column prop="cover" label="商品图片" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <div class="price">{{scope.row.price}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div :class="scope.row.status === 1" class="text--success">上架中</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="onGoodsEdit(scope.row.index, scope.row._id)" type="text">编辑</el-button>
            <el-button
              type="text"
              @click="onGoodsStatus(scope.row._id, 0)"
              v-if="scope.row.status === 1"
            >下架</el-button>
            <el-button type="text" @click="onGoodsStatus(scope.row.index, scope.row._id, 1)" v-else>上架</el-button>
            <el-button type="text" @click="onGoodsDelete(scope.row.index, scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import shopApi from "@/api/shop";
import goodsApi from "@/api/goods";
export default {
  name: "Shop",
  data() {
    return {
      shop: null,
      error: false,
      loading: false,
      finished: false
    };
  },
  async created() {
    const res = await shopApi.findById("5e63c7e9cdc59027748e5023");
    this.shop = res.data;
  },
  methods: {
    onGoodsEdit(index, id) {
      this.$router.push({ path: "./EditGoods", query: { id } });
    },
    onGoodsStatus(index, id, status) {
      console.log(id, status);
    },
    async onGoodsDelete(index, id) {
      const res = await goodsApi.del(id);
      if (res.status.code === 204) {
        this.$message("删除成功");
        this.shop.data.splice(index, 1);
      }
      console.log(res);
      // this.$message(res)
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  overflow: auto;
  &-header {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    .el-form-item {
      margin-bottom: 0;
    }
  }
}

.table {
  width: 100%;
}

.price {
  font-size: 14px;
  color: #f80052;
  &:before {
    content: "\A5";
    font-size: 12px;
    margin-right: 2px;
  }
}

.text {
  &--success {
    color: #007600;
  }
}
</style>