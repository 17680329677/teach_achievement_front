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
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleExcellentAdd">添加优秀志愿</el-button>
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加普通志愿</el-button>
      <br/><br/>
    </div>


    <el-table :data="tableData" style="width: 100%" border>

      <el-table-column label="志愿顺序" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.desire_rank }}</span>
        </template>
      </el-table-column>


      <el-table-column label="专业" width="400">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ getOrientationName( scope.row.distribution_id )}}</span>
        </template>
      </el-table-column>


      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color: red;"  v-if="(scope.row.status == '0')">未确认</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '1')">已确认</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" width="">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ format(parseInt(scope.row.submit_time)) }}</span>
        </template>
      </el-table-column>


    </el-table>



    <!-- 普通志愿 信息弹出框 -->
    <el-dialog title="志 愿 添 加" :visible.sync="dialogFormVisible">
      <el-form :model="editReformForm" size="small" label-width="80px">

        <el-form :model="editReformForm" >
          <el-form-item label="志 愿 选 择" :label-width="formLabelWidth" >
            <el-select v-model="editReformForm.distribution_id" placeholder="请选择" class="filter-item" style="width:300px">
              <el-option
                v-for="item in distributionOptions"
                :label="item.orientation_name"
                :key="item.id"
                :value="item.id"
                v-if="!checkExcellent(item.orientation_name)"
              >
                {{item.orientation_name}}
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="editReformForm" >
          <el-form-item label="志 愿 顺 序" :label-width="formLabelWidth" >
            <el-input-number v-model="editReformForm.desire_rank" :min="1" :max="distributionOptions.length" label="志愿顺序"></el-input-number>
          </el-form-item>
        </el-form>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDesire">提 交</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>


    <!-- 优秀 弹出框 -->
    <el-dialog title="特 殊 志 愿 添 加" :visible.sync="excellentDialogFormVisible">
      <el-form :model="editReformForm" size="small" label-width="80px">

        <el-form :model="editReformForm" >
          <el-form-item label="优 秀 班 志 愿" :label-width="formLabelWidth" >
            <el-select v-model="editReformForm.distribution_id" placeholder="请选择" class="filter-item" style="width:300px">
              <el-option
                v-for="item in distributionOptions"
                :label="item.orientation_name"
                :key="item.id"
                :value="item.id"
                v-if="checkExcellent(item.orientation_name)"
              >
                {{item.orientation_name}}
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form :model="editReformForm" >
          <el-form-item label="志 愿 顺 序" :label-width="formLabelWidth" >
            ： {{editReformForm.desire_rank}}
          </el-form-item>
        </el-form>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDesire">提 交</el-button>
        <el-button @click="excellentDialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getStudentInfo,getDistributionDesire,addDistributionDesire } from '@/api/student/distribution_reform';
  import { getDistributionOptions } from '@/api/student/optionInfo';
  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "reform",

    data() {
      return {
        //加载显示数据组
        tableData: [], //志愿信息
        sutdentInfo: {},
        distributionOptions: [],

        //基本信息
        formLabelWidth: '120px',

        //弹出框
        dialogFormVisible: false,

        excellentDialogFormVisible: false,


        //志愿方向Option id,name
        reformOption:[],

        //志愿提交表单
        editReformForm:{
          distribution_id:'', //方向id
          desire_rank:'',  //志愿顺序（第几志愿）
        },

      }
    },
    methods:{
      //格式化时间显示
      format: function (time) {
        return dateFormat(time)
      },

      checkExcellent: function (str) {
        if(str.indexOf("优秀") == -1){
          return false;
        } else {
          return true;
        }
      },

      //基础志愿添加
      handleAdd: function () {
        this.editReformForm = {
          distribution_id:'', //方向id
          desire_rank: 1,  //志愿顺序（第几志愿）
        };
        this.dialogFormVisible = true;
      },

      //优秀班志愿添加
      handleExcellentAdd: function () {
        this.editReformForm = {
          distribution_id:'', //方向id
          desire_rank: 0,  //志愿顺序（第几志愿）
        };
        this.editReformForm.desire_rank = 0;
        this.excellentDialogFormVisible = true;
      },

      //添加志愿
      addDesire: function(){
        addDistributionDesire(this.editReformForm.distribution_id,this.editReformForm.distribution_id).then(res=>{
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
      },

      getOrientationName: function(id){
        var val = '';
        this.distributionOptions.forEach(item => {
          if(item.id == id){
            val = item.orientation_name;
          }
        });
        return val;
      },

      handleNumChange: function (value) {
        console.log(value);
      },

    },

    mounted: function () {
      window.vue = this;

      //结果
      getDistributionDesire().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      });


      getStudentInfo().then(res => {
        if (res.status == 'success') {
          this.sutdentInfo = res.data;
        }
      });

      getDistributionOptions().then(res => {
        if (res.status == 'success') {
          this.distributionOptions = res.data;
        }
      });

    }


  }
</script>

<style scoped>

</style>
