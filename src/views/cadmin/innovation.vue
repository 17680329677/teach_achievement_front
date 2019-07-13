<template>
  <div class="app-container">

    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">工号、名称检索：</span>
      <el-select v-model="searchType" placeholder="按工号或项目名称搜索" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 200px; margin-left: 20px" class="filter-item" v-model="searchValue"></el-input>
      <el-button type="primary" style="margin-left: 10px; text-align: center;" icon="el-icon-search" @click="search">搜索</el-button>
    </div>

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">状态检索：</span>
      <el-select v-model="searchStatus" placeholder="按状态搜索" class="filter-item" style="margin-left: 20px">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <!--<el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit">添加教材</el-button>-->
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="大创项目名称" width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.project_name }}</p>
            <p>论文编号: {{ scope.row.project_number }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.project_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="项目类型" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.rank_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属教师" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="(scope.row.status == '2')">待审核</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '3')">已存档</span>
        </template>
      </el-table-column>

      <el-table-column label="成绩" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.end_check_rank }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ format(scope.row.submit_time) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="getDetail(scope.$index, scope.row)">修改信息</el-button>
          <el-button size="mini" type="danger" @click="changeStatus(scope.row.id, '1')" :disabled="(scope.row.status == '3')">审核退回</el-button>
          <el-button size="mini" type="primary" @click="changeStatus(scope.row.id, '3')" :disabled="(scope.row.status == '3')">审核通过</el-button>
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
      <el-form :model="editForm" size="small" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="editForm.project_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" >
          <el-input v-model="editForm.project_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属教师" >
          <el-input v-model="editForm.teacher_name" auto-complete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属教师工号" >
          <el-input v-model="editForm.teacher_number" auto-complete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" >
          <el-input v-model="editForm.college_name" auto-complete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目立项年月" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.begin_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="中期检查年月" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.mid_check_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结项成绩" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.end_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="中期检查等级" >
          <el-input v-model="editForm.mid_check_rank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="结项成绩" >
          <el-input v-model="editForm.end_check_rank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属一级学科" >
          <el-input v-model="editForm.subject" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-input v-model="editForm.status" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="主持人" >
          <el-input v-model="editForm.host_student" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目组其他成员" >
          <el-input v-model="editForm.participant_student" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input v-model="editForm.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" >
          <el-input :value="format(editForm.submit_time)" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeSubmitInfo">提 交 修 改</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>


    <!-- 信息导入 -->
    <upload-excel :columnConfig="ExcelColumnConfig" :uploadUrl="ExcelUploadUrl"/>

  </div>
</template>

<script>
  import { getInnovationInfo, getDetailInnovationInfo, statusSearchInnovation, searchInnovationInfo,
    changeInnovationStatus, changeSubmitInfo } from "@/api/cadmin/innovation";

  import UploadExcel from '@/views/components/Excel/UploadExcel' //二次封装组件

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "innovation",
    components: {
      UploadExcel
    }, //注册子组件
    data() {
      return {
        options: [
          {value: 'project_name', label: '大创项目称'},
          {value: 'teacher_name', label: '教师姓名'}
        ],

        //状态搜索：  已提交/待审批 （、2提交/待审核、3存档/已审核）
        statusOptions: [
          {value: '0', label: '全部'},
          {value: '2', label: '待审核'},
          {value: '3', label: '已审核'},
        ],

        ExcelColumnConfig:[
          {name:"project_name",value:"项目名称"},
          {name:"project_number",value:"项目编号" },
          {name:"teacher_name",value:"所属教师" },
          {name:"teacher_number",value:"所属教师工号" },
          {name:"college_name",value:"所属学院" },
          {name:"begin_year_month",value:"项目立项年月" },

          {name:"mid_check_year_month",value:"中期检查年月" },
          {name:"end_year_month",value:"结项成绩" },

          {name:"mid_check_rank",value:"中期检查等级" },
          {name:"end_check_rank",value:"结项成绩" },
          {name:"subject",value:"所属一级学科" },
          {name:"status",value:"状态" },
          {name:"host_student",value:"主持人" },
          {name:"participant_student",value:"项目组其他成员" },
          {name:"remark",value:"备注" },
          {name:"submit_time",value:"提交时间" },
        ],
        ExcelUploadUrl: "",


        //搜索
        searchType: '',
        searchValue: '',
        searchStatus: '',

        //表单数据
        tableData: [],

        //翻页
        currentPage: 1,
        pageSize: 9,
        dialogFormVisible: false,

        //弹出框
        dialogTitle: '编辑',
        formLabelWidth: '120px',

        //编辑框
        editForm: {
          id: '',
          teacher_name: '',
          teacher_number: '',
          project_name: '',
          project_number: '',
          rank_id: '',
          college_name: '',
          begin_year_month: '',
          mid_check_year_month: '',
          end_year_month: '',
          mid_check_rank: '',
          end_check_rank: '',
          subject: '',
          status: '',
          host_student: '',
          participant_student: '',
          remark: '',
          submit_time: '',
        },

      }
    },
    watch: {
      // 如果 `searchStatus` 发生改变，这个函数就会运行
      searchStatus: function (newStatus, oldStatus) {
        if(newStatus){
          statusSearchInnovation(newStatus).then(res => {
            this.tableData = res.data;
          })
        }

      }
    },

    methods: {
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      format: function (time) {
        return dateFormat(time)
      },

      //获得项目详细信息
      getDetail: function (index, row) {
        let id = Object.assign({}, row).id;
        getDetailInnovationInfo(id).then(res => {
          this.editForm = res.data[0];

          this.dialogTitle = '编辑';
          this.dialogFormVisible = true;
        })
      },

      //提交修改
      changeSubmitInfo: function(){
        changeSubmitInfo(
          this.editForm.id,
          this.editForm.project_name,
          this.editForm.project_number,
          this.editForm.rank_id,
          this.editForm.begin_year_month,
          this.editForm.mid_check_year_month,
          this.editForm.end_year_month,
          this.editForm.mid_check_rank,
          this.editForm.end_check_rank,
          this.editForm.subject,
          this.editForm.status,
          this.editForm.host_student,
          this.editForm.participant_student,
          this.editForm.remark,
        ).then(res=>{
          if (res.status == 'success') {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.reload();
          }
        })
      },


      //状态更变
      changeStatus: function (id, status) {
        changeInnovationStatus(id,status).then(res => {
          if (res.status == 'success') {
            this.reload();
            this.$message({
              message: '撤销提交成功',
              type: 'success'
            });
          }
        })
      },

      //查找
      search: function () {
        searchInnovationInfo(this.searchType, this.searchValue).then(res => {
          if (res.status == 'success') {
            this.tableData = res.data;
          }
        })
      }

    },

    mounted: function () {

      //debug
      window.vue = this;


      //挂载基本信息
      getInnovationInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })

    }

  }
</script>

<style scoped>

</style>
