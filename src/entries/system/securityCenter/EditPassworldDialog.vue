<template>
  <div class="edit-passworld">
    <el-dialog
      title="修改密码"
      width="500px"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="() => $emit('close-click')">

      <div class="edit-passworld__main">
        <el-form :model="editPassworld" status-icon :rules="rule" ref="editPassworld" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登入账号">
            <div>{{account}}</div>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPass">
            <el-input type="password" v-model="editPassworld.oldPass" placeholder="请输入旧密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input type="password" v-model="editPassworld.newPass" placeholder="请输入新密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="editPassworld.checkPass" placeholder="请再次输入新密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('editPassworld')">重置</el-button>
            <el-button type="primary" @click="submitForm('editPassworld')">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api    from '@/api/api';

  export default {
    props: ['account'],
    data() {
      let validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      let validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        }else if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
          callback(new Error('必须由6-18位英文字母或数字组成'));
        } else {
          if (this.editPassworld.checkPass !== '') {
            this.$refs.editPassworld.validateField('checkPass');
          }
          callback();
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
          callback(new Error('必须由6-18位英文字母或数字组成'));
        } else if (value !== this.editPassworld.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        editPassworld: {
          oldPass: '',
          newPass: '',
          checkPass: '',
        },
        rule: {
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validateCheckPass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              password: this.editPassworld.oldPass,
              newPassword: this.editPassworld.newPass,
            }
            api.updatePassword(data)
              .then(rep => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$emit('close-click');
                this.$router.push({
                  name: 'login'
                })
              })
              .catch(err => this.$message.error(err));

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .edit-passworld {
    .el-input {
      width: 320px;
    }

  }
</style>
