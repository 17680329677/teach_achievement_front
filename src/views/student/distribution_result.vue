<template>
  <div class="app-container">


    <div class="filter-container">

      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">分流结果：{{ resultData.orientation_name}}</span><br>
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">是否确认：
        <span style="color: blue" v-if="resultData.status == '1'">已确认</span>
        <span style="color: red" v-if="resultData.status == '0'">未确认</span>

      </span>

      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="success" icon="" v-if="resultData.orientation_name" @click="handleConfirm">确认信息</el-button>
      <br/><br/>
    </div>




    <!-- 信息弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" size="small" label-width="80px">

        <el-form-item label="密码">
          <el-input v-model="password" type="password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复密码">
          <el-input v-model="repassword" type="password"  auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmInfo">确 认 分 流 结 果</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import { getDistributionResult,confirmDistributionResult } from '@/api/student/distribution_result'
  export default {
    inject: ['reload'],
    name: "result",

    data() {
      return {

        password: '',
        repassword: '',

        resultData: {},

        //弹出框
        dialogFormVisible: false,
        dialogTitle: '确认分流结果',
        formLabelWidth: '120px',


      }
    },

    methods: {

      handleConfirm: function(){
        this.password = '';
        this.repassword = '';
        this.dialogFormVisible = true;
      },

      confirmInfo: function () {
        confirmDistributionResult(this.password,this.repassword).then(res=>{
          if (res.status == 'success'){
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
      }

    },

    mounted: function () {
      window.vue = this;

      //结果
      getDistributionResult().then(res => {
        if (res.status == 'success') {
          this.resultData = res.data;
        }
      })
    }



  }
</script>

<style scoped>

</style>
