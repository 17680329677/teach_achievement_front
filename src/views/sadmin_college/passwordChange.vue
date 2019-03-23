<template>

  <div class="app-container">


    <el-form :model="editForm" style="text-align: center;">
      <el-form-item label="当前密码"  :label-width="formLabelWidth">
        <el-input :type="pwdType" v-model="editForm.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth">
        <el-input :type="pwdType" v-model="editForm.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth">
        <el-input :type="pwdType" v-model="editForm.repeatPassword" auto-complete="off"></el-input>
      </el-form-item>

      <!--<el-button @click="dialogFormVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="updatePwd">确 定</el-button>
    </el-form>

  </div>
</template>

<script>
  //import { getAllCollegeInfo, collegeUpdate, collegeDelete, collegeAdd } from '../../api/sadmin/pwdChange';
  import { passwordUpdate } from '../../api/sadmin/pwdChange'
  export default {
    inject: ['reload'],
    name: "passwordChange",
    //数据部分
    data() {
      return {
        dialogTitle: '编辑密码',
        formLabelWidth: '120px',
        pwdType: 'password',
        editForm: {
          oldPassword: '',
          newPassword: '',
          repeatPassword: '',
        }
      }
    },
    //@click 触发方法
    methods: {
      /*
      例子通过api 获取信息，返回 填充至
      getCollegeInfo: function () {
        getAllCollegeInfo().then(res => {
          this.tableData = res.data;
          console.log(res.data);
        })
      },
      */

      updatePwd:function() {
        this.$confirm('是否修改密码?', '提示', {
          confirmButtonText: '确认修改',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.editForm.newPassword != this.editForm.repeatPassword){
            this.$message({
              type: 'info',
              message: '密码不一致'
            });
          } else {
            passwordUpdate(this.editForm.oldPassword,this.editForm.newPassword).then(res => {
              if (res.status == 'success'){
                this.$message({
                  message: '密码修改成功！',
                  type: 'success'
                });
                this.reload();
              }
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: res.reason
              });
            });
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

    },
    //页面第一次加载完成后所调用的函数
    /*mounted: function () {
      //this.getCollegeInfo();
    }
    */
  }
</script>

<style scoped>

</style>
