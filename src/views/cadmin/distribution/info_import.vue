<template>
  <div class="app-container">

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 25px;">信息导入：</span>
    </div>
    <br>

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">请指定此批学生用户的有效时间：</span>

      <div class="block">
        <el-date-picker
          v-model="serchTimeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>

    <br><br><br>

    <div class="filter-container">
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
    </div>






  </div>
</template>

<script>
    export default {
      inject: ['reload'],
      name: "info_import",

      data() {
        return {
          fileList: [],
          serchTimeRange: [],

        }
      },
      watch: {
        // 如果 `serchTimeRange` 发生改变，这个函数就会运行
        serchTimeRange: function (newStatus, oldStatus) {
          if(newStatus){
            /*getInvigilateInfoByTimeSection(newStatus[0], newStatus[1]).then(res => {
              this.tableData = res.data;
            })*/
          }

        }
      },
      methods: {
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        }
      }
    }
</script>

<style scoped>

</style>
