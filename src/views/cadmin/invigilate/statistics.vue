<template>
  <div class="app-container">

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">按时间段检索</span>
      <el-date-picker
        style="margin-left: 100px"
        value-format="timestamp"
        v-model="serchTimeRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <br><br>
    </div>

    <el-table :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)" style="width: 100%" border>

      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师姓名" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="教师工号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否在编" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.status == '1'">是</span>
          <span style="margin-left: 10px" v-if="scope.row.status == '0'">否</span>
          <span style="margin-left: 10px" v-if="scope.row.status != '1' && scope.row.status != '0'">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="监考次数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.invigilate_times }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="getDetail(scope.row.number)">详细监考信息</el-button>
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

      <el-table :data="detailTableData" style="width: 100%" border>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请教师姓名" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.apply_teacher_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="科目" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.subject }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试时间" width="110">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ format(scope.row.exam_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试地点" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="监考成员" >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.participate_teacher }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { getInvigilateStatisticsInfo, getDetailInvigilateStatisticsInfo, getInvigilateInfoByTimeSection
  } from "@/api/cadmin/invigilateStatistics";

  import {dateFormat} from "@/utils";

  export default {
    inject: ['reload'],
    name: "statistics",
    data() {
      return {

        //表单数据
        tableData: [],


        //翻页
        currentPage: 1,
        pageSize: 9,
        dialogFormVisible: false,

        //弹出框
        dialogTitle: '详细监考信息',
        formLabelWidth: '120px',

        //弹出显示框
        detailTableData: [],

        //时间范围查询
        serchTimeRange: '',

        //时间选择快捷菜单
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

      }
    },
    watch: {
      // 如果 `serchTimeRange` 发生改变，这个函数就会运行
      serchTimeRange: function (newStatus, oldStatus) {
        if(newStatus){
          getInvigilateInfoByTimeSection(newStatus[0], newStatus[1]).then(res => {
            this.tableData = res.data;
          })
        }

      }
    },

    methods: {
      //翻页
      handleCurrentChange(cpage){
        this.currentPage = cpage;
      },

      //格式化时间
      format: function (time) {
        return dateFormat(time)
      },

      //获得详细信息
      getDetail: function (teacherNumber) {
        getDetailInvigilateStatisticsInfo(teacherNumber).then(res => {
          this.detailTableData = res.data;
          this.dialogTitle = '详细监考信息';
          this.dialogFormVisible = true;
        })
      },


    },

    mounted: function () {
      //debug
      window.vue = this;

      //挂载基本信息
      getInvigilateStatisticsInfo().then(res => {
        if (res.status == 'success') {
          this.tableData = res.data;
        }
      })

    }

  }
</script>

<style scoped>

</style>
