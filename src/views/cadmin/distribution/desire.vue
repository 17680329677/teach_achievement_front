<template>
  <div class="app-container">

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

      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleDistribute">一键分流</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>


      <el-table-column label="姓名" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ getClassName(scope.row.class_id) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="GPA" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gpa }}</span>
        </template>
      </el-table-column>



      <el-table-column label="填报志愿" width="">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-for="(item,index) in scope.row.desire">第{{ item.desire_rank }}志愿方向：{{ getDistributionName(item.distribution_id) }} ( 提交时间：{{format(parseInt(item.submit_time))}} , 状态：{{item.status}} )</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" style="margin-left: 5px;" :key="index" v-for="(item,index) in scope.row.desire">{{ getDistributionName(item.desire_rank) }}</el-tag>
            </div>
          </el-popover>
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
  import { getDistributionDesire, statusSearchDistributionDesire, distribution } from "@/api/cadmin/distributionDesire";
  import { getClassOptins, getDistributionOptins } from "@/api/cadmin/optionInfo";

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "desire",
    data() {
      return {

        //状态搜索：  if_choose : "已填报" / "未填报"
        statusOptions: [
          {value: '全部', label: '全部'},
          {value: '已填报', label: '已填报'},
          {value: '未填报', label: '未填报'},
        ],

        //搜索
        searchStatus: '', //if_choose

        //替换数据
        classOption:[],
        getDistributionOptins: [],

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
          statusSearchDistributionDesire(newStatus).then(res => {
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

      getClassName: function (id) {
        var name = '空';
        this.classOption.forEach(function(item, index, arr){
          if (item.id == id){
            name = item.class_name;
          }
        });
        return name;
      },

      getDistributionName: function (id) {
        var name = '空';
        this.getDistributionOptins.forEach(function(item, index, arr){
          if (item.id == id){
            name = item.orientation_name;
          }
        });
        return name;
      },

      //一键分流
      handleDistribute: function( ) {
        distribution().then(res=>{
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
          } else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })

      },



    },

    mounted: function () {

      //debug
      window.vue = this;


      //挂载基本信息
      getDistributionDesire().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      });

      //挂载班级选项信息
      getClassOptins().then(res => {
        if (res.status == 'success') {
          this.classOption = res.data;
        }
      });

      //挂载志愿选项信息
      getDistributionOptins().then(res => {
        if (res.status == 'success') {
          this.getDistributionOptins = res.data;
        }
      });

    }

  }
</script>

<style scoped>

</style>
