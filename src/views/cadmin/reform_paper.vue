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

      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit">添加教材</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教改论文名称" width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.paper_name }}</p>
            <p>论文编号: {{ scope.row.paper_number }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.paper_name }}</el-tag>
            </div>
          </el-popover>
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

      <el-table-column label="提交时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ format(scope.row.publish_year_month) }}</span>
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
        <el-form-item label="教材名称">
          <el-input v-model="editForm.paper_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材编号" >
          <el-input v-model="editForm.paper_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属教师" >
          <el-input v-model="editForm.teacher_name" auto-complete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属教师工号" >
          <el-input v-model="editForm.teacher_number" auto-complete="off"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="第几作者" >
          <el-input v-model="editForm.order" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="期刊名称" >
          <el-input v-model="editForm.journal_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="论文发表日期" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.publish_year_month"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="期刊年号" >
          <el-input v-model="editForm.journal_year" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="期刊期号" >
          <el-input v-model="editForm.journal_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="期刊卷号" >
          <el-input v-model="editForm.journal_volum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-input v-model="editForm.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="来源项目" >
          <el-input v-model="editForm.source_project" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" >
          <a :href="editForm.cover_path" target="_blank"><img :src="editForm.cover_path" width="200px" height="200px"/></a>
        </el-form-item>
        <el-form-item label="内容图片" >
          <a :href="editForm.content_path" target="_blank"><img :src="editForm.content_path" width="200px" height="200px"/></a>
        </el-form-item>
        <el-form-item label="论文路径" >
          <a :href="editForm.text_path" target="_blank"><img :src="editForm.content_path" width="200px" height="200px"/></a>
        </el-form-item>
        <el-form-item label="中国知网链接" >
          <el-input v-model="editForm.cnki_url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与人员" >
          <el-input v-model="editForm.participate_teacher" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeSubmitInfo">提 交 修 改</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getAllReformPaperInfo, getDetailReformPaperInfo, changeSubmitInfo, reformPaperChangeStatus,
    statusSearchReformPaper, searchReformPaperInfo} from "@/api/cadmin/reformPaper";

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "reform_paper",
    data() {
      return {
        options: [
          {value: 'reform_name', label: '教改论文名称'},
          {value: 'teacher_name', label: '教师姓名'}
        ],

        //状态搜索：  已提交/待审批 （、2提交/待审核、3存档/已审核）
        statusOptions: [
          {value: '0', label: '全部'},
          {value: '2', label: '待审核'},
          {value: '3', label: '已审核'},
        ],

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
          paper_name: '',
          paper_number: '',
          journal_name: '',
          publish_year_month: '',
          journal_year: '',
          journal_number: '',
          college_id: '',
          journal_volum: '',
          status: '',
          source_project: '',
          cover_path: '',
          content_path: '',
          text_path: '',
          cnki_url: '',
          participate_teacher: '',
        },


      }
    },
    watch: {
      // 如果 `searchStatus` 发生改变，这个函数就会运行
      searchStatus: function (newStatus, oldStatus) {
        if(newStatus){
          statusSearchReformPaper(newStatus).then(res => {
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
        getDetailReformPaperInfo(id).then(res => {
          this.editForm = res.data[0];

          this.dialogTitle = '编辑';
          this.dialogFormVisible = true;
        })
      },

      //提交修改
      changeSubmitInfo: function(){
        changeSubmitInfo(
          this.editForm.id,
          this.editForm.order,
          this.editForm.paper_name,
          this.editForm.paper_number,
          this.editForm.journal_name,
          this.editForm.publish_year_month,
          this.editForm.journal_year,
          this.editForm.journal_number,
          this.editForm.college_id,
          this.editForm.journal_volum,
          this.editForm.status,
          this.editForm.source_project,
          this.editForm.cover_path,
          this.editForm.content_path,
          this.editForm.text_path,
          this.editForm.cnki_url,
          this.editForm.participate_teacher
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
        reformPaperChangeStatus(id,status).then(res => {
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
        searchReformPaperInfo(this.searchType, this.searchValue).then(res => {
          if (res.status == 'success') {
            this.tableData = res.data;
          }
        })
      }

    },

    mounted: function () {

      //挂载基本信息
      getAllReformPaperInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })



    }

  }
</script>

<style scoped>

</style>
