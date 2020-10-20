<template>
  <div class="news-section-selector-container">
    <el-button icon="el-icon-plus" type="text" @click="openDialog">选择栏目</el-button>
    <dialog-template
        v-if="isShowSelectNewsSection"
        title="栏目选择"
        :onClose="onClose"
        :onSubmit="submit"
    >
      <div class="main-content">
        <el-tree
            :data="channelAndSpecial"
            show-checkbox
            :check-on-click-node="false"
            node-key="id"
            :props="treeProps"
            default-expand-all
            check-strictly
            ref="tree"
            style="flex: 1;"
        >
        </el-tree>
      </div>
    </dialog-template>
  </div>
</template>

<script>
  export default {
    name: "columnSelector",
    props: {
      onSelect: {
        type: Function,
        required: true
      },
      selected: {
        type: Array,
        default: function () {
          return []
        }
      },
      defaultKey: String,
      onDefaultSelect: Function
    },
    data() {
      return {
        isShowSelectNewsSection: false,
        channelAndSpecial: [],
        treeProps: {
          label: "name",
          disabled: (data, node) => node.key === "root_channel_id_normal" || node.key === "root_channel_id_special"
        }
      }
    },
    mounted() {
      this.getMenuTree();
    },
    methods: {
      onClose() {
        this.isShowSelectNewsSection = false
      },

      getMenuTree() {
        this.$ajax.live.getLiveTree({
          treeType: 3,
          showHide: 1
        }).then(res => {
          if (res.code !== 200) return;
          if (res.data.id === "root_channel_id") {
            res.data = res.data.children || []
          } else {
            res.data = [res.data]
          }
          this.channelAndSpecial = res.data;

          // 递归去找有没有defaultKey,有的话,触发一次某事件
          if (this.defaultKey) {
            let node = this.findDefaultKey({children: this.channelAndSpecial});
            if (!node) return;
            this.onSelect([node]);
          }
        })
      },

      findDefaultKey(node) {
        if (node.id && node.id.toString() === this.defaultKey.toString()) {
          return node
        }

        if (!node.children || node.children.length === 0) {
          return false
        }

        for (let i = 0; i <= node.children.length - 1; i++) {
          let nodeOrFalse = this.findDefaultKey(node.children[i]);
          if (nodeOrFalse) return nodeOrFalse
        }
        return false
      },

      submit() {
        let selectedNodes = this.$refs.tree.getCheckedNodes();
        this.onSelect && this.onSelect(selectedNodes);
        return true
      },

      openDialog() {
        this.isShowSelectNewsSection = true;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedNodes(this.$utils.gadgets.deepClone(this.selected).map(d => ({id: d.channelId})));
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .news-section-selector-container {
    .main-content {
      height: 75vh;
    }
  }
</style>