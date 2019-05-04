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
          <span style="margin-left: 10px" v-if="(scope.row.status == '2')">待审核</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '3')">已存档</span>
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
          <el-button size="mini" type="danger" @click="recallAudit(scope.$index, scope.row)" :disabled="(scope.row.status == '3')">审核退回</el-button>
          <el-button size="mini" type="primary" @click="passAudit(scope.$index, scope.row)" :disabled="(scope.row.status == '3')">审核通过</el-button>
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
          <el-input v-model="editForm.book_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材编号" >
          <el-input v-model="editForm.book_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版年月" >
          <el-input v-model="editForm.publish_time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材页数" >
          <el-input v-model="editForm.pages" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字数(千字)" >
          <el-input v-model="editForm.words" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" >
          <el-input v-model="editForm.isbn" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" >
          <el-input v-model="editForm.press" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材版本" >
          <el-input v-model="editForm.version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版形式" >
          <el-input v-model="editForm.style" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材级别" >
          <el-select v-model="editForm.rank_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in bookRankOptins"
              :label="item.rank_name + ' ( ' + item.id + ' ) ' "
              :key="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" >
          <el-input v-model="editForm.college" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="来源项目" >
          <el-input v-model="editForm.project" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-input v-model="editForm.status" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" >
          <a :href="editForm.cover_path" target="_blank"><img :src="editForm.cover_path" width="200px" height="200px"/></a>
        </el-form-item>
        <el-form-item label="版权页图片" >
          <a :href="editForm.copy_path" target="_blank"><img :src="editForm.copy_path" width="200px" height="200px"/></a>
        </el-form-item>
        <el-form-item label="内容图片" >
          <a :href="editForm.content_path" target="_blank"><img :src="editForm.content_path" width="200px" height="200px"/></a>
        </el-form-item>
        <el-form-item label="参编教师" >
          <el-input v-model="editForm.authors" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交教师" >
          <el-input v-model="editForm.teacher_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" >
          <el-input auto-complete="off" :value="format(editForm.submit_time)" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="授予时间" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.submit_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
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
  import {getAllTeachReformInfo, statusSearchTeachReform, getDetailReformInfo,
    changeStatus, changeReformSubmitInfo, searchReformInfo} from "@/api/cadmin/teachReform";

  import {getBookRankOptins} from "@/api/cadmin/optionInfo";
  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "teach_reform",
    data() {
      return {
        options: [
          {value: 'reform_name', label: '教改项目名称'},
          {value: 'teacher_name', label: '教师姓名'}
        ],

        //状态搜索：  已提交/待审批 3立项 4中期检查通过 5结题 6存档
        statusOptions: [
          {value: '0', label: '全部'},
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
        bookRankOptins: [],

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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      format: function (time) {
        return dateFormat(time)
      },

      //获得项目详细信息
      getDetail: function (index, row) {
        let id = Object.assign({}, row).id;
        getDetailReformInfo(id).then(res => {
          this.editForm = res.data;

          this.dialogTitle = '编辑';
          this.dialogFormVisible = true;
        })
      },

      //提交修改
      changeSubmitInfo: function(){
        changeSubmitInfo(this.editForm.id, this.editForm.book_name, this.editForm.book_number, this.editForm.publish_time,
          this.editForm.pages, this.editForm.words, this.editForm.isbn, this.editForm.press, this.editForm.version,
          this.editForm.style, this.editForm.rank_id, this.editForm.college, this.editForm.project,
          this.editForm.status, this.editForm.cover_path, this.editForm.copy_path, this.editForm.content_path,
          this.editForm.authors, ).then(res=>{
          if (res.status == 'success') {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.reload();
          }
        })
      },


      //撤回提交
      recallAudit: function (index, row) {
        recallSubmit(Object.assign({}, row).id).then(res => {
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
      }

    },

    mounted: function () {

      //挂载图书信息
      getAllTeachReformInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })



    }

  }
</script>

<style scoped>

</style>
