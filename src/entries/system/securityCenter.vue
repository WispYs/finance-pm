<template>
  <div class="security-center">
    <h3 class="security-center__title">安全中心</h3>
    <table border="1">
      <tr class="security-center__row is-header">
        <th>类目</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      <!-- <tr class="security-center__row">
        <td>上次登陆时间</td>
        <td>2019-01-01 23:08:09</td>
        <td>-</td>
      </tr> -->
      <tr class="security-center__row">
        <td>登录密码</td>
        <td>用于登陆“水滴金融后台系统”</td>
        <td>
          <el-button
            type="text"
            size="small"
            @click="edit">
            修改
          </el-button>
        </td>
      </tr>
    </table>
    <edit-passworld-dialog
      :account="loginAccount"
      v-if="editPassworldShow"
      @close-click="editPassworldShow = false">
    </edit-passworld-dialog>
  </div>
</template>

<script>
  import api                  from '@/api/api';
  import EditPassworldDialog  from './securityCenter/EditPassworldDialog';

  export default {
    components: {
      EditPassworldDialog
    },
    data() {
      return {
        editPassworldShow: false,
        loginAccount: ''
      };
    },

    methods: {
      edit() {
        this.editPassworldShow = true;
        api.userInfo()
          .then(rep => {
            this.loginAccount = rep.data.loginAccount;
          })
          .catch(err => this.$message.error(err))
      }
    },

    created() {

    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .security-center {
    padding: 10px 20px;
    &__title {
      font-size: 18px;
      color: $black-light;
      font-weight: normal;
      margin-left: 20px;
    }
    table {
      min-width: 100%;
      margin: 20px;
      border-collapse: collapse;
      border: 1px solid #ebeef5;
    }

    &__row {
      border-bottom: 1px solid #ebeef5;
      color: #606266;
      text-align: left;
      cursor: pointer;

      &.is-header {
        color: #909399;
        font-weight: bold;
        background:#f2f2f2;
      }

      th, td {
        padding: 20px 10px;

      }

    }

  }
</style>
