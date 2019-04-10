<template>
  <div class="merchant-detail">
    <el-form class="merchant-detail__el-form" ref="merchantDetail" :rules="rule" :model="merchantDetail" label-width="150px">
      <div class="merchant-detail__title">
        <div class="merchant-detail__title-back">
          <i class="el-icon-arrow-left"></i>
          <el-button type="text" @click="$router.back(-1)">返回</el-button>
        </div>

        <div v-if="$route.params.status == 'F'" class="merchant-detail__title-status fault">审核失败</div>
        <div v-else-if="$route.params.status == 'P'" class="merchant-detail__title-status warning">审核中</div>
      </div>
      <el-collapse v-model="detailActiveName">
        <div class="merchant-detail__info">
          <el-collapse-item title="基本信息" name="1">
            <!-- <h3 class="merchant-detail__info-title">基本信息</h3> -->
            <el-form-item label="创建时间：">
              <span>{{ formatDateTime(merchantBasicInfo.createAt) }}</span>
            </el-form-item>
            <el-form-item label="商户ID：">
              <span>{{merchantBasicInfo.userId}}</span>
            </el-form-item>
            <el-form-item label="商户类型：">
              <span>{{ formatCommercialType(merchantBasicInfo.commercialType) }}</span>
            </el-form-item>
            <el-form-item label="所属商户：" v-if="financeType == '1'">
              <span>{{merchantBasicInfo.belongComemrcialName}}</span>
            </el-form-item>
            <el-form-item label="用户类型：" v-if="financeType == '1'">
              <span>{{ formatUserType(merchantBasicInfo.userType) }}</span>
            </el-form-item>
          </el-collapse-item>
        </div>

        <div class="merchant-detail__info">
          <el-collapse-item title="商户信息" name="2">
            <!-- <h3 class="merchant-detail__info-title">商户信息</h3> -->
            <el-form-item label="商户名称：" prop="commercialName">
              <el-input v-model="merchantDetail.commercialName" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="所在城市：" prop="city">
              <el-cascader
                :disabled="checkStatus ? true : false"
                :options="provinceArr"
                @change="cityChange"
                v-model="merchantDetail.city"
                class="cascader">
              </el-cascader>
            </el-form-item>
            <el-form-item label="营业执照号：" prop="businessLicenseNo">
              <el-input v-model="merchantDetail.businessLicenseNo" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="联系人手机号码" prop="mobileNo">
              <el-input v-model="merchantDetail.mobileNo" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="营业期限：" required>
              <el-col :span="8">
                <el-form-item prop="startTime">
                  <el-date-picker
                    v-model="merchantDetail.startTime"
                    type="date"
                    :disabled="checkStatus ? true : false"
                    placeholder="起始日期" class="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="8">
                <el-form-item prop="endTime">
                  <el-date-picker
                    v-model="merchantDetail.endTime"
                    type="date"
                    ref="endTime"
                    :disabled="checkStatus || maxEndTime ? true : false"
                    placeholder="截止日期" class="date">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <div :class="['toggle-button', maxEndTime ? 'active' : '']" @click="setMaxEndTime">长期有效</div>
            </el-form-item>
            <el-form-item label="营业执照影像件：" prop="businessLicenseUrl">
              <el-upload
                class="avatar-uploader"
                action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
                :show-file-list="false"
                :http-request="uploadBusinessLicense"
                :before-upload="beforeAvatarUpload">
                <img v-if="merchantDetail.businessLicenseUrl" :src="merchantDetail.businessLicenseUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-form-item prop="businessLicenseUrl" style="visibility: hidden">
                <el-input v-model="merchantDetail.businessLicenseUrl" type="hidden"></el-input>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
        </div>

        <div class="merchant-detail__info">
          <el-collapse-item title="法人信息" name="3">
            <!-- <h3 class="merchant-detail__info-title">法人信息</h3> -->
            <el-form-item label="法定代表人：" prop="idName">
              <el-input v-model="merchantDetail.idName" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证号：" prop="idNo">
              <el-input v-model="merchantDetail.idNo" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="法人身份证影像件：" prop="idNoUrl_1">
              <el-upload
                class="avatar-uploader"
                action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
                :show-file-list="false"
                :http-request="uploadIdNo_1"
                :before-upload="beforeAvatarUpload">
                <img v-if="merchantDetail.idNoUrl_1" :src="merchantDetail.idNoUrl_1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
                :show-file-list="false"
                :http-request="uploadIdNo_2"
                :before-upload="beforeAvatarUpload">
                <img v-if="merchantDetail.idNoUrl_2" :src="merchantDetail.idNoUrl_2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="upload-tip">
                <i>身份证（正面）</i>
                <i>身份证（反面）</i>
              </div>
            </el-form-item>
          </el-collapse-item>
        </div>

        <div class="merchant-detail__info">
          <el-collapse-item title="预留银行账户信息" name="4">
            <!-- <h3 class="merchant-detail__info-title">预留银行账户信息</h3> -->
            <el-form-item label="开户银行" prop="bankCode">
              <el-select
                v-model="merchantDetail.bankCode"
                ref="bank"
                filterable
                remote
                reserve-keyword
                placeholder="请选择开户银行"
                :disabled="checkStatus ? true : false"
                :remote-method="searchBank"
                :loading="searchBankLoading"
                >
                <el-option
                  v-for="item in searchBankList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户银行全称：" prop="branchName">
              <el-input v-model="merchantDetail.branchName" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：" prop="cardNo">
              <el-input v-model="merchantDetail.cardNo" :disabled="checkStatus ? true : false"></el-input>
            </el-form-item>
            <el-form-item label="开户许可证影像件：" prop="lincenceUrl">
              <el-upload
                class="avatar-uploader"
                action="http://jz.api.ih2ome.cn/api/picture/image_upload/"
                :show-file-list="false"
                :http-request="uploadLincence"
                :before-upload="beforeAvatarUpload">
                <img v-if="merchantDetail.lincenceUrl" :src="merchantDetail.lincenceUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-collapse-item>
        </div>

        <div class="merchant-detail__info" v-if="financeType == '1'">
          <el-collapse-item title="支付设置" name="5">
            <!-- <h3 class="merchant-detail__info-title">支付设置</h3> -->
            <el-form-item label="通道费承担方：" prop="payAssume">
              <el-select v-model="merchantDetail.payAssume" placeholder="请选择">
                <el-option
                  v-for="item in payAssume"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付通道费：" prop="serviceCharge">
              <el-input v-model="merchantDetail.serviceCharge" @change="formatRatio" autocomplete="off"></el-input>
              <span class="unit">%</span>
            </el-form-item>
          </el-collapse-item>
        </div>
        <div class="merchant-detail__info">
          <el-collapse-item title="提现模式" name="6">
            <!-- <h3 class="merchant-detail__info-title">提现模式</h3> -->
            <el-form-item label="提现模式：" prop="drawType">
              <el-select v-model="merchantDetail.drawType" placeholder="请选择">
                <el-option
                  v-for="item in drawType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
        </div>
        <div class="merchant-detail__info">
          <el-collapse-item title="账号设置" name="7">
            <!-- <h3 class="merchant-detail__info-title">账号设置</h3> -->
            <el-form-item label="设置登入账号：" prop="account">
              <el-input v-model="merchantDetail.account"></el-input>
            </el-form-item>
          </el-collapse-item>
        </div>

        <div class="merchant-detail__info">
          <el-collapse-item title="审核信息" name="8">
            <!-- <h3 class="merchant-detail__info-title">审核信息</h3> -->
            <el-form-item label="更新时间：">
              <span>{{merchantDetail.updateTime}}</span>
            </el-form-item>
            <el-form-item label="审核结果：">
              <span>{{ formatReviewStatus(merchantDetail.reviewStatus) }}</span>
            </el-form-item>
            <el-form-item label="错误字段：">
              <span style="color: #ff4949">{{merchantDetail.reviewRemark}}</span>
            </el-form-item>
          </el-collapse-item>
        </div>
        <!-- <div class="merchant-detail__info" v-if="financeType == '1'">
          <el-collapse-item title="操作日志" name="9">
            <ul>
              <li class="log-list">1、2018-06-25  17:01:55，由系统自动审核，结果为审核成功；</li>
              <li class="log-list">2、2018-06-25  17:01:55，由小明重新提价，修改字段为银行账号、营业期限；</li>
            </ul>
          </el-collapse-item>
        </div> -->
      </el-collapse>

      <!-- <div class="merchant-detail__info">
        <h3 class="merchant-detail__info-title">影像资料</h3>
        <ul class="image-wrap">
          <li class="image-list">
            <img src="~images/mf.jpg" alt="">
          </li>
          <li class="image-list">
            <img src="~images/mf.jpg" alt="">
          </li>
          <li class="image-list">
            <img src="~images/mf.jpg" alt="">
          </li>
          <li class="image-list">
            <img src="~images/mf.jpg" alt="">
          </li>
          <li class="image-list">
            <img src="~images/mf.jpg" alt="">
          </li>
        </ul>
      </div> -->

      <div class="merchant-detail__footer">
        <el-button @click="resetForm('merchantDetail')">重置</el-button>
        <el-button type="primary" @click="submitForm('merchantDetail')">重新提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api        from '@/api/api';
  import bankList   from '@/data/bank-list';
  import format     from '@/common/format';
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
        const endTime = this.merchantDetail.endTime ? this.merchantDetail.endTime.getTime() : '';
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
        const startTime = this.merchantDetail.startTime ? this.merchantDetail.startTime.getTime() : '';
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
        detailActiveName: ['2','3','4','5','6','7'],
        checkStatus: '',
        merchantDetail: {
          commercialName: '',
          city: [],
          businessLicenseNo: '',
          mobileNo: '',
          startTime: '',
          endTime: '',
          businessLicenseUrl: '',
          idName: '',
          idNo: '',
          idNoUrl_1: '',
          idNoUrl_2: '',
          bankCode: '',
          bankName: '',
          branchName: '',
          cardNo: '',
          lincenceUrl: '',
          payAssume: '',
          serviceCharge: '',
          drawType: '',
          account: '',
          updateTime: '',
          reviewStatus: '',
          reviewRemark: ''
        },
        provinceArr: [],
        maxEndTime: false,
        searchBankLoading: false,
        merchantBasicInfo: {
          createAt: '',
        },
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
        rule: {
          commercialName: [
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
            { required: true, message: '请上传营业执照', trigger: 'blur' }
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
          idNoUrl_1: [
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
            { required: true, message: '请选择通道费承担方', trigger: 'blur' }
          ],
          serviceCharge: [
            { required: true, message: '请输入支付通道费', trigger: 'blur' }
          ],
          drawType: [
            { required: true, message: '请选择提现模式', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '请设置登入账号', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ],
        },
        searchBankList: []
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
                  console.log(searchBankList);
                  this.searchBankList = searchBankList;
                }else {
                  this.searchBankList = [];
                }

              }, 100);
            })
            .catch(err => this.$message.error('获取银行列表失败'))

        } else {
          this.__fetchBankList();
          this.merchantDetail.bankCode = '';
        }
      },
      // 获取基本信息
      __fetchMerchantBasicInfo() {
        let userId = this.$route.params.merchantId;
        api.fetchMerchantBasicInfo(userId)
          .then(rep => {
            this.merchantBasicInfo = rep.data;
            // this.__fetchMerchantDetail();
          })
          .catch(err => this.$message.error(err))
      },

      // 获取商户入网信息
      __fetchMerchantInfo() {
        let data = {
          userId: this.$route.params.merchantId,
          flag: '1' //     1：未开通时查看   2：开通成功后查看
        }

        api.fetchMerchantInfo(data)
          .then(rep => {
            if(rep.data) {
              console.log(rep.data.commercial.status)
              this.checkStatus = rep.data.commercial.status;  // 0 入网失败 商户信息可编辑   1 入网成功  商户信息不可编辑
              let sTime = rep.data.commercial.startTime ? new Date(rep.data.commercial.startTime) : '';
              let eTime = rep.data.commercial.endTime ? new Date(rep.data.commercial.endTime) : '';
              let uTime = rep.data.commercial.updateTime ? this.formatDateTime(rep.data.commercial.updateTime) : '';
              this.merchantDetail = Object.assign({}, this.merchantDetail, rep.data.commercial, rep.data.commercialBank, {
                city: [rep.data.commercial.province, rep.data.commercial.city],
                startTime: sTime,
                endTime: eTime,
                updateTime: uTime,
                idNoUrl_1: rep.data.commercial.idNoUrl.split(',')[0],
                idNoUrl_2: rep.data.commercial.idNoUrl.split(',')[1],
              });
            }else {
              this.$message.error('获取商户信息失败')
            }
            // this.merchantDetail.city = [rep.data.commercial.province, rep.data.commercial.city];
            // this.merchantDetail.startTime = sTime ;
            // this.merchantDetail.endTime = eTime ;
            // this.merchantDetail.updateTime = uTime;
            // this.merchantDetail.idNoUrl_1 = rep.data.commercial.idNoUrl.split(',')[0];
            // this.merchantDetail.idNoUrl_2 = rep.data.commercial.idNoUrl.split(',')[1];

          })
          .catch(err => this.$message.error(err))
      },
      // 获取商户支付设置，账号设置，提现设置
      __fetchAccountSetting() {
        console.log('get setting----------------')
        let userId = this.$route.params.merchantId;
        api.fetchAccountSetting(userId)
          .then(rep => {
            if(rep.data){
              this.merchantDetail = Object.assign({}, this.merchantDetail, {
                payAssume: rep.data.paySet.assumePerson,
                serviceCharge: rep.data.paySet.serviceCharge,
                drawType: rep.data.withDrawSet,
                account: rep.data.accountSet
              })

            }else {
              this.$message.error('获取商户设置失败')
            }

          })
          .catch(err => this.$message.error(err))
      },

      // 长期有效
      setMaxEndTime() {
        // checkStatus：0 可编辑  1 不可编辑
        if(!this.checkStatus) {
          this.maxEndTime = !this.maxEndTime;
          this.merchantDetail.endTime = '';
        }
      },
      formatDate(date) {
        let timestamp = date.getTime();
        return format.getDate(timestamp)

      },
      formatDateTime(timestamp) {
        return format.getDateTime(timestamp)
      },
      // 格式化支付通道费
      formatRatio() {
        if(this.merchantDetail.serviceCharge <= 0.30 ) {
          this.merchantDetail.serviceCharge = 0.30;
        }
        if(this.merchantDetail.serviceCharge >= 100 ) {
          this.merchantDetail.serviceCharge = 100.00;
        }
        this.merchantDetail.serviceCharge = isNaN(parseFloat(this.merchantDetail.serviceCharge)) ? '0.30' : parseFloat(this.merchantDetail.serviceCharge).toFixed(2);
      },

      formatCommercialType(type) {
        return format.formatCommercialType(type);
      },
      formatReviewStatus(type) {
        return format.formatReviewStatus(type);
      },
      formatUserType(type) {
        return format.formatUserType(type);
      },

      setAccount() {
        let setting = {
          userId : this.userId,
          paySet: {
            assumePerson: this.merchantDetail.payAssume,
            serviceCharge: this.merchantDetail.serviceCharge
          },
          withDrawSet: this.merchantDetail.drawType,
          accountSet: this.merchantDetail.account
        }
        api.setAccountSetting(setting)
          .then(rep => {
            console.log('setting-----')
            this.$message({
              message: '修改商户信息成功',
              type: 'success'
            });
          })
          .catch(err => this.$message.error(err));
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            if(this.merchantDetail.idNoUrl_2 == ''){
              this.$message.error('请上传法人身份证');
              return
            }
            this.userId = this.$route.params.merchantId;
            console.log(this.userId)
            // 企业入网
            let params = {
              commercial: {
                userId: this.userId,
                commercialType: 3,      //入网类型：1：个人，2个体 3：企业
                commercialName: this.merchantDetail.commercialName,
                province: this.merchantDetail.city[0],
                city: this.merchantDetail.city[1],
                businessLicenseNo: this.merchantDetail.businessLicenseNo,
                businessLicenseUrl: this.merchantDetail.businessLicenseUrl,
                startTime: this.formatDate(this.merchantDetail.startTime),
                endTime: this.merchantDetail.endTime == '' ? '' : this.formatDate(this.merchantDetail.endTime),
                idName: this.merchantDetail.idName,
                idNo: this.merchantDetail.idNo,
                idNoUrl: this.merchantDetail.idNoUrl_1 + ',' + this.merchantDetail.idNoUrl_2,
                mobileNo: this.merchantDetail.mobileNo,
                lincenceUrl: this.merchantDetail.lincenceUrl,
              },
              commercialBank: {
                flag: 'B',
                bankCode: this.merchantDetail.bankCode,
                branchName: this.merchantDetail.branchName,
                bankName: this.$refs['bank'].query,
                cardNo: this.merchantDetail.cardNo
              }
            }
            console.log(params)
            // 不管入网接口成功失败 跳转到审核页面
            api.registerCommercial(params)
              .then(rep => {
                console.log('register suc-----')
                // 商户入网-支付，账号，提现设置
                this.setAccount();
                this.$message({
                  message: '修改商户信息成功',
                  type: 'success'
                });
                this.$router.push({
                  name: 'merchantMgt__result',
                  params: {
                    id: this.userId
                  }
                })
              })
              .catch(err => {
                console.log('register err-----')
                // 商户入网-支付，账号，提现设置
                this.setAccount();
                this.$message({
                  message: '修改商户信息成功',
                  type: 'success'
                });
                this.$router.push({
                  name: 'merchantMgt__result',
                  params: {
                    id: this.userId
                  }
                })
              });
          } else {
            this.$message.error('请填写必填字段');
            return false
          }
        });
      },

      resetForm(formName) {
        this.__fetchMerchantInfo();
        this.__fetchAccountSetting();
        this.$message({
          message: '重置成功',
          type: 'success'
        });
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
                this.merchantDetail.businessLicenseUrl = imgUrl;
                break;
              case 'idNo_1' :
                this.merchantDetail.idNoUrl_1 = imgUrl;
                break;
              case 'idNo_2' :
                this.merchantDetail.idNoUrl_2 = imgUrl;
                break;
              case 'lincence' :
                this.merchantDetail.lincenceUrl = imgUrl;
                break;
            }
            // 验证上传图片控件
            this.$refs['merchantDetail'].validateField(['businessLicenseUrl', 'lincenceUrl', 'idNoUrl']);
          })
          .catch(err => this.$message.error('超过上传最大数量'));
      },

      beforeAvatarUpload(file) {

        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      cityChange(val) {
        console.log(val)

      }
    },
    created() {
      this.__fetchMerchantBasicInfo();
      this.__fetchMerchantInfo();
      this.__fetchAccountSetting();
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';
    },
    mounted() {
      this.__fetchCity();
      this.__fetchBankList();
    }
  };
</script>

<style lang="scss">
  @import '~styles/base/variable';

  .merchant-detail {
    padding: 20px;
    &__el-form {
      .el-collapse {
        border: 0;
      }
      .el-collapse-item__header {
        font-size: 16px;
        font-weight: bold;
        border-top: 0;
        padding-bottom: 10px;
      }
      .el-select, .el-input {
        width: 275px;
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
        right: 20px;
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
        left: 250px;
      }
    }
    &__title {
      color: #409EFF;
      position: relative;
      &-back{
        position: absolute;
        left: 0;
        top: 0;
      }
      &-status{
        width: 200px;
        height: 45px;
        line-height: 45px;
        margin: 0 auto;
        border-radius: 4px;
        text-align: center;
      }
      &-status.fault{
        border: 1px solid #FFC0CB;
        background: $red-light;
        color: $red;
      }
      &-status.success{
        border: 1px solid #D5EEC8;
        background: #f0f9eb;
        color: $green;
      }
      &-status.warning{
        border: 1px solid #F7E5C8;
        background: #FCF6EB;
        color: #e6a23c;
      }
    }
    &__info {
      width: 750px;
      margin: 0 auto 30px;
      span {
        display: inline-block;
        // margin-right: 20px;
        // img{
        //   margin-bottom: 10px;
        //   display: block;
        //   width: 220px;
        //   height: 150px;
        // }
      }
      .log-list{
        margin-left: 60px;
        line-height: 40px;
      }
      .image-wrap{
         margin-left: 60px;
      }
      .image-list{
        display: inline-block;
        width: 160px;
        height: 120px;
        margin-right: 10px;
        margin-bottom: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    &__footer{
      text-align: center;
      margin-top: 50px;
    }
  }
</style>
