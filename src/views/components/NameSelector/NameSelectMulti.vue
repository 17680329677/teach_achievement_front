<!--
【名称按照字母分类组件---可选择多个名称】<通用版本！！>

使用说明：
eg.： <name-select-multi list_title="教师姓名" tips="想要提示的内容" :name_list_array="name_list" v-model="select_name"></name-select-multi>

:param list_title [String] “列表标题” eg. list_title="教师姓名"

:param tips [String] “想要提示的内容” eg. tips="这个表单只可选多个！"

:param name_list_array [Array] “姓名数组” eg. name_list = [ "张三","李四","王五","冯六","陈七" ]

:param value [Array] “v-model绑定返回的结果” eg. select_name = [ "张三","李四","王五"]
-->

<template>
  <div >

    <el-input @focus=" show_drop = true" :value="value" @input="handleInputChange" clearable></el-input>
    {{ value }}

    <div class="name_selector" :transfer="true" v-show="show_drop">
      <div>
            <div class="section_title">{{ list_title }}</div>

            <p v-if="tips.length > 0" style="font-size: 13px;color: #F56C6C">提示：{{ tips }}</p>

            <div class="name_content">
              <div v-if="!letter_names_list.length">
                {{empty_text}}
              </div>

              <template v-for="item in letter_names_list">
                <el-row>
                  <ul>
                  <label>{{item.ckey}}</label>
                  <li v-for="name in item.names" @click="handleNameSelect(name)" style="list-style: none">{{ name }}
                  </li>
                </ul>
                </el-row>


              </template>

            </div>

          <div style="margin-top: 10px">
            <el-button type="primary" plain @click="show_drop = false">取 消</el-button>
          </div>

      </div>
    </div>


  </div>
</template>

<script>
import pinyin from 'pinyin'

export default {
  name: 'NameSelectMulti',

  props: {
    list_title: {
      //“列表标题”
      type: String,
      default: '名称'
    },
    tips: {
      //“想要提示的内容””
      type: String,
      default: ''
    },
    name_list_array:{  //要被分割的名称数组 例如：name_list_array = [ "张三","李四","王五","冯六","陈七" ]
      //“名称数组”
      type: Array,
      default: ()=>[],
    },
    empty_text: {
      type: String,
      default: '暂无数据',
    },

  },
  data () {
    return {
      show_drop: false, //下拉菜单显示
      value: '', //点击填入input中的值
    }
  },
  watch: {
    value: function () {

    }
  },
  computed: {
    //姓名解析  将["***","***","***",......]  =>  [{ckey:'',names:''},{ckey:'',names:''},{ckey:'',names:''},.......]
    //letter_names_list  显示时所用的list
    letter_names_list: function () {
      let letter_names = []
      let res = {}
      // 分割
      this.name_list_array.forEach((item, index) => {
        let py = pinyin(item, {
            style: pinyin.STYLE_FIRST_LETTER
          }
        )
        let ckey = '#'
        if (py.length) {
          if (py[0].length) {
            ckey = (py[0][0][0]).toUpperCase()
          }
        }
        if (!res.hasOwnProperty(ckey)) {
          res[ckey] = []
        }
        res[ckey].push(item)
      })

      Object.keys(res).forEach((key) => {
        letter_names.push({
          'ckey': key,
          'names': res[key]
        })
      })
      return letter_names
    }
  },
  methods: {
    //输入绑定
    handleInputChange (value) {

      //未完善！！！
      console.log("输入的值="+value)

      let tempVal = ''
      tempVal = value
      while (tempVal.indexOf("，") != -1) {   //替换掉中文逗号
        tempVal = tempVal.replace("，", ",")
      }
      while (tempVal.indexOf(",,") != -1) {  //替换双逗号
        tempVal = tempVal.replace(",," , ",")
      }

      this.value = tempVal

      this.$emit('input', this.value)

    },

    //姓名选择事件绑定
    handleNameSelect (name) {
      this.value += ( name+"," )
      this.show_drop = false
      this.$emit('input', this.value)
    },

  },

  created () {
    window.vue = this;
  }

}
</script>

<style lang="scss" scoped>
  .name_selector {
    position: absolute;
    box-shadow: 0 0 4px 0 rgba(117, 117, 117, 0.5);
    border-radius: 2px;
    padding: 20px 21px;
    z-index: 10000;
    background-color: #fff;
  }

  .name_content {
    height: 430px ;
    width: 430px;
    overflow: scroll;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 13px 0 13px;
    ul{
      padding-left: 0px;
    }
    label {
      display: block;
      margin-bottom: 5px !important;
      font-size: 20px !important;
      margin-left: 0 !important;
      color: #5f5f5f !important;
      margin-top: 5px;
    }
    li {
      padding: 6px 0 6px;
      float: left;
      text-align: left;
      font-size: 14px;
      min-width: 56px;
      margin-right: 24px;
      cursor: pointer;
      list-style: none;
    }
  }

  .section_title {
    color: #348EED;
    font-weight: bold;
    font-size: large;
  }

</style>
