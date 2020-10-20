<template>
  <div class="menu-content hnjdcldc">
    <div class="menu-operation">
      <!--<el-button type="success" @click="create" icon="el-icon-plus">新增</el-button>-->
      <el-button
          type="warning"
          @click="modify"
          icon="el-icon-edit"
          :disabled="checked.length!==1"
      >修改
      </el-button>
      <!--<el-button-->
      <!--type="info"-->
      <!--@click="delHandle"-->
      <!--icon="el-icon-delete"-->
      <!--:disabled="checked.length===0"-->
      <!--&gt;删除-->
      <!--</el-button>-->
    </div>
    <div class="menu-table">
      <div class="menu-card" v-for="(item,index) in themeList" :key="index">
        <el-checkbox-group v-model="checked" @change.stop="checkChange(item)">
          <el-checkbox :label="item.id" v-show="item.isEfficient===0&&item.isDefault===0"></el-checkbox>
        </el-checkbox-group>
        <div class="tip" v-if="item.isEfficient===1">生效中</div>
        <h4>
          {{item.themeName}}
          <span v-if="item.isDefault===1">【默认】</span>
        </h4>
        <div class="card-line">
          <ul>
            <li>
              频道文字颜色 :
              <span>{{item.channelWordColor}}</span>
              <span class="mode" :style="{background:item.channelWordColor}"></span>
            </li>
            <li>
              频道高亮颜色 :
              <span>{{item.channelWordHighlightColor}}</span>
              <span class="mode" :style="{background:item.channelWordHighlightColor}"></span>
            </li>
            <li>
              文字高亮颜色 :
              <span>{{item.wordHighlightColor}}</span>
              <span class="mode" :style="{background:item.wordHighlightColor}"></span>
            </li>
            <li>
              首页图片蒙版 :
              <span v-if="item.indexImgCover===0">无（默认）</span>
              <span v-else-if="item.indexImgCover===1">灰色</span>
            </li>
          </ul>
        </div>
        <div class="menu-time">
          <i class="el-icon-time" v-if="item.takeEffectStartTime&&item.takeEffectEndTime"/>
          <span
              v-if="item.takeEffectStartTime&&item.takeEffectEndTime"
          >{{item.takeEffectStartTime}} —— {{item.takeEffectEndTime}}</span>
          <span @click="effectHandle(item.id)" v-show="item.show && item.isEfficient!==1">立即生效</span>
        </div>
      </div>
    </div>
    <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="pagination.pageNum"
        :page-size.sync="pagination.pageSize"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-if="themeList.length!==0"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        pagination: {
          pageNum: 1,
          pageSize: 20,
          total: 0
        },
        themeList: [],
        currentData: {},
        checked: [],
        isCheck: false
      };
    },
    computed: {},
    mounted() {
      this.getThemeList();
    },
    methods: {
      getThemeList() {
        this.$ajax.menu.themeList(this.pagination).then(res => {
          let date = new Date();
          if (res.rows.length > 0) {
            res.rows.forEach(v => {
              v.show = false;
              if (
                  Date.parse(date) >= v.takeEffectStartTime &&
                  Date.parse(date) <= v.takeEffectEndTime
              ) {
                v.show = true;
              }
              v.takeEffectStartTime = this.$utils.format.dateStampToStandardStr(
                  v.takeEffectStartTime
              );
              v.takeEffectEndTime = this.$utils.format.dateStampToStandardStr(
                  v.takeEffectEndTime
              );
            });
            this.themeList = res.rows;
            this.pagination.total = res.total;
          }
        });
      },
      create() {
        this.$router.push("/menu/addMenu");
      },
      checkChange(item) {
        this.currentData = JSON.parse(JSON.stringify(item));
      },
      modify() {
        this.$router.push({
          path: "/menu/addMenu",
          query: {id: this.checked[0]}
        });
      },
      delHandle() {
        this.$confirm("请确认是否删除选中数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$ajax.menu.deleteTheme(this.checked).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              this.getThemeList();
            } else {
              this.$message.error(res.msg);
            }
          });
        });
      },
      effectHandle(id) {
        this.$ajax.menu.themeEffect(id).then(res => {
          this.$message.success(res.msg);
          this.getThemeList();
        });
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getThemeList();
      },
      handleCurrentChange(val) {
        this.pagination.pageNum = val;
        this.getThemeList();
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../../style/config";
  @import "../../../style/styles";

  .menu-content {
    .menu-operation {
      display: flex;
      align-items: center;
      margin-bottom: @defaultPaddingY;
      flex-shrink: 0;
    }

    .menu-table {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .menu-card {
        position: relative;
        cursor: pointer;
        width: 540px;
        height: 337px;
        border-radius: 20px;
        background-color: #fff;
        margin-bottom: 10px;
        margin-right: 10px;

        h4 {
          text-align: center;
          color: @defaultTileColor;
          font-size: 24px;
        }

        .tip {
          position: absolute;
          top: 0;
          left: 0;
          width: 138px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background: #16a05d;
          color: #fff;
          border-top-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .card-line {
          width: 100%;
          border-bottom: 1px dashed #c1e1ff;
          padding-bottom: 30px;

          ul {
            width: 45%;
            margin: 20px auto 0;
            margin-top: 20px;
            list-style-type: none;
          }

          li {
            color: #666;
            font-size: @bigFontSize;
            padding-top: 10px;

            span {
              padding-left: 15px;
            }

            .mode {
              width: 20px;
              height: 20px;
              float: right;
            }
          }
        }

        .menu-time {
          display: flex;
          align-items: center;
          justify-content: center;
          color: @defaultTileColor;
          font-size: @bigFontSize;
          margin-top: 20px;

          span:last-child {
            width: 144px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #4383e4;
            border-radius: 20px;
            color: #4383e4;
            margin-left: 60px;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .hnjdcldc {
    .el-checkbox {
      display: flex;
      justify-content: flex-end;
      height: 40px;

      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin: 25px;
      }

      .el-checkbox__inner::after {
        top: 3px;
        left: 7px;
      }
    }

    .el-checkbox__label {
      opacity: 0;
    }

    .el-pagination {
      display: flex;
      flex-direction: row-reverse;
    }

    .el-checkbox-group {
      height: 40px;
    }
  }
</style>
