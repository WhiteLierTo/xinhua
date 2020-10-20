<template>
  <div
    class="auto-table-container"
    :class="{
      cardViewWrapper: !isShowTableView,
      pointer:
        !securityHides.includes('select') || !securityHides.includes('modify'),
    }"
    v-loading="initLoading"
    ref="autoTableContainer"
  >
    <canvas id="canvas" ref="canvas"></canvas>
    <div class="operation-container">
      <el-button
        type="success"
        v-if="!securityHides.includes('create')"
        @click="create"
        :icon="
          tableInfo.createConfig
            ? tableInfo.createConfig.icon || 'el-icon-plus'
            : 'el-icon-plus'
        "
        style="order:-100"
        v-allow="permissionCreate"
        >{{
          tableInfo.createConfig
            ? tableInfo.createConfig.label || "新增"
            : "新增"
        }}
      </el-button>
      <el-button
        :disabled="multipleSelection.length !== 1"
        v-if="!securityHides.includes('modify')"
        @click="() => modify()"
        icon="el-icon-edit"
        type="warning"
        style="order:-90"
        v-allow="permissionModify"
        >修改
      </el-button>
      <el-button
        type="info"
        :disabled="multipleSelection.length === 0"
        @click="isShowWillDeleteAll = true"
        v-if="
          !securityHides.includes('deleteAll') &&
            !securityHides.includes('select')
        "
        icon="el-icon-delete"
        style="order:-80"
        v-allow="permissionDelete"
        >批量删除
      </el-button>

      <el-button
        type="success"
        v-if="canShowSort && tableInfo.reSortConfig"
        :icon="sortLoading ? 'el-icon-loading' : 'el-icon-sort'"
        :disabled="!dragInfo.exchanged"
        @click="flashSort"
        style="order:-70"
        v-allow="permissionMove"
        >更新排序
      </el-button>

      <el-button
        v-if="canShowSort && tableInfo.reSortConfig"
        :icon="sortLoading ? 'el-icon-loading' : 'el-icon-sort'"
        :disabled="multipleSelection.length !== 1"
        type="info"
        icon="el-icon-rank"
        class="moveTo"
        @click="moveToInfo.isShow = true"
        style="order:-60"
        v-allow="permissionMove"
        >移动至
      </el-button>

      <slot name="table-left"></slot>

      <div class="right-icons" style="order:100">
        <i class="el-icon-crop icon" @click="toggleView" v-if="hasCardView"></i>
        <slot name="table-right"></slot>
      </div>
    </div>

    <div class="table-container" ref="tableContainer" v-show="isShowTableView">
      <el-table
        :data="tableData"
        stripe
        @selection-change="_handleSelectionChange"
        size="mini"
        class="FH-table"
        :class="{ noSelect: dragInfo.isDragging }"
        @row-click="rowClick"
        @row-dblclick="rowDbClick"
        ref="autoTable"
        height="100%"
        :row-class-name="randomRowClassName"
        v-if="isShowTable"
        v-loading="isLoading"
        @select="onSelect"
        @select-all="onSelectAll"
        :rowKey="rowKey"
        :style="{ minHeight: minHeight || 'none' }"
      >
        <div class="empty" slot="empty">
          <img src="../../assets/nodata.png" alt="" />
          <span>没有查询到任何数据</span>
        </div>
        <el-table-column
          type="selection"
          width="45"
          v-if="!securityHides.includes('select')"
          align="center"
          :fixed="!hasCardView"
        ></el-table-column>

        <el-table-column
          width="60"
          align="center"
          v-if="!securityHides.includes('index')"
          label="序号"
        >
          <template slot-scope="scope">
            <span
              v-text="
                pagination.pageSize * (pagination.pageNum - 1) +
                  scope.$index +
                  1
              "
            ></span>
          </template>
        </el-table-column>

        <template v-for="(column, colIndex) in tableInfo.columns">
          <el-table-column
            :key="colIndex"
            :label="column.label.toString()"
            :width="widthMap[column.label].displayWidth"
            :min-width="widthMap[column.label].minWidth"
            :fixed="column.fixed"
            v-if="column.type === 'action'"
          >
            <template slot-scope="scope">
              <div class="row-container">
                <span
                  class="with-point"
                  v-if="getPresetStyle(colIndex, 'withPoint').show"
                  :style="
                    `background:${_handleFuncOrOther(
                      getPresetStyle(colIndex, 'withPoint').backgroundColor,
                      scope.row,
                      scope.$index
                    )}`
                  "
                ></span>

                <span
                  v-for="(actionContent,
                  actonIndex) in _formatActionContentToList(
                    colIndex,
                    scope.row,
                    scope.$index
                  )"
                  :key="actonIndex"
                  v-allow="
                    getActionPermission(column, actonIndex, actionContent)
                  "
                >
                  <el-button
                    v-if="actionContent"
                    type="text"
                    size="small"
                    class="op-bt action-op-bt"
                    v-html="actionContent"
                    @click.stop="
                      handleAction(
                        colIndex,
                        actonIndex,
                        scope.row,
                        scope.$index
                      )
                    "
                    :style="getStyle(scope, colIndex)"
                    :disabled="
                      _handleFuncOrOther(
                        column.disable,
                        scope.row,
                        scope.$index
                      )
                    "
                  ></el-button>
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :key="colIndex"
            :prop="column.prop"
            :label="column.label.toString()"
            :width="widthMap[column.label].displayWidth"
            :min-width="widthMap[column.label].minWidth"
            v-else-if="column.type === 'image'"
          >
            <template slot-scope="scope">
              <div
                class="img-container"
                :style="{
                  width: `${widthMap[column.label].displayWidth}px`,
                  height: `${column.imageHeight ||
                    defaultImageConfig.imageHeight}px`,
                }"
              >
                <el-image
                  style="width:100%;height:100%"
                  :src="
                    _handleFuncOrOther(column.path, scope.row, scope.$index)
                  "
                  fit="scale-down"
                  :preview-src-list="previewImageList"
                  @click.native.stop
                  @dblclick.native.stop
                >
                </el-image>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :key="colIndex"
            :prop="column.prop"
            :label="column.label.toString()"
            :width="widthMap[column.label].displayWidth"
            :min-width="widthMap[column.label].minWidth"
            v-else
          >
            <template slot-scope="scope">
              <template
                v-if="
                  modifyRowIndex !== scope.$index || modifyColIndex !== colIndex
                "
              >
                <div class="row-container">
                  <span
                    class="with-point"
                    v-if="getPresetStyle(colIndex, 'withPoint').show"
                    :style="
                      `background:${_handleFuncOrOther(
                        getPresetStyle(colIndex, 'withPoint').backgroundColor,
                        scope.row,
                        scope.$index
                      )}`
                    "
                  ></span>

                  <span
                    v-html="scope.row[`${column.prop}_computed`]"
                    :style="getStyle(scope, colIndex)"
                    @click="
                      modifyInSitu(
                        scope.$index,
                        colIndex,
                        beforeDisplay(
                          scope.row,
                          scope.$index,
                          colIndex,
                          column.prop,
                          false
                        ),
                        $event
                      )
                    "
                    v-if="!tableInfo.columns[colIndex].canModify"
                  >
                  </span>

                  <el-button
                    v-else
                    type="text"
                    size="small"
                    v-html="scope.row[`${column.prop}_computed`]"
                    @click="
                      modifyInSitu(
                        scope.$index,
                        colIndex,
                        beforeDisplay(
                          scope.row,
                          scope.$index,
                          colIndex,
                          column.prop,
                          false
                        ),
                        $event
                      )
                    "
                    :style="getStyle(scope, colIndex)"
                    :disabled="
                      _handleFuncOrOther(
                        column.disable,
                        scope.row,
                        scope.$index
                      )
                    "
                  >
                  </el-button>
                </div>
              </template>

              <template v-else>
                <div class="input-container">
                  <el-input
                    size="mini"
                    v-model.trim="modifyValue"
                    class="input-container-input"
                    @keyup.enter.native="submitModifyInSitu"
                    @click.stop.native
                    ref="modifyInSituInput"
                  ></el-input>
                  <div
                    class="submit-bt-container"
                    @click.stop="submitModifyInSitu"
                  >
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </template>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          label="操作"
          :width="getOperationWidth()"
          v-if="
            Object.values(mergedOperationsConfig).some((config) =>
              Array.isArray(config) ? config.length : config.show
            )
          "
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="op-bt"
              v-if="getOperationConfig('delete', 'show')"
            >
              <el-popconfirm
                title="请确认是否删除该行数据？"
                popper-class="auto-table-pop-container"
                @onConfirm="() => deleteMe(scope.row, scope.$index)"
              >
                <span @click.stop slot="reference">
                  <img
                    :src="getOperationConfig('delete', 'iconPath')"
                    v-if="getOperationConfig('delete', 'iconPath')"
                    class="op-bt-img-icon"
                    alt=""
                  />
                  <i
                    :class="getOperationConfig('delete', 'icon')"
                    v-else-if="getOperationConfig('delete', 'icon')"
                  ></i>
                  {{ getOperationConfig("delete", "label") }}
                </span>
              </el-popconfirm>
            </el-button>

            <el-button
              type="text"
              size="small"
              class="op-bt"
              v-for="(extraBt, index) in mergedOperationsConfig.extra"
              :key="index"
              @click.stop="
                extraBt.onClick && extraBt.onClick(scope.row, scope.$index)
              "
            >
              <img
                :src="extraBt.iconPath"
                v-if="extraBt.iconPath"
                class="op-bt-img-icon"
                alt=""
              />
              <i :class="extraBt.icon" v-else-if="extraBt.icon"></i>
              {{ extraBt.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-container card-view-container" v-show="!isShowTableView">
      <div
        v-for="(d, i) in tableData"
        :key="i"
        class="card-view-cell-container"
      >
        <slot
          :data="d"
          :isSelected="multipleSelection.includes(d)"
          :toggleSelect="() => toggleSelect(d)"
        ></slot>
      </div>
    </div>

    <div class="pagination-container">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="pagination.pageNum"
        :page-size.sync="pagination.pageSize"
        :total="pagination.total"
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        small
      ></el-pagination>
    </div>

    <dialogTemplate
      title="提示"
      v-if="isShowWillDeleteAll"
      :onClose="() => (isShowWillDeleteAll = false)"
      :onSubmit="() => deleteAll()"
      width="400"
    >
      请确认是否批量删除!
    </dialogTemplate>

    <div class="dialog-container" v-if="isShowCreateDialog">
      <slot name="create" :onClose="onCloseCreateDialog"></slot>
    </div>

    <div class="dialog-container" v-if="isShowModifyDialog">
      <slot
        name="modify"
        :onClose="onCloseModifyDialog"
        :row="modifyRow"
      ></slot>
    </div>

    <dialogTemplate
      width="400"
      title="移动至"
      v-if="moveToInfo.isShow"
      :onClose="() => (moveToInfo.isShow = false)"
      :onSubmit="submitMoveTo"
    >
      <el-form
        ref="form"
        :model="moveToInfo"
        :rules="moveToInfo.rules"
        label-width="80px"
      >
        <el-form-item label="移动至">
          <el-input
            type="number"
            v-model.trim="moveToInfo.value"
            placeholder="请输入移动位置的排序序号"
          ></el-input>
        </el-form-item>
      </el-form>
    </dialogTemplate>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  name: "autoTable",
  props: {
    tableInfo: {
      default: {
        columns: [],
        searchUrl: "",
        defaultQuery: {},
        deleteAllUrl: "",

        operations: {},
        hides: [],
        createConfig: {},
        selectConfig: {},
        modifyConfig: {},
        method: "POST",
      },
    },
    hasCardView: {
      default: false,
    },
    mock: {
      default: false,
    },
    defaultSearchMap: {
      default: () => ({}),
    },
    beforeSearch: {
      type: Function,
      default: (d) => d,
    },
    onSearchEnd: {
      type: Function,
      default: (d) => d,
    },
    onChangeCanShowSort: {
      type: Function,
      default: (d) => d,
    },
    doubleSelect: {
      type: Function,
    },
  },
  data() {
    return {
      tableData: [],
      baseStyleConfig: {
        color: "#606266",
      },
      baseOperationsConfig: {
        delete: {
          show: false,
          label: "删除",
          icon: "el-icon-delete",
          iconPath: "",
        },
      },
      tableMaxHeight: 200, // 表格滚动高度,会被mounted修改
      pagination: {
        pageSize: 20,
        total: 0,
        pageNum: 1,
      },
      searchMap: {}, // 搜索条件
      multipleSelection: [], // 被选中的行
      isShowWillDeleteAll: false, // 是否显示全部删除的弹出框
      isShowTableView: true, // 表格视图还是卡片视图
      modifyRowIndex: -1, // 原地修改的行Index // TODO 有点蠢
      modifyColIndex: -1, // 原地修改的列Index
      modifyValue: "", // 原地修改的值,复制一份在此 // TODO 有点蠢
      widthMap: new Map(), // 设定表格宽度
      isShowTable: false, // 功能性flag
      canvas: {}, // canvas,
      isLoading: false, // 控制loading
      loadingTimer: 0, // loading的延时控制器
      isShowCreateDialog: false,
      isShowModifyDialog: false,
      modifyRow: {}, // 修改的行
      initLoading: false,
      initLoadingTimer: 0,
      defaultImageConfig: { imageWidth: 80, imageHeight: 80 }, // 默认图片设置
      previewImageList: [], // 所有的图片
      randomRowClassName: "",
      dragInfo: {
        isDragging: false, // 是否正在拖动
        draggingCanvas: null, // 被拖动的canvas
        dragIndex: -1, // 被拖动者的index
        targetIndex: -1, // 拖动至对象的index
        rows: [], // domList
        rowDom: null, // 被拖动的dom
        dragRow: {}, // 被拖动的行信息
        antiShake: false, // 防抖 false === 不执行
        timer: -1,
        startX: 0,
        startY: 0,
        startWillDrag: false, // 是否在预备拖动
        exchanged: false, // 是否交换过位置
      }, // 拖动的一些信息
      sortLoading: false, // 更新排序的loading
      moveToInfo: {
        rules: {
          moveToNumber: [
            { required: true, message: "请输入移动至的目标", trigger: "blur" },
          ],
        },
        value: "",
        isShow: false,
      }, // 移动至
      longColWidth: 300, // 宽与此的列被视为长列,会被纳入折叠的考量
      rowKey: "id",
      minHeight: 0,
      isOldRowEmpty: false,

      canShowSort: true, // 是否可以展示更新排序与移动至
    };
  },

  created() {
    this.randomRowClassName = this.$utils.gadgets.getRandomStr();
    if (this.tableInfo.reSortConfig) {
      this.rowKey = undefined;
    }
  },

  async mounted() {
    if (this.tableInfo.minDisplayRows) {
      this.minHeight = `${this.tableInfo.minDisplayRows * 40}px`;
    }
    if (this.defaultSearchMap) {
      this.searchMap = this.defaultSearchMap;
    }
    this.initLoadingTimer = setTimeout(() => {
      this.initLoading = true;
    }, 500);
    this.$emit("init", this);
    this.initCanvas();

    if (this.tableInfo.isDelay === undefined || !this.tableInfo.isDelay) {
      await this.search();
      clearTimeout(this.initLoadingTimer);
      this.initLoading = false;
    }
  },

  computed: {
    mergedOperationsConfig() {
      // 无递归,只能merge两层
      let userConfig = this.tableInfo.operations || {};
      let resConfig = this.$utils.gadgets.deepClone(this.baseOperationsConfig);
      Object.keys(resConfig).forEach((key) => {
        if (userConfig[key]) {
          resConfig[key] = { ...resConfig[key], ...userConfig[key] };
        }
      });
      resConfig.extra = userConfig.extra || []; // 自定义的按钮
      return resConfig;
    },

    securityHides() {
      return this.tableInfo.hides || [];
    },

    permissionCreate() {
      if (this.tableInfo.permissionHead) {
        return `${this.tableInfo.permissionHead}:add`;
      }
      return "allow";
    },

    permissionModify() {
      if (this.tableInfo.permissionHead) {
        return `${this.tableInfo.permissionHead}:modify`;
      }
      return "allow";
    },

    permissionDelete() {
      if (this.tableInfo.permissionHead) {
        return `${this.tableInfo.permissionHead}:delete`;
      }
      return "allow";
    },

    permissionMove() {
      if (this.tableInfo.permissionHead) {
        return `${this.tableInfo.permissionHead}:sort`;
      }
      return "allow";
    },
  },

  methods: {
    refresh(isReset) {
      // 刷新数据 供外界调用
      this.search(isReset);
    },

    setEmpty() {
      // 置空表格
      this.pagination.total = 0;
      this.computeTableWidthAndReDraw([]);
    },

    initCanvas() {
      this.canvas.canvas = this.$refs.canvas;
      this.canvas.ctx = this.canvas.canvas.getContext("2d");
      this.canvas.ctx.font = "12px test"; // 假装有个test字体
    },

    async search(isReset = true) {
      // 获取数据

      if (
        this.canShowSort &&
        this.tableInfo.reSortConfig &&
        this.$utils.gadgets.getPermison(this.permissionMove)
      ) {
        this.unregisterDragEvent(); // 解绑拖动事件
        this.dragInfo.exchanged = false;
        this.sortLoading = false;
      }

      this.canShowSort = this.onChangeCanShowSort(
        Object.keys(this.searchMap).length === 0
      );

      if (this.mock) {
        let rows = this._mockData();
        this.computeTableWidthAndReDraw(this.initData(this.onSearchEnd(rows)));
        isReset && this.scrollTableToTop();
      } else {
        this.loadingTimer = setTimeout(() => {
          this.isLoading = true;
        }, 300);

        let res = await this.$ajax.autoTable.getSync(
          this.tableInfo.searchUrl,
          this.getQuery(),
          this.tableInfo.method || "POST"
        );

        clearTimeout(this.initLoadingTimer);
        this.initLoading = false;

        this.pagination.total = res.total;

        let data = this.tableInfo.rowsKey
          ? res[this.tableInfo.rowsKey]
          : res.rows;
        this.computeTableWidthAndReDraw(this.initData(this.onSearchEnd(data)));
        isReset && this.scrollTableToTop();
      }

      this.modifyRowIndex = -1;
      this.modifyColIndex = -1;
      this.modifyValue = "";
    },

    initData(data) {
      // 进数据时,统一计算一遍beforeDisplay
      this.tableInfo.columns.forEach((col, colIndex) => {
        if (col.type !== "image" && col.type !== "action") {
          data = data.map((row, rowIndex) =>
            this._setComputedProp(row, rowIndex, col, colIndex)
          );
        }
      });
      return data;
    },

    _setComputedProp(row, rowIndex, col, colIndex) {
      // 递归的算
      row[`${col.prop}_computed`] = this.beforeDisplay(
        row,
        rowIndex,
        colIndex,
        col.prop
      );
      if (
        row.children &&
        Array.isArray(row.children) &&
        row.children.length > 0
      ) {
        row.children = row.children.map((d) =>
          this._setComputedProp(d, rowIndex, col, colIndex)
        );
      }
      return row;
    },

    getQuery() {
      let extraQuery = {};

      Object.entries(this.tableInfo.defaultQuery || {}).forEach(
        ([key, value]) => {
          let val = this._handleFuncOrOther(value, this.searchMap);
          if (this.$utils.gadgets.isSpecialTrue(val)) {
            extraQuery[key] = val;
          }
        }
      );

      return this.beforeSearch({
        ...extraQuery,
        ...this.searchMap,
        ...this.pagination,
      });
    },

    getStyle(scope, colIndex, cssName) {
      // 当传递keyName时,仅返回改cssName的值,否则返回一个key:value;key2:value2的字符串
      let userConfig = this.tableInfo.columns[colIndex].styleConfig;
      if (!userConfig) return "";
      let config = { ...this.baseStyleConfig, ...userConfig };

      if (cssName) {
        return this._handleFuncOrOther(
          config[cssName],
          scope.row,
          scope.$index
        );
      }

      let styleStr = "";
      Object.keys(config).forEach((key) => {
        let res = this._handleFuncOrOther(config[key], scope.row, scope.$index);
        if (res) {
          styleStr += `${key}:${res};`;
        }
      });
      return styleStr;
    },

    getPresetStyle(colIndex, keyName) {
      let presetStyle = this.tableInfo.columns[colIndex].presetStyle;
      if (!presetStyle) return false;
      return presetStyle[keyName];
    },

    getOperationConfig(key, key2) {
      let childConfig = this.mergedOperationsConfig[key];
      return key2 ? childConfig[key2] : childConfig;
    },

    deleteMe(row, index) {
      // 点击单行的删除
      let userFunc = this.getOperationConfig("delete", "onClick");
      if (userFunc) {
        return userFunc(row, index);
      }
      // 进入默认删除逻辑
      // TODO
      this.deleteAll([row.id]); // 约定主键名为ID
    },

    getOperationWidth() {
      let width = Object.values(this.mergedOperationsConfig).reduce(
        (total, currentVal) => {
          if (Array.isArray(currentVal)) {
            // 基本上就是extra了
            return (
              total +
              currentVal.reduce((t, v) => _computeOneCellWidth(v) + t, 0)
            );
          } else return total + _computeOneCellWidth(currentVal);
        },
        0
      ); // 每两个之间是8px
      return width ? width + 4 : width;

      function _computeOneCellWidth(map) {
        if (map.show === false) return 0;
        // 计算一个单元的长度
        let base = map.label.length * 14; // 每个字符先计14;
        if (map.icon || map.iconPath) {
          // 有图标
          base += 20; // 每个图标计16 12 + 4
        }
        return base + 20; // 间隔宽度 TODO 再斟酌
      }
    },

    onFilterChange(searchMap) {
      // 留给父组件调用的
      this.searchMap = searchMap;
      this.pagination.pageNum = 1;
      this.search();
    },

    handleAction(colIndex, actonIndex, row, rowIndex, event) {
      // 点击自定义事件
      let onClickFunc = this.tableInfo.columns[colIndex].onClick;
      if (!onClickFunc) return;
      if (!Array.isArray(onClickFunc)) {
        onClickFunc(row, rowIndex, actonIndex);
      } else if (onClickFunc.length > actonIndex) {
        onClickFunc[actonIndex](row, rowIndex, actonIndex);
      }
    },

    _handleFuncOrOther(val, row, index) {
      if (typeof val === "function") return val(row, index);
      return val;
    },

    _handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    _formatActionContentToList(index, row, rowIndex) {
      let content = this.tableInfo.columns[index].content;
      if (typeof content === "string" || typeof content === "function") {
        content = [content];
      }
      return content.map((con) => {
        if (typeof con === "function") {
          return con(row, rowIndex);
        }
        return con;
      });
    },

    handleSizeChange() {
      this.search();
    },

    handleCurrentChange() {
      this.search();
    },

    scrollTableToTop() {
      // FIXME 多个表格时会有问题
      let dom = document.getElementsByClassName("el-table__body-wrapper")[0];
      if (dom) {
        dom.scrollTop = 0;
      }
    },

    beforeDisplay(row, rowIndex, colIndex, prop, useDefault = true) {
      // 默认显示字符先默认为 ---
      let userBeforeDisplay = this.tableInfo.columns[colIndex].beforeDisplay;
      if (!userBeforeDisplay)
        return this.$utils.gadgets.isSpecialTrue(row[prop])
          ? row[prop]
          : useDefault
          ? "---"
          : "";
      let text = userBeforeDisplay(row, rowIndex);
      return this.$utils.gadgets.isSpecialTrue(text)
        ? text
        : useDefault
        ? "---"
        : "";
    },

    rowClick(row) {
      if (
        this.tableInfo.selectConfig &&
        this.tableInfo.selectConfig.singleChoice
      ) {
        // 单选
        if (this.multipleSelection.includes(row)) {
          // 取消选择
          this.$refs.autoTable.clearSelection();
        } else {
          this.$refs.autoTable.clearSelection();
          this.$refs.autoTable.toggleRowSelection(row);
        }
        return;
      }
      this.$refs.autoTable.toggleRowSelection(row);
    },

    rowDbClick(row) {
      if (this.doubleSelect) {
        this.doubleSelect(row);
        return;
      }
      if (!this.$utils.gadgets.getPermison(this.permissionModify)) {
        return;
      }
      if (this.securityHides.includes("modify")) return;
      let index = this.tableData.indexOf(row);
      this.modify(row, index);
    },

    onSelect(selection, row) {
      if (
        this.tableInfo.selectConfig &&
        this.tableInfo.selectConfig.singleChoice
      ) {
        // 单选
        if (this.multipleSelection.includes(row)) {
          // 取消选择
          this.$refs.autoTable.clearSelection();
        } else {
          this.$refs.autoTable.clearSelection();
          this.$nextTick(() => {
            this.$refs.autoTable.toggleRowSelection(row);
          });
        }
      }
    },

    onSelectAll() {
      if (
        this.tableInfo.selectConfig &&
        this.tableInfo.selectConfig.singleChoice
      ) {
        // 单选
        this.$refs.autoTable.clearSelection();
      }
    },

    create() {
      if (this.tableInfo.createConfig && this.tableInfo.createConfig.path) {
        let path = this.tableInfo.createConfig.path;
        this.$router.push(typeof path === "string" ? path : path());
      } else {
        this.isShowCreateDialog = true;
      }
    },

    modify(row, index) {
      // 修改
      if (this.tableInfo.modifyConfig && this.tableInfo.modifyConfig.path) {
        let obj = row || this.multipleSelection[0];
        let i = index || this.tableData.indexOf(obj);

        let path = this._handleFuncOrOther(
          this.tableInfo.modifyConfig.path,
          obj,
          i
        );
        this.$router.push(path);
      } else {
        this.modifyRow = row || this.multipleSelection[0];
        this.$nextTick(() => {
          this.isShowModifyDialog = true;
        });
      }
    },

    toggleView() {
      // 切换表格视图 <---> 卡片
      this.isShowTableView = !this.isShowTableView;
    },

    _mockData() {
      let columns = this.tableInfo.columns;
      return Array(this.pagination.pageSize)
        .fill(null)
        .map(_mockOneData);

      function _mockOneData() {
        let resMap = {};
        columns.forEach((line) => {
          resMap[line.prop] = `test${Math.random()
            .toString()
            .substr(0, 4)}`;
        });
        return resMap;
      }
    },

    modifyInSitu(rowIndex, colIndex, value, event) {
      if (this.tableInfo.columns[colIndex].canModify) {
        this.modifyRowIndex = rowIndex;
        this.modifyColIndex = colIndex;
        this.modifyValue = value;
        event.stopPropagation();
        this.$nextTick(() => {
          this.$refs.modifyInSituInput[0] &&
            this.$refs.modifyInSituInput[0].focus();
        });
      }
    },

    submitModifyInSitu() {
      // 提交修改
      let func = this.tableInfo.modifyConfig
        ? this.tableInfo.modifyConfig.onInSituModify
        : "";
      if (!func) return;
      func(
        this.tableData[this.modifyRowIndex],
        this.tableInfo.columns[this.modifyColIndex],
        this.modifyValue,
        () => {
          this.search(false);
        }
      );

      this.modifyRowIndex = -1;
      this.modifyColIndex = -1;
      this.modifyValue = "";
    },

    async deleteAll(ids) {
      let idList = ids || this.multipleSelection.map((d) => d.id);
      let isDeleteSuccess = await this.$ajax.autoTable.deleteAllSync(
        this.tableInfo.deleteAllUrl,
        idList
      );
      if (isDeleteSuccess) {
        this.$message.success("删除成功");
        this.search(false);
      }
      this.isShowWillDeleteAll = false;
      return true;
    },

    computeTableWidthAndReDraw(rows) {
      // 自动计算表格宽度
      // 顺便收集所有的图片
      // TODO: 固定宽度的不要计算宽度了

      // 应该是返回时页面已经切走了
      if (!this.$refs.tableContainer) return;

      this.previewImageList = [];
      let canUseWidth = this.$refs.tableContainer.offsetWidth; // 最大可用宽度;
      let usedWidth = this._computeOtherColWidth();
      let oldWidthMap = this.$utils.gadgets.deepClone(this.widthMap);

      this.widthMap = new Map(); // 在改为使用Map结构之后,不需要Object.entries这样繁琐了,直接使用widthMap.forEach()

      this.tableInfo.columns.forEach((col, index) => {
        let maxPx = Math.max(
          ...rows.map((d, rowIndex) => {
            if (col.type === "action") {
              let displayText = this._formatActionContentToList(
                index,
                d,
                rowIndex
              ).join("&");
              return this._getTextWidthByCanvas(displayText);
            } else if (col.type === "image") {
              this.previewImageList.push(
                this._handleFuncOrOther(col.path, d, rowIndex)
              );
              return (col.imageWidth || 300) + 20;
            } else {
              let displayText = d[`${col.prop}_computed`];
              return this._getTextWidthByCanvas(displayText);
            }
          }),
          this._getTextWidthByCanvas(col.label)
        );
        let textWidth = maxPx + 28;
        if (
          col.presetStyle &&
          col.presetStyle.withPoint &&
          col.presetStyle.withPoint.show
        ) {
          textWidth += 15;
        }
        if (col.minWidth && typeof col.minWidth === "number") {
          textWidth = Math.max(col.minWidth, textWidth);
        }
        if (col.maxWidth && typeof col.maxWidth === "number") {
          textWidth = Math.min(col.maxWidth, textWidth);
        }
        if (col.width && typeof col.width === "number") {
          textWidth = col.width;
        }
        this.widthMap[col.label] = {
          displayWidth: textWidth, // 展示宽度
          minWidth: textWidth, // 最小宽度 用来1. 给最终被定为auto的元素兜底 2. 用来比较新旧布局
          isWrap: false, // 是否换行,用来比较新旧布局
        };
        usedWidth += textWidth;
      });

      // 分配剩余空间
      // TODO 当有col规定了width时,计算有些问题
      if (usedWidth < canUseWidth) {
        let noImageAndWidthRows = this.tableInfo.columns.filter(
          (col) => col.type !== "image" && !col.width
        );
        let oneShare =
          (canUseWidth - usedWidth - 20) / noImageAndWidthRows.length; // 20 大于滚动条宽度17即可
        let imageAndHasWidthLabelsList = this.tableInfo.columns
          .filter((col) => col.type === "image" || col.width)
          .map((col) => col.label);

        Object.keys(this.widthMap).forEach((key) => {
          if (imageAndHasWidthLabelsList.includes(key)) return;
          this.widthMap[key].displayWidth += oneShare;
        });
      } else {
        // 拿出长行
        // TODO  这里若type === image的行进入长行,不可预期
        let longCols = Object.entries(this.widthMap)
          .map(([key, value]) => [key, value])
          .filter((d) => d[1].displayWidth > this.longColWidth);
        longCols.sort((x, y) => x[1].displayWidth > y[1].displayWidth);
        // 超出的宽度
        let overflowWidth = usedWidth - canUseWidth + 20; // magicNumber
        let currentRow;

        while (longCols.length) {
          currentRow = longCols.shift();
          // 在缩短这些长行的display宽度时,同时缩短他们的minWidth

          // 如果剩余的很少 结束循环
          if (
            overflowWidth <= 20 &&
            currentRow[1].displayWidth >= this.longColWidth + overflowWidth
          ) {
            this.widthMap[currentRow[0]].displayWidth =
              this.widthMap[currentRow[0]].displayWidth - overflowWidth;
            this.widthMap[currentRow[0]].minWidth = this.widthMap[
              currentRow[0]
            ].displayWidth;
            this.widthMap[currentRow[0]].isWrap = true;
            overflowWidth = 0;
            break;
          }

          // 取走20px
          if (currentRow[1].displayWidth > this.longColWidth + 20) {
            currentRow[1].displayWidth -= 20;
            overflowWidth -= 20;
            this.widthMap[currentRow[0]].displayWidth -= 20;
            this.widthMap[currentRow[0]].minWidth = this.widthMap[
              currentRow[0]
            ].displayWidth;
            this.widthMap[currentRow[0]].isWrap = true;
            longCols.push(currentRow);
          }
        }
      }

      // 将最长的非image和action列的displayWidth设为auto
      let maxWidthPx = 0;
      let widthObjList = Object.entries(this.widthMap).map(([key, value]) => {
        // value.minWidth = value.displayWidth;
        let currentConfig = this.tableInfo.columns.filter(
          (d) => d.label === key
        )[0];
        if (currentConfig.type !== "image") {
          //  && currentConfig.type !== "action"
          maxWidthPx = Math.max(maxWidthPx, value.displayWidth);
        }
        return [key, value];
      });

      let maxWidthObjIndex = widthObjList.findIndex(
        ([key, value]) => value.displayWidth === maxWidthPx
      );
      if (maxWidthObjIndex !== -1) {
        // shouldDisplayWidth:理应的展示宽度 用来比较布局
        // 如果表格放不下,shouldDisplayWidth就是实际展示宽度
        // 如果表格放得下,shouldDisplayWidth小于实际展示宽度
        widthObjList[maxWidthObjIndex][1].shouldDisplayWidth =
          widthObjList[maxWidthObjIndex][1].displayWidth;
        widthObjList[maxWidthObjIndex][1].displayWidth = "auto";
      }

      widthObjList.forEach(([key, value]) => {
        this.widthMap[key] = value;
      }); // 这一步是不需要的,为了可阅读性,添加于此

      // 开始比较新旧布局

      let isNeedReBuild;
      if (rows.length === 0) {
        // 如果本次为空数据,为了emptyImg的位置,重构,但需要记录,下次有数据时,不能采用本次的widthMap
        isNeedReBuild = true;
        this.isOldRowEmpty = true;
      } else {
        isNeedReBuild =
          this.isOldRowEmpty ||
          widthObjList.some(([key, widthConfig]) => {
            //  应该是第一次构建
            if (!oldWidthMap[key]) return true;
            // 如果在新布局里需要换行,则无所谓在旧布局中是怎样的 不重构
            // 如果在旧布局里需要换行,则无论新布局里需不需要换行,都符合心理预期,此列不重构
            if (widthConfig.isWrap || oldWidthMap[key].isWrap) return false;
            // 如果本次布局的最小宽度大于旧布局的展示宽度,则在旧布局下需要换行,重构

            return (
              widthConfig.minWidth >
              (oldWidthMap[key].displayWidth === "auto"
                ? oldWidthMap[key].shouldDisplayWidth
                : oldWidthMap[key].displayWidth)
            );
          });
        this.isOldRowEmpty = false;
      }

      if (isNeedReBuild) {
        // 需要重构
        this.isShowTable = false;
        this.tableData = rows;
        this.$nextTick(() => {
          this.isShowTable = true;
          if (
            this.canShowSort &&
            this.tableInfo.reSortConfig &&
            this.$utils.gadgets.getPermison(this.permissionMove)
          ) {
            this.$nextTick(this.registerDragEvent);
          }
        });
      } else {
        this.widthMap = this.$utils.gadgets.deepClone(oldWidthMap);
        this.tableData = rows;
        if (
          this.canShowSort &&
          this.tableInfo.reSortConfig &&
          this.$utils.gadgets.getPermison(this.permissionMove)
        ) {
          this.$nextTick(this.registerDragEvent);
        }
      }

      clearTimeout(this.loadingTimer);
      this.isLoading = false;
    },

    _computeOtherColWidth() {
      let w = this.getOperationWidth();
      if (!this.securityHides.includes("select")) {
        w += 45;
      }
      if (!this.securityHides.includes("index")) {
        w += 60;
      }
      return w;
    },

    _getTextWidthByCanvas(text) {
      return this.canvas.ctx.measureText(text).width;
    },

    onCloseCreateDialog(isRefresh = true) {
      this.isShowCreateDialog = false;
      if (!isRefresh) return;
      this.pagination.pageNum = 1;
      this.search();
    },

    onCloseModifyDialog(isRefresh = true) {
      this.isShowModifyDialog = false;
      if (!isRefresh) return;
      this.pagination.pageNum = 1;
      this.search();
    },

    toggleSelect(d) {
      // 切换行的显示状态
      this.$refs.autoTable.toggleRowSelection(d);
    },

    registerDragEvent() {
      // TODO 重写拖动
      let rows = [...document.getElementsByClassName(this.randomRowClassName)];

      rows.forEach((row, index) => {
        row.classList.add("canDrag");
        row.onmousedown = (ev) => this._onMouseDragDownWrap(ev, index);
        row.onmousemove = (ev) => this._onMouseDragMove(ev, index);
      });

      this.dragInfo.rows = rows;

      document.addEventListener("mouseup", this._onMouseDragUp);
      document.addEventListener("mousemove", this._onMouseMoveMoveCanvas);
    },

    unregisterDragEvent() {
      let rows = [...document.getElementsByClassName(this.randomRowClassName)];
      rows.forEach((row, index) => {
        row.classList.remove("canDrag");
        row.onmousedown = null;
      });
      document.removeEventListener("mouseup", this._onMouseDragUp);
      document.removeEventListener("mousemove", this._onMouseMoveMoveCanvas);
    },

    _onMouseDragDownWrap(ev, index) {
      this.dragInfo.startX = ev.pageX;
      this.dragInfo.startY = ev.pageY;
      this.dragInfo.startWillDrag = true;

      clearTimeout(this.dragInfo.timer);
      this.dragInfo.timer = setTimeout(() => {
        this._onMouseDragDown(ev, index);
      }, 300);
    },

    _onMouseDragDown(ev, index) {
      this.dragInfo.dragIndex = index;
      this.dragInfo.isDragging = true;
      this.dragInfo.dragRow = this.$utils.gadgets.deepClone(
        this.tableData[index]
      );

      let rowDom = this._findRowDomByEv(ev);
      this.dragInfo.rowDom = rowDom;
      rowDom.classList.add("onDraggingRow");
      html2canvas(rowDom).then((canvas) => {
        if (!this.dragInfo.isDragging) {
          canvas.remove();
          return;
        }
        let rect = rowDom.getBoundingClientRect();
        canvas.style.left = `${rect.left + 4}px`;
        canvas.style.top = `${rect.top + 4}px`;
        canvas.style.zIndex = 99999;
        canvas.classList.add("onDraggingCanvas");
        document.body.append(canvas);
        this.dragInfo.draggingCanvas = canvas;
      });
    },

    _onMouseDragUp(ev) {
      clearTimeout(this.dragInfo.timer);
      this.dragInfo.startWillDrag = false;

      if (this.dragInfo.isDragging) {
        this.dragInfo.isDragging = false;
        this.dragInfo.draggingCanvas && this.dragInfo.draggingCanvas.remove();
        this.dragInfo.rows.forEach((row) => {
          row.classList.remove("onDraggingRow");
        });
      }
    },

    _onMouseDragMove(ev, index) {
      if (this.dragInfo.antiShake) {
        return;
      }

      this.dragInfo.antiShake = true;
      setTimeout(() => {
        this.dragInfo.antiShake = false;
      }, 100);

      if (!this.dragInfo.isDragging || !this.dragInfo.draggingCanvas) return;

      let targetRowDom = this._findRowDomByEv(ev);
      let rect = targetRowDom.getBoundingClientRect();

      let centerLine = rect.top + targetRowDom.offsetHeight / 2; // 元素的中线
      let targetIndex = ev.pageY < centerLine ? index : index + 1;
      if (
        this.dragInfo.targetIndex !== targetIndex &&
        this.dragInfo.dragIndex !== targetIndex
      ) {
        this.dragInfo.targetIndex = targetIndex;
        this._onDragReplace();
      }
    },

    _onMouseMoveMoveCanvas(ev) {
      if (
        this.dragInfo.startWillDrag &&
        (!this.dragInfo.isDragging || !this.dragInfo.draggingCanvas)
      ) {
        // 预备拖动,但是还没有真的拖动
        if (
          Math.abs(ev.pageX - this.dragInfo.startX) +
          Math.abs(ev.pageY - this.dragInfo.startY)
        ) {
          this.dragInfo.startWillDrag = false;
          clearTimeout(this.dragInfo.timer);
        }
      }

      if (!this.dragInfo.isDragging || !this.dragInfo.draggingCanvas) return;

      let oldLeft = parseInt(this.dragInfo.draggingCanvas.style.left);
      this.dragInfo.draggingCanvas.style.left = `${oldLeft + ev.movementX}px`;
      // let oldTop = parseInt(this.dragInfo.draggingCanvas.style.top);
      this.dragInfo.draggingCanvas.style.top = `${ev.pageY - 20}px`;
    },

    _onDragReplace() {
      if (this.dragInfo.dragIndex < this.dragInfo.targetIndex) {
        // 向下拖
        this.dragInfo.exchanged = true;
        this.tableData.splice(
          this.dragInfo.targetIndex,
          0,
          this.dragInfo.dragRow
        );
        this.tableData.splice(this.dragInfo.dragIndex, 1);
        this.dragInfo.targetIndex = this.dragInfo.targetIndex - 1;
      } else if (this.dragInfo.dragIndex > this.dragInfo.targetIndex) {
        this.dragInfo.exchanged = true;
        this.tableData.splice(this.dragInfo.dragIndex, 1);
        this.tableData.splice(
          this.dragInfo.targetIndex,
          0,
          this.dragInfo.dragRow
        );
      }
      this.dragInfo.dragIndex = this.dragInfo.targetIndex;
      this.dragInfo.rows.forEach((row, index) => {
        if (index === this.dragInfo.dragIndex) {
          row.classList.add("onDraggingRow");
        } else {
          row.classList.remove("onDraggingRow");
        }
      });
    },

    _findRowDomByEv(ev) {
      return ev.path.find((dom) => {
        try {
          let classList = [...dom.classList];
          return classList.includes(this.randomRowClassName);
        } catch (e) {
          return false;
        }
      });
    },

    async flashSort() {
      if (this.sortLoading) return;

      let query = this.getQuery();
      query.curList = this.tableData;

      let url = this.tableInfo.reSortConfig.sortPath;
      if (!url) return;

      this.sortLoading = true;
      let ok = await this.$ajax.autoTable.sort(url, query);
      if (ok) {
        this.$message.success("排序成功");
        this.search(false);
      } else {
        this.$message.error("排序失败");
        this.sortLoading = false;
      }
    },

    async submitMoveTo() {
      this.moveToInfo.value = parseInt(this.moveToInfo.value);
      if (!this.$utils.gadgets.isSpecialTrue(this.moveToInfo.value)) {
        return false;
      }

      if (this.moveToInfo.value <= 0) {
        this.$message.error("移动至的目标必须为正数");
        return false;
      }

      if (this.moveToInfo.value > this.pagination.total) {
        this.$message.error("移动至的目标不能大于数据总条数");
        return false;
      }

      let query = this.getQuery();

      let url = this.tableInfo.reSortConfig.moveToPath;
      if (!url) return false;

      let [ok, msg] = await this.$ajax.autoTable.moveTo(url, {
        ...query,
        // id: this.multipleSelection[0].id,
        ...this.multipleSelection[0],
        moveToIndex: this.moveToInfo.value,
      });
      if (ok) {
        this.$message.success("移动成功");
        this.search(false);
      } else {
        this.$message.error(`移动失败,${msg}`);
      }
      this.moveToInfo.value = "";
      return ok;
    },

    getActionPermission(column, actonIndex, actionContent) {
      // 获取type===action的对应权限
      if (!column.permissionKey) {
        // 没有配权限 则为全部权限
        return "allow";
      }

      if (Array.isArray(column.permissionKey)) {
        return _getPermission(column.permissionKey[actonIndex]);
      } else {
        return _getPermission(column.permissionKey);
      }

      function _getPermission(strOrFunc) {
        if (typeof strOrFunc === "string") {
          return strOrFunc;
        }
        return strOrFunc(actionContent);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/config";
@import "../../style/styles";

.auto-table-container {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  padding: @defaultPaddingY @defaultPaddingX;
  background-color: @defaultCardBgColor;
  display: flex;
  flex-direction: column;
  position: relative;

  .operation-container {
    display: flex;
    align-items: center;
    margin-bottom: @defaultPaddingY;
    flex-shrink: 0;

    .right-icons {
      margin-left: auto;
      height: 100%;
      display: flex;
      align-items: center;

      .icon {
        font-size: 28px;
        margin-right: @defaultPaddingX / 2;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .table-container {
    width: 100%;
    margin-bottom: @defaultPaddingY;
    flex: 1;
    overflow: hidden;

    .row-container {
      display: flex;
      align-items: center;

      .with-point {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    .align-center {
      justify-content: center;
    }

    .op-bt {
      margin-right: 4px;

      .op-bt-img-icon {
        width: 12px;
        position: relative;
        top: 1px;
      }
    }

    .action-op-bt {
      text-align: left !important;
      white-space: unset !important;
    }

    .input-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .input-container-input {
        width: 70%;
      }

      .submit-bt-container {
        width: 22px;
        height: 22px;
        background: @defaultBlueClick;
        border-radius: 50%;
        color: white;
        .flexCenter();
      }
    }

    .img-container {
      overflow: hidden;
      padding-right: 47px; // TODO 诡异的数字

      img {
        width: 99%;
        height: 99%;
        object-fit: scale-down;
        overflow: hidden;
        border: 1px solid @defaultBorderColor;
      }
    }

    .empty {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 245px;
      }
    }
  }

  .card-view-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;

    .card-view-cell-container {
      margin: 0 15px 15px 0;
    }
  }

  .pagination-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    flex-shrink: 0;
  }
}

.cardViewWrapper {
  background-color: @defaultBgColor;
}

#canvas {
  position: absolute;
  left: -1000px;
  display: none;
}

.moveTo {
  color: #fff;
  background-color: #6ac6c8;
  border-color: #6ac6c8;
}

.moveTo.is-disabled {
  background-color: #99dee0;
  border-color: #99dee0;
}
</style>

<style lang="less">
@import "../../style/config";
@import "../../style/styles";

.auto-table-container {
  .FH-table {
    border: 1px solid @defaultBorderColor;
  }

  .el-table th {
    height: 40px;
    background: @defaultTableHeadBgColor;
    color: @defaultTableHeadColor;
    font-weight: 600;
  }
}

.auto-table-pop-container {
  .el-popconfirm__action {
    margin-top: 8px;
  }
}

.el-table tr {
  height: 40px !important;
  padding: 0;
}

.el-table td {
  padding: 0;
}

.el-table__row--level-1 {
  .el-table__indent {
    display: none;
  }
}

.pointer {
  .el-table tr {
    cursor: pointer;
  }
}

.canDrag {
  transition: all @defaultAnimationTime;
  /*transform: translateY(20px);*/
}

.onDraggingRow {
  opacity: 0.4;
  transform: translateX(40px);
}

.onDraggingCanvas {
  position: fixed;
  border: 1px solid @defaultBorderColor;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  pointer-events: none;
}

.noSelect {
  user-select: none;
}
</style>
