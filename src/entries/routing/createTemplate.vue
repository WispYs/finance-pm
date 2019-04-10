<template>
  <div class="merchant-create">
    <el-form class="merchant-create__el-form" label-width="130px" ref="template" :model="template">
      <div class="merchant-create__el-form-label">
        <h3>基础信息</h3>
        <el-form-item label="模板名称">
          <i class="icon-require">*</i>
          <el-input v-model="template.templateName" :class="requireName ? '' : 'require-error'"></el-input>
          <b v-if="!requireName" class="require-tip">请输入模板名称</b>
        </el-form-item>
      </div>
      <div class="merchant-create__el-form-label">
        <h3>分账设置</h3>
        <el-form-item
          v-for="item in payAssume"
          :label="item.label"
          :key="item.key"
          class="pay-assume">
          <i v-if="item.key < 3" class="icon-require" style="left: -122px;">*</i>
          <el-input :ref="item.model" @change="formatRatio(item.model)"></el-input>
          <span class="unit">%</span>
          <i v-if="item.key == payAssume.length && item.key > 2" class="el-icon-delete delete-icon" @click="removeAssume(item.key)"></i>
        </el-form-item>
        <div class="create-routing">
          <el-button class="create-template" type="primary" @click="createTemplate"><i class="fa fa-user-plus create-user-icon" aria-hidden="true"></i>添加分账方</el-button>
          <div class="create-routing-icon">
            <i class="fa fa-info-circle info-icon" aria-hidden="true"></i>
            <div class="create-routing-info">
              <p>每个分账方的分账金额 = 账单金额 × 分账百分比</p>
              <p>示例1:&nbsp;通道费承担方为平台商户且为第三顺序分账方</p>
              <p class="indent">账单金额为1983元，租客实付金额为1983元，通道费为7.56元</p>
              <p class="indent">第一顺序分账方36%，分账金额 = 1983 × 36% = 713.88 元</p>
              <p class="indent">第二顺序分账方51%，分账金额 = 1983 × 51% = 1011.33 元</p>
              <p class="indent">第三顺序分账方13%，分账金额 = （1983－713.88 －1011.33）－7.56= 250.23 元</p>
              <p>示例2:&nbsp;通道费承担方为租客，共有3个分账方</p>
              <p class="indent">账单金额为1983元，租客实付金额为1991元，通道费为8元</p>
              <p class="indent">第一顺序分账方36%，分账金额 = 1983 × 36% = 713.88 元</p>
              <p class="indent">第二顺序分账方51%，分账金额 = 1983 × 51% = 1011.33 元</p>
              <p class="indent">第三顺序分账方13%，分账金额 = 1983－713.88 －1011.33  = 257.79 元 </p>
            </div>
          </div>

        </div>

      </div>
      <div class="merchant-create__el-form-label">
        <h3>扣费模式</h3>
        <el-form-item label="通道费承担方">
          <i class="icon-require" style="left: -108px;">*</i>
          <el-select v-model="template.bearPerson" placeholder="请选择" :class="requirePayAssume ? '' : 'require-error'">
            <el-option
              v-for="item in payAssume"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
          <b v-if="!requirePayAssume" class="require-tip">请选择通道承担方</b>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button @click="resetForm('template')">重置</el-button>
        <el-button type="primary" @click="submitForm('template')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api    from '@/api/api';

  export default {
    data() {

      return {
        template: {
          templateName: '',
          bearPerson: '',
          routingSet: ''
        },
        requireName: true,
        requirePayAssume: true,
        payAssume: [{
          key: 1,
          value: '',
          label: '第一顺序分账方',
          model: 'payAssumeRatio_1',
        },{
          key: 2,
          value: '',
          label: '第二顺序分账方',
          model: 'payAssumeRatio_2',
        }],
        payAssumeRatio: 100,
      }
    },
    watch: {
      'template.templateName': function(val) {
        if(val == '') {
          this.requireName = false;
          return
        }else {
          this.requireName = true;
        }
      },
      'template.bearPerson': function(val) {
        if(val == '') {
          this.requirePayAssume = false;
          return
        }else {
          this.requirePayAssume = true;
        }
      }
    },
    methods: {
      formatRatio(ratio) {
        if(this.$refs[ratio][0].currentValue <= 0 ) {
          this.$refs[ratio][0].currentValue = 0.01;
        }
        if(this.$refs[ratio][0].currentValue >= 100 ) {
          this.$refs[ratio][0].currentValue = 99.99;
        }
        this.$refs[ratio][0].currentValue = isNaN(parseFloat(this.$refs[ratio][0].currentValue)) ? '0.01' : parseFloat(this.$refs[ratio][0].currentValue).toFixed(2);
      },
      removeAssume(key) {
        this.payAssume.splice(key-1,1);
        this.template.bearPerson = '';
      },
      createTemplate() {

        if(this.payAssume.length < 5) {
          let num = this.payAssume.length + 1;
          let item = {
            key: num,
            value: '',
            label: '第'+this.formatNum(num)+'顺序分账方',
            model: 'payAssumeRatio_'+num
          }
          this.payAssume.push(item);
        }else {
          this.$message.error('最多添加5个分账方')
        }

      },
      formatNum(num) {
        switch(num) {
          case 1 : return '一';
          case 2 : return '二';
          case 3 : return '三';
          case 4 : return '四';
          case 5 : return '五';
        }
      },
      computeRatio(ratio) {
        console.log(ratio)
        if(this.$refs[ratio] && this.$refs[ratio].length > 0){
          return Number(this.$refs[ratio][0].currentValue);
        }else {
          return 0;
        }

      },
      submitForm(formName) {
        if(!this.template.templateName) {
          this.requireName = false;
          return
        }
        let payAssumeRatio_1 = this.computeRatio('payAssumeRatio_1');
        let payAssumeRatio_2 = this.computeRatio('payAssumeRatio_2');
        let payAssumeRatio_3 = this.computeRatio('payAssumeRatio_3');
        let payAssumeRatio_4 = this.computeRatio('payAssumeRatio_4');
        let payAssumeRatio_5 = this.computeRatio('payAssumeRatio_5');
        console.log(payAssumeRatio_1,payAssumeRatio_2,payAssumeRatio_3,payAssumeRatio_4,payAssumeRatio_5)

        if(payAssumeRatio_1 + payAssumeRatio_2 + payAssumeRatio_3 + payAssumeRatio_4 + payAssumeRatio_5 != 100) {
          this.$message.error('所有分账比例之和必须等于100');
          return
        }
        this.template.routingSet = [payAssumeRatio_1, payAssumeRatio_2, payAssumeRatio_3, payAssumeRatio_4, payAssumeRatio_5].filter( p => p !== 0).join(',');

        if(!this.template.bearPerson) {
          this.requirePayAssume = false;
          return
        }
        api.createRoutingTemplates(this.template)
          .then(rep => {
            console.log(rep)
            this.$message({
              message: '添加模板成功',
              type: 'success'
            });
            this.$router.push({
              name: 'routing__template'
            })
          })
          .catch(err => this.$message.error(err))

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    },
    created(){


    }
  }
</script>

<style lang="scss">
  @import '~styles/base/variable';

  .merchant-create {
    padding: 0 100px;

    &__el-form {
      width: 460px;
      margin: 0 auto;
      &-label {
        margin-bottom: 30px;
      }
      .icon-require {
        position:absolute;
        left: -80px;
        top: 0;
        color: $red;
      }
      .require-error {
        input {
          border-color: #f56c6c;
        }
      }
      .require-tip {
        color: #f56c6c;
        font-size: 12px;
        font-weight: normal;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
      }
      .el-input {
        width: 220px;
      }
      .pay-assume {
        .delete-icon {
          color:$red;
          font-size: 17px;
          cursor: pointer;
          margin-left: 5px;
        }
      }
      .create-template {
        margin-left: 10px;

      }
      .unit {
        position: absolute;
        top: 0;
        left: 190px;
      }
      .create-routing {
        position:relative;
      }
      .create-user-icon {
        margin-right: 5px;
      }

      .create-routing-icon {
        position: relative;
        display: inline-block;
        padding-right: 10px;
        padding-bottom: 10px;
        .info-icon {
          color: #aaa;
          font-size: 16px;
          margin-left: 10px;
          cursor:pointer;
        }
        .create-routing-info {
          display: none;
          position: absolute;
          top: 17px;
          left: 24px;
          width: 500px;
          color: #666;
          background: #fff;
          z-index: 99;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 12px;
          p {
            margin: 5px 0;
            line-height: 16px;
          }
          .indent {
            text-indent: 3em;
          }
        }
        &:hover {
          .create-routing-info {
            display: block;
          }
        }
      }

    }

  }
</style>
