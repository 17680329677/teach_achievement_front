<template>

  <div class="app-container">
    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教研室名称" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教研室主任" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{changeTeacherNumberToName(scope.row.director)}}  </span>
          <!--({{ scope.row.director }})-->
        </template>
      </el-table-column>

      <el-table-column label="教研室人数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="包含专业" width="300">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" style="margin-left: 5px;" :key="index" v-for="(major,index) in scope.row.majors">{{ major.major_name}}</el-tag>
          </div>

        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">基本信息</el-button>
          <el-button
            size="mini"
            type="info"
            @click="
            detailFormTitle = scope.row.name,
            detailFormVisible = true,
            addTeacherForm.departmentId = scope.row.id
            getThisDepartmentTeachers(scope.row.id)
                    ">成员信息</el-button>
          <el-button size="mini" @click="addMajorForm.department_id = scope.row.id , getMajors(scope.row.id) ">专业信息</el-button>
          <el-button size="mini" type="danger" @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="教研室名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>


        <el-form :model="editForm" ref="editForm">
          <el-form-item label="选择教研室主任"  :label-width="formLabelWidth">

            <el-select v-model="editForm.director" placeholder="请选择" class="filter-item">
              <el-option
                v-for="item in teacherOptions"
                :key="item.number"
                :value="item.number"
              >
                {{item.name}} ( {{item.number}} )
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="syncClick">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基本信息编辑框 end -->

    <!-- 教研室成员成员信息编辑框（） begin -->
    <!-- detail Table -->
    <el-dialog :title="detailFormTitle + ' ' +'详情' " :visible.sync="detailFormVisible">
      <h3>教研室成员：</h3>
      <el-table :data="teachersInDepartment" style="width: 100%" border>

        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="教师姓名" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="教师工号" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.number }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delTeacher(scope.row.number)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form :model="addTeacherForm" style="margin-top: 30px">
        <el-form-item label="添加教师"  :label-width="formLabelWidth">
          <el-select v-model="addTeacherForm.number" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in teacherOptions"
              :key="item.number"
              :value="item.number"
            >
              {{item.name}} ( {{item.number}} )
            </el-option>
          </el-select>
          <el-button
            type="primary"
            @click="addTeacher()">添加教师</el-button>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="detailFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

    <!-- 教研室成员成员信息编辑框（） end -->

    <!-- 专业信息编辑框（） begin -->
    <!-- detail Table -->
    <el-dialog title="专业信息管理" :visible.sync="majorFormVisible">
      <h3>包含专业：</h3>
      <el-table :data="majorInDepartment" style="width: 100%" border>

        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="专业名称" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.major_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="delMajor(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form :model="addMajorForm" style="margin-top: 30px">
        <el-form-item label="添加专业"  :label-width="formLabelWidth">

          <el-form-item label="专业名称" :label-width="formLabelWidth">
            <el-input v-model="addMajorForm.major_name" auto-complete="off"></el-input>
          </el-form-item>

          <el-button
            type="primary"
            @click="addMajor">添加专业</el-button>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="majorFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

    <!-- 专业信息编辑框（） end -->



  </div>


</template>

<script>
  import { getDepatmentInfo, departmentAdd, departmentDelete, departmentUpdate, //基本信息操作
    departmentAddTeacher,departmentDeleteTeacher,  //子信息操作
    departmentMajorGet, departmentMajorAdd, departmentMajorDel//专业操作
  } from '@/api/cadmin/department';

  import {
    getTeacherOptions,getTeachersInfoByDepartmentId,  //选项
  } from '@/api/cadmin/optionInfo';

  export default {
    inject: ['reload'],
    name: "department",
    //数据展示
    data() {
      return {
        //加载显示数据组
        tableData: [],  //首次加载 主页表格中要显示的数据
        teacherOptions: [],  //选择教研室主任时存放本学院的教师工号和姓名  [显示]
        teachersInDepartment: [],//当前教研室详细信息中教师名单
        majorInDepartment: [],//教研室包含专业列表

        //页号
        currentPage: 1,
        pageSize: 9,

        //隐藏框
          //基本信息
        dialogFormVisible: false,
        dialogTitle: '编辑',
        formLabelWidth: '120px',
          //成员详细信息
        detailFormVisible: false,
        detailFormTitle: '详情',
        //detailFormLabelWidth: '200px',

          //专业信息框
        majorFormVisible: false,

        //提交的数据组
        editForm: {
          id: '',
          name: '', //教研室名称
          director: '' //教研室主任教师工号
        },

        addTeacherForm: { //添加教师到教研室
          number: '',
          departmentId: ''
        },

        addMajorForm:{
          id: '',
          major_name: '',
          college_id: '',
          department_id: ''
        },

        //其他
        departmentNumber: 0, //当前教研室人数

      }
    },
    //方法
    methods: {

      //---------------------------相关信息显示---------------------------
      //根据教师number获取姓名
      changeTeacherNumberToName: function(number){
        var teacherName = '';
        this.teacherOptions.forEach( item=>{
          if(item.number == number){
            teacherName = item.name;
          }
        })
        return teacherName;
      },

      //统计当前教研室教师名单
      getThisDepartmentTeachers: function(departmentId){
        getTeachersInfoByDepartmentId(departmentId).then(res => {
          this.teachersInDepartment = res.data;
          //console.log(res.data)
        })
      },

      //同步页面
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      //---------------------------基本信息操作---------------------------
      //删除
      deleteInfo: function(index, row) {
        this.editForm = Object.assign({}, row)
        this.$confirm('此操作将永久删除教研室, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          departmentDelete(this.editForm.id).then(res => {
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

      //编辑
      handleEdit: function (index, row) {
        this.editForm = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑';
      },

      //编辑
      updateInfo: function() {
        departmentUpdate(this.editForm.id, this.editForm.name, this.editForm.director).then(res => {
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
        this.dialogFormVisible = true;
        this.dialogTitle = '添加';
      },

      //添加
      addInfo: function () {
        departmentAdd(this.editForm.name, this.editForm.director).then(res => {
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

      //---------------------------教研室成员信息信息操作---------------------------
      //添加教师到教研室
      addTeacher: function () {
        departmentAddTeacher(this.addTeacherForm.departmentId,this.addTeacherForm.number).then(res => {
          if (res.status == 'success'){
            this.detailFormVisible = false;
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

      //从教研室删除教师
      delTeacher: function (number) {
        departmentDeleteTeacher(number).then(res => {
          if (res.status == 'success'){
            this.detailFormVisible = false;
            this.$message({
              message: '删除成功！',
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


      //---------------------------教研室所属专业信息操作---------------------------

      //按照教研室id查询
      getMajors: function (id) {
        this.addMajorForm.major_name = '';
        departmentMajorGet(id).then(res=>{
            this.majorInDepartment =  res.data;
            this.majorFormVisible = true;
        })

      },

      //添加
      addMajor: function( ) {
        departmentMajorAdd( this.addMajorForm.department_id, this.addMajorForm.major_name ).then(res=>{
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
            departmentMajorGet( this.addMajorForm.department_id ).then(res=>{
              this.majorInDepartment =  res.data;
            })
          } else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })

      },

      //删除
      delMajor: function(id) {
        departmentMajorDel(id).then(res=>{
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
            departmentMajorGet( this.addMajorForm.department_id ).then(res=>{
              this.majorInDepartment =  res.data;
            })
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

      window.vue = this;

      //挂载页面中Table的数据
      getDepatmentInfo().then(res => {
        this.tableData = res.data;

      });

      //挂载选项信息
      getTeacherOptions().then(res =>{
        this.teacherOptions = res.data;
      });
    }
  }
</script>

<style scoped>

</style>
