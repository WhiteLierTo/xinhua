<template>
  <div class="active-info-management cxvxxcvvxc">
    <tableWithFilter v-model="tableThis" :filtersInfo="filtersInfo" :tableInfo="tableInfo">
      <el-button type="info" slot="table-left" :disabled="isMultiple" @click="()=> toExamine(1,tableThis.table.multipleSelection)">批量通过
      </el-button>
      <el-button type="info" slot="table-left" :disabled="isMultiple" @click="()=> toExamine(2,tableThis.table.multipleSelection)">批量不通过
      </el-button>
    </tableWithFilter>
  </div>
</template>
<script>
export default {
  name: "channelManage",
  data() {
    return {
      filtersInfo: [
        {
          type: "input",
          placeholder: "请输入稿件标题",
          submitName: "title"
        },
        {
          type: "input",
          placeholder: "请输入评论人昵称",
          submitName: "userName"
        },
        {
          type: "select",
          placeholder: "请选择稿件类型",
          options: this.$utils.data.manuscript.manuscriptTypeOptions(),
          submitName: "articleType"
        },
        {
          type: "select",
          placeholder: "请选择审核状态",
          options: [{ label: "未审核", value: 0 }, { label: "通过", value: 1 }, { label: "不通过", value: 2 },],
          submitName: "auditState"
        },
        {
          type: "input",
          placeholder: "请输入评论关键词",
          submitName: "searchValue"
        },
        {
          type: "dateRange",
          placeholder: ["评论开始时间", "评论结束时间", "-"],
          beforeSubmit: d => +d,
          submitName: ["beginTime", "endTime"]
        },
      ],
      tableInfo: {
        searchUrl: "/comment/list",
        columns: [
          {
            prop: "title",
            label: "稿件标题"
          },
          {
            prop: "articleType",
            label: "稿件类型",
            beforeDisplay: row => this.$utils.data.manuscript.getManuscriptStatusLabelByValue(row.articleType)
          },
          {
            prop: "userName",
            label: "评论人昵称"
          },
          {
            prop: "createDate",
            label: "评论时间",
            beforeDisplay: row => this.$utils.format.timeStampToStandardStr(row.createDate),
          },
          {
            prop: "content",
            label: "评论内容"
          },
          {
            prop: "auditState",
            label: "评论审核状态",
            beforeDisplay: row => ["未审核", "通过", "不通过"][row.auditState]
          },
          {
            type: "action",
            label: "操作",
            content: [row => row.auditState !== 2 ? '不通过' : '', row => row.auditState !== 1 ? '通过' : ''],
            onClick: [row => this.toExamine(2, [row]), row => this.toExamine(1, [row])]
          }
        ],
        hides: ["deleteAll", "create", "modify"]
      },
      tableThis: null
    }
      ;
  },
  computed: {
    isMultiple() {
      return (
        !this.tableThis ||
        !this.tableThis.table ||
        this.tableThis.table.multipleSelection.length === 0
      );
    }
  },
  methods: {
    async toExamine(targetState, comments) {

      // 审核
      let [ok, msg] = await this.$ajax.news.comment.update(comments.map(comment => {
        let data = {
          id: comment.id,
          auditState: targetState.toString()
        };
        if (comment.commentId) {
          data.commentId = comment.commentId
        }
        return data
      }));

      if (ok) {
        this.$message.success("操作成功");
        this.tableThis.table.refresh();
      } else {
        this.$message.error(`操作失败,${msg}`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.active-info-management {
  width: 100%;
  height: 100%;
  position: relative;

  .sort {
    color: #fff;
    background-color: #8fc149;
    border-color: #8fc149;
  }

  .move {
    color: #fff;
    background-color: #6ac6c8;
    border-color: #6ac6c8;
  }

  .move.is-disabled {
    background-color: #99dee0;
    border-color: #99dee0;
  }
}
</style>
<style lang="less">
.el-button--info:nth-child(1) {
  background-color: #869582;
  border-color: #869582;
}

.el-button--info.is-disabled:nth-child(1) {
  background-color: #b0baad;
  border-color: #b0baad;
}

.el-button--info:nth-child(2) {
  background-color: #67a5a3;
  border-color: #67a5a3;
}

.el-button--info.is-disabled:nth-child(2) {
  background-color: #8fc6c4;
  border-color: #8fc6c4;
}

.el-button--info:nth-child(3) {
  background-color: #988b8a;
  border-color: #988b8a;
}

.el-button--info.is-disabled:nth-child(3) {
  background-color: #b8b2b2;
  border-color: #b8b2b2;
}
</style>