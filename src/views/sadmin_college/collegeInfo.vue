<template>

  <div class="app-container">
    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="addTip">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学院名称" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学院编号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.college_id }}</span>
        </template>
      </el-table-column>


      <el-table-column label="教研室数量" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.department_num }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师人数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacher_num }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="info"
            @click="">详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteCollege(scope.$index, scope.row)">删除</el-button>
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
      <el-form :model="editForm">
        <el-form-item label="学院名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院编号" :label-width="formLabelWidth">
          <el-input v-model="editForm.college_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教研室数量" :label-width="formLabelWidth">
          <el-input v-model="editForm.department_num" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="教师人数" :label-width="formLabelWidth">
          <el-input v-model="editForm.teacher_num" auto-complete="off" :disabled="true"></el-input>
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
    import { getAllCollegeInfo, collegeUpdate, collegeDelete, collegeAdd } from '../../api/sadmin/college';
    export default {
      inject: ['reload'],
      name: "collegeInfo",
      data() {
        return {
          tableData: [],
          currentPage: 1,
          pageSize: 9,
          dialogFormVisible: false,
          dialogTitle: '编辑',
          formLabelWidth: '120px',
          editForm: {
            id: '',
            name: '',
            department_num: '',
            teacher_num: ''
          }
        }
      },
      methods: {
        getCollegeInfo: function () {
          getAllCollegeInfo().then(res => {
            this.tableData = res.data;
            console.log(res.data);
          })
        },

        handleCurrentChange(cpage){
          this.currentPage = cpage;
        },

        deleteCollege(index, row) {
          this.editForm = Object.assign({}, row)
          this.$confirm('此操作将永久删除学院, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            collegeDelete(this.editForm.id).then(res => {
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

        handleEdit: function (index, row) {
          this.editForm = Object.assign({}, row);
          this.dialogFormVisible = true;
          this.dialogTitle = '编辑';
        },

        update: function() {
          collegeUpdate(this.editForm.id, this.editForm.name, this.editForm.college_id).then(res => {
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

        addCollege: function () {
          // this.dialogFormVisible = true;
          collegeAdd(this.editForm.name, this.editForm.college_id).then(res => {
            if (res.status == 'success'){
              this.dialogFormVisible = false;
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
            }else {
              this.$message({
                message: res.reason,
                type: 'warning'
              });
            }
          })
        },

        addTip: function() {
          this.dialogFormVisible = true;
          this.dialogTitle = '添加';
        },

        syncClick: function () {
          if (this.dialogTitle == '编辑') {
            this.update();
          } else if (this.dialogTitle == '添加') {
            this.addCollege();
          }
        }

      },

      mounted: function () {
        this.getCollegeInfo();
      }
    }
</script>

<style scoped>

</style>
