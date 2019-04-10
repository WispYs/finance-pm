<template>
  <div class="edit-fee-dialog">
    <el-dialog
      :title="isBatch ? '批量修改费率' : '修改费率'"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="cancel">

      <div class="edit-fee-dialog__main">
        <div class="edit-fee-dialog__header-bar">
          <div class="edit-fee-dialog__merchant-info">
            <template v-if="isBatch">
              <span>共选择 {{ merchants.length }} 个商户</span>
              <span>金水滴 5 个</span>
              <span>蓝钻水滴 10 个</span>
            </template>

            <template v-else>
              <span>商户号: {{ merchants[0].merchantId }}</span>
              <span>公寓名称: {{ merchants[0].apartment }}</span>
              <span>会员类型: {{ merchants[0].vipType }}</span>
            </template>
          </div>

          <div class="edit-fee-dialog__operation">
            <el-button
              type="success"
              size="mini"
              round
              icon="el-icon-circle-plus"
              @click="addPayChannel">
              收单通道
            </el-button>
          </div>
        </div>

        <div class="edit-fee-dialog__channel">
          <ul>
            <li class="edit-fee-dialog__channel-name">收单通道</li>
            <li class="edit-fee-dialog__channel-fee">费率(%)</li>
          </ul>

          <ul v-for="channel in payChannels">
            <li class="edit-fee-dialog__channel-name">
              <el-select size="small" v-model="channel.name" placeholder="请选择">
                <el-option
                  v-for="(channel, index) in payChannelOptions"
                  :key="index"
                  :label="channel.name"
                  :value="channel.name">
                </el-option>
              </el-select>
            </li>

            <li class="edit-fee-dialog__channel-fee">
              <el-input-number
                size="medium"
                :min="0"
                :step="0.1"
                v-model="channel.fee">
              </el-input-number>

              <span
                v-if="payChannels.length > 1"
                class="edit-fee-dialog__remove-btn el-icon-remove"
                @click="removePayChannel(channel)">
              </span>
            </li>
          </ul>
        </div>

        <div class="edit-fee-dialog__reason">
          <label class="edit-fee-dialog__reason__label">
            <span>修改原因</span>
            <i>*</i>
          </label>

          <el-input
            type="textarea"
            resize="none"
            :rows="2"
            placeholder="请输入修改原因"
            v-model="reason">
          </el-input>
        </div>
      </div>

      <div slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm" type="primary" :disabled="reason === ''">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import testData from '@/mock-data/merchants';

  export default {
    props: ['isBatch', 'merchants'],

    data() {
      let payChannels = this.isBatch
       ? testData.meta.payChannels.slice(1, 4).map(c => Object.assign({}, c, { fee: 0 }))
       : [].concat(this.merchants[0].payChannels);

      return {
        payChannels: payChannels,
        payChannelOptions: testData.meta.payChannels.filter((c, i) => i !== 0),
        reason: ''
      };
    },

    methods: {
      addPayChannel() {
        this.payChannels = this.payChannels.concat(Object.assign({}, this.payChannels[0], { fee: 0 }));
      },
      removePayChannel(payChannelToRemove) {
        this.payChannels = this.payChannels.filter(c => c !== payChannelToRemove);
      },

      cancel() {
        this.$emit('cancel-edit');
      },
      confirm() {
        // TODO: validate
        // TODO: conncet api
        this.$confirm('确定修改费率？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let submitData = {
            payChannels: this.payChannels,
            reason: this.reason
          };
          console.log(submitData);
          this.$emit('edit-done');
        })
        .catch(() => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';
  @import '~styles/mixins/clearfix';

  .edit-fee-dialog {
    &__header-bar {
      @include clearfix;
      padding-bottom: 5px;
      border-bottom: 1px solid $gray-lighter;
    }

    &__merchant-info {
      float: left;
      color: $gray-dark;

      span {
        margin-right: 20px;
      }
    }

    &__operation {
      float: right;
    }

    &__channel {
      max-height: 300px;
      overflow-y: auto;
    }

    &__channel-name,
    &__channel-fee {
      padding: 5px 0;
      display: inline-block;
      width: 48%;
      text-align: center;

      .el-select {
        width: 80%;
      }
    }

    &__remove-btn {
      color: $red;
      cursor: pointer;
    }

    &__reason {
      margin-top: 10px;

      &__label {
        margin-bottom: 10px;
        display: inline-block;

        i {
          color: $red;
        }
      }
    }
  }
</style>
