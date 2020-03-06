<template>
  <div class="container">
    <div class="panel">
      <el-table :data="tableData" stripe>
        <el-table-column prop="date" label="名称"></el-table-column>
        <el-table-column prop="number" label="图片"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="price" label="原价"></el-table-column>
        <el-table-column prop="priceDel" label="库存"></el-table-column>
        <el-table-column prop="priceDel" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  components: {}
};
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  padding: 12px 15px;
}

.panel {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
  padding: 15px;
}
</style>