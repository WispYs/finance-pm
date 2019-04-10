<template>
  <div class="login">
    <div class="login__title">水滴金融后台管理系统</div>

    <div class="login__username">
      <el-input
        v-model.trim="username"
        autofocus
        clearable
        @keyup.enter.native="login"
        placeholder="用户名">
        <template slot="prepend">
          <i class="far fa-user"></i>
        </template>
      </el-input>
    </div>

    <div class="login__username">
      <el-input
        type="password"
        v-model.trim="password"
        clearable
        @keyup.enter.native="login"
        placeholder="密码">
        <template slot="prepend">
          <i class="fas fa-lock"></i>
        </template>
      </el-input>
    </div>

    <div class="login__login-btn">
      <el-button type="primary" round @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api';

  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },

    methods: {
      login() {
        const username = this.username;
        const password = this.password;

        if(username == '') {
          this.$message.error('请输入用户名')
          return
        }
        if(password == '') {
          this.$message.error('请输入密码')
          return
        }

        api.fetchUserLogin({ username, password })
          .then(rep => {
            if(rep.data) {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              let user = Object.assign({}, rep.data, {
                username: username,
                password: password
              })
              this.$store.dispatch('SAVE_USER', user);
              localStorage.setItem('FINANCE_TOKEN', rep.data.token);
              localStorage.setItem('FINANCE_USERID', rep.data.userId);
              let financeType = rep.data.type;
              // 水滴、B端商户跳转到商户列表; 魔方类子商户跳转到我的账号;   1、水滴；2、魔方类(B端)；3、魔方子商户
              if(financeType == '3') {
                this.$router.push({ name: 'account__myAccount' });
              }else {
                this.$router.push({ name: 'merchantMgt__merchantList' });
              }
            }else {
              this.$message.error('网络错误')
            }

          })
          .catch(err => this.$message.error(err))
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .login {
    margin: 100px auto;
    padding: 20px 100px 50px 100px;
    width: 300px;
    background-color: $white;
    box-shadow: 0 0 15px $gray;
    border-radius: 8px;

    &__title {
      margin-top: 20px;
      font-size: $font-size-larger;
      font-weight: 900;
      text-align: center;
    }

    &__username {
      margin-top: 20px;
    }

    &__password {
      margin-top: 20px;
    }

    &__login-btn {
      margin-top: 20px;

      .el-button {
        width: 100%;
      }
    }
  }
</style>
