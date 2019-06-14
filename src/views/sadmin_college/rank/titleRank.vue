<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 80%; margin: 0 auto;" border>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属系列" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacher_category_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师职称" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTeacherTitle(scope.$index, scope.row)">删除</el-button>
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

      <el-form :model="editForm" ref="editForm">
        <el-form-item label="职称类型" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <el-form :model="editForm" ref="editForm">
        <el-form-item label="所属系列"  :label-width="formLabelWidth">
          <el-select v-model="editForm.teacher_category_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in teacherCategoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="syncClick">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {teacherTitleGet, teacherTitleAdd, teacherTitleDelete, teacherTitleUpdate} from "@/api/sadmin/rank/teacherTitle";
  import { teacherCategoryGet } from "@/api/sadmin/rank/teacherCategory";
  import {isEmpty} from '@/utils/validate';

  export default {
    inject: ['reload'],
    name: "titlerank",
    data() {
      return {
        currentPage: 1,
        pageSize: 9,

        tableData: [], //用来存放教师职称信息  [显示]
        teacherCategoryOptions: [],  //用来存放教师用户类型的选项  [显示]
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogTitle: '',
        editForm: {
          id: '',
          name: '',     //教师职称id
          teacher_category_id: '',  //教师类型id
          teacher_category_name: '' //教师类型
        },
      }
    },
    methods: {

      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      handleEdit: function (index, row) {
        this.editForm = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑';
      },

      handleAdd: function() {
        this.editForm = {
          id: '',
          name: '',     //教师职称id
          teacher_category_id: '',  //教师类型id
          teacher_category_name: '' //教师类型
        },
        this.dialogTitle = '添加';
        this.dialogFormVisible = true;
      },

      update: function () {
        teacherTitleUpdate(this.editForm.id, this.editForm.name,this.editForm.type_id).then(res => {
          if (res.status == 'success') {
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.reload();
          }
        })
      },

      add: function () {
        teacherTitleAdd(this.editForm.name,this.editForm.teacher_category_id).then(res => {
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.reload();
          }
        })
      },

      deleteTeacherTitle: function(index, row) {
        this.editForm = Object.assign({}, row);
        this.$confirm('此操作将永久删除该职称, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teacherTitleDelete(this.editForm.id).then(res => {
            if (res.status == 'success'){
              this.$message({
                message: res.reason,
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

      syncClick: function () {
        if (this.dialogTitle == '编辑') {
          this.update();
        } else if (this.dialogTitle == '添加') {
          this.add();
        }
      }

    },
    mounted: function () {

      teacherTitleGet().then(res => {
        if (res.status == 'success'){
          this.tableData = res.data;
        }
      });

      teacherCategoryGet().then(res => {
        if (res.status == 'success'){
          this.teacherCategoryOptions = res.data;
        }
      });


    }
  }
</script>

<style scoped>

</style>



<!--   其他功能   -->



