<template>
  <div
    class="table-width-filter-container"
    :class="{ 'opened-table-width-filter-container': isOpen }"
  >
    <conditionFilters
      :filtersInfo="filtersInfo"
      v-if="filtersInfo"
      :on-search="onSearch"
      @init="onFilterInit"
      :onOpen="onOpenFilter"
      :onClose="onCloseFilter"
    >
      <slot name="filters-right"></slot>
    </conditionFilters>

    <div class="divider" v-if="filtersInfo && !tableInfo.noDivider"></div>
    <div class="no-divider" v-if="tableInfo.noDivider"></div>

    <div class="auto-table-container">
      <div class="table-slot-left">
        <slot name="table-offset-left"></slot>
      </div>

      <autoTable
        ref="autoTable"
        v-if="isShowTable"
        :tableInfo="tableInfo"
        :mock="mock"
        :beforeSearch="beforeSearch"
        @init="onTableInit"
        :hasCardView="hasCardView"
        :defaultSearchMap="defaultSearchMap"
        :onSearchEnd="onSearchEnd"
        :onChangeCanShowSort="onChangeCanShowSort"
        :doubleSelect="doubleSelect"
      >
        <template slot-scope="scope">
          <slot
            name="card"
            :data="scope.data"
            :isSelected="scope.isSelected"
            :toggleSelect="scope.toggleSelect"
          ></slot>
        </template>

        <slot name="table-right" slot="table-right"></slot>
        <slot name="table-left" slot="table-left"></slot>

        <slot name="create" slot="create" slot-scope="scope" :onClose="scope.onClose"></slot>
        <slot
          name="modify"
          slot="modify"
          slot-scope="scope"
          :onClose="scope.onClose"
          :row="scope.row"
        ></slot>
      </autoTable>

      <div class="table-slot-right">
        <slot name="table-offset-right"></slot>
      </div>
    </div>

    <div class="mask" v-if="isOpen" @click="closeOpen"></div>
  </div>
</template>

<script>
import conditionFilters from "./conditionFilters";
import autoTable from "./autoTable";

export default {
  name: "tableWithFilter",
  props: [
    "filtersInfo",
    "tableInfo",
    "mock",
    "hasCardView",
    "beforeSearch",
    "onSearchEnd",
    "onChangeCanShowSort",
    "doubleSelect",
  ],
  components: { conditionFilters, autoTable },
  data() {
    return {
      localThis: {
        table: null,
        filter: null,
      }, // 整合两个子组件的this,暴露出去
      isShowTable: false, // 应当先渲染过滤组件
      defaultSearchMap: {}, // 默认搜索条件
      isOpen: false,
    };
  },
  mounted() {
    if (!this.filtersInfo) {
      this.initTableView(); // 如果没有过滤条件,直接渲染表格
    }
  },
  methods: {
    initTableView() {
      if (this.filtersInfo) {
        // 有过滤条件
        this.defaultSearchMap = this.localThis.filter.getSearchMap();
      }

      this.isShowTable = true;
    },

    onSearch(searchMap) {
      this.$refs.autoTable.onFilterChange(searchMap);
    },

    onFilterInit(d) {
      this.localThis.filter = d;
      this.$emit("input", this.localThis);
      this.initTableView();
    },

    onTableInit(d) {
      this.localThis.table = d;
      this.$emit("input", this.localThis);
    },

    onOpenFilter() {
      this.isOpen = true;
    },

    onCloseFilter() {
      this.isOpen = false;
    },

    closeOpen() {
      this.localThis.filter.toggleOpen();
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/config";
@import "../../style/styles";

.table-width-filter-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .mask {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2000;
  }

  .create-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    .flexCenter();
  }

  .divider {
    width: 100%;
    height: @defaultPaddingY;
    flex-shrink: 0;
  }

  .auto-table-container {
    display: flex;
    flex: 1;
    overflow: hidden;

    .table-slot-left,
    .table-slot-right {
      flex-shrink: 0;
      overflow: hidden;
    }
  }

  .no-divider {
    margin-top: -@defaultPaddingY / 2;
  }
}

.opened-table-width-filter-container {
  padding-top: 60px + @defaultPaddingY * 1.5;
}

@media screen and (max-width: 1400px) {
  .opened-table-width-filter-container {
    padding-top: 104px + @defaultPaddingY * 1.5;
  }
}
</style>
