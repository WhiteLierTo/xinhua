<template>
  <div class="bind">
    <div class="title">
      微信绑定
    </div>
    <div class="qrcode">
      <img :src="url" alt="" />
    </div>
    <div class="tip">扫描二维码，绑定当前系统账号</div>
    <el-button size="mini" class="btn" @click="reset">重新获取</el-button>
    <div class="title">
      用户绑定列表
    </div>
    <el-table v-loading="loading" :data="bindList">
      <el-table-column label="编号" prop="userId" />
      <el-table-column label="头像" prop="headImg">
        <template slot-scope="scope">
          <img :src="scope.row.headImg" alt="" class="headImg" />
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" prop="nickName" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="申请时间" prop="createTime"
        ><template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template></el-table-column
      >
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="unbind(scope.row.id)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="remind(scope.row.id)"
            >备注</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="remarks"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { userList, getQR, remark, delUser } from "@/api/system/binding";

export default {
  name: "Binding",
  data() {
    return {
      bindList: [],
      loading: false,
      dialogVisible: false,
      remarks: "",
      id: "",
      url: ""
    };
  },
  mounted() {
    this.getList();
    this.getQR();
  },
  methods: {
    /** 查询微信用户列表 */
    getList() {
      this.loading = true;
      userList().then(response => {
        this.bindList = response.data;
        this.loading = false;
      });
    },

    /** 获取二维码url*/

    getQR() {
      getQR().then(response => {
        this.url = response.msg;
      });
    },

    /**删除用户 */

    delUser(id) {
      delUser(id).then(response => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getList();
      });
    },

    /**备注 */
    submit() {
      const info = {
        id: this.id,
        remark: this.remarks
      };
      remark(info).then(response => {
        this.$message({
          type: "success",
          message: "备注成功!"
        });
        this.getList();
        this.dialogVisible = false;
      });
    },
    unbind(id) {
      this.$confirm("删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delUser(id);
      });
    },
    remind(id) {
      this.dialogVisible = true;
      this.id = id;
    },

    /**重新获取url */

    reset() {
      this.getQR();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.bind {
  width: 100%;
  .qrcode {
    display: flex;
    justify-content: center;
    img {
      width: 132px;
      height: 132px;
      background-color: #f0f0f0; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
    }
  }
  .headImg {
    width: 30px;
    height: 30px;
  }
  .tip {
    text-align: center;
    padding-top: 15px;
    color: dodgerblue;
  }
  .btn {
    display: block;
    margin: 10px auto;
  }
  .title {
    font-size: 18px;
    color: #000;
    border-left: 3px solid #409eff;
    padding-left: 5px;
    margin: 25px;
  }
}
</style>
