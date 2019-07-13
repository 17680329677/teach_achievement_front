<!--
使用方法（例子）：
<export-excel :columnConfig="ExcelColumnConfig" :exportUrl="ExcelExportUrl"/>

ExcelColumnConfig:[
    { name:"number", value:"教工号" },
    { name:"name", value:"姓名" },
    { name:"gender", value:"性别" },
    { name:"nationality", value:"民族" },
    { name:"birth_year_month", value:"出生年月" },
    { name:"college_id", value:"所在学院" },
    { name:"department_id", value:"所属教研室" }
     ]

ExcelExportUrl: "/cadmin/teacher_info/get",

-->
<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />

      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">
        导出数据
      </el-button>

    </div>

  </div>
</template>

<script>
//export api
import request from '@/utils/request'
import store from "@/store";


import { parseTime } from '@/utils'
// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  props: {
    //配置项
    columnConfig:{
      //表单 [{name:"",value:""},{name:"",value:""}]
      type: Array,
      default: null
    },
    exportUrl: {
      //导出的url
      type: String,
      default: ''
    },
  },
  data() {
    return {
      list: null,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      request({
        url: this.exportUrl,
        method: "post",
        data:{
          "token": store.getters.token
        }
      }).then(res => {
        this.list = res.data
      })

    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']  //显示字段
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']   //对应数据库字段
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
