<template>
  <div class="app-container">
    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 30px;">分流配置</span>
    </div>
    <br><br>

    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">请选择开放时间段：</span>
    </div>
    <br>
    <div class="filter-container">
      <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;"></span>
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
    <div class="filter-container" style="width: 60%">
        <span class="filter-item" style="font-family: PingFang SC; font-size: 20px;">请添加分流方向和人数限制：</span>
        <el-button type="primary" style="margin-left: 10px; text-align: center; float: right" icon="el-icon-search" @click="addPostConfig">添加</el-button>
    </div>
    <br><br>
    <div class="filter-container" v-for="config in directionConfig" >
      分流方向：<el-input v-model="config.direction" placeholder="分流方向"  style="width: 200px; margin-left: 20px" class="filter-item" ></el-input>
      人数上线：<el-input v-model="config.max_people" placeholder="人数上线"  style="width: 200px; margin-left: 20px" class="filter-item" ></el-input>
    </div>
    <br><br>
    <div class="filter-container">
      学生可填的志愿数目：
      <el-input-number v-model="directionNumber" @change="" :min="1" label="学生可填的志愿数目"></el-input-number>
    </div>
    <br><br>
    <div class="filter-container" >
      <el-button type="primary" style="margin-left: 10px; text-align: center; width: 300px" icon="" @click="">确认配置</el-button>
    </div>



  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: "config",

    data() {
      return {
        fileList: [],
        serchTimeRange: [],

        directionConfig:[{
          direction: '',
          max_people: '',
        }],
        directionNumber: '',


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

      addPostConfig: function (){
        this.directionConfig.push({
          direction: '',
          max_people: '',
        })
      }

    },
    mounted: function () {

      //debug
      window.vue = this;

    }

  }
</script>

<style scoped>

</style>
