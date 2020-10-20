<template>
  <div class="person-selector-container">
    <tableWithFilter :filtersInfo="filtersInfo" :tableInfo="tableInfo" v-model="tableThis">
      <el-button icon="el-icon-thumb" type="primary" slot="table-left" @click="selectPerson"
                 :disabled="!(tableThis && tableThis.table && tableThis.table.multipleSelection && tableThis.table.multipleSelection.length === 1)">
        选择
      </el-button>
    </tableWithFilter>
  </div>
</template>

<script>
  export default {
    name: "personSelector",
    props: {
      onSelect: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入财经号名称",
            submitName: "organizeName"
          }

        ],
        tableInfo: {
          searchUrl: "/cjh/list",
          defaultQuery: {
            isCjhHide: 1
          },
          noDivider: true,
          columns: [
            {
              prop: "name",
              label: "机构名称"
            },

          ],

          hides: ["create", "modify", "deleteAll"],
          selectConfig: {
            singleChoice: true
          }
        },
        tableThis: null
      }
    },
    methods: {
      selectPerson() {
        this.onSelect(this.tableThis.table.multipleSelection[0]);
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
