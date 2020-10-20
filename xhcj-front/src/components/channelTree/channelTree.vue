<template>
  <div class="channel-tree-container" :class="{'close-channel-tree-container':isColl}">
    <div class="input-container" v-show="!isColl">
      <el-input placeholder="请输入关键词" v-model="organizeName" @keyup.enter.native="onSearch"></el-input>
      <!-- <el-button
        :icon="isLoading?'el-icon-loading':'el-icon-search'"
        style="margin-left: 4px"
        @click="onSearch"
      ></el-button>-->
      <div class="bt-container" @click="onSearch">
        <i class="el-icon-loading" v-if="isLoading"></i>
        <i class="el-icon-search" v-else></i>
      </div>
      <div class="bt-container" @click="toggleOpen">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>

    <el-tabs
      class="channel-tree-tabs-container"
      v-model="activeName"
      @tab-click="tabChange"
      v-show="!isColl"
    >
      <el-tab-pane label="频道" name="normal">
        <div class="tree-list">
          <el-tree
            :data="channels"
            :expand-on-click-node="false"
            default-expand-all
            node-key="id"
            :props="{label: 'name'}"
            :indent="12"
            ref="tree"
          >
            <div
              class="tree-cell"
              slot-scope="{ node, data }"
              @click="selectNode(node,data)"
              :class="{selectedCell:node.key === channelSelectedKey}"
            >
              <span>{{ node.label }}</span>
            </div>
          </el-tree>
        </div>
      </el-tab-pane>
      <el-tab-pane label="专题" name="special">
        <div class="channel-tree-checkbox-container">
          <el-checkbox
            v-model="isShowSpecialHide"
            @change="onChangeIsHide"
            :disabled="isLoading"
          >展示隐藏</el-checkbox>
        </div>
        <div class="tree-list">
          <el-tree
            :data="specials"
            :expand-on-click-node="false"
            node-key="id"
            :props="{label: 'name'}"
            :indent="12"
            ref="tree"
          >
            <div
              class="tree-cell"
              slot-scope="{ node, data }"
              @click="selectNode(node,data)"
              :class="{selectedCell:node.key === specialsSelectedKey}"
            >
              <span>{{ node.label }}</span>
            </div>
          </el-tree>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bt-container" v-if="isColl" @click="toggleOpen">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "channelTree",
  props: {
    onSelect: {
      type: Function,
      required: true,
    },
    onTabChange: {
      type: Function,
    },
    onGetTree: {
      type: Function,
    },
    specialChannelDefault: {
      type: Boolean, // 频道是否使<channelTree用头条作为默认值
      default: false,
    },
  },
  data() {
    return {
      organizeName: "",
      activeName: "normal",
      channels: [],
      specials: [],

      channelSelectedKey: "root_channel_id", // 频道选中的key
      channelSelectedData: {}, // 频道选中的值

      specialsSelectedKey: "", // 专题选中的key
      specialsSelectedData: {}, // 专题选中的值

      isShowSpecialHide: false,
      isLoading: true,
      isColl: false,
    };
  },
  mounted() {
    Promise.all([this.getChannelTree(), this.getSpecialTree()]).finally(() => {
      this.isLoading = false;
    });
  },
  methods: {
    async getChannelTree() {
      // 频道
      let searchMap = { treeType: 1 };
      if (this.organizeName) {
        searchMap.name = this.organizeName;
      }
      let [ok, data] = await this.$ajax.news.manuscript.getChannelTree(
        searchMap
      );

      ok && (this.channels = [data]);
      if (
        this.specialChannelDefault &&
        data.children &&
        data.children.length > 0
      ) {
        this.channelSelectedKey = data.children[0].id;
        this.channelSelectedData = this.$utils.gadgets.deepClone(
          data.children[0]
        );
      }
      this.onGetTree && this.onGetTree([data]);
    },

    async getSpecialTree() {
      // 专题
      let searchMap = { treeType: 2, showHide: this.isShowSpecialHide ? 1 : 0 };
      if (this.organizeName) {
        searchMap.name = this.organizeName;
      }
      let [ok, data] = await this.$ajax.news.manuscript.getChannelTree(
        searchMap
      );
      if (!ok) return;
      if (data.id === "root_channel_id") {
        data = data.children || [];
      } else {
        data = [data];
      }
      this.specials = data;
    },

    selectNode(node, data) {
      this[
        data.type === "special" ? "specialsSelectedKey" : "channelSelectedKey"
      ] = node.key;
      this[
        data.type === "special" ? "specialsSelectedData" : "channelSelectedData"
      ] = this.$utils.gadgets.deepClone(data);
      this.onSelect(data);
    },

    onSearch() {
      if (this.isLoading) return;
      this.isLoading = true;
      Promise.all([this.getChannelTree(), this.getSpecialTree()]).finally(
        () => {
          this.isLoading = false;
        }
      );
    },

    onChangeIsHide() {
      // 只有专题有隐藏
      if (this.isLoading) return;
      this.isLoading = true;
      this.getSpecialTree().finally(() => {
        this.isLoading = false;
      });
    },

    tabChange() {
      this.onTabChange &&
        this.onTabChange(
          this.activeName,
          this[
            this.activeName === "normal"
              ? "channelSelectedData"
              : "specialsSelectedData"
          ]
        );
    },

    toggleOpen() {
      this.isColl = !this.isColl;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/config";
@import "../../style/styles";

.channel-tree-container {
  height: 100%;
  background: white;
  margin-right: @defaultPaddingY;
  padding: @defaultPaddingY;
  width: 230px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all @defaultAnimationTime;
}

.close-channel-tree-container {
  width: 50px !important;
}

.input-container {
  width: 100%;
  // margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.channel-tree-tabs-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .tree-list {
    flex: 1;
    overflow: auto;

    &::-webkit-scrollbar {
      background: transparent;
      width: 4px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: @defaultBorderColor;
      width: 4px;
    }
  }
}

.tree-cell {
  width: 100%;
  height: 32px;
  overflow: hidden;
  line-height: 32px;
  font-size: @smallFontSize;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.selectedCell {
  color: @defaultBlueClick;
  font-weight: 600;
}

.channel-tree-checkbox-container {
  display: flex;
  flex-direction: row-reverse;
  flex-shrink: 0;
  margin-bottom: 8px;
}

.bt-container {
  width: 25px;
  height: 25px;
  border: 1px solid @defaultBorderColor;
  margin-left: 4px;
  flex-shrink: 0;
  .flexCenter();
  cursor: pointer;
  border-radius: 4px;
}

@media screen and (min-width: 1400px) {
  .close-channel-tree-container {
    width: 60px !important;
  }
  .bt-container {
    width: 32px;
    height: 32px;
    margin-right: 4px;
    overflow: hidden;
  }
}
</style>

<style lang="less">
@import "../../style/config";
@import "../../style/styles";

.channel-tree-tabs-container {
  .el-tree {
    border-bottom: 1px solid @defaultBorderColor;
  }

  .el-tree-node__content {
    height: 32px !important;
    border-top: 1px solid @defaultBorderColor;
    border-left: 1px solid @defaultBorderColor;
    border-right: 1px solid @defaultBorderColor;
    margin-right: 2px;
    position: relative;
  }

  .el-tabs__nav-scroll {
    .flexCenter();
  }

  .el-tabs__content {
    flex: 1;
    overflow: hidden;

    .el-tab-pane {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
