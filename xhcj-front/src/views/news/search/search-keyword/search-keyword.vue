<template>
  <div class="search-keyword-container">
    <tableWithFilter
        :filtersInfo="filtersInfo"
        :tableInfo="tableInfo"
    >
      <CMSearchKeyword slot="create" slot-scope="scope" :onClose="scope.onClose"></CMSearchKeyword>
      <CMSearchKeyword slot="modify" slot-scope="scope" :onClose="scope.onClose" :detail="scope.row"
                       :isModify="true"></CMSearchKeyword>
    </tableWithFilter>
  </div>
</template>

<script>
  import CMSearchKeyword from "./CM-search-keyword"

  export default {
    // 搜索关键词
    name: "searchKeyword",
    components: {CMSearchKeyword},
    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入关键词",
            submitName: "keyword"
          },
          {
            type: "select",
            placeholder: "请选择标签",
            options: [{label: "最新", value: 1}, {label: "最热", value: 2}],
            submitName: "lable"
          },
          {
            type: "dateRange",
            placeholder: ["创建开始时间", "创建结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["beginTime", "endTime"]
          }
        ],
        tableInfo: {
          searchUrl: "/searchKeyword/list",
          deleteAllUrl: "/searchKeyword/del",

          columns: [
            {
              prop: "keyword",
              label: "关键词组"
            },
            {
              prop: "lable",
              label: "标签",
              beforeDisplay: row => row.lable === 1 ? '最新' : row.lable === 2 ? '最热' : ''

            },
            {
              prop: "createTime",
              label: "创建时间",
              beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.createTime)
            }
          ],
          hides: [],
        },

      };
    },

    methods: {}
  };
</script>

<style scoped lang="less">
  @import "../../../../style/config";
  @import "../../../../style/styles";

  .search-keyword-container {
    width: 100%;
    height: 100%;
    position: relative;

    .QRCode-container {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      .flexCenter();

      .QRCode-inner {
        width: 588px;
        display: flex;
        flex-direction: column;

        .close-icon {
          font-size: 30px;
          color: white;
          margin-left: auto;
          margin-bottom: @defaultPaddingY;
          cursor: pointer;
        }

        .QRCode-card {
          width: 100%;
          height: 540px;
          background: white;
          .flexCenter();
          flex-direction: column;
          padding: 50px;

          .selections-row {
            margin-bottom: 10px;
            margin-top: auto;
            .flexCenter();

            .selection {
              width: 80px;
              height: 30px;
              border-radius: 5px;
              border: 1px solid black;
              color: rgba(51, 51, 51, 1);
              .flexCenter();
              margin-right: 20px;
              cursor: pointer;

              &:last-child {
                margin-right: 0;
              }
            }

            .selection-active {
              background: rgba(67, 131, 228, 0.1);
              border-color: rgba(67, 131, 228, 1);
            }
          }

          .input-container {
            width: 105px;
            margin-bottom: 30px;
            .flexCenter();
            margin-left: 25px;
          }

          .QR-inner-container {
            width: 100%;
            flex: 1;
            margin-bottom: 20px;
            .flexCenter();
            overflow: hidden;

            .QR-canvas-container {
              overflow: hidden;

              #QRCode {
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .input-container-input {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
</style>
