<template>

  <div class="app-container">
    <div class="filter-container">
      <!--<el-input :placeholder="筛选"  style="width: 200px;" class="filter-item" />-->
      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <br/><br/>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级名称" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="年级" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.grade }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger"  @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
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


    <!--  隐藏部分----------------------------------------------------------------------  -->

    <!-- 基本信息编辑框 begin -->
    <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">

        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.class_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-input v-model="editForm.grade" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="editForm.status" auto-complete="off"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基本信息编辑框 end -->



  </div>


</template>

<script>
  import { getClassInfo, addClassInfo, delClassInfo } from '@/api/cadmin/classInfo';

  export default {
    inject: ['reload'],
    name: "class_info",
    //数据展示
    data() {
      return {
        //加载显示数据组
        tableData: [],  //首次加载 主页表格中要显示的数据

        //页号
        currentPage: 1,
        pageSize: 9,

        //隐藏框
          //基本信息
        dialogFormVisible: false,
        dialogTitle: '添加',
        formLabelWidth: '120px',

        //提交的数据组
        editForm: {
          id: '',
          class_name: '', //班级名称
          grade: '', //年级
          status: '',//状态（有效无效的标志）
        },

      }
    },
    //方法
    methods: {
      //---------------------------相关信息显示---------------------------
      //同步页面
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      //---------------------------基本信息操作--------------------------
      //添加
      handleAdd: function() {
        this.editForm = {
            id: '',
            class_name: '', //班级名称
            grade: '', //年级
            status: '',//状态（有效无效的标志）
        },
        this.dialogFormVisible = true;
        this.dialogTitle = '添加';
      },

      //添加
      addInfo: function () {
        addClassInfo(this.editForm.class_name, this.editForm.grade, this.editForm.status).then(res => {
          if (res.status == 'success'){
            this.dialogFormVisible = false;
            this.$message({
              message: res.reason,
              type: 'success'
            });
            this.reload();
          }else {
            this.$message({
              message: res.reason,
              type: 'warning'
            });
          }
        })
      },


      //删除
      deleteInfo: function(index, row) {
        this.editForm = Object.assign({}, row)
        this.$confirm('此操作将永久删除班级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delClassInfo(this.editForm.id).then(res => {
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


    },

    mounted: function () {

      window.vue = this;

      //挂载页面中Table的数据
      getClassInfo().then(res => {
        this.tableData = res.data;

      });

    }
  }
</script>

<style scoped>

</style>
