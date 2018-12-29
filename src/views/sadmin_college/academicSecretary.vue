<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <span class="filter-item" style="margin-left: 350px; font-family: PingFang SC; font-size: 25px;">检索</span>
      <el-select v-model="value" placeholder="请选择" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 200px; margin-left: 20px" class="filter-item"></el-input>
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">1</span>
        </template>
      </el-table-column>

      <el-table-column label="所属学院" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">信息学院</span>
        </template>
      </el-table-column>

      <el-table-column label="学院编号" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">10010</span>
        </template>
      </el-table-column>

      <el-table-column label="教务秘书" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: 杜何哲</p>
            <p>联系电话: 010-588020200</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">杜何哲</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="联系方式" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">18510555066</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">18510555066@163.com</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">撤销</el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "academicSecretary",
      data() {
        return {
          options: [{
            value: '选项1',
            label: '姓名'
          }, {
            value: '选项2',
            label: '学院'
          }],

          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],

          value: ''
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      }
    }
</script>

<style scoped>

</style>
