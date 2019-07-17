<template>
    <div id="test">
      test
      eg.： <name-select-multi list_title="教师姓名" tips="想要提示的内容" :name_list_array="name_list" v-model="select_name"></name-select-multi>
    </div>
</template>

<script type="text/javascript">
  import NameSelectMulti from '@/views/components/NameSelector/NameSelectMulti' //二次封装组件
    export default {
      name: "test",
      components: { NameSelectMulti },
      data(){
        return {
          select_name: '',
          name_list:[ "张三","李四","王五","冯六","陈七","王五",
            "冯六","陈七","王五","冯六","陈七","王五","冯六","陈七",
            "王五","冯六","陈七","王五","冯六","陈七","王五","冯六",
            "陈七","王五","冯六","陈七","1","2","3",123,2,
            "想要提示的内容","adsf","考虑到将来开发接口lads" ],
        }
      },

    }
</script>

<style>

</style>
