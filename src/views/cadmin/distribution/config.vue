<template>
  <div class="app-container">

    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加配置</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>


      <el-table-column label="分流方向（专业）名称" width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>考试课程: {{ scope.row.orientation_name }}</p>
            <p>监考条目编号: {{ scope.row.id }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.orientation_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="人数限制" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.num_limit }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开始时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ format(parseInt(scope.row.start_time) ) }}</span>
        </template>
      </el-table-column>


      <el-table-column label="结束时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ format(parseInt(scope.row.end_time)) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改配置</el-button>
          <el-button size="mini" type="danger" @click="delInfo(scope.$index, scope.row)">删除配置</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" size="small" label-width="80px">
        <el-form-item label="分流方向（专业）名称">
          <el-input v-model="editForm.orientation_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="人数限制">
          <el-input-number v-model="editForm.num_limit" @change="" :min="1" label="学生可填的志愿数目"></el-input-number>
        </el-form-item>

        <el-form-item label="开始时间" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.start_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束时间" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.end_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateInfo" v-if="dialogTitle == '编辑'">修 改 配 置</el-button>
        <el-button type="primary" @click="addInfo" v-if="dialogTitle == '添加'">添 加 配 置</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getDistributionInfo, addDistributionInfo, updateDistributionInfo, delDistributionInfo
  } from "@/api/cadmin/distributionInfo";

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "config",
    data() {
      return {

        //表单数据
        tableData: [],

        //翻页
        currentPage: 1,
        pageSize: 9,
        dialogFormVisible: false,

        //弹出框
        dialogTitle: '编辑',
        formLabelWidth: '120px',

        //编辑框
        editForm: {
          id: '',
          college_id: '',
          orientation_name: '',
          num_limit: '',
          start_time: '',
          end_time: '',
        },

      }
    },
    watch: {
      // 如果 `searchStatus` 发生改变，这个函数就会运行
      searchStatus: function (newStatus, oldStatus) {
        if(newStatus){
          statusSearchInvigilate(newStatus).then(res => {
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

      //添加
      handleAdd: function(){
        this.editForm =  {
            id: '',
            college_id: '',
            orientation_name: '',
            num_limit: '',
            start_time: '',
            end_time: '',
        },
        this.dialogFormVisible = true;
        this.dialogTitle = '添加';
      },
      //添加信息
      addInfo: function(){
        addDistributionInfo(
          this.editForm.orientation_name,
          this.editForm.num_limit,
          this.editForm.start_time,
          this.editForm.end_time,
        ).then(res=>{
          if (res.status == 'success') {
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.reload();
          }
        })
      },

      //修改
      handleEdit: function (index, row) {
        this.editForm = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑';
      },
      //提交修改
      updateInfo: function(){
        updateDistributionInfo(
          this.editForm.id,
          this.editForm.orientation_name,
          this.editForm.num_limit,
          this.editForm.start_time,
          this.editForm.end_time,
        ).then(res=>{
          if (res.status == 'success') {
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.reload();
          }
        })
      },

      delInfo: function(index, row) {
        this.editForm = Object.assign({}, row);
        this.$confirm('此操作将永久删除该分流配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(1111111);
          delDistributionInfo(this.editForm.id).then(res => {
            if (res.status == 'success'){
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.reload();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },


    },

    mounted: function () {

      //debug
      window.vue = this;


      //挂载基本信息
      getDistributionInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })

    }

  }
</script>

<style scoped>

</style>














<!--

<template>
  <div class="app-container">
    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 30px;">分流配置</span>
    </div>
    <br><br>

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">请选择开放时间段：</span>
    </div>
    <br>
    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;"></span>
      <div class="block">
        <el-date-picker
          v-model="serchTimeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>

    <br><br><br>
    <div class="filter-container" style="width: 60%">
        <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">请添加分流方向和人数限制：</span>
        <el-button type="primary" style="margin-left: 10px; text-align: center; float: right" icon="el-icon-search" @click="addPostConfig">添加</el-button>
    </div>
    <br><br>
    <div class="filter-container" v-for="config in directionConfig" >
      分流方向：<el-input v-model="config.direction" placeholder="分流方向"  style="width: 200px; margin-left: 20px" class="filter-item" ></el-input>
      人数上线：<el-input v-model="config.max_people" placeholder="人数上线"  style="width: 200px; margin-left: 20px" class="filter-item" ></el-input>
    </div>
    <br><br>
    <div class="filter-container">
      学生可填的志愿数目：
      <el-input-number v-model="directionNumber" @change="" :min="1" label="学生可填的志愿数目"></el-input-number>
    </div>
    <br><br>
    <div class="filter-container" >
      <el-button type="primary" style="margin-left: 10px; text-align: center; width: 300px" icon="" @click="">确认配置</el-button>
    </div>



  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "config",

    data() {
      return {
        fileList: [],
        serchTimeRange: [],

        directionConfig:[{
          direction: '',
          max_people: '',
        }],
        directionNumber: '',


      }
    },
    watch: {
      // 如果 `serchTimeRange` 发生改变，这个函数就会运行
      serchTimeRange: function (newStatus, oldStatus) {
        if(newStatus){
          /*getInvigilateInfoByTimeSection(newStatus[0], newStatus[1]).then(res => {
            this.tableData = res.data;
          })*/
        }

      }
    },
    methods: {

      addPostConfig: function (){
        this.directionConfig.push({
          direction: '',
          max_people: '',
        })
      }

    },
    mounted: function () {

      //debug
      window.vue = this;

    }

  }
</script>

<style scoped>

</style>


-->
