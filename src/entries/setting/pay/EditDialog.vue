<template>
  <div class="edit-dialog">
    <el-dialog
      title="编辑"
      width="600px"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="() => $emit('close-click')">

      <div class="edit-dialog__main">
        <el-form class="edit-dialog__el-form" label-width="130px" :rules="rule" ref="payDetail" :model="payDetail">
          <div class="edit-dialog__el-form-label">
            <h3>商户信息</h3>
            <el-form-item label="商户ID：" class="detail-item">
              <span>{{ payDetail.userId }}</span>
            </el-form-item>
            <el-form-item label="商户名称：" class="detail-item">
              <span>{{ payDetail.commercialName }}</span>
            </el-form-item>
            <el-form-item label="用户类型：" class="detail-item">
              <span>{{ formatUserType(payDetail.userType) }}</span>
            </el-form-item>
          </div>

          <div class="edit-dialog__el-form-label">
            <h3>支付设置</h3>
            <el-form-item label="通道费承担方" prop="payAssume">
              <el-select v-model="payDetail.payAssume" placeholder="请选择">
                <el-option
                  v-for="item in payAssumeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付通道费" prop="payServiceCharge">
              <el-input v-model="payDetail.payServiceCharge" @change="formatRatio"></el-input>
              <span class="unit">%</span>
            </el-form-item>
          </div>

          <div class="edit-dialog__el-form-label">
            <h3>备注信息</h3>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="payDetail.remark"></el-input>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('payDetail')">提交</el-button>
            <el-button @click="resetForm('payDetail')">重置</el-button>
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
    props: ['payDetail'],
    data() {
      return {
        payAssumeOptions: [{
          value: 'landlord',
          label: '收款方承担'
        },{
          value: 'renter',
          label: '付款方承担'
        }],
        rule: {
          payAssume: [
            { required: true, message: '请选择通道费承担方', trigger: 'blur' },
          ],
          payServiceCharge: [
            { required: true, message: '请输入支付通道费', trigger: 'blur' },
          ],
          // remark: [
          //   { required: true, message: '请填写备注信息', trigger: 'blur' },
          // ]
        }
      };
    },

    methods: {

      formatRatio(ratio) {

        if(this.payDetail.payServiceCharge <= 0.03 ) {
          this.payDetail.payServiceCharge = 0.03;
        }
        if(this.payDetail.payServiceCharge >= 100 ) {
          this.payDetail.payServiceCharge = 100;
        }
        this.payDetail.payServiceCharge = isNaN(parseFloat(this.payDetail.payServiceCharge)) ? '0.03' : parseFloat(this.payDetail.payServiceCharge).toFixed(2);
      },

      formatUserType(type) {
        return format.formatUserType(type);
      },

      submitForm(formName) {
        console.log(this.$refs[formName]);

        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            let params = {
              userId: this.payDetail.userId,
              assumePerson: this.payDetail.payAssume,
              payCharge: this.payDetail.payServiceCharge,
              remark: this.payDetail.remark
            }
            api.editSettingPay(params)
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
      },

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
      .detail-item {
        margin-bottom: 10px;
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
