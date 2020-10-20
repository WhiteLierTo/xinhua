<template>
  <div class="person-selector-container">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" v-model="tableThis">
      <el-button icon="el-icon-thumb" type="primary" slot="table-left" @click="selectPerson" :disabled="canSelect">
        选择
      </el-button>
      <userDialog slot="create" slot-scope="scope" :onClose="scope.onClose" :isSelectReporter=isSelectReporter />
    </tableWithFilter>
  </div>
</template>

<script>
import userDialog from '../../views/system/background-user/user-dialog'
export default {
  name: "personSelector",
  components: { userDialog },
  props: {
    onSelect: {
      type: Function,
      required: true,
    },
    userDataResource: String,
    isSingleChoice: Boolean,
    defaultQuery: Object,
    isSelectReporter: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    canSelect() {
      if (this.isSingleChoice) {
        // 单选
        return !(this.tableThis && this.tableThis.table && this.tableThis.table.multipleSelection && this.tableThis.table.multipleSelection.length === 1)
      }
      // 多选
      return !(this.tableThis && this.tableThis.table && this.tableThis.table.multipleSelection && this.tableThis.table.multipleSelection.length !== 0)
    }
  },

  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入用户名",
          submitName: "name"
        },
        {
          type: "input",
          placeholder: "请输入手机号",
          submitName: "mobile"
        }
      ],
      tableInfo: {
        searchUrl: this.userDataResource,
        defaultQuery: this.defaultQuery,
        noDivider: true,
        columns: [
          {
            prop: "name",
            label: "用户名"
          },
          {
            prop: "mobile",
            label: "手机号"
          },
        ],
        hides: this.isSelectReporter ? ["modify", "deleteAll"] : ["create", "modify", "deleteAll"],
        selectConfig: {
          singleChoice: this.isSingleChoice
        },

      },
      tableThis: null
    }
  },
  methods: {
    selectPerson() {
      if (this.isSingleChoice) {
        this.onSelect(this.tableThis.table.multipleSelection[0]);
      } else {
        this.onSelect(this.tableThis.table.multipleSelection);
      }
    }
  }
}
</script>

<style scoped lang='less'>
.person-selector-container {
  width: 100%;
  height: 70vh;
}
</style>
