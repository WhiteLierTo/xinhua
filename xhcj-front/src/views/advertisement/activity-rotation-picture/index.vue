<template>
  <div class="active-info-management">
    <tableWithFilter :tableInfo="tableInfo" :mock="false">
      <addPic slot="create" slot-scope="scope" :onClose="scope.onClose" />
      <addPic slot="modify" slot-scope="scope" :id="scope.row.id" :onClose="scope.onClose" />
    </tableWithFilter>
  </div>
</template>
<script>
import addPic from "./addPic";
export default {
  name: "startUp",
  components: {
    addPic
  },
  data() {
    return {
      tableInfo: {
        searchUrl: "/adv/list",
        defaultQuery: {
          advModel: 2,
        },
        deleteAllUrl: "/adv/del",
        columns: [
          {
            prop: "path",
            label: "图片",
            type: "image",
            imageWidth: 80,
            imageHeight: 80,
            path: row => row.path
          },
          {
            prop: "name",
            label: "广告名称"
          },
          {
            prop: "advModel",
            label: "广告样式",
            beforeDisplay: row => {
              if (row.advModel === 1) return 'app启动页'
              if (row.advModel === 2) return '官网活动轮播大图'
            }
          },
          {
            prop: "status",
            label: "状态",
            beforeDisplay: row => {
              if (row.status === 1) return '正常'
              if (row.status === 0) return '停用'
            }
          },


          {
            prop: "effectiveTime",
            label: "生效时间",
            beforeDisplay: row => {
              if (row.effectBeginTime && row.effectEndTime) {
                return this.$utils.format.timeStampToStandardStr(row.effectBeginTime) + '-' + this.$utils.format.timeStampToStandardStr(row.effectEndTime)
              }
            }
          },
          {
            prop: "isEffective",
            label: "是否生效",
            beforeDisplay: row => {
              if (row.status === 1) return '生效'
              if (row.status === 0) return '失效'
            }
          },

        ],
        operations: {
          delete: {
            show: true
          }
        }
      }
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "../../../style/config";
@import "../../../style/styles";

.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>