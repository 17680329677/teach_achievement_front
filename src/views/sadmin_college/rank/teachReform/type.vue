<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData" style="width: 80%; margin: 0 auto;" border>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型名称" width="300">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>id: {{ scope.row.id }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.type_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否为学生参与的项目" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.student_attend }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteReformProjectRank(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="项目等级名称" :label-width="formLabelWidth" prop="type_name">
          <el-input v-model="editForm.type_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="是否为学生参与的项目" :label-width="formLabelWidth" prop="student_attend">
          <el-input v-model="editForm.student_attend" auto-complete="off"></el-input>
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
  import {projectTypeGet, projectTypeAdd, projectTypeDelete, projectTypeUpdate} from "@/api/sadmin/rank/projectType";
  import {isEmpty} from '@/utils/validate';

  export default {
    inject: ['reload'],
    name: "type",
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogTitle: '',
        editForm: {
          id: '',
          type_name: '',
          student_attend: ''
        },
      }
    },
    methods: {
      getReformProjectTypeInfo: function () {
        projectTypeGet().then(res => {
          this.tableData = res.data;
        })
      },

      handleEdit: function (index, row) {
        this.editForm = Object.assign({}, row);
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑';
      },

      handleAdd: function() {
        this.dialogTitle = '添加';
        this.dialogFormVisible = true;
      },

      update: function () {
        projectTypeUpdate(this.editForm.id, this.editForm.type_name,this.editForm.student_attend).then(res => {
          if (res.status == 'success') {
            this.$message({
              message: '更新成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.reload();
          }
        })
      },

      add: function () {
        projectTypeAdd(this.editForm.type_name,this.editForm.student_attend).then(res => {
          if (res.status == 'success'){
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.reload();
          }
        })
      },

      deleteReformProjectRank: function(index, row) {
        this.editForm = Object.assign({}, row);
        this.$confirm('此操作将永久删除该等级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          projectTypeDelete(this.editForm.id).then(res => {
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

      syncClick: function () {
        if (this.dialogTitle == '编辑') {
          this.update();
        } else if (this.dialogTitle == '添加') {
          this.add();
        }
      }

    },
    mounted: function () {
      this.getReformProjectTypeInfo();
    }
  }
</script>

<style scoped>

</style>
