<template>
  <div class="app-container">

    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <span class="filter-item" style="font-family: PingFang SC; font-size: 25px;">教师姓名、书籍名称检索：</span>
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
      <!--<el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit">添加教材</el-button>-->
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
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教材名称" width="150">
        <template slot-scope="scope" >
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.book_name }}</p>
            <p>ISBN: {{ scope.row.isbn }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.book_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="教材编号" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.book_number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="ISBN" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isbn }}</span>
        </template>
      </el-table-column>

      <el-table-column label="出版社" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.press }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教材级别" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.book_rank }}</span>
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
          <el-button size="mini" type="danger" @click="changeSubmit(scope.row.id, '1')" :disabled="(scope.row.status == '3')">审核退回</el-button>
          <el-button size="mini" type="primary" @click="changeSubmit(scope.row.id, '3')" :disabled="(scope.row.status == '3')">审核通过</el-button>
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

    <!-- 信息弹出框 -->
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
              :label="item.rank_name"
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
          图片名称：{{editForm.cover_path}}
          <el-upload
            class = "upload-demo"
            :action = "fileUploadUrl"
            :on-preview = "handlePreview"
            :on-success = "coverHandleSuccess"
            :on-remove = "coverHandleRemove"
            :multiple = "false"
            :limit = "1"
            :file-list="cover_path_img"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，上传或删除图片后点击提交按钮才能更新</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="版权页图片" >
          图片名称：{{editForm.copy_path}}
          <el-upload
            class = "upload-demo"
            :action = "fileUploadUrl"
            :on-preview = "handlePreview"
            :on-success = "copyHandleSuccess"
            :on-remove = "copyHandleRemove"
            :multiple = "false"
            :limit = "1"
            :file-list="copy_path_img"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，上传或删除图片后点击提交按钮才能更新</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="内容图片" >
          图片名称：{{editForm.content_path}}
          <el-upload
            class = "upload-demo"
            :action = "fileUploadUrl"
            :on-preview = "handlePreview"
            :on-success = "contentHandleSuccess"
            :on-remove = "contentHandleRemove"
            :multiple = "false"
            :limit = "1"
            :file-list="content_path_img"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，上传或删除图片后点击提交按钮才能更新</div>
          </el-upload>
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


    <!-- 图片预览弹出框 -->
    <el-dialog title="预览" :visible.sync="imgFormVisible">
      <img
        :src="imgFormUrl"
        style="width: 100%"
      ></img>
      <div slot="footer" class="dialog-footer">
        <el-button @click="imgFormVisible = false,imgFormUrl = '' ">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getAllBookInfo, getDetailBookInfo, changeBookSubmit, searchBookInfo, changeSubmitInfo,statusSearchBook} from "@/api/cadmin/book";
  import {getBookRankOptins} from "@/api/cadmin/optionInfo";
  import {deleteFile} from "@/api/common/index";
  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "book",
    data() {
      return {
        options: [
          {value: 'book_name', label: '教材名称'},
          {value: 'teacher_name', label: '教师姓名'}
        ],
        statusOptions: [
          {value: '0', label: '全部'},
          {value: '2', label: '待审批'},
          {value: '3', label: '已存档'},
        ],

        //搜索
        search_type: '',
        search_value: '',
        searchStatus: '',

        //表单数据
        tableData: [],
        bookRankOptins: [],

        //翻页
        currentPage: 1,
        pageSize: 9,

        //弹出框
        dialogFormVisible: false,
        dialogTitle: '编辑',
        formLabelWidth: '120px',

        imgFormVisible: false,
        imgFormUrl: '',

        //编辑框
        editForm: {
          id: '',
          book_name: '',
          book_number: '',
          publish_time: '',
          pages: '',
          words: '',
          isbn: '',
          press:'',
          version: '',
          style: '',
          rank_id: '',
          college: '',
          project: '',
          status: '',
          cover_path: '',   //图片
          copy_path: '',    //图片
          content_path: '', //图片
          authors: '',
        },
        teachers: '',
        domains: [],

        //文件上传
        fileUploadUrl: process.env.FILE_UPLOAD_URL,
        fileVisitUrl: process.env.FILE_VISIT_URL,

        imgObj : '', //
        cover_path_img: [
          //{name: '1.png', url: this.fileVisitUrl +'1.png' }
          ],
        copy_path_img: [],
        content_path_img: [],

      }
    },
    watch: {
      // 如果 `searchStatus` 发生改变，这个函数就会运行
      searchStatus: function (newStatus, oldStatus) {
        if(newStatus){
          statusSearchBook(newStatus).then(res => {
            this.tableData = res.data;
          })
        }
      }


    },

    methods: {

      //文件操作功能
      //文件预览
      handlePreview(file) {
        this.imgFormUrl = this.fileVisitUrl + file.name;
        console.log("PreviewFile:" + this.imgFormUrl);
        this.imgFormVisible = true;
      },

      //文件删除
      handleRemove(file, fileList) {
        console.log("deleteFile:" + file.name);
        var type = ''
        deleteFile(file.name).then(res=>{
          type = res.status;
          if (res.status == 'success'){
            this.$message({
              message: res.reason,
              type: 'success'
            });
          } else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })
        return type
      },
      coverHandleRemove(file, fileList){
        let res = this.handleRemove(file, fileList);
        file.name = '';
        file.url = '';
        this.editForm.cover_path = '';//上传
      },
      copyHandleRemove(file, fileList){
        let res = this.handleRemove(file, fileList);
        file.name = '';
        file.url = '';
        this.editForm.copy_path = '';//上传
      },
      contentHandleRemove(file, fileList){
        let res = this.handleRemove(file, fileList);
        file.name = '';
        file.url = '';
        this.editForm.content_path = '';//上传
      },


      //当文件上传成功后
      handleSuccess(response, file, fileList){
        var type = ''
        if (response.status == 'success'){
          type = response.status;
          this.$message({
            message: response.reason,
            type: 'success'
          });
        } else {
          this.$message({
            message: response.reason,
            type: 'warning'
          });
        }
        return type;
      },
      coverHandleSuccess(response, file, fileList){
        var res = this.handleSuccess(response, file, fileList);
        if (res == 'success'){
          file.name = response.data;
          file.url = this.fileVisitUrl + response.data;
          this.editForm.cover_path = response.data;//上传
        }
      },
      copyHandleSuccess(response, file, fileList){
        var res = this.handleSuccess(response, file, fileList);
        if (res == 'success'){
          file.name = response.data;
          file.url = this.fileVisitUrl + response.data;
          this.editForm.copy_path = response.data;//上传
        }
      },
      contentHandleSuccess(response, file, fileList){
        var res = this.handleSuccess(response, file, fileList);
        if (res == 'success'){
          file.name = response.data;
          file.url = this.fileVisitUrl + response.data;
          this.editForm.content_path = response.data;//上传
        }
      },




      //表单编辑
      handleEdit(index, row) {
        console.log(index, row);
      },

      //表单删除
      handleDelete(index, row) {
        console.log(index, row);
      },

      //翻页
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      //格式化时间显示
      format: function (time) {
        return dateFormat(time)
      },

      //获得图书详细信息
      getDetail: function (index, row) {
        let id = Object.assign({}, row).id;
        getDetailBookInfo(id).then(res => {
          this.editForm = res.data[0];

          //挂载图片显示
          if(this.editForm.cover_path){
            this.cover_path_img = [ {name: this.editForm.cover_path, url: this.fileVisitUrl + this.editForm.cover_path } ]
          }
          if(this.editForm.copy_path){
            this.copy_path_img = [ {name: this.editForm.copy_path, url: this.fileVisitUrl + this.editForm.copy_path } ]
          }
          if(this.editForm.content_path){
            this.content_path_img = [ {name: this.editForm.content_path, url: this.fileVisitUrl + this.editForm.content_path } ]
          }

          console.log(this.domains);
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


      //改变状态
      changeSubmit: function (id, status) {
        changeBookSubmit(id, status).then(res => {
          if (res.status == 'success') {
            this.reload();
            this.$message({
              message: '执行成功',
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

      window.vue = this;

      //挂载图书信息
      getAllBookInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })

      //教材等级选项
      getBookRankOptins().then(res=>{
        if (res.status == 'success') {
          this.bookRankOptins = res.data;
        }
      })


    }

  }
</script>

<style scoped>

</style>
