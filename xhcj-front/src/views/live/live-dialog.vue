<template>
  <div class="njjnj">
    <dialogTemplate ref="dialogTemplate" :onClose="onClose" :title="manuscript.title">
      <tableWithFilter class="table" v-model="tableThis" :tableInfo="tableInfo" :mock="false">
        <el-button type="primary" slot="table-left" icon="el-icon-s-promotion" @click="send">发送</el-button>
        <el-button type="primary" slot="table-left" icon="el-icon-refresh-left" plain @click="withdraw">撤回消息</el-button>
      </tableWithFilter>
      <div slot="foot"></div>
    </dialogTemplate>
    <sendDialog v-if="showSendDialog" :targetVal="targetVal" :onClose="onCloseLiveDialog" />
  </div>
</template>
<script>
import sendDialog from "./send-dialog";
export default {
  name: "liveDialog",
  props: ["onClose", "manuscript"],
  components: { sendDialog },
  data() {
    return {
      tableInfo: {
        searchUrl: "/live/chat/list",
        defaultQuery: {
          lid: () => this.manuscript.id
        },
        columns: [
          {
            prop: "userName",
            label: "发送用户"
          },
          {
            prop: "content",
            label: "消息内容"
          },
          {
            prop: "createDate",
            label: "发送时间",
            beforeDisplay: row =>
              this.$utils.format.timeStampToStandardStr(row.createDate)
          }
        ],
        operations: {},
        hides: ["create", "modify", "deleteAll"],
        modifyConfig: {}
      },
      tableThis: null,
      showSendDialog: false,
      targetVal: {}
    };
  },
  mounted() { },
  methods: {
    send() {
      const { id, compereUserId, compereUserName } = this.manuscript;
      this.targetVal = {
        lid: id,
        userId: compereUserId,
        userName: compereUserName
      };
      this.showSendDialog = true;
    },
    onCloseLiveDialog() {
      this.showSendDialog = false;
      this.tableThis.table.refresh();
    },
    withdraw() {
      if (this.tableThis.table.multipleSelection.length > 0) {
        let targetVal = this.tableThis.table.multipleSelection.map(v => v.id);
        this.$ajax.live.chatDel(targetVal).then(res => {
          if (res.code === 200) {
            this.$message.success("撤回成功");
            this.tableThis.table.refresh();
          } else {
            this.$message.success(res.msg);
          }
        });
      } else {
        this.$message.error("请选择至少其中一个进行发送");
      }
    }
  }
};
</script>
<style lang="less">
.njjnj {
  .el-table__body-wrapper {
    height: 245px !important;
  }
}
</style>
    