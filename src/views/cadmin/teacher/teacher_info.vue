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

      <el-table-column label="教师工号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师姓名" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属教研室" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.department_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否在编" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color:#97a6ff" v-if="(scope.row.status == '1')">是</span>
          <span style="margin-left: 10px;color:gray" v-if="(scope.row.status == '0')">否</span>
        </template>
      </el-table-column>

      <el-table-column label="双肩挑" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color:goldenrod" v-if="(scope.row.type == '1')">是</span>
          <span style="margin-left: 10px;color:green" v-if="(scope.row.type == '0')">否</span>
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
          <el-input v-model="editForm.number" auto-complete="off" required="required"></el-input>
        </el-form-item>

        <el-form-item label="教师名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off" required="required"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="editForm.gender" auto-complete="off" required="required"></el-input>
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
          <el-select v-model="editForm.department_id" placeholder="请选择" class="filter-item" required="required">
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

        <el-form-item label="双肩挑" :label-width="formLabelWidth">
          <el-input v-model="editForm.type" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="教学职称" :label-width="formLabelWidth">
          <el-select v-model="editForm.teachertitle_id" placeholder="请选择" class="filter-item" :disabled="true">
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
          <el-select v-model="editForm.managertitle_id" placeholder="请选择" class="filter-item" :disabled="true">
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

        <el-form-item label="教师类型" :label-width="formLabelWidth">
          <el-input v-model="editForm.type_id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="工作状态" :label-width="formLabelWidth">
          <el-input v-model="editForm.status" auto-complete="off"></el-input>
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
          <el-input v-model="editForm.highest_education" auto-complete="off"></el-input>
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
          <el-input v-model="editForm.research_direction" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="editForm.telephone" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="syncClick">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基本信息编辑框 end -->

    <!-- 二级信息编辑框（） begin -->

    <!-- 二级信息编辑框（） end -->

  </div>


</template>

<script>
  import { getAllTeacherInfo,   //显示信息获得
    addTeacherInfo, delTeacherInfo,//基本信息操作
    updateTeacherInfo,  //子信息操作
  } from '@/api/cadmin/teacherInfo';

  import { getCollegeOptions, getDepartmentOptions, getTeacherTitleOption,  //选项信息挂载
  } from '@/api/cadmin/optionInfo';

  import { Blob, Export2Excel } from "@/api/common/Export2Excel";

  export default {
    inject: ['reload'],
    name: "teacher_info",
    //数据展示
    data() {
      return {

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
        teacherTypeOptions: [], //教师账号类型 1、2、3、4、5
        nationalityOptions: [
          { "name": "汉族" },{ "name": "壮族" },{ "name": "回族" },{ "name": "满族" },{ "name": "维吾尔族" },
          { "name": "苗族" },{ "name": "彝族" },{ "name": "土家族" },{ "name": "藏族" },{ "name": "蒙古族" },
          { "name": "侗族" },{ "name": "布依族" },{ "name": "瑶族" },{ "name": "白族" },{ "name": "朝鲜族" },
          { "name": "哈尼族" },{ "name": "黎族" },{ "name": "哈萨克族" },{ "name": "傣族" },{ "name": "畲族7" },
          { "name": "傈僳族" },{ "name": "东乡族" },{ "name": "仡佬族" },{ "name": "拉祜族" },{ "name": "佤族" },
          { "name": "水族" },{ "name": "纳西族" },{ "name": "羌族" },{ "name": "土族" },{ "name": "仫佬族" },
          { "name": "锡伯族" },{ "name": "柯尔克孜族" },{ "name": "景颇族" },{ "name": "达斡尔族" },{ "name": "撒拉族" },
          { "name": "布朗族" },{ "name": "毛南族" },{ "name": "塔吉克族" },{ "name": "普米族" },{ "name": "阿昌族" },
          { "name": "怒族" },{ "name": "鄂温克族" },{ "name": "京族" },{ "name": "基诺族" },{ "name": "德昂族" },
          { "name": "保安族" },{ "name": "俄罗斯族" },{ "name": "裕固族" },{ "name": "乌孜别克族" },{ "name": "门巴族" },
          { "name": "鄂伦春族" },{ "name": "独龙族" },{ "name": "赫哲族" },{ "name": "高山族" },{ "name": "珞巴族" },
          { "name": "塔塔尔族" }
          ],//民族选项，方便老师填写，直接写成固定

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
          this.editForm.birth_year_month, this.editForm.department_id,  this.editForm.college_id,
          this.editForm.teachertitle_id, this.editForm.managertitle_id,
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
          this.editForm.birth_year_month, this.editForm.college_id, this.editForm.teachertitle_id, this.editForm.managertitle_id,
          this.editForm.type, this.editForm.status, this.editForm.work_begin_year_month, this.editForm.bjfu_join_year_month,
          this.editForm.highest_education, this.editForm.highest_education_accord_year_month, this.editForm.graduate_paper_title,
          this.editForm.graduate_school, this.editForm.research_direction, this.editForm.telephone, this.editForm.email
                            ).then(res => {
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

      //基本信息:编辑/添加同步
      syncClick: function () {
        if (this.dialogTitle == '编辑') {
          this.updateInfo();
        } else if (this.dialogTitle == '添加') {
          this.addInfo();
        }
      },

      //---------------------------详细信息操作---------------------------





      //-----------------------------------导出excel-----------------------------------
      export2Excel: function() {
        var tempTableData = this.tableData;

        //--------导出之前对数据格式化---------
        tempTableData.forEach(function(item,index){
          if(item.status == '1' ){
            item.status = '是';
          } else if(item.status == '0'){
            item.status = '否';
          }

          if(item.type == '1' ){
            item.type = '是';
          } else if(item.type == '0'){
            item.type = '否';
          }
        });
        //-----------格式化End---------------

        require.ensure([], () => {
          const { export_json_to_excel } = require('@/api/common/Export2Excel');
          const tHeader = ['工号', '姓名', '所属教研室','是否在编','双肩挑'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['number', 'number','number','status','type'];
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
      //-------------------------------------导出 End-------------------------------------

    },

    mounted: function () {
      //debug
      window.vue = this

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

    }

  }
</script>

<style scoped>

</style>
