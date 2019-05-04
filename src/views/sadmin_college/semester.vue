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
      <el-table-column label="学期名称" width="300">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>id: {{ scope.row.id }}</p>
            <p>父类型id: {{ scope.row.semester_name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.semester_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="学期状态" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteSemesterInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="学期名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.semester_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <el-form :model="editForm" ref="editForm">
        <el-form-item label="学期状态"  :label-width="formLabelWidth">
          <el-select v-model="editForm.status" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in statusOptions"
              :key="item.id"
              :label="item.status_name"
              :value="item.status_name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-form :model="editForm" ref="editForm">
        <el-form-item label="学期状态:" :label-width="formLabelWidth" prop="type_id">
          {{editForm.status}}
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
  import {semesterInfoGet, semesterInfoAdd, semesterInfoDelete, semesterInfoUpdate} from "@/api/sadmin/rank/semesterInfo";
  import {isEmpty} from '@/utils/validate';

  export default {
    inject: ['reload'],
    name: "semester",
    data() {
      return {
        tableData: [], //用来存放信息  [显示]
        statusOptions: [
          {
            "id":1,
            "status_name":"正在进行(已生效)"
          },
          {
            "id":2,
            "status_name":"(未生效)"
          }
        ],  //用来存状态类型的选项  [显示]
        dialogFormVisible: false,
        formLabelWidth: '120px',
        dialogTitle: '',
        editForm: {
          id: '',
          semester_name: '',     //学期名称
          status: '',  //状态
        },
      }
    },
    methods: {
      getSemesterInfo: function () {
        semesterInfoGet().then(res => {
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
        semesterInfoUpdate(this.editForm.id, this.editForm.semester_name,this.editForm.status).then(res => {
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
        semesterInfoAdd(this.editForm.semester_name,this.editForm.status).then(res => {
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

      deleteSemesterInfo: function(index, row) {
        this.editForm = Object.assign({}, row);
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          semesterInfoDelete(this.editForm.id).then(res => {
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
      this.getSemesterInfo();
    }
  }
</script>

<style scoped>

</style>
