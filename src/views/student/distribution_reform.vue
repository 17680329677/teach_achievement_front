<template>
  <div class="app-container">
    <h3>志愿填报</h3>

    <div class="filter-container">
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">姓 名：<span style="color: #97a6ff">{{ sutdentInfo.name }}</span> </span>
    </div>
    <div class="filter-container">
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">学 号：<span style="color: #97a6ff">{{ sutdentInfo.id }}</span> </span>
    </div>

    <div class="filter-container">
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">学 院：<span style="color: #97a6ff">{{ sutdentInfo.college_name }}</span> </span>
    </div>
    <div class="filter-container">
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">班 级：<span style="color: #97a6ff">{{ sutdentInfo.class_name }}</span> </span>
    </div>
    <div class="filter-container">
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">大 一 学 年 学 分 成 绩(GPA)：<span style="color: #97a6ff">{{ sutdentInfo.gpa }}</span> </span>
    </div>
    <div class="filter-container">
      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 25px;">GPA 排 名： <span style="color: #97a6ff">{{ sutdentInfo.gpa_rank }} / {{ sutdentInfo.student_quantity }}</span> </span>
    </div>

    <hr>

    <div class="filter-container">
      <h3>志 愿 信 息</h3>
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="">添加</el-button>
      <br/><br/>
    </div>

    <el-form :model="editReformForm" >
      <el-form-item label="第 一 志 愿" :label-width="formLabelWidth">
        <el-select v-model="editReformForm.distribution_id" placeholder="请选择" class="filter-item">
          <el-option
            v-for="item in reformOption"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          >
            {{item.name}}
          </el-option>
        </el-select>

        <el-button type="success" @click="">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { getDistributionResult } from '@/api/student/distribution_reform'
  export default {
    inject: ['reload'],
    name: "reform",

    data() {
      return {
        //加载显示数据组
        resultData: [],
        sutdentInfo: {},

        //基本信息
        formLabelWidth: '120px',

        //志愿方向Option id,name
        reformOption:[],

        //志愿提交表单
        editReformForm:{
          distribution_id:'', //方向id
          desire_rank:'',  //志愿顺序（第几志愿）
        },

      }
    },

    mounted: function () {
      window.vue = this;

      //结果
      getDistributionResult().then(res => {
        if (res.status == 'success') {
          this.sutdentInfo = res.data;
        }
      })
    }


  }
</script>

<style scoped>

</style>
