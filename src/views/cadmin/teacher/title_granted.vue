<template>

  <div class="app-container">
    <div class="filter-container">

      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">检索</span>
      <el-select v-model="search_type" placeholder="请选择" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in search_type_options"
          :label="item.name"
          :key="item.type"
          :value="item.type">
        </el-option>
      </el-select>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 200px; margin-left: 20px" class="filter-item" v-model="search_value"></el-input>
      <el-button type="primary" style="margin-left: 10px; text-align: center;" icon="el-icon-search" @click="">搜索</el-button>


      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">职称授予</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="success" icon="el-icon-edit" @click="">职称授予记录导入</el-button>-->
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师工号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacher_number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师姓名" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教学职称" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ changeTeacherTitle( scope.row.teacher_title_id ) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="管理职称" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ changeTeacherTitle( scope.row.manager_title_id ) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="授予时间" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ format(scope.row.datetime) }}</span>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">

        <el-form-item label="选择教师" :label-width="formLabelWidth">
          <el-select v-model="editForm.number" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in teacherOptions"
              :label="item.name"
              :key="item.number"
              :value="item.number"
            >
              {{ item.name }} ( {{ item.number }} )
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择职称类型" :label-width="formLabelWidth">
          <el-select v-model="editForm.title_type" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in titleTypeOptions"
              :label="item.name"
              :key="item.type"
              :value="item.type"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择职称" :label-width="formLabelWidth">
          <el-select v-model="editForm.title_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in teacherTitleOptions"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授予时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.date_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo">职 称 授 予</el-button>
      </div>
    </el-dialog>
    <!-- 基本信息编辑框 end -->

    <!-- 二级信息编辑框（） begin -->

    <!-- 二级信息编辑框（） end -->

  </div>


</template>

<script>
  import { getTitleGrantedInfo, grantTitleToTeacher } from '@/api/cadmin/titleGranted';

  import { getTeacherTitleOption, getTeacherOptions, } from '@/api/cadmin/optionInfo';

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "title_granted",
    //数据展示
    data() {
      return {
        //加载显示数据组
        tableData: [],  //首次加载 主页表格中要显示的数据

        //选项信息
        teacherTitleOptions: [], //教师职称选项， 管理职称也是用这个
        teacherOptions:[],    //本学院教师信息
        titleTypeOptions: [
          {type:'teach', name:"教学职称"},
          {type:'manage', name:"管理职称"}
        ],
        search_type_options:[
          {type:'number', name:"教师工号"},
          {type:'name', name:"教师姓名"}
        ],//搜索类型选项

        //页号
        currentPage: 1,
        pageSize: 9,

        //隐藏框
        //基本信息
        dialogFormVisible: false,
        dialogTitle: '编辑',
        formLabelWidth: '120px',

        //提交的数据组
        editForm: {
          number:'', //工号
          title_type:'',
          title_id:'',
          date_time:''
        },

        //提交的搜索信息
        search_value: '',
        search_type:'',


      }
    },
    //方法
    methods: {

      format: function (time) {
        return dateFormat(time)
      },

      //---------------------------相关信息显示---------------------------

      //同步页面
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      //---------------------------基本信息操作---------------------------
      changeTeacherTitle: function(index){
        var value = '空';
        this.teacherTitleOptions.forEach(item=>{
            if(item.id == index){
              value =  item.name
            }
          }
        );
        return value;
      },


      //添加 职称授予
      handleAdd: function() {
        this.editForm =  {
          number:'', //工号
          title_type:'',
          title_id:'',
          date_time:''
        },
        this.dialogFormVisible = true;
        this.dialogTitle = '添加';
      },

      //职称授予
      addInfo: function () {
        grantTitleToTeacher( this.editForm.number, this.editForm.title_type, this.editForm.title_id, this.editForm.date_time).then(res => {
          if (res.status == 'success'){
            this.dialogFormVisible = false;
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.reload();
          }else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })
      },

      //---------------------------详细信息操作---------------------------

    },

    mounted: function () {
      //debug
      window.vue = this

      //挂载基本
      getTitleGrantedInfo().then(res =>{
        this.tableData = res.data;
      });

      //选项挂载
      getTeacherTitleOption().then(res =>{
        this.teacherTitleOptions = res.data;
      });

      getTeacherOptions().then(res=>{
        this.teacherOptions = res.data;
      })
    }

  }
</script>

<style scoped>

</style>
