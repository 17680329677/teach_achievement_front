<template>
  <div class="app-container">

    <div class="filter-container">

      <span class="filter-item" style="font-family: PingFang SC; font-size: 25px;">按照学生学号或姓名检索</span>
      <el-select v-model="search_type" placeholder="请选择" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 200px; margin-left: 20px" class="filter-item" v-model="search_value"></el-input>
      <el-button type="primary" style="margin-left: 10px; text-align: center;" icon="el-icon-search" @click="search">搜索</el-button>

    </div>

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">状态检索：</span>
      <el-select v-model="searchStatus" placeholder="按状态搜索" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button type="success" style="margin-left: 10px; text-align: center;float: right" @click="export2Excel">导出数据</el-button>
      <br/><br/>
    </div>

    <br>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>


      <el-table-column label="学生学号" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.student_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生姓名" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.student_name }}</span>
        </template>
      </el-table-column>



      <el-table-column label="分流方向/专业" width="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orientation_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生是否确认" width="110">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="(scope.row.status == '1')">已确认</span>
          <span style="margin-left: 10px;color:red;font-weight:bold;" v-if="(scope.row.status == '0')">未确认</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="filter-container">
      <el-pagination
        style="margin-left: 10px; text-align: center; float: right; margin-top: 15px"
        background
        layout="prev, pager, next"
        :total=this.tableData.length
        :page-size="9"
        @current-change="handleCurrentChange"
        @size_change="">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  import { getDistributionResult, searchDistributionResult, searchStatusDistributionResult } from "@/api/cadmin/distributionResult";

  import { Blob, Export2Excel } from "@/api/common/Export2Excel";

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "result",
    data() {
      return {

        //搜索
        search_type: '',
        search_value: '',
        searchStatus: '',

        options: [
          {value: 'student_id', label: '学生学号'},
          {value: 'student_name', label: '学生姓名'}
        ],
        statusOptions: [
          {value: '0', label: '未确认'},
          {value: '1', label: '已确认'},
        ],

        //表单数据
        tableData: [],

        //翻页
        currentPage: 1,
        pageSize: 9,
        dialogFormVisible: false,


      }
    },
    watch: {
      // 如果 `searchStatus` 发生改变，这个函数就会运行
      searchStatus: function (newStatus, oldStatus) {
        if(newStatus){
          searchStatusDistributionResult(newStatus).then(res => {
            this.tableData = res.data;
          })
        }
      }


    },

    methods: {
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      format: function (time) {
        return dateFormat(time)
      },

      //查找
      search: function () {
        searchDistributionResult(this.search_type, this.search_value).then(res => {
          if (res.status == 'success') {
            this.tableData = res.data;
          }
        })
      },



      //导出excel
      export2Excel: function() {
        var tempTableData = this.tableData;

        //---------------------------导出之前对数据格式化---------------------------
        tempTableData.forEach(function(item,index){
          if(item.status == '1' ){
            item.status = '已确认';
          } else if(item.status == '0'){
            item.status = '未确认';
          }
        });
        //-------------------------------格式化End--------------------------------

        require.ensure([], () => {
          const { export_json_to_excel } = require('@/api/common/Export2Excel');
          const tHeader = ['学号', '姓名', '分流方向/专业','是否确认'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['student_id', 'student_name','orientation_name','status'];
          // 上面的index、phone_Num、school_Name是tableData里对象的属性
          const list = tempTableData;  //把data里的tableData存到list
          const data = this.exportDataFormatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '学生分流结果');
        })
      },
      //将导出的数据格式化json
      exportDataFormatJson: function(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }



    },

    mounted: function () {

      //debug
      window.vue = this;

      //挂载基本信息
      getDistributionResult().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      });

    }

  }
</script>

<style scoped>

</style>
