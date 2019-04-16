<template>
  <div class="edit-dialog">
    <el-dialog
      title="编辑"
      width="600px"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="() => $emit('close-click')">
      <div class="edit-dialog__main">
        <el-form class="edit-dialog__el-form" label-width="130px" :rules="rule" ref="withDrawDetail" :model="withDrawDetail">
          <div class="edit-dialog__el-form-label">
            <h3>商户信息</h3>
            <el-form-item label="商户ID">
              <span>{{ withDrawDetail.userId }}</span>
            </el-form-item>
            <el-form-item label="商户名称">
              <span>{{ withDrawDetail.commercialName }}</span>
            </el-form-item>
            <el-form-item label="用户类型">
              <span>{{ formatUserType(withDrawDetail.userType) }}</span>
            </el-form-item>

          </div>

          <div class="edit-dialog__el-form-label">
            <h3>提现模式</h3>
            <el-form-item label="提现模式" prop="withDrawType">
              <el-select v-model="withDrawDetail.withDrawType" placeholder="请选择">
                <el-option
                  v-for="item in withDrawTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="edit-dialog__el-form-label">
            <h3>备注信息</h3>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="withDrawDetail.remark"></el-input>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('withDrawDetail')">提交</el-button>
            <el-button @click="resetForm('withDrawDetail')">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api      from '@/api/api';
  import format   from '@/services/format';

  export default {
    props: ['withDrawDetail'],
    data() {
      return {
        withDrawTypeOptions: [{
          value: '0',
          label: '手动提现'
        },{
          value: '1',
          label: '自动提现（固定时间）T+1日'
        }],
        rule: {
          withDrawType: [
            { required: true, message: '请选择提现模式', trigger: 'blur' },
          ]
        }
      };
    },

    methods: {

      formatUserType(type) {
        return format.formatUserType(type);
      },
      submitForm(formName) {
        console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            let params = {
              userId: this.withDrawDetail.userId,
              withDrawType: this.withDrawDetail.withDrawType,
              remark: this.withDrawDetail.remark
            }
            api.editSettingWithdraw(params)
              .then(rep => {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                });
                this.$emit('reload');
                this.$emit('close-click');
              })
              .catch(err => this.$message.error(err))
          } else {
            // this.$message.error('修改失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

    created() {

    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .edit-dialog {
    &__main {
      padding:0 20px;
      h3 {
        margin-top: 0;
      }
      .el-select {
        width: 100%;
      }
      .el-form-item__content {
        margin-right: 50px;
      }
      .unit {
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
  }
</style>
