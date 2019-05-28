<template>
  <div class="app-container">

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 25px;">学生信息导入：</span>

      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleImport">信 息 导 入</el-button>

    </div>
    <br>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>


      <el-table-column label="学号" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gender }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ getClassName(scope.row.class_id) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="GPA" width="">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gpa }}</span>
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



    <!--  隐藏部分----------------------------------------------------------------------  -->

    <!-- 基本信息编辑框 begin -->
    <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">

        <div class="filter-container">
          <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">请指定此批学生用户的有效时间：</span>

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

        <div class="filter-container">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          </el-upload>
        </div>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="importInfo">导 入 学 生 信 息</el-button>
      </div>
    </el-dialog>
    <!-- 基本信息编辑框 end -->


  </div>
</template>

<script>
  import { getStudentInfo } from "@/api/cadmin/studentsImport";
  import { getClassOptins } from "@/api/cadmin/optionInfo";

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "info_import",
    data() {
      return {

        //搜索
        searchStatus: '', //if_choose

        //替换数据
        classOption:[],

        //表单数据
        tableData: [],

        editForm:[],

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

      //上传
      handleImport: function () {
        this.dialogFormVisible = true;
      },
      //学生信息导入
      importInfo: function () {

      },


    },

    mounted: function () {

      //debug
      window.vue = this;

      //挂载基本信息
      getStudentInfo().then(res => {
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

    }

  }
</script>

<style scoped>

</style>
