<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData" style="width: 60%; margin: 0 auto;" border>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="400">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>id: {{ scope.row.id }}</p>
            <p>等级名称: {{ scope.row.rank_name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.rank_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteRank(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="等级名称" :label-width="formLabelWidth" prop="rank_name">
          <el-input v-model="editForm.rank_name" auto-complete="off"></el-input>
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
    import {getBookRankInfo, updateBookRankInfo, addBookRankInfo, deleteBookRankInfo} from "../../../api/sadmin/rank/book";
    import {isEmpty} from '@/utils/validate';

    export default {
      inject: ['reload'],
      name: "bookClass",
      data() {
        return {
          tableData: [],
          dialogFormVisible: false,
          formLabelWidth: '120px',
          dialogTitle: '',
          editForm: {
            id: '',
            rank_name: ''
          },
        }
      },
      methods: {
        getBookRankInfo: function () {
          getBookRankInfo().then(res => {
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
          updateBookRankInfo(this.editForm.id, this.editForm.rank_name).then(res => {
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
          addBookRankInfo(this.editForm.rank_name).then(res => {
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

        deleteRank: function(index, row) {
          this.editForm = Object.assign({}, row);
          this.$confirm('此操作将永久删除该等级, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteBookRankInfo(this.editForm.id).then(res => {
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
        this.getBookRankInfo();
      }
    }
</script>

<style scoped>

</style>
