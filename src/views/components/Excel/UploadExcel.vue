<!--
使用方式：（例子）
<upload-excel :columnConfig="ExcelColumnConfig" :uploadUrl="ExcelUploadUrl"/>

ExcelColumnConfig:[
    { name:"number", value:"教工号" },
    { name:"name", value:"姓名" },
    { name:"gender", value:"性别" },
    { name:"nationality", value:"民族" },
    { name:"birth_year_month", value:"出生年月" },
    { name:"college_id", value:"所在学院" },
    { name:"department_id", value:"所属教研室" }
     ]

ExcelUploadUrl: "/cadmin/teacher_info/add",

-->

<template>
  <div id="UploadExcel">

    <!-- 父类UploadExcel组件 -->
    <upload-excel-component :before-upload="excelBeforeUpload"  :on-success="excelHandleSuccess" />

    <div style="text-align: center; margin-top: 5px">
      <el-button class="filter-item" style="text-align: center;" type="success" icon="" @click="excelDialogVisible = true">导入数据预览</el-button>
    </div>


    <el-dialog title="导入数据预览" :visible.sync="excelDialogVisible" width="90%">

      <el-button class="filter-item" style="margin-left: 10px; text-align: center; float: right" type="success" icon="" @click="excelUploadData">批量导入数据</el-button>

      <p style="color: #F56C6C">提示：上传数据时，请按照如下格式，表头汉字要相同，预览到的数据将被上传。如果下面没有数据，可关掉当前窗口，在表格下方选择excel文件以导入数据</p>

      <span class="filter-item" style="margin-left: 0px; font-family: PingFang SC; font-size: 20px;">表格示例：</span>
      <el-table  border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of columnConfig" :label="item.value" :key="item.name"/>
      </el-table>

      <!--上传进度：<el-progress :text-inside="true" :stroke-width="24" :percentage="(excelUploadSuccessNumber/excelTableData.length)*100" status="success"></el-progress>-->

      <p>共有：<el-tag type="primary" size="mini" effect="dark">{{excelTableData.length}}</el-tag> 条数据</p>
      <p>上传成功： <el-tag type="success" size="mini" effect="dark">{{excelUploadSuccessNumber}}</el-tag> 条数据</p>
      <p>上传失败：<el-tag type="danger" size="mini" effect="dark">{{excelUploadErrNumber}}</el-tag> 条数据</p>

      <!-- 数据展示区域 -->
      <el-table :data="excelTableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of excelTableHeader" :key="item" :prop="item" :label="item" />
      </el-table>


    </el-dialog>


  </div>
</template>

<script type="text/javascript">
  import UploadExcelComponent from '@/components/UploadExcel/index.vue'; //导入数据

  //upload api
  import request from '@/utils/request'
  import store from "@/store";


  export default {
    name: "UploadExcel",
    components: { UploadExcelComponent }, //注册子组件
    props: {
      //配置项
      columnConfig:{
        //表单 [{name:"",value:""},{name:"",value:""}]
        type: Array,
        default: null
      },
      uploadUrl: {
        //上传的url
        type: String,
        default: ''
      },
    },
    data() {
      return {
        //从excel中读取的数据
        excelTableData: [],  //数据体
        excelTableHeader: [],  //数据头,只会用在展示。

        //弹出框
        excelDialogVisible: false,//excel dialog

        //上传工作
        excelUploadSuccessNumber: 0, //失败数量
        excelUploadErrNumber: 0, //成功数量
        excelUploadErrList: [],//上传出错的数据的列表

      }
    },

    //方法
    methods: {

      //excel上传数据前检测
      excelBeforeUpload(file) {
        //初始化 之前的数据清空：
        this.excelUploadSuccessNumber = 0;
        this.excelUploadErrNumber = 0;
        this.excelUploadErrList = [];

        const isLt1M = file.size / 1024 / 1024 < 1;
        if (isLt1M) {
          this.excelDialogVisible = true;
          return true;
        }
        this.$message({
          message: '请不要上传大于1M的excel文件',
          type: 'warning'
        });
        return false;
      },

      //数据读取成功后
      excelHandleSuccess({ results, header }) {
        this.excelTableData = results;
        this.excelTableHeader = header;
      },

      //上传按钮
      excelUploadData: function() {

        //重复确认
        this.$confirm('此操作将上传信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.excelTableData.forEach(item=>{
            //根据 columnConfig，从excelTableData中取数据。
            var uploadTempData = {};

            this.columnConfig.forEach(confItem=>{
              if(item[confItem.value] == undefined ){
                uploadTempData[confItem.name] = '';
              } else {
                uploadTempData[confItem.name] = item[confItem.value];
              }

            });
            //console.log(uploadTempData);

            //上传请求
            request({
              url: this.uploadUrl,
              method: "post",
              data: uploadTempData
            }).then(res => {
              if (res.status == 'success'){
                this.excelUploadSuccessNumber += 1;
              }else {
                //var tmplist =
                //errList =
                this.excelUploadErrNumber += 1;

              }
            });


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消上传'
            });
          });

        });
      },


    },

    mounted: function () {

    }


  }
</script>

<style>

</style>
