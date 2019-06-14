<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
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
      <el-button type="primary" style="margin-left: 10px; text-align: center;" icon="el-icon-search" @click="search">搜索</el-button>


      <el-button class="filter-item"  style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学院管理员" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属学院" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.college_name }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="editForm.number" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="所属学院"  :label-width="formLabelWidth">
          <el-select v-model="editForm.college_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in collegeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <!--
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getAllSecretaryInfo, secretaryAdd, secretaryResetPassword, secretaryDelete, searchSecretary} from '../../api/sadmin/secretary';
  import { getAllCollegeInfo } from '../../api/sadmin/college';
  import {isValidatePhone, isValidateEmail} from '@/utils/validate';
    export default {
      inject: ['reload'],
      name: "academicSecretary",
      data() {

        // 手机号验证
        const validatePhone = (rule, value, callback) => {
          if (!isValidatePhone(value)) {
            callback(new Error('请输入正确的手机号！'))
          } else {
            callback()
          }
        };
        // 邮箱验证
        const validateEmail = (rule, value, callback) => {
          if (!isValidateEmail(value)) {
            callback(new Error('请输入正确的邮箱！'))
          } else {
            callback()
          }
        };

        return {
          options: [{
            value: 'number',
            label: '账号'
          }, {
            value: 'college_name',
            label: '学院名称'
          }],

          collegeOptions: [],

          currentPage: 1,
          pageSize: 9,
          tableData: [],
          search_type: '',
          search_value: '',
          dialogFormVisible: false,
          dialogTitle: '添加',
          formLabelWidth: '120px',
          editForm: {
            number: '',
            college_name: '',
            college_id: ''
          },
          editRules: {
            phone: [{ require: true, trigger: 'blur', validator: validatePhone }],
            email: [{ required: true, trigger: 'blur', validator: validateEmail }]
          }
        }
      },
      methods: {

        handleCurrentChange(cpage){
          this.currentPage = cpage;
        },

        handleDelete(index, row) {
          this.editForm = Object.assign({}, row);
          this.$confirm('此操作将永久删除管理员账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            secretaryDelete(this.editForm.number).then(res => {
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

        handleAdd: function(){
          this.editForm = {
            number: '',
              college_name: '',
              college_id: ''
          },
          this.dialogFormVisible = true;
        },

        add: function(){
          secretaryAdd(this.editForm.number, this.editForm.college_id).then(res => {
            if (res.status == 'success'){
              this.$message({
                type: 'success',
                message: res.reason
              });
              this.dialogFormVisible = false;
              this.reload();
            } else {
              this.$message({
                type: 'warning',
                message: res.reason
              })
            }
          })
        },

        //重设密码
        resetPwd(index, row) {
          this.editForm = Object.assign({}, row)
          this.$confirm('将重设此学院管理员密码为123456, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            secretaryResetPassword(this.editForm.number).then(res => {
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


        /*

        handleEdit(index, row) {
          this.editForm = Object.assign({}, row);
          this.dialogFormVisible = true;
        },

        update: function () {
          this.$refs.editForm.validate(valid => {
            if (valid) {
              updateSecretary(this.editForm.number, this.editForm.phone, this.editForm.email).then(res => {
                if (res.status == 'success'){
                  this.$message({
                    type: 'success',
                    message: '更新成功！'
                  });
                  this.dialogFormVisible = false;
                  this.reload();
                } else {
                  this.$message({
                    type: 'warning',
                    message: res.reason
                  })
                }
              })
            } else {
              console.log('error submit!');
              return false;
            }
          })
        },*/

        search: function () {
          searchSecretary(this.search_type, this.search_value).then(res => {
            if (res.status == 'success'){
              this.tableData = res.data;
            } else {
              this.$message({
                type: 'warning',
                message: res.reason
              })
            }
          })
        }

      },

      mounted: function () {

        getAllSecretaryInfo().then(res => {
          if (res.status == 'success'){
            this.tableData = res.data;
          }
        });

        getAllCollegeInfo().then(res => {
          if (res.status == 'success'){
            this.collegeOptions = res.data;
          }
        });


      }


    }
</script>

<style scoped>

</style>
