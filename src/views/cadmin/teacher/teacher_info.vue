<template>

  <div class="app-container">
    <div class="filter-container">

      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">检索</span>
      <el-select v-model="search_type" placeholder="请选择" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 200px; margin-left: 20px" class="filter-item" v-model="search_value"></el-input>
      <el-button type="primary" style="margin-left: 10px; text-align: center;" icon="el-icon-search" @click="">搜索</el-button>


      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加教师</el-button>
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="success" icon="" @click="export2Excel">导出数据</el-button>

      <br/><br/>

    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师姓名" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教职工号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属教研室" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.department_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="岗位类别" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacher_category_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教学职称" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teachertitle_name }}</span><br>
          <span style="margin-left: 10px">讲师认定时间：</span><br>
          <span style="margin-left: 10px">副教授认定时间：</span><br>
          <span style="margin-left: 10px">教授认定时间：2003-07-01</span><br>
        </template>
      </el-table-column>

      <el-table-column label="管理职称" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.managertitle_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="双肩挑" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button
            size="mini"
            type="info"
            @click="">详情</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
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

        <el-form-item label="教师工号" :label-width="formLabelWidth">
          <el-input v-model="editForm.number" auto-complete="off" :disabled="dialogTitle == '编辑'" required="required"></el-input>
        </el-form-item>

        <el-form-item label="教师名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off" required="required"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="editForm.gender" label="男">男</el-radio>
          <el-radio v-model="editForm.gender" label="女">女</el-radio>
        </el-form-item>

        <el-form-item label="民族" :label-width="formLabelWidth">
          <el-select v-model="editForm.nationality" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in nationalityOptions"
              :label="item.name"
              :key="item.name"
              :value="item.name"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生年月日" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.birth_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="editForm.college_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in collegeOptions"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属教研室" :label-width="formLabelWidth" >
          <el-select v-model="editForm.department_id"  placeholder="请选择" class="filter-item" required="required">
            <el-option
              v-for="item in departmentOptions"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位类别" :label-width="formLabelWidth">
          <el-select v-model="editForm.teacher_category_id" placeholder="请选择" class="filter-item" >
            <el-option
              v-for="item in teacherCategoryOptions"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="双肩挑" :label-width="formLabelWidth">
            <el-radio v-model="editForm.type" label="是">是</el-radio>
            <el-radio v-model="editForm.type" label="否">否</el-radio>
        </el-form-item>

        <el-form-item label="教学职称" :label-width="formLabelWidth">
          <el-select v-model="editForm.teachertitle_id" placeholder="请选择" class="filter-item" >
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

        <el-form-item label="管理职称" :label-width="formLabelWidth">
          <el-select v-model="editForm.managertitle_id" placeholder="请选择" class="filter-item" >
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

        <el-form-item label="工作状态" :label-width="formLabelWidth">
          <el-radio v-model="editForm.status" label="在职">在职</el-radio>
          <el-radio v-model="editForm.status" label="非在职">非在职</el-radio>
          <el-radio v-model="editForm.status" label="离岗">离岗</el-radio>
        </el-form-item>

        <el-form-item label="参加工作时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.work_begin_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="入校时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.bjfu_join_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="最高学历" :label-width="formLabelWidth">
          <el-select v-model="editForm.highest_education" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in highestEducationOptions"
              :label="item.name"
              :key="item.name"
              :value="item.name"
            >
              {{item.name}}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="最高学历取时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.highest_education_accord_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="毕业论文题目" :label-width="formLabelWidth">
          <el-input v-model="editForm.graduate_paper_title" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="毕业院校" :label-width="formLabelWidth">
          <el-input v-model="editForm.graduate_school" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="研究方向" :label-width="formLabelWidth">
          <el-input v-model="editForm.research_direction" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="editForm.telephone" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" auto-complete="off" ></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="syncClick">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基本信息编辑框 end -->

    <!-- 信息导入 -->
    <upload-excel :columnConfig="ExcelColumnConfig" :uploadUrl="ExcelUploadUrl"/>

  </div>


</template>

<script>
  import { parseTime } from '@/utils/index'
  import { getAllTeacherInfo,   //显示信息获得
    addTeacherInfo, delTeacherInfo,//基本信息操作
    updateTeacherInfo,  //子信息操作
  } from '@/api/cadmin/teacherInfo';

  import { nationalityOptions, highestEducationOptions } from './marcos'

  import { getCollegeOptions, getDepartmentOptions, getTeacherTitleOption,getTeacherCategoryOptins  //选项信息挂载
  } from '@/api/cadmin/optionInfo';

  import { Export2Excel } from "@/vendor/Export2Excel";//导出数据


  import UploadExcel from '@/views/components/Excel/UploadExcel' //二次封装组件


  export default {
    inject: ['reload'],
    name: "teacher_info",

    components: {
      UploadExcel
    }, //注册子组件


    //数据展示
    data() {
      return {

        //------------ excel导入数据部分----------
        excelTableData: [],
        excelTableHeader: [],
        excelDialogVisible:false,//excel dialog
          //上传工作
        excelUploadSuccessNumber: 0, //失败数量
        excelUploadErrNumber: 0, //成功数量
        excelUploadErrList : [],//上传出错的数据的列表


        ExcelColumnConfig:[
          { name:"number", value:"教工号" },
          { name:"name", value:"姓名" },
          { name:"gender", value:"性别" },
          { name:"nationality", value:"民族" },
          { name:"birth_year_month", value:"出生年月" },
          { name:"college_id", value:"所在学院" },
          { name:"department_id", value:"所属教研室" },
          { name:"teachertitle_id", value:"教学岗位职称" },
          { name:"managertitle_id", value:"管理岗位职称" },

          { name:"teacher_category_id", value:"教师类型" },

          { name:"type", value:"双肩挑" },
          { name:"status", value:"教师状态" },
          { name:"work_begin_year_month", value:"参加工作年月" },
          { name:"bjfu_join_year_month", value:"入校年月" },
          { name:"highest_education", value:"最高学历" },
          { name:"highest_education_accord_year_month", value:"最高学历获得年月" },
          { name:"graduate_paper_title", value:"毕业论文题目" },
          { name:"graduate_school", value:"毕业学校" },
          { name:"research_direction", value:"研究方向" },
          { name:"telephone", value:"电话" },
          { name:"email", value:"邮箱" },
        ],
        ExcelUploadUrl: "/cadmin/teacher_info/add",

        //------------ excel导入数据部分----------

        //搜索
        options:[
          {value: 'techer_number', label: '教师工号'},
          {value: 'techer_name', label: '教师姓名'}
          ],
        search_type:'',
        search_value:'',


        //加载显示数据组
        tableData: [],  //首次加载 主页表格中要显示的数据

        departmentOptions: [], //教研室选项
        collegeOptions: [], //学院选项
        teacherTitleOptions: [], //教师职称选项， 管理职称也是用这个
        teacherTypeOptions: [], //弃用，基本没用了~  教师账号类型 1、2、3、4、5
        teacherCategoryOptions:[],
        nationalityOptions: nationalityOptions,//民族选项，方便老师填写，直接写成固定
        highestEducationOptions: highestEducationOptions,

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
          number: '',
          name: '',
          gender: '',
          nationality: '',
          birth_year_month: '',
          college_id: '',
          teachertitle_id: '',  teachertitle_name: '',
          managertitle_id: '',  managertitle_name: '',
          type: '',
          status: '',
          work_begin_year_month: '',
          bjfu_join_year_month: '',
          highest_education: '',
          highest_education_accord_year_month: '',
          graduate_paper_title: '',
          graduate_school: '',
          research_direction: '',
          telephone: '',
          email: ''
        },

      }
    },
    //方法
    methods: {

      //---------------------------相关信息显示---------------------------

      //同步页面
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      //---------------------------基本信息操作---------------------------
      //删除
      deleteInfo: function(index, row) {
        this.editForm = Object.assign({}, row)
        this.$confirm('此操作将永久删除教师账号及其信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTeacherInfo(this.editForm.number).then(res => {
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

      //修改
      handleEdit: function (index, row) {
        this.editForm = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑';
      },

      //修改
      updateInfo: function() {
        updateTeacherInfo(
          this.editForm.number, this.editForm.name, this.editForm.gender, this.editForm.nationality,
          this.editForm.birth_year_month, this.editForm.department_id,  this.editForm.college_id, this.editForm.teachertitle_id, this.editForm.managertitle_id,
          this.editForm.teacher_category_id,//新增加  教师类型
          this.editForm.type, this.editForm.status, this.editForm.work_begin_year_month, this.editForm.bjfu_join_year_month,
          this.editForm.highest_education, this.editForm.highest_education_accord_year_month, this.editForm.graduate_paper_title,
          this.editForm.graduate_school, this.editForm.research_direction, this.editForm.telephone, this.editForm.email
                            ).then(res => {
          if (res.status == 'success'){
            this.dialogFormVisible = false;
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.reload();
          } else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })
      },

      //添加
      handleAdd: function() {
        this.editForm = {
            number: '',
            name: '',
            gender: '',
            nationality: '',
            birth_year_month: '',
            college_id: '',
            teachertitle_id: '',
            managertitle_id: '',
            type: '',
            status: '',
            work_begin_year_month: '',
            bjfu_join_year_month: '',
            highest_education: '',
            highest_education_accord_year_month: '',
            graduate_paper_title: '',
            graduate_school: '',
            research_direction: '',
            telephone: '',
            email: ''
        },
        this.dialogFormVisible = true;
        this.dialogTitle = '添加';
      },

      //添加
      addInfo: function () {
        addTeacherInfo(
          this.editForm.number, this.editForm.name, this.editForm.gender, this.editForm.nationality,
          this.editForm.birth_year_month, this.editForm.department_id,this.editForm.college_id, this.editForm.teachertitle_id, this.editForm.managertitle_id,
          this.editForm.teacher_category_id,//新增加  教师类型
          this.editForm.type, this.editForm.status, this.editForm.work_begin_year_month, this.editForm.bjfu_join_year_month,
          this.editForm.highest_education, this.editForm.highest_education_accord_year_month, this.editForm.graduate_paper_title,
          this.editForm.graduate_school, this.editForm.research_direction, this.editForm.telephone, this.editForm.email
                            ).then(res => {
          if (res.status == 'success'){
            this.dialogFormVisible = false;
            this.$message({
              message: res.reason,
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

      //基本信息:编辑/添加同步
      syncClick: function () {
        if (this.dialogTitle == '编辑') {
          this.updateInfo();
        } else if (this.dialogTitle == '添加') {
          this.addInfo();
        }
      },

      //---------------------------详细信息操作---------------------------


      //2.-----------------------------------导出excel-----------------------------------
      export2Excel: function() {
        var tempTableData = this.tableData;

        //--------导出之前对数据格式化---------
        /*
        tempTableData.forEach(function(item,index){
          item.birth_year_month = parseTime(item.birth_year_month,'{y}-{m}-{d}');
          item.work_begin_year_month = parseTime(item.work_begin_year_month,'{y}-{m}-{d}');
          item.bjfu_join_year_month = parseTime(item.bjfu_join_year_month,'{y}-{m}-{d}');
          item.highest_education_accord_year_month = parseTime(item.highest_education_accord_year_month,'{y}-{m}-{d}');
        });
        */
        //-----------格式化End---------------

        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader = ['教工号', '姓名', '性别','民族','出生年月',
            '所在学院','所属教研室','教学岗位职称','管理岗位职称',
            '教师类型','双肩挑','参加工作年月','入校年月','最高学历',
            '最高学历获得年月','毕业论文题目','毕业学校','研究方向',
            '电话','邮箱','教师状态'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['number', 'name','gender','nationality','birth_year_month',
          'college_name','department_name','teachertitle_name','managertitle_name',
          'teacher_category_name','type','work_begin_year_month','bjfu_join_year_month','highest_education',
          'highest_education_accord_year_month','graduate_paper_title','graduate_school','research_direction',
          'telephone','email','status'];
          // 上面的index、phone_Num、school_Name是tableData里对象的属性
          const list = tempTableData;  //把data里的tableData存到list
          const data = this.exportDataFormatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '本学院教师信息');
        })
      },
      //将导出的数据格式化json
      exportDataFormatJson: function(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
      //-------------------------------------导出excel End-------------------------------------

    },

    mounted: function () {
      //debug
      window.vue = this;


      //挂载页面中Table的数据
      getAllTeacherInfo().then(res => {
        this.tableData = res.data;
      });

      //挂载 教研室选项信息
      getDepartmentOptions().then(res =>{
        this.departmentOptions = res.data;
        this.departmentOptions.push(
          {
            college_id: null,
            director: null,
            id: "0",
            name: "未分配教研室",
            number: "0"
          });
      });

      //挂载 学院选项信息
      getCollegeOptions().then(res =>{
        this.collegeOptions = res.data;
      });

      //挂载 教师职称、管理职称 选项选项信息
      getTeacherTitleOption().then(res =>{
        this.teacherTitleOptions = res.data;
      });

      //挂载教师岗位类别
      getTeacherCategoryOptins().then(res =>{
        this.teacherCategoryOptions = res.data;
      });
    }

  }
</script>

<style scoped>

</style>
