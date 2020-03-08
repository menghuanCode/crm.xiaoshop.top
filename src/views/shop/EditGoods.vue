<template>
  <div class="panel">
    <div class="panel-header">{{this.statusText}}商品</div>
    <div class="panel-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price" class="input-price"></el-input>
        </el-form-item>
        <el-form-item label="参考价格">
          <el-input v-model="form.priceDel" placeholder="选填，未打折的价格"></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="form.status" placeholder="请选择商品状态">
            <el-option label="上架中" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" :before-delete="beforeDelete" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateGoods">确认{{this.statusText}}</el-button>
          <el-button type="danger" @click="DeleteGoods" v-if="isEdit">删除商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import goodsApi from "@/api/goods";
import { upload } from "@/api/index";

export default {
  name: "EditGoods",
  data() {
    return {
      isEdit: false,
      imageUrl: "",
      fileList: [],
      form: {
        name: "",
        price: "",
        priceDel: "",
        status: "1",
        avatar: ""
      },
      file: null
    };
  },
  computed: {
    statusText() {
      return !this.isEdit ? "添加" : "编辑";
    }
  },
  mounted() {
    let { id } = this.$route.query;
    this.isEdit = id ? true : false;
    this.isEdit && this.getGoods(id);
  },
  methods: {
    async getGoods(id) {
      const res = await goodsApi.findById(id);
      this.form = res.data;
      this.fileList = [{ url: res.data.avatar }];
    },
    afterRead(files) {
      this.file = files.file
    },
    beforeDelete() {
      this.file = null
      console.log(this.file)
      return true
    },
    async updateGoods() {
      let avatar = null
      console.log(this.file)
      if(this.file) {
        avatar = await upload(this.file)
        console.log(avatar)
      }
      console.log(this.file, upload)
    },
    DeleteGoods() {}
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
  &-content {
    padding: 20px 10px;
  }
}

.table {
  width: 100%;
}

.input-price {
  &::v-deep .el-input__inner {
    color: #f80052;
  }
}

.text {
  &--success {
    color: #007600;
  }
}

.van-uploader {
  height: 100px;
}
</style>