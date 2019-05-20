<template>
  <div class="app-container">

    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <span class="filter-item" style="margin-left: 350px; font-family: PingFang SC; font-size: 25px;">检索</span>
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
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleCreate">添加教材</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教材名称" width="150">
        <template slot-scope="scope">
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
          <span style="margin-left: 10px" v-if="(scope.row.status == '1')">未提交</span>
          <span style="margin-left: 10px" v-if="(scope.row.status == '2')">已提交</span>
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status != 1">编辑</el-button>
          <el-button size="mini" type="info" @click="getDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-dropdown @command="">
            <el-button type="primary" size="mini" style="width: 90px;margin-left: 5px;">
              状态变更<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="scope.row.status == '2'" @click.native="changeSubmit(scope.row.id, '2')">提交</el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status == '1'" @click.native="changeSubmit(scope.row.id, '1')">撤回提交</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      <el-form :model="editForm" size="small" :disabled="ifdisable" label-width="80px">
        <el-form-item label="教材名称">
          <el-input v-model="editForm.book_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材编号" >
          <el-input v-model="editForm.book_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者顺序" >
          <el-input v-model="editForm.order" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版年月" >
          <div class="block">
            <el-date-picker
              value-format="timestamp"
              v-model="editForm.publish_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
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
        <el-form-item label="教材级别">
          <el-select v-model="editForm.rank_id" placeholder="请选择" class="filter-item">
            <el-option
              v-for="item in bookRankOptins"
              :label="item.rank_name"
              :key="item.id"
              :value="item.id"

            ></el-option>
          </el-select>
          已选择：{{ editForm.rank }}
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="dialogTitle == '编辑'" @click="changeSubmitInfo">修 改 信 息</el-button>
        <el-button type="primary" v-if="dialogTitle == '创建'" @click="createInfo">创 建</el-button>
        <el-button type="" @click="dialogFormVisible = false, ifdisable = true">返 回</el-button>
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
  import {getAllBookInfo, getDetailBookInfo, changeSubmitInfo, createItemInfo,
    changeBookStatus, deleteBookInfo,
    searchBookInfo} from "../../../api/normal/book";
  import {getBookRankOptins} from "@/api/normal/optionInfo";
  import {deleteFile} from "@/api/common/index";
  import {dateFormat} from "../../../utils";

  export default {
      inject: ['reload'],
      name: "list",
      data() {
          return {
            options: [{
              value: 'book_name',
              label: '教材名称'
            }, {
              value: 'status',
              label: '状态'
            }],

            search_type: '',
            search_value: '',
            tableData: [],
            bookRankOptins: [],

            currentPage: 1,
            pageSize: 9,

            dialogFormVisible: false,
            dialogTitle: '详情',
            formLabelWidth: '120px',

            editForm: {
                id: '',
                book_name: '',
                book_number: '',
                order:'',
                publish_time: '',
                pages: '',
                words: '',
                isbn: '',
                press:'',
                press:'',
                version: '',
                style: '',
                rank_id: '',
                college: '',
                project: '',
                status: '',
                cover_path: '',
                copy_path: '',
                content_path: '',
                authors: '',
            },

            teachers: '',
            domains: [],
            ifdisable: true,//编辑和查看的切换

            //文件上传
            fileUploadUrl: process.env.FILE_UPLOAD_URL,
            fileVisitUrl: process.env.FILE_VISIT_URL,
            imgFormUrl: '',
            imgFormVisible: false,

            imgObj : '', //
            cover_path_img: [
              //{name: '1.png', url: this.fileVisitUrl +'1.png' }
            ],
            copy_path_img: [],
            content_path_img: [],

          }
      },

      methods: {

        //添加
        handleCreate(){
            this.dialogTitle = '创建';
            this.ifdisable = false;
            this.editForm = {
              id: '',
              book_name: '',
              book_number: '',
              order:'',
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
              cover_path: '',
              copy_path: '',
              content_path: '',
              authors: '',
            };
          this.cover_path_img = [];
          this.copy_path_img = [];
          this.content_path_img = [];
          this.dialogFormVisible = true;

        },
        createInfo(){
          createItemInfo( this.editForm.book_name,
                          this.editForm.book_number,
                          this.editForm.order,
                          this.editForm.publish_time,
                          this.editForm.pages,
                          this.editForm.words,
                          this.editForm.isbn,
                          this.editForm.press,
                          this.editForm.version,
                          this.editForm.style,
                          this.editForm.rank_id,
                          this.editForm.project,
                          this.editForm.cover_path,
                          this.editForm.copy_path,
                          this.editForm.content_path,
                          this.editForm.authors
          ).then(res=>{
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


        //编辑
        handleEdit(index, row) {
          let id = Object.assign({}, row).id;
          getDetailBookInfo(id).then(res => {
            this.editForm = res.data[0];

            //挂载图片显示
            if(this.editForm.cover_path){
              console.log('cover_patho ok');
              this.cover_path_img = [ {name: this.editForm.cover_path, url: this.fileVisitUrl + this.editForm.cover_path } ]
            }
            if(this.editForm.copy_path){
              this.copy_path_img = [ {name: this.editForm.copy_path, url: this.fileVisitUrl + this.editForm.copy_path } ]
            }
            if(this.editForm.content_path){
              this.content_path_img = [ {name: this.editForm.content_path, url: this.fileVisitUrl + this.editForm.content_path } ]
            }

            this.dialogTitle = '编辑';
            this.dialogFormVisible = true;
            this.ifdisable = false;
          })
        },

        //删除图书
        handleDelete(id) {
          deleteBookInfo(id).then(res => {
            if (res.status == 'success') {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.reload();
            }
          })
          console.log(index, row);
        },


        //翻页
        handleCurrentChange(cpage){
          this.currentPage = cpage;
        },

        format: function (time) {
          return dateFormat(time)
        },


        //获得图书详情信息
        getDetail: function (index, row) {
          let id = Object.assign({}, row).id;
          getDetailBookInfo(id).then(res => {
            this.editForm = res.data[0];

            //挂载图片显示
            if(this.editForm.cover_path){
              console.log('cover_patho ok');
              this.cover_path_img = [ {name: this.editForm.cover_path, url: this.fileVisitUrl + this.editForm.cover_path } ]
            }
            if(this.editForm.copy_path){
              this.copy_path_img = [ {name: this.editForm.copy_path, url: this.fileVisitUrl + this.editForm.copy_path } ]
            }
            if(this.editForm.content_path){
              this.content_path_img = [ {name: this.editForm.content_path, url: this.fileVisitUrl + this.editForm.content_path } ]
            }

            this.ifdisable = true;
            this.dialogTitle = '详情';
            this.dialogFormVisible = true;
          })
        },

        //提交图书信息修改修改
        changeSubmitInfo: function(){
          changeSubmitInfo(
            this.editForm.id,
            this.editForm.book_name,
            this.editForm.book_number,
            this.editForm.order,
            this.editForm.publish_time,
            this.editForm.pages,
            this.editForm.words,
            this.editForm.isbn,
            this.editForm.press,
            this.editForm.version,
            this.editForm.style,
            this.editForm.rank_id,
            this.editForm.college,
            this.editForm.project,
            this.editForm.cover_path,
            this.editForm.copy_path,
            this.editForm.content_path,
            this.editForm.authors ).then(res=>{
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
          changeBookStatus(id, status).then(res => {
            if (res.status == 'success') {
              this.reload();
              this.$message({
                message: '执行成功',
                type: 'success'
              });
            }
          })
        },

        //删除书籍信息
        deleteBookInfo: function (index, row) {
          this.editForm = Object.assign({}, row)
          this.$confirm('此操作将永久删除此教材信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteBookInfo(this.editForm.id).then(res => {
              if (res.status == 'success'){
                this.$message({
                  message: '删除成功！',
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

        //获得图书基本信息
        getAllBookInfo().then(res => {
          if (res.status == 'success') {
            console.log('success!');
            this.tableData = res.data;
          }
        })

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
