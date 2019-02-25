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
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit">添加教材</el-button>
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
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
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
          <el-button size="mini" @click="">编辑</el-button>
          <el-button size="mini" type="info" @click="getDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="deleteBookInfo(scope.$index, scope.row)">删除</el-button>
          <el-dropdown @command="">
            <el-button type="primary" size="mini" style="width: 90px;margin-left: 5px;">
              状态变更<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="!(scope.row.status == '未提交' && scope.row.status != '已审核')" @click.native="submit(scope.$index, scope.row)">提交</el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status == '未提交' || scope.row.status == '已审核'" @click.native="recallSubmit(scope.$index, scope.row)">撤回提交</el-dropdown-item>
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
      <el-form :model="editForm" size="small" disabled label-width="80px">
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
        <el-form-item label="教材版本" >
          <el-input v-model="editForm.version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版形式" >
          <el-input v-model="editForm.style" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教材级别" >
          <el-input v-model="editForm.rank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" >
          <el-input v-model="editForm.college" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="来源项目" >
          <el-input v-model="editForm.project" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-input v-model="editForm.status" auto-complete="off"></el-input>
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

        <el-form-item
          v-for="(teacher, index) in domains"
          :label="'参编教师' + (index+1)"
          :key="index"
        >
          <el-input v-model="teacher.value" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="提交教师" >
          <el-input v-model="editForm.teacher_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交时间" >
          <el-input auto-complete="off" :value="format(editForm.submit_time)"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getAllBookInfo, getDetailBookInfo, changeToSubmit, recallSubmit, deleteBookInfo, searchBookInfo} from "../../../api/normal/book";
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
            currentPage: 1,
            pageSize: 9,
            dialogFormVisible: false,
            dialogTitle: '编辑',
            formLabelWidth: '120px',
            editForm: {},
            teachers: '',
            domains: [],
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

        getBookInfo: function () {
          getAllBookInfo().then(res => {
            if (res.status == 'success') {
              console.log('success!');
              this.tableData = res.data;
            }
          })
        },

        getDetail: function (index, row) {
          let id = Object.assign({}, row).id;
          getDetailBookInfo(id).then(res => {
            this.editForm = res.data[0];
            this.teachers = res.data[0].authors.split(';');
            this.teachers = this.teachers.filter(function (teacher) {
              return !(teacher === '');
            });
            for (var i = 0; i < this.teachers.length; i++) {
              this.domains.push({
                value: this.teachers[i],
                key: Date.now()
              });
            }
            console.log(this.domains);
            this.dialogTitle = '详情';
            this.dialogFormVisible = true;
          })
        },

        submit: function (index, row) {
          changeToSubmit(Object.assign({}, row).id).then(res => {
            if (res.status == 'success') {
              this.reload();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
            }
          })
        },

        recallSubmit: function (index, row) {
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

        search: function () {
          searchBookInfo(this.search_type, this.search_value).then(res => {
            if (res.status == 'success') {
              this.tableData = res.data;
            }
          })
        }

      },

    mounted: function () {
      this.getBookInfo();
    }

    }
</script>

<style scoped>

</style>
