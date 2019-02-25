<template>

  <div class="app-container">
    <el-steps :active="activeId" style="width: 82%!important;">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      <el-step title="步骤 4" icon="el-icon-picture"></el-step>
    </el-steps>

    <div v-show="activeId === 1">
      <el-form ref="step1" label-width="80px" >
        <el-form-item label="名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>

  </div>


</template>

<script>
    export default {
      name: "create",
      data() {
          return {
            activeId: 2,
            visualable: false
          }
      }
    }
</script>

<style scoped>

</style>
