<template>
  <div class="active-info-management">
    <tableWithFilter
        :filtersInfo="filtersInfo"
        :tableInfo="tableInfo"
        :mock="false"
        :hasCardView="true"
    >
      <template slot-scope="scope" slot="card">
        <infoCard :info="scope.data" :isSelected="scope.isSelected" :toggleSelect="scope.toggleSelect"></infoCard>
      </template>
    </tableWithFilter>


    <dialogTemplate v-if="isShowQRCode" title="二维码下载" :onClose="()=>isShowQRCode = false">
      <div slot="foot">
      </div>

      <div class="QRCode-card">
        <div class="QR-inner-container">
          <div class="QR-canvas-container">
            <canvas id="QRCode" ref="QRCanvas"></canvas>
          </div>
        </div>
        <div class="selections-row">
          <div
              class="selection"
              :class="{'selection-active':QRSizeIndex === index}"
              v-for="(text,index) in QRText"
              :key="index"
              @click="selectQRSize(index)"
          >{{ text }}
          </div>
        </div>
        <div class="input-container">
          <el-input
              :disabled="QRSizeIndex !== 2"
              v-model="QRSize"
              size="mini"
              type="number"
              class="input-container-input"
              @input="onQRSizeChange"
          ></el-input>
          <span style="margin-left: 10px">px</span>
        </div>
        <el-button type="primary" @click="downloadQR">下载</el-button>
      </div>
    </dialogTemplate>

    <preview v-if="isShowPreView" :url="previewUrl" :onClose="onPreviewClose"/>
  </div>
</template>

<script>
  // TODO 状态
  import QRCode from "qrcode";
  import infoCard from "./info-card";
  import axios from "axios"
  import preview from "../../../components/preview/preview"


  export default {
    // 活动管理
    name: "checkInManagement",
    components: {
      infoCard,
      preview
    },

    inject: ["modifyLastBreadcrumbLabel"],

    data() {
      return {
        filtersInfo: [
          {
            type: "input",
            placeholder: "请输入活动名称",
            submitName: "actName"
          },
          {
            type: "select",
            placeholder: "请选择活动状态",
            defaultValue: "",
            options: this.$utils.data.activity.actStateOptions(),
            submitName: "actState"
          },
          {
            type: "dateRange",
            placeholder: ["活动开始时间", "活动结束时间", "-"],
            beforeSubmit: d => +d,
            submitName: ["actStartTime", "actEndTime"]
          }
        ],
        tableInfo: {
          searchUrl: "/activity/list",
          deleteAllUrl: "/activity/batchDel",
          columns: [
            {
              prop: "title",
              label: "活动标题",
            },
            {
              prop: "startdate",
              label: "活动开始时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.startdate)
            },
            {
              prop: "enddate",
              label: "活动结束时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.enddate)
            },
            {
              prop: "state",
              label: "活动状态",
              beforeDisplay: row =>
                  this.$utils.data.activity.getActStateLabelByValue(row.state),
              presetStyle: {
                withPoint: {
                  show: true,
                  backgroundColor: row =>
                      this.$utils.data.activity.getActStateColorByValue(row.state)
                }
              }
            },
            {
              prop: "applystarttime",
              label: "报名开始时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.applystarttime)
            },
            {
              prop: "applyendtime",
              label: "报名结束时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.applyendtime)
            },
            {
              prop: "createdate",
              label: "创建时间",
              beforeDisplay: row =>
                  this.$utils.format.timeStampToStandardStr(row.createdate)
            },
            {
              type: "action",
              label: "操作",
              content: ["打开链接", "预览"],
              // styleConfig: {
              //   color: "rgba(31, 163, 98, 1)"
              // },
              onClick: [this.showActivityDetail, this.showPreView]
            },
            {
              prop: "hitcount",
              label: "点击量"
            },
            {
              type: "action",
              label: "签到码",
              content: "查看",
              onClick: row => {
                this.isShowQRCode = true;
                this.$nextTick(() => {
                  this.drawQR(row);
                });
              }
            }
          ],

          createConfig: {
            path: "/activity/info/addActivity?type=create"
          },

          modifyConfig: {
            path: row => `/activity/info/addActivity?type=modify&id=${row.id}`
          },

        },

        QRText: ["海报", "大屏", "自定义"],
        isShowQRCode: false,
        QRSize: 128, // 二维码尺寸
        QRSizeIndex: 0, // 二维码尺寸选择的按钮
        QRCodeMsg: "", // 用来生成二维码的信息


        isShowPreView: false,
        previewUrl: ""
      };
    },

    methods: {
      selectQRSize(index) {
        this.QRSizeIndex = index;
        switch (index) {
          case 0:
            this.QRSize = 128;
            break;
          case 1:
            this.QRSize = 256;
            break;
        }
      },

      onQRSizeChange() {
        if (this.QRSize > 5000) {
          this.$message.warning("二维码最大尺寸为5000像素");
        }
      },

      async drawQR(row) {
        this.drawQR.row = row || this.drawQR.row;
        let config = await this.$ajax.gadgets.getConfigSync();
        if (!config) {
          this.$message.error("获取配置文件失败");
          return
        }
        let path = this.getQRJson(this.drawQR.row.id);

        QRCode.toCanvas(this.$refs.QRCanvas, path, {
          width: 256,
          height: 256,
          padding: 1
        });
      },

      downloadQR() {
        // 画一个虚拟的
        // TODO 发送到worker进程去做
        let canvas = document.createElement("canvas");
        canvas.style.display = "none";
        canvas.width = this.QRSize;
        canvas.height = this.QRSize;
        document.body.append(canvas);

        let path = this.getQRJson(this.drawQR.row.id);

        QRCode.toCanvas(canvas, path, {
          width: this.QRSize,
          height: this.QRSize,
          padding: 1
        });

        this.$utils.gadgets.downloadCanvas(canvas, `${this.drawQR.row.title}二维码`);
        canvas.remove();
      },

      showActivityDetail(row) {
        axios.get("./config.json").then(res => {
          if (!res.data.websiteUrl.endsWith("/")) {
            res.data.websiteUrl += '/'
          }
          let path = `${res.data.websiteUrl}newsDetail?id=${row.id}&type=7`;
          window.open(path)
        }).catch(() => {
        })

      },

      async showPreView(row) {
        let config = await this.$ajax.gadgets.getConfigSync();
        if (!config) {
          this.$message.error("获取配置文件失败!");
          return
        }
        this.previewUrl = `${config.websiteUrl}/newsDetail?id=${row.id}&type=7`;
        this.isShowPreView = true
      },

      onPreviewClose() {
        this.isShowPreView = false;
      },

      getQRJson(id) {
        return JSON.stringify({
          msg: "请使用新华日报财经App扫描此码",
          id,
          type: "activity"
        })
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../../style/config";
  @import "../../../style/styles";

  .active-info-management {
    width: 100%;
    height: 100%;
    position: relative;


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
          width: 256px;
          height: 256px;
          .flexCenter();

          #QRCode {
            overflow: hidden;
          }
        }
      }
    }
  }

  .test {
    margin-right: @defaultPaddingX;
    height: 100%;
    background: white;
    width: 300px;
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
