<template>
  <div class="merchant-create" v-loading="createMerchantLoading">
    <el-form class="merchant-create__el-form" :rules="rule" label-width="130px" ref="commercial" :model="commercial">
      <div class="merchant-create__el-form-label">
        <h3>基础信息</h3>
        <el-form-item label="商户类型">
          <el-input v-model="commercial.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户类型" v-if="financeType == '1'">
          <el-input v-model="commercial.userType" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属商户" v-if="financeType == '1'">
          <el-input v-model="commercial.subCommercial" disabled></el-input>
        </el-form-item>
      </div>
      <div class="merchant-create__el-form-label">
        <h3>商户信息</h3>
        <el-form-item label="商户名称" prop="name">
          <el-input v-model="commercial.name" placeholder="请输入商户名称"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-cascader
            placeholder="请选择城市"
            :options="provinceArr"
            v-model="commercial.city"
            class="cascader">
          </el-cascader>
        </el-form-item>
        <el-form-item label="营业执照号" prop="businessLicenseNo">
          <el-input v-model="commercial.businessLicenseNo" placeholder="请输入营业执照号"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号码" prop="mobileNo">
          <el-input v-model="commercial.mobileNo" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="营业期限" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker
                v-model="commercial.startTime"
                type="date"
                placeholder="起始日期" class="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker
                v-model="commercial.endTime"
                type="date"
                ref="endTime"
                :disabled="maxEndTime"
                placeholder="截止日期" class="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <div :class="['toggle-button', maxEndTime ? 'active' : '']" @click="setMaxEndTime">长期有效</div>
        </el-form-item>
        <el-form-item label="营业执照上传" prop="businessLicenseUrl">
          <el-upload
            class="avatar-uploader"
            action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
            :show-file-list="false"
            :http-request="uploadBusinessLicense"
            :before-upload="beforeAvatarUpload">
            <img v-if="commercial.businessLicenseUrl" :src="commercial.businessLicenseUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form-item prop="businessLicenseUrl" style="visibility: hidden">
            <el-input v-model="commercial.businessLicenseUrl" type="hidden"></el-input>
          </el-form-item>
        </el-form-item>

      </div>
      <div class="merchant-create__el-form-label">
        <h3>法人信息</h3>
        <el-form-item label="法定代表人" prop="idName">
          <el-input v-model="commercial.idName" placeholder="请输入法定代表人"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证号" prop="idNo">
          <el-input v-model="commercial.idNo" placeholder="请输入法人身份证号"></el-input>
        </el-form-item>

        <el-form-item label="法人身份证上传" prop="idNoUrl">
          <el-upload
            class="avatar-uploader"
            action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
            :show-file-list="false"
            :http-request="uploadIdNo_1"
            :before-upload="beforeAvatarUpload">
            <img v-if="formatIdNoUrl(commercial.idNoUrl, 0)" :src="formatIdNoUrl(commercial.idNoUrl, 0)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
            :show-file-list="false"
            :http-request="uploadIdNo_2"
            :before-upload="beforeAvatarUpload">
            <img v-if="formatIdNoUrl(commercial.idNoUrl, 1)" :src="formatIdNoUrl(commercial.idNoUrl, 1)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="upload-tip">
            <i>身份证（正面）</i>
            <i>身份证（反面）</i>
          </div>
        </el-form-item>
      </div>
      <div class="merchant-create__el-form-label">
        <h3>预留银行账户信息</h3>
        <el-form-item label="开户银行" prop="bankCode">
          <!-- <el-input v-model="commercial.bankName"></el-input> -->
          <el-select
            v-model="commercial.bankCode"
            ref="bank"
            filterable
            remote
            reserve-keyword
            placeholder="请搜索开户银行"
            :remote-method="searchBank"
            :loading="searchBankLoading"
            class="search-bank">
            <el-option
              v-for="item in searchBankList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户银行全称" prop="branchName">
          <el-input v-model="commercial.branchName"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="cardNo">
          <el-input v-model="commercial.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="开户许可证上传" prop="lincenceUrl">
          <el-upload
            class="avatar-uploader"
            action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
            :show-file-list="false"
            :http-request="uploadLincence"
            :before-upload="beforeAvatarUpload">
            <img v-if="commercial.lincenceUrl" :src="commercial.lincenceUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div class="merchant-create__el-form-label" v-if="financeType == '1'">
        <h3>支付设置</h3>
        <el-form-item label="通道费承担方" prop="payAssume">
          <el-select v-model="commercial.payAssume" placeholder="请选择">
            <el-option
              v-for="item in payAssume"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付通道费" prop="serviceCharge">
          <el-input v-model="commercial.serviceCharge" @change="formatRatio" autocomplete="off"></el-input>
          <span class="unit">%</span>
        </el-form-item>
      </div>
      <div class="merchant-create__el-form-label">
        <h3>提现模式</h3>
        <el-form-item label="提现模式" prop="drawType">
          <el-select v-model="commercial.drawType" placeholder="请选择">
            <el-option
              v-for="item in drawType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="merchant-create__el-form-label">
        <h3>账号设置</h3>
        <el-form-item label="设置登入账号" prop="account">
          <el-input v-model="commercial.account"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button @click="resetForm('commercial')">重置</el-button>
        <el-button type="primary" @click="submitForm('commercial')">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api        from '@/api/api';
  import bankList   from '@/data/bank-list';
  import format     from '@/services/format';

  export default {
    data() {
      let validateMobile = (rule, value, callback) => {
        if (!/^1[3,4,5,6,7,8,9]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      let validateStartTime = (rule, value, callback) => {
        const startTime = value ? value.getTime() : '';
        const endTime = this.commercial.endTime ? this.commercial.endTime.getTime() : '';
        if (endTime !== '') {
          if (startTime > endTime) {
            callback(new Error('开始时间不得晚于结束时间'));
          } else {
            callback();
          }
        }else {
          callback();
        }

      };
      let validateEndTime = (rule, value, callback) => {
        const startTime = this.commercial.startTime ? this.commercial.startTime.getTime() : '';
        const endTime = value ? value.getTime() : '';
        if (startTime !== '' && endTime !== '') {
          if (startTime > endTime) {
            callback(new Error('结束时间不得早于开始时间'));
          } else {
            callback();
          }
        }else {
          callback();
        }

      };
      return {
        financeType: '',
        commercial: {
          type: '企业商户',
          userType: '平台用户',
          subCommercial: '水滴管家',
          name: '',
          city: [],
          businessLicenseNo: '',
          startTime: '',
          endTime: '',
          businessLicenseUrl: '',
          idName: '',
          idNo: '',
          idNoUrl: '',
          bankCode: '',
          bankName: '',
          branchName: '',
          cardNo: '',
          lincenceUrl: '',
          payAssume: 'renter',
          serviceCharge: '0.50',
          drawType: '0',
          account: ''
        },
        idNoUrl_1: '',
        idNoUrl_2: '',
        provinceArr: [],
        maxEndTime: false,
        searchBankLoading: false,
        rule: {
          name: [
            { required: true, message: '请输入商户名称', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'blur' }
          ],
          businessLicenseNo: [
            { required: true, message: '请输入营业执照号', trigger: 'blur' }
          ],
          startTime: [
            { type: 'date', required: true, message: '请选择起始日期', trigger: 'blur' },
            { validator: validateStartTime, trigger: 'blur' }
          ],
          endTime: [
            { validator: validateEndTime, trigger: 'blur' }
          ],
          businessLicenseUrl: [
            { required: true, message: '请上传营业执照', trigger: 'change' }
          ],
          idName: [
            { required: true, message: '请输入法定代表人', trigger: 'blur' }
          ],
          idNo: [
            { required: true, message: '请输入法人身份证号', trigger: 'blur' },
            { min: 15, max: 20, message: '请输入正确的身份证号', trigger: 'blur' }
          ],
          mobileNo: [
            { required: true, message: '请输入联系人手机号', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          idNoUrl: [
            { required: true, message: '请上传法人身份证', trigger: 'blur' }
          ],
          bankCode: [
            { required: true, message: '请选择开户银行', trigger: 'blur' }
          ],
          branchName: [
            { required: true, message: '请输入开户银行全称', trigger: 'blur' }
          ],
          cardNo: [
            { required: true, message: '请输入银行账号', trigger: 'blur' }
          ],
          lincenceUrl: [
            { required: true, message: '请上传开户许可证', trigger: 'blur' }
          ],
          payAssume: [
            { required: true, message: '请选择通道费承担方', trigger: 'change' }
          ],
          serviceCharge: [
            { required: true, message: '请输入支付通道费', trigger: 'blur' }
          ],
          drawType: [
            { required: true, message: '请选择提现模式', trigger: 'change' }
          ],
          account: [
            { required: true, message: '请设置登入账号', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
        },
        searchBankList: [],
        payAssume: [{
          value: 'renter',
          label: '付款方承担'
        }, {
          value: 'landlord',
          label: '收款方承担'
        }],
        drawType: [{
          value: '1',
          label: '自动提现（固定时间）T+1日'
        },{
          value: '0',
          label: '手动提现'
        }],
        createMerchantLoading: false, // 防止重复提交
      }
    },
    watch: {
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },
    methods: {
      __fetchBankList() {
        this.searchBankList = bankList;
      },
      __fetchCity() {
        api.getRegions()
          .then(rep => {
            let len = rep.data.length;
            for(let i = 0; i < len; i++){
              let item;
              for(let key in rep.data[i]){
                let child, children = [];
                for(let j = 0; j < rep.data[i][key].length; j++){
                  child = {
                    value: rep.data[i][key][j],
                    label: rep.data[i][key][j]
                  }
                  children.push(child);
                }
                item = {
                  value: key,
                  label: key,
                  children: children
                }
              }
              this.provinceArr.push(item);
            }
          })
          .catch(err => this.$message.error(err))
      },
      // 长期有效
      setMaxEndTime() {
        this.maxEndTime = !this.maxEndTime;
        this.commercial.endTime = '';
      },
      searchBank(query) {
        if (query !== '') {
          this.searchBankLoading = true;
          let data = {
            type : 3,   // 1. 个人商户 2.个体商户 3.企业商户
            keyword: query
          }
          api.searchBank(data)
            .then(rep => {
              setTimeout(() => {
                this.searchBankLoading = false;
                let searchBankList = [];
                if(rep.data.length > 0){
                  for(let i = 0; i < rep.data.length; i++) {
                    let item = {
                      value: rep.data[i].bankCode,
                      label: rep.data[i].bankName
                    }
                    searchBankList.push(item);
                  }
                  this.searchBankList = searchBankList;
                }else {
                  this.searchBankList = [];
                }

              }, 200);
            })
            .catch(err => this.$message.error('获取银行列表失败'))

        } else {
          this.__fetchBankList();
          this.commercial.bankCode = '';
        }
      },
      // 格式化时间
      formatDate(date) {
        let timestamp = date.getTime();
        return format.getDate(timestamp)
      },
      // 格式化支付通道费
      formatRatio() {
        if(this.commercial.serviceCharge <= 0.30 ) {
          this.commercial.serviceCharge = 0.30;
        }
        if(this.commercial.serviceCharge >= 100 ) {
          this.commercial.serviceCharge = 100.00;
        }
        this.commercial.serviceCharge = isNaN(parseFloat(this.commercial.serviceCharge)) ? '0.30' : parseFloat(this.commercial.serviceCharge).toFixed(2);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.commercial.idNoUrl.split(',')[0] == '' || this.commercial.idNoUrl.split(',')[1] == ''){
              this.$message.error('请上传法人身份证');
              return
            }
            let token = localStorage.getItem('FINANCE_TOKEN') || '';
            this.createMerchantLoading = true;
            api.createUser(token)
              .then(rep => {
                this.userId = rep.data;
                // 企业入网
                let params = {
                  commercial: {
                    userId: rep.data,
                    commercialType: 3,      //入网类型：1：个人，2个体 3：企业
                    commercialName: this.commercial.name,
                    province: this.commercial.city[0],
                    city: this.commercial.city[1],
                    businessLicenseNo: this.commercial.businessLicenseNo,
                    businessLicenseUrl: this.commercial.businessLicenseUrl,
                    startTime: this.formatDate(this.commercial.startTime),
                    endTime: this.commercial.endTime == '' ? '' : this.formatDate(this.commercial.endTime),
                    idName: this.commercial.idName,
                    idNo: this.commercial.idNo,
                    idNoUrl: this.commercial.idNoUrl,
                    mobileNo: this.commercial.mobileNo,
                    lincenceUrl: this.commercial.lincenceUrl,
                  },
                  commercialBank: {
                    flag: 'B',
                    bankCode: this.commercial.bankCode,
                    branchName: this.commercial.branchName,
                    bankName: this.$refs['bank'].query,
                    cardNo: this.commercial.cardNo
                  }
                }
                api.registerCommercial(params)
                  .then(rep => {
                    console.log('register suc-----')
                    // 商户入网-支付，账号，提现设置
                    let setting = {
                      userId : this.userId,
                      paySet: {
                        assumePerson: this.commercial.payAssume,
                        serviceCharge: this.commercial.serviceCharge
                      },
                      withDrawSet: this.commercial.drawType,
                      accountSet: this.commercial.account
                    }
                    api.setAccountSetting(setting)
                      .then(rep => {
                        console.log('setting-----')
                        this.$message({
                          message: '新增商户成功',
                          type: 'success'
                        });
                        this.$router.push({
                          name: 'merchantMgt__result',
                          params: {
                            id: this.userId
                          }
                        })
                      })
                      .catch(err => this.$message.error(err));
                  })
                  .catch(err => {
                    console.log('register err-----')
                    // 商户入网-支付，账号，提现设置
                    let setting = {
                      userId : this.userId,
                      paySet: {
                        assumePerson: this.commercial.payAssume,
                        serviceCharge: this.commercial.serviceCharge
                      },
                      withDrawSet: this.commercial.drawType,
                      accountSet: this.commercial.account
                    }
                    api.setAccountSetting(setting)
                      .then(rep => {
                        console.log('setting-----')
                        this.$message({
                          message: '新增商户成功',
                          type: 'success'
                        });
                        this.$router.push({
                          name: 'merchantMgt__result',
                          params: {
                            id: this.userId
                          }
                        })
                      })
                      .catch(err => this.$message.error(err));
                  });
              })
              .catch(err => this.$message.error(err))
          } else {
            this.$message.error('请填写必填字段');
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      formatIdNoUrl(url, index) {
        return this.commercial.idNoUrl.split(',')[index];
      },

      uploadBusinessLicense(f) {
        this.uploadSectionFile(f, 'business');
      },
      uploadIdNo_1(f) {
        this.uploadSectionFile(f, 'idNo_1');
      },
      uploadIdNo_2(f) {
        this.uploadSectionFile(f, 'idNo_2');
      },
      uploadLincence(f) {
        this.uploadSectionFile(f, "lincence");
      },
      //自定义文件上传
      uploadSectionFile(f, list) {
        let param = new FormData();   //创建form对象
        param.append('Filedata',f.file);  //通过append向form对象添加数据
        api.uploadImg(param)
          .then(rep => {
            let imgUrl = rep.url;
            switch (list){
              case 'business' :
                this.commercial.businessLicenseUrl = imgUrl
                break;
              case 'idNo_1' :
                this.idNoUrl_1 = imgUrl;
                this.commercial.idNoUrl = this.idNoUrl_1 + ',' + this.idNoUrl_2;
                break;
              case 'idNo_2' :
                this.idNoUrl_2 = imgUrl;
                this.commercial.idNoUrl = this.idNoUrl_1 + ',' + this.idNoUrl_2;
                break;
              case 'lincence' :
                this.commercial.lincenceUrl = imgUrl;
                break;
            }
            // 验证上传图片控件
            this.$refs['commercial'].validateField(['businessLicenseUrl', 'lincenceUrl', 'idNoUrl']);
          })
          .catch(err => this.$message.error(err));
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传图片必须是 JPG 或者 PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      }
    },
    created(){
      this.__fetchCity();
      this.__fetchBankList();
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    }
  }
</script>

<style lang="scss" >
  @import '~styles/base/variable';

  .merchant-create {
    padding: 0 100px;

    &__el-form{
      width: 460px;
      margin: 0 auto;
      .el-select {
        width: 100%;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        width: 120px;
        height: 120px;
        float: left;
        margin-right: 20px;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 120px;
        text-align: center;
      }
      .avatar {
        width: 100%;
        height: 100%;
        display: block;
      }
      .upload-tip{
        overflow: hidden;
        width: 100%;
        i{
          font-style:normal;
          font-size: 12px;
          float: left;
          width: 122px;
          text-align: center;
          margin-right: 20px;
          color:#666;
        }
      }
      .cascader,.date{
        width: 100%;
      }
      .line{
        text-align: center;
      }
      .toggle-button{
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(110%);
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        &.active{

          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
        }
      }
      .unit{
        position: absolute;
        top: 0;
        right: 10px;
      }
    }

  }
</style>
