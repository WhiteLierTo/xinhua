<template>
  <div
    class="condition-filters-container"
    :class="{ 'opened-condition-filters-container': isOpen }"
  >
    <div class="mask-left" v-if="isOpen"></div>
    <div class="mask-right" v-if="isOpen"></div>
    <div
      class="filters-container"
      :class="{
        'filters-container-not-need-open': needOpen !== null && !needOpen,
        'filters-container-opened': isOpen,
      }"
      ref="filtersContainer"
    >
      <div
        class="filter-cell-container"
        :class="{
          'datatimerange-cell-container':
            item.type === 'dateRange' || item.type === 'dayRange',
        }"
        v-for="(item, index) in filters"
        :key="index"
      >
        <el-input
          v-model.trim="item.value"
          :placeholder="item.placeholder"
          v-if="item.type === 'input'"
          style="width: 100%"
          @keyup.enter.native="search"
          clearable
        ></el-input>

        <el-input
          v-model="item.value"
          type="number"
          :placeholder="item.placeholder"
          v-if="item.type === 'number'"
          style="width: 100%"
          class="auto-table-number"
          @keyup.enter.native="search"
          clearable
        ></el-input>

        <el-select
          v-model="item.value"
          :placeholder="item.placeholder"
          style="width: 100%"
          clearable
          v-if="item.type === 'select'"
          :filterable="item.filterable"
        >
          <el-option
            v-for="op in item.options || []"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          ></el-option>
        </el-select>

        <el-date-picker
          v-model="item.value"
          type="datetime"
          :placeholder="item.placeholder"
          v-if="item.type === 'date'"
          style="width: 100%"
          clearable
        ></el-date-picker>

        <el-date-picker
          v-model="item.value"
          type="datetimerange"
          :range-separator="item.placeholder[2] || '至'"
          :start-placeholder="item.placeholder[0] || '开始时间'"
          :end-placeholder="item.placeholder[1] || '结束时间'"
          v-if="item.type === 'dateRange'"
          style="width: 100%"
          clearable
        ></el-date-picker>

        <el-date-picker
          v-model="item.value"
          type="daterange"
          :range-separator="item.placeholder[2] || '至'"
          :start-placeholder="item.placeholder[0] || '开始时间'"
          :end-placeholder="item.placeholder[1] || '结束时间'"
          v-if="item.type === 'dayRange'"
          style="width: 100%"
          clearable
        ></el-date-picker>
      </div>
    </div>

    <div class="operation-container">
      <el-button
        type="text"
        v-if="needOpen"
        @click="toggleOpen"
        class="open-bt"
        >{{ isOpen ? "收起" : "展开" }}</el-button
      >
      <el-button @click="reset" class="clear-container">
        <!--<img src="../../assets/icons/clear.png" alt="" class="clear-icon">-->
        <span>清空</span>
      </el-button>
      <el-button type="primary" @click="search" icon="el-icon-search"
        >搜索</el-button
      >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "conditionFilters",
  props: {
    filtersInfo: {
      default: [],
    },
    onSearch: {
      default: () => ({}),
    },
    onOpen: {
      type: Function,
    },
    onClose: {
      type: Function,
    },
  },
  data() {
    return {
      filters: [],
      needOpen: null,
      isOpen: false,
    };
  },
  created() {
    this.formatFilters();
  },
  mounted() {
    this.$emit("init", this);
    this.$nextTick(() => {
      this.needOpen =
        this.$refs.filtersContainer.scrollHeight >
        this.$refs.filtersContainer.offsetHeight;
    });
  },
  methods: {
    formatFilters() {
      this.filters = this.filtersInfo.map((f) => {
        f.value = f.defaultValue || ""; // 有些初值不一定可以是空字符串
        return this.$utils.gadgets.deepClone(f);
      });
    },

    search() {
      this.onSearch(this.getSearchMap());
      this.isOpen && this.toggleOpen();
    },

    getSearchMap() {
      let searchMap = {};
      this.filters.forEach((f) => {
        if (f.type === "dateRange" || f.type === "dayRange") {
          if (Array.isArray(f.value) && f.value.length > 0) {
            searchMap[f.submitName[0]] = f.beforeSubmit
              ? f.beforeSubmit(f.value[0])
              : f.value[0];
            searchMap[f.submitName[1]] = f.beforeSubmit
              ? f.beforeSubmit(f.value[1])
              : f.value[1];
          }
          return;
        }

        if (this.$utils.gadgets.isSpecialTrue(f.value)) {
          searchMap[f.submitName] = f.beforeSubmit
            ? f.beforeSubmit(f.value)
            : f.value;
        }
      });
      return searchMap;
    },

    reset() {
      this.filters.forEach((d) => {
        d.value = d.defaultValue || "";
      });
      this.search();
    },

    toggleOpen() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onOpen();
      } else {
        this.onClose();
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/config";
@import "../../style/styles";

.condition-filters-container {
  width: 100%;
  display: flex;
  background-color: @defaultCardBgColor;
  padding: @defaultPaddingY @defaultPaddingX @defaultPaddingY / 2;
  align-items: flex-start;
  flex-shrink: 0;
  position: relative;

  .mask-left {
    position: absolute;
    width: @defaultPaddingY / 2;
    left: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .mask-right {
    position: absolute;
    width: @defaultPaddingY / 2;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .operation-container {
    margin-left: auto;
    flex-shrink: 0;
    .flexCenter();

    .open-bt {
      position: relative;
      top: 8px;
    }

    .clear-container {
      .clear-icon {
        position: relative;
        margin-right: 6px;
        top: 2px;
      }

      span {
        color: @defaultBlueClick;
      }
    }
  }

  .filters-container {
    flex: 1;
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    max-height: 60px;
    overflow: hidden;
    position: relative;

    .filter-cell-container {
      margin-right: @defaultPaddingX;
      margin-bottom: @defaultPaddingY / 2;
      width: @defaultFilterWidth;
      .flexCenter();
    }

    .datatimerange-cell-container {
      width: @defaultFilterWidth * 2 + @defaultPaddingX;
    }
  }

  .filters-container-not-need-open {
    max-height: unset !important;
  }

  .filters-container-opened {
    max-height: unset;
  }
}

.opened-condition-filters-container {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2001;
  box-shadow: -10px 6px 6px rgba(0, 0, 0, 0.5);
}

@media screen and (min-width: 1400px) {
  .condition-filters-container {
    .filters-container {
      max-height: 104px;
    }
  }
}
</style>

<style lang="less">
.auto-table-number {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>