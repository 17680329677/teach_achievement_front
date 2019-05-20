<template>
  <div class="app-container">

    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">教师姓名、项目名称检索：</span>
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
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleCreate">添加教材</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目名称" width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.project_name }}</p>
            <p>项目编号: {{ scope.row.project_number }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.project_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="所属教师" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="相关类别" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.rank_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="(scope.row.status == '1')">未提交</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '2')">待审核</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '3')">立项</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '4')">中期检查通过</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '5')">结题</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '6')">已存档</span>
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
          <el-button size="mini" @click="getDetail(scope.$index, scope.row), dialogTitle='添加'" :disabled="scope.row.status == '2'">修改信息</el-button>
          <el-dropdown @command="">
            <el-button type="primary" size="mini" style="width: 90px;margin-left: 5px;">
              状态变更<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="scope.row.status == '1'" @click.native="handleChangeStatus(scope.row.id, '1')">撤回提交</el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status == '2'" @click.native="handleChangeStatus(scope.row.id, '2')">提交审核</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" type="info" @click="getRecord(scope.row.id),recordDialogFormVisible = true">查看变更记录</el-button>
          <el-button size="mini" type="warning" @click="recordEditForm.project_id = scope.row.id, handleAddRecord() "
                     :disabled="scope.row.status == '2'">添加变更记录</el-button>

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

    <!-- 项目详情 start -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" size="small" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="editForm.project_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" >
          <el-input v-model="editForm.teacher_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与类型" >
          <el-input v-model="editForm.participate_type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" >
          <el-input v-model="editForm.project_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目所属级别id">
          <el-select v-model="editForm.type_child_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in projectChildTypeOptins"
              :label="item.child_type_name"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
          已选择：{{ editForm.child_type_name }}
        </el-form-item>
        <el-form-item label="项目子类型" >
          <el-input v-model="editForm.child_type_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目所属级别id">
          <el-select v-model="editForm.rank_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in projectRankOptins"
              :label="item.rank_name"
              :key="item.id"
              :value="item.id"

            ></el-option>
          </el-select>
          已选择：{{ editForm.rank_name }}
        </el-form-item>
        <el-form-item label="项目所属级别" >
          <el-input v-model="editForm.rank_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目立项时间" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.begin_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="中期检查时间" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.mid_check_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="项目结项时间" >
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
        <el-form-item label="结项等级" >
          <el-input v-model="editForm.end_check_rank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属一级学科" >
          <el-input v-model="editForm.subject" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-input v-model="editForm.status" auto-complete="off" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="项目主持学生" >
          <el-input v-model="editForm.host_student" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与学生" >
          <el-input v-model="editForm.participate_student" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" >
          <el-input v-model="editForm.remark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目最终成绩" >
          <el-input v-model="editForm.grade" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" >
          <el-input auto-complete="off" :value="format(editForm.submit_time)" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="dialogTitle == '编辑'" @click="changeSubmitInfo">提 交</el-button>
        <el-button type="primary" v-if="dialogTitle == '创建'" @click="createInfo">创 建</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>

    </el-dialog>
    <!-- 项目详情 end -->

    <!-- 项目变更记录 详情 start -->
    <el-dialog title="项目变更记录" :visible.sync="recordDialogFormVisible">
      <el-table :data="recordTableData" style="width: 100%" border>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="变更原因" width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.reason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" width="">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ format(parseInt(scope.row.change_time)) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.describe }}</span>
          </template>
        </el-table-column>

      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="recordDialogFormVisible = false">返 回</el-button>
      </div>

    </el-dialog>
    <!-- 项目变更记录 end -->

    <!-- 添加记录 start -->
    <el-dialog :title="dialogTitle" :visible.sync="addRecordDialogFormVisible">
      <el-form :model="editForm" size="small" label-width="80px">

        <el-form-item label="项目变更原因">
          <el-input v-model="recordEditForm.reason" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改时间" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="recordEditForm.change_time"

              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="表述" >
          <el-input v-model="recordEditForm.describe" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRecord">添 加</el-button>
        <el-button @click="addRecordDialogFormVisible = false">返 回</el-button>
      </div>

    </el-dialog>
    <!-- 添加记录 end -->

  </div>
</template>

<script>
  import {getAllTeachReformInfo, statusSearchTeachReform, searchReformInfo, getDetailReformInfo,
    changeStatus, craeteReformSubmitInfo, changeReformSubmitInfo, //添加 更变
    getChangeRecord, createChangeRecord  //变更记录
  } from "@/api/normal/teachReform";

  import { getProjectChildTypeOptins, getProjectRankOptins } from "@/api/normal/optionInfo";
  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "teach_reform",
    data() {
      return {
        //选项：
        options: [
          {value: 'reform_name', label: '教改项目名称'},
          {value: 'teacher_name', label: '教师姓名'}
        ],
        projectChildTypeOptins: [],
        projectRankOptins: [],

        //教材更变记录



        //状态搜索：  已提交/待审批 3立项 4中期检查通过 5结题 6存档
        statusOptions: [
          {value: '0', label: '全部'},
          {value: '1', label: '未提交'},
          {value: '2', label: '待审批'},
          {value: '3', label: '立项'},
          {value: '4', label: '中期检查通过'},
          {value: '5', label: '结题'},
          {value: '6', label: '存档'},
        ],

        //搜索
        searchType: '',
        searchValue: '',
        searchStatus: '',

        //表单数据
        tableData: [],
        recordTableData: [],
        projectChildTypeOptins: [],
        projectRankOptins: [],

        //翻页
        currentPage: 1,
        pageSize: 9,

        //弹出框
        dialogFormVisible: false,
        dialogTitle: '添加',
        formLabelWidth: '120px',

        recordDialogFormVisible: false,
        addRecordDialogFormVisible: false,


        //编辑框
        editForm: {
          id: '',
          participate_type: '', //new

          project_name: '',
          project_number: '',
          type_child_id: '',
          rank_id: '',
          college_id: '',
          begin_year_month: '',
          mid_check_year_month: '',
          end_year_month: '',
          mid_check_rank: '',
          end_check_rank: '',
          subject: '',
          status: '',
          host_student: '',
          participate_student: '',
          remark: '',
          grade: '',
          funds: '',
          submit_time: '',
        },

        //项目变更记录
        recordEditForm: {
          project_id: '',
          reason: '',
          change_time: '',
          describe: ''
        }


      }
    },
    watch: {
      // 如果 `searchStatus` 发生改变，这个函数就会运行
      searchStatus: function (newStatus, oldStatus) {
        if(newStatus){
          statusSearchTeachReform(newStatus).then(res => {
            this.tableData = res.data;
          })
        }

      }
    },

    methods: {

      //handle添加
      handleCreate(){
        this.dialogTitle = '创建';
        this.ifdisable = false;
        this.editForm = {
          id: '',
          participate_type: '', //new

          project_name: '',
          project_number: '',
          type_child_id: '',
          rank_id: '',
          college_id: '',
          begin_year_month: '',
          mid_check_year_month: '',
          end_year_month: '',
          mid_check_rank: '',
          end_check_rank: '',
          subject: '',
          status: '',
          host_student: '',
          participate_student: '',
          remark: '',
          grade: '',
          funds: '',
          submit_time: '',
        };
        this.cover_path_img = [];
        this.copy_path_img = [];
        this.content_path_img = [];
        this.dialogFormVisible = true;

      },
      //执行添加!
      createInfo(){
        craeteReformSubmitInfo(
          this.editForm.participate_type, //new

          this.editForm.project_name,
          this.editForm.project_number,
          this.editForm.type_child_id,
          this.editForm.rank_id,
          this.editForm.begin_year_month,
          this.editForm.mid_check_year_month,
          this.editForm.end_year_month,
          this.editForm.mid_check_rank,
          this.editForm.end_check_rank,
          this.editForm.subject,
          this.editForm.host_student,
          this.editForm.participate_student,
          this.editForm.remark,
          this.editForm.grade
        ).then(res=>{
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.reload();
          } else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })
      },

      //翻页
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },
      //时间格式化显示
      format: function (time) {
        return dateFormat(time)
      },

      //获得项目详细信息
      getDetail: function (index, row) {
        let id = Object.assign({}, row).id;
        getDetailReformInfo(id).then(res => {
          this.editForm = res.data[0];

          this.dialogTitle = '编辑';
          this.dialogFormVisible = true;
        })
      },

      //提交修改
      changeSubmitInfo: function(){
        changeReformSubmitInfo(
          this.editForm.id,
          this.editForm.participate_type, //new

          this.editForm.project_name,
          this.editForm.project_number,
          this.editForm.type_child_id,
          this.editForm.rank_id,
          this.editForm.begin_year_month,
          this.editForm.mid_check_year_month,
          this.editForm.end_year_month,
          this.editForm.mid_check_rank,
          this.editForm.end_check_rank,
          this.editForm.subject,
          this.editForm.host_student,
          this.editForm.participate_student,
          this.editForm.remark,
          this.editForm.grade
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


      //改变状态
      handleChangeStatus: function (id, status) {
        changeStatus(id, status).then(res => {
          if (res.status == 'success') {
            this.reload();
            this.$message({
              message: '撤销提交成功',
              type: 'success'
            });
          }
        })
      },

      //审核通过
      passAudit: function (index, row) {
        passAudit(Object.assign({}, row).id).then(res => {
          if (res.status == 'success') {
            this.reload();
            this.$message({
              message: '审核通过，入库成功',
              type: 'success'
            });
          }
        })
      },

      //查找
      search: function () {
        searchBookInfo(this.search_type, this.search_value).then(res => {
          if (res.status == 'success') {
            this.tableData = res.data;
          }
        })
      },

      //显示变更记录 getChangeRecord, createChangeRecord
      getRecord: function (project_id) {
        getChangeRecord(project_id).then(res => {
          if (res.status == 'success') {
            this.recordTableData = res.data;
          }
        });
        this.recordDialogFormVisible = true;
      },

      //handle add
      handleAddRecord:function(){
        this.addRecordDialogFormVisible = true;
        this.recordEditForm.reason = '';
        this.recordEditForm.change_time = '';
        this.recordEditForm.describe = '';
      },
      //添加变更记录
      addRecord: function () {
        createChangeRecord(this.recordEditForm.project_id, this.recordEditForm.reason,
          this.recordEditForm.change_time, this.recordEditForm.describe).then( res => {
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.addRecordDialogFormVisible = false;
          } else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })
      },

    },

    mounted: function () {

      window.vue = this;

      //挂载项目信息
      getAllTeachReformInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })

      getProjectChildTypeOptins().then(res => {
        if (res.status == 'success') {
          this.projectChildTypeOptins = res.data;
        }
      })

      getProjectRankOptins().then(res => {
        if (res.status == 'success') {
          this.projectRankOptins = res.data;
        }
      })

    }

  }
</script>

<style scoped>

</style>
