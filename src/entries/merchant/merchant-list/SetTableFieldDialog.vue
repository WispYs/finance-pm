<template>
  <div class="set-table-field-dialog">
    <el-dialog
      title="设置表格显示字段"
      :visible="true"
      :close-on-click-modal="false"
      :before-close="close">

      <div class="set-table-field-dialog__main">
        <div class="set-table-field-dialog__invisible-field">
          <label class="set-table-field-dialog__invisible-field__label">
            未显示的字段({{ invisibleFields.length }})
          </label>

          <div class="set-table-field-dialog__invisible-field__drag-box">
            <draggable v-model="invisibleFields" :options="dragOptions">
              <div class="drag-item" v-for="(field, index) in invisibleFields" :key="index">
                {{ field }}
              </div>
            </draggable>
          </div>
        </div>

        <div class="set-table-field-dialog__visible-field">
          <label class="set-table-field-dialog__visible-field__label">
            <span>显示的字段({{ visibleFields.length }})</span>
            <span class="tips">拖动可进行排序</span>
          </label>

          <div class="set-table-field-dialog__visible-field__drag-box">
            <div class="fixed-item">序号</div>
            <draggable v-model="visibleFields" :options="dragOptions">
              <div class="drag-item" v-for="(field, index) in visibleFields" :key="index">
                {{ field }}
              </div>
            </draggable>
            <div class="fixed-item">操作</div>
          </div>
        </div>
      </div>

      <div slot="footer">
        <el-button @click="reset">恢复默认</el-button>
        <el-button @click="save" type="primary">保存设置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    components: {
      draggable
    },

    data() {
      return {
        dragOptions: {
          group: 'fields',
          ghostClass: 'dragging',
          animation: 120,
          scroll: true
        },

        invisibleFields: ['结算规则', '支付宝（线上）通道', '支付宝（线下）通道', '微信（线上）通道',
        '借记卡（快捷支付）通道', '借记卡（商业委托）通道','贷记卡（快捷支付）通道', '贷记卡（商业委托）通道', '网银支付（B2B）通道', '网银支付（B2C 借记卡）通道', '网银支付（B2B 贷记卡）通道', '支付机构商户号', '现用支付机构', '累计交易金额', '累计结算金额', '计到账金额', '会员状态', '注册时间', '总房间数', '平均出房价格', '入住率', '空置房间数', '新增房间数', '删除房间数', '商户类型', '公司成立时间', '公司名称', '营业执照号', '法人', '法人身份证', '预留银行卡', '预留银行卡开户行', '省', '市'],
        visibleFields: ['商户号（水滴）', '公寓名称', '会员类型', '手机号', '账户状态', 'T日余额', 'T+1日余额',   '账户总余额', '待结算金额', '结算手续费', '费率承担方']
      };
    },

    methods: {
      close() {
        this.$emit('cancel-set');
      },

      reset() {
        // TODO: connect api
        this.$emit('set-done');
      },
      save() {
        // TODO: connect api
        this.$emit('set-done');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .set-table-field-dialog {
    &__main {
      display: flex;
    }

    &__invisible-field {
      margin-right: 15px;
    }

    &__invisible-field,
    &__visible-field {
      flex: 1;

      &__label {
        font-weight: bold;

        .tips {
          float: right;
          color: $gray-dark;
          font-size: $font-size-smaller;
        }
      }

      &__drag-box {
        margin-top: 10px;
        padding: 0 10px;
        height: 400px;
        border: 1px solid $gray-light;
        background-color: $gray-lighter;
        overflow-y: auto;
        user-select: none;

        &::-webkit-scrollbar {
          width: 0;
        }

        .fixed-item {
          padding: 10px;
        }

        .drag-item {
          margin: 10px 0;
          padding: 10px;
          background-color: $white;
          border-radius: 4px;
          transition: border .3s ease-in;
          cursor: pointer;

          &.dragging, &:hover {
            border: 1px dashed $blue;
          }
        }
      }
    }
  }
</style>
