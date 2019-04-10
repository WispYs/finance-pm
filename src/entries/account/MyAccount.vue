<template>
  <div class="my-account">
    <div class="my-account__title">
      <div class="my-account__title-item" v-if="accountBanlance.withdraw_deposit_type == '0'">
        <div class="my-account__title-item__text">可提现金额（元）</div>
        <span class="my-account__title-item__count">{{accountBanlance.avl_bal}}</span>
        <el-button type="primary" size="medium" class="my-account__title-item__withdraw" @click="withDrawDialog">提现</el-button>
      </div>
      <div class="my-account__title-item" v-if="">
        <div class="my-account__title-item__text">账户总金额（元）</div>
        <span class="my-account__title-item__count">2,222.22</span>
      </div>
      <div class="my-account__title-item">
        <div class="my-account__title-item__text">不可提现金额（元）</div>
        <span class="my-account__title-item__count">{{accountBanlance.ass_bal}}</span>
      </div>
      <div class="my-account__title-item">
        <div class="my-account__title-item__text">保证金（元）</div>
        <span class="my-account__title-item__count">{{accountBanlance.ass_bal}}</span>
      </div>

    </div>
    <div class="my-account__content">
      <!-- <div class="my-account__content-chart">
        <p class="my-account__content-chart__header">近30日入账金额统计（含当日）：</p>
        <div id="myChart" ref="chart" class="my-account__content-chart__container"></div>
      </div> -->
      <div class="my-account__content-record">
        <p class="my-account__content-record__header">入账记录：</p>
        <div ref="record" class="my-account__content-record__container">
          <div class="filter-title">
            <div class="filter-title__item">
              <label>时间：</label>
              <el-date-picker
                v-model="tradeDate"
                type="daterange"
                align="left"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <div class="filter-title__item">
              <label>交易类型：</label>
              <el-select v-model="filter.transactionType" placeholder="请选择" style="width: 220px;">
                <el-option key="" label="全部" value=""></el-option>
                <el-option
                  v-for="type in tradeTypeOptions"
                  :key="type.value"
                  :label="type.label"
                  :value="type.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-table :data="inRecord" border empty-text="没有符合查询条件的数据">
            <el-table-column label="序号" width="50" show-overflow-tooltip >
              <template slot-scope="scope">{{ scope.row.no }}</template>
            </el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column label="类型" show-overflow-tooltip>
              <template slot-scope="scope">{{ formatTradeType(scope.row.transactionType) }}</template>
            </el-table-column>
            <el-table-column label="关联流水号" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.tradeNo }}</template>
            </el-table-column>
            <el-table-column label="交易金额" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.amount }}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="my-account__content-record__pagination" v-if="inRecordTotal > 0">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="inRecordTotal"
            @current-change="currentPageChange">
          </el-pagination>
        </div>
      </div>
      <div class="my-account__content-calendar">
        <p class="my-account__content-calendar__header">对账单：</p>
        <div ref="calendar" class="my-account__content-calendar__container">
          <div id="select-time">
            <el-select v-model="year" @change="selectYear" placeholder="请选择">
              <el-option
                v-for="item in yearOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="month" @change="selectMonth" placeholder="请选择">
              <el-option
                v-for="item in monthOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <table border='0'>
            <tr class="tableTitle">
              <th>星期一</th>
              <th>星期二</th>
              <th>星期三</th>
              <th>星期四</th>
              <th>星期五</th>
              <th>星期六</th>
              <th>星期日</th>
            </tr>

            <tr class="table-content" v-for="calendar in calendar">
              <template v-for="date in calendar">
                <td v-if="date.isToday" style="height:50px; font-size:22px; color:#595959; font-weight:bold;">{{date.showDate}}</td>
                <td v-else-if="date.isDisabled" style="height:50px; color:#e4e4e4;">{{date.showDate}}</td>
                <td v-else style="height:50px;">
                  {{date.showDate}}
                  <template v-if="!date.notThisMonth">
                    <template v-if="year == startYear">
                      <template v-if="month == startMonth">
                        <template v-if="date.showDate >= startDay">
                          <a :href="downloadAdd + '/trade/account/download?userId=' + userId + '&startTime=' + year + '-' + month + '-' + date.showDate">
                            <img :data-date="date.showDate" src="~images/download.png" />
                          </a>
                        </template>
                      </template>
                      <template v-if="month > startMonth">
                        <a :href="downloadAdd + '/trade/account/download?userId=' + userId + '&startTime=' + year + '-' + month + '-' + date.showDate">
                          <img :data-date="date.showDate" src="~images/download.png" />
                        </a>
                      </template>
                    </template>
                    <template v-if="year > startYear">
                      <a :href="downloadAdd + '/trade/account/download?userId=' + userId + '&startTime=' + year + '-' + month + '-' + date.showDate">
                        <img :data-date="date.showDate" src="~/images/download.png" />
                      </a>
                    </template>
                  </template>
                </td>
              </template>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <with-draw-dialog
      v-if="withDrawDialogVisible"
      :withDrawData="withDrawDate"
      @close-dialog="withDrawDialogVisible = false"
      @with-draw="withDraw">
    </with-draw-dialog>
  </div>
</template>

<script>

  import api      from '@/api/api';
  import config   from 'config';
  import moment   from 'moment';
  import echarts  from 'echarts'

  import transactions    from '@/mock-data/merchant-statistic';
  import WithDrawDialog  from './myAccount/WithDrawDialog';

  export default {
    components: {
      WithDrawDialog
    },

    data() {
      return {
        financeType: '',
        userId: '',
        transactions: [],
        currentPage: 1,
        withDrawDialogVisible: false,
        accountBanlance: {},
        inRecord: [],
        inRecordTotal: 0,
        withDrawDate: {
          withDrawAccount: '',
          withDrawMoney: null,
          actualMoney: 0
        },
        calendar: [],
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,

        yearOption: [],
        monthOption: [],
        startYear:null,
        startMonth: null,
        startDay: null,
        downloadAdd: '',
        currentPage: 1,
        pageSize: 10,
        tradeDate: [],
        filter: {
          startTime: '',
          endTime: '',
          transactionType: '',
          page: '',
          pageSize: ''
        },
        pickerOptions: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const nowDate = moment().format('YYYY-MM-DD');
                picker.$emit('pick', [nowDate, nowDate]);
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
                picker.$emit('pick', [yesterday, yesterday]);
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const nowDate = moment().format('YYYY-MM-DD');
                const dateBeforeOneWeek = moment().subtract(6, 'days').format('YYYY-MM-DD');
                picker.$emit('pick', [dateBeforeOneWeek, nowDate]);
              }
            }
          ]
        },
        tradeTypeOptions: [
          {
            value: 1,
            label: '分账'
          },{
            value: 2,
            label: '交易'
          },{
            value: 3,
            label: '提现'
          },
        ]
      };
    },

    watch: {
      'tradeDate': function(val) {
        console.log(val)
        this.filter.startTime = this.tradeDate[0];
        this.filter.endTime = this.tradeDate[1];
        this.__fetchTradeList();
      },
      'filter.transactionType': function(val) {
        console.log(val)
        this.__fetchTradeList();
      },
      '$store.state.user.type': function() {
        this.financeType = this.$store.state.user.type;
      }
    },

    methods: {

      // 账户金额
      __fetchAccountBanlance() {
        api.getAccountBanlance(this.userId)
          .then(rep => {
            if(rep.data) {
              this.accountBanlance = rep.data;

            }
          })
          .catch(err => this.$message.error(err));
      },

      // 初始化入账记录筛选项
      __initTradeListFilter() {
        const nowDate = moment().format('YYYY-MM-DD');
        this.tradeDate = [nowDate, nowDate];
        this.filter.startTime = this.tradeDate[0];
        this.filter.endTime = this.tradeDate[1];
        this.filter.transactionType = '';
        this.filter.page = this.currentPage;
        this.filter.pageSize = this.pageSize;
      },
      // 入账记录
      __fetchTradeList() {
        // TODO: connect api
        let data = Object.assign({}, this.filter, {
          userId: this.userId
        })
        api.tradeInRecord(data)
          .then(rep => {
            let offset = (this.currentPage - 1)  * this.pageSize;
            this.inRecord = rep.data.pageData.map((t, i) => Object.assign({}, t, {
              no: offset + i + 1,
            }));
            // this.inRecord = rep.data.pageData;
            this.inRecordTotal = rep.data.total;
          })
          .catch(err => this.$message.error(err));
      },

      // 初始化对账单筛选项
      __initTradeFilter() {
        let minYear = 2016;
        for(let i = minYear; i < 10 + minYear; i++) {
          let year = {
            value: i + 1,
            label: i + 1 + '年'
          }
          this.yearOption.push(year);
        }
        for(let i = 0; i < 12; i++) {
          let month = {
            value: i + 1,
            label: i + 1 + '月'
          }
          this.monthOption.push(month);
        }
      },
      // 对账单
      __fetchTrade(id) {
        api.tradeQuery(id)
          .then(rep => {
            let sTime = rep.data;
            if(sTime){
              let arr = sTime.split(" ");
              let arr1 = arr[0].split("-");
              this.startYear = parseInt(arr1[0]);
              this.startMonth = parseInt(arr1[1]);
              this.startDay = parseInt(arr1[2]);
              this.downloadAdd = config.apiRoot;  // 金融接口地址
            }else{
              // 如果sTime 为 null 说明没有任何账单生成
              this.startYear = this.year + 1;
            }

          })
          .catch(err => this.$message.error(err))
      },

      formatTradeType(type) {
        switch(type) {
          case '1' : return '分账';break;
          case '2' : return '交易';break;
          case '3' : return '提现';break;
        }
      },

      // 日历
      getMonthData(year, month){
        let ret = [];
        let _this = this;
        //如果没有传入年份或月份，则取当前的年份和月份
        if(!year || !month){
            let today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        //获取某月的第一天
        let firstDay = new Date(year, month-1, 1);

        let curYear = new Date().getFullYear();
        let curMonth = new Date().getMonth() + 1;
        let curDay = new Date().getDate();
        // console.log('今年是：'+ curYear + '年');
        // console.log('本月是：'+ curMonth + '月');
        // console.log('今天是：'+curDay+'号');
        let firstDayWeekDay = firstDay.getDay();//该月的第一天是星期几
        if(firstDayWeekDay === 0) firstDayWeekDay = 7;

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;
        // console.log('year:' + year);
        // console.log('month:' + month);

        let lastDayOfLastMonth = new Date(year, month-1, 0);//获取上月的最后一天
        let lastDateOfLastMonth = lastDayOfLastMonth.getDate();//获取上个月最后一天是几号
        // console.log('上月的最后一天是：'+lastDateOfLastMonth+'日');

        let preMonthDayCount = firstDayWeekDay - 1;//上月的最后一天是星期几？？？
        let lastDay = new Date(year, month, 0);//获取当月的最后一天
        let lastDate = lastDay.getDate();
        // console.log('本月的最后一天是：'+lastDate+'日');

        for(let i=0; i<7*6; i++){
            let date = i + 1 - preMonthDayCount;
            let showDate = date;
            let thisMonth = month;
            let thisYear = year;
            if(date <= 0){
                //上一月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            }else if(date > lastDate){
                //下个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }
            if(thisMonth === 0) thisMonth = 12;
            if(thisMonth === 13) thisMonth = 1;

            ret.push({
                year: thisYear,
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }

        let calArr = [];
        let todayX;
        let todayY;
        for(let i = 0; i < ret.length; i+=7){
          calArr.push(ret.slice(i, i+7));
        }

        for(let x = 0; x < calArr.length; x++){
          for(let y = 0; y < calArr[x].length; y++){
            if(calArr[x][y].date <= 0 || calArr[x][y].date > lastDate){
               calArr[x][y].showDate = '';
               calArr[x][y].notThisMonth = true;
            }

            if(calArr[x][y].year > curYear){
               calArr[x][y].notThisMonth = true;
               calArr[x][y].isDisabled = true;
            }

            if(calArr[x][y].year == curYear && calArr[x][y].month > curMonth){
              calArr[x][y].notThisMonth = true;
              calArr[x][y].isDisabled = true;
            }

            if(calArr[x][y].year == curYear && calArr[x][y].month == curMonth && calArr[x][y].date == curDay){
               calArr[x][y].isToday = true;
               todayX = x;
               todayY = y;

            }

            if(calArr[x][y].year == curYear && calArr[x][y].month == curMonth && calArr[x][y].date > curDay){
               calArr[x][y].isDisabled = true;
            }


          }
        }

        this.calendar = calArr;


        return {
          year: year,
          month: month,
          days: ret
        }

      },
      selectYear(value){
        this.year = value;
        this.getMonthData(value, this.month);
      },
      selectMonth(value){
        this.month = value;
        this.getMonthData(this.year, value);
      },

      // 提现
      withDraw() {
        if(!this.withDrawDate.withDrawMoney) {
          this.$message.error('请输入提现金额');
          return
        }
        if(this.withDrawDate.withDrawMoney < 5.01) {
          this.$message.error('提现金额不能小于5.01元');
          return
        }
        if(Number(this.withDrawDate.withDrawMoney) > Number(this.withDrawDate.actualMoney)) {
          this.$message.error('提现金额不能大于账户可提现金额');
          return
        }
        let params = {
          amount: Number(this.withDrawDate.withDrawMoney),
          userId: this.userId,
          // phone: this.phone,
          // code: this.code,
          // payOrderId: this.payOrderId
        }
        api.fundOutPay(params)
          .then(rep => {
            this.withDrawDialogVisible = false;
            this.$message({
              message: '提现成功',
              type: 'success'
            });
          })
          .catch(err => this.$message.error(err))

      },
      withDrawDialog() {
        this.withDrawDialogVisible = true;
        api.getFundOutCardBinInfo(this.userId)
          .then(rep => {
            console.log(rep)
            if(rep.data) {
              this.withDrawDate = {
                withDrawAccount: rep.data.bankName + rep.data.cardNo,
                withDrawMoney: null,
                actualMoney: this.accountBanlance.avl_bal
              }
            }

          })
          .catch(err => this.$message.error(err))
      },

      currentPageChange(page) {
        console.log(page)
        this.currentPage = page;
        // TODO: update data
        this.__fetchTradeList();
      },

      // 近30日入账金额统计
      draw () {
        let nearMonth = [];
        for(let i = 0; i < 30; i++){
          let newDate = new Date(new Date().setDate(new Date().getDate()+i));
          let nowYear = new Date().getFullYear();
          let newYear = newDate.getFullYear();
          // 不可跨年
          if(newYear == nowYear){
            nearMonth.push(newDate.toLocaleString().split(' ')[0])
          }

        }
        let myChart = echarts.init(this.$refs.chart);
        // 绘制图表
        myChart.setOption({
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['入账金额']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : nearMonth
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'入账金额',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}, color: '#58b7ff'}},
                    data:[120, 132, 141, 156, 190, 230, 250, 260, 264, 265,
                          310, 321, 330, 360, 365, 378, 420, 450, 455, 500,
                          502, 503, 512, 520, 521, 522, 532, 530, 534, 540]
                },
            ]
        });
      }
    },

    created() {
      this.userId = Number(localStorage.getItem('FINANCE_USERID')) || '';
      this.__fetchAccountBanlance();
      // this.__fetchTradeList();
      this.__fetchTrade(this.userId);
      this.financeType = this.$store.state.user ? this.$store.state.user.type : '';

    },

    mounted() {
      // this.draw();
      this.__initTradeFilter();
      this.__initTradeListFilter();
      this.getMonthData();


    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .my-account {
    &__title {
      padding: 24px 10px;
      border: 1px solid #dedede;
      display: flex;
      &-item {
        flex: 1;
        text-align: center;
        position:relative;
        &:not(:last-child){
          border-right: 1px solid #dedede;
        }
        &__text {
          color: #888;
          margin-bottom: 5px;
        }
        &__count {
          color: $blue-light;
          font-size: 24px;
        }
        &__withdraw{
          position: absolute;
          top: 50%;
          right: calc(50% - 140px);
          transform: translateY(-50%);
        }
      }
    }
    &__content {
      margin-top: 20px;
      overflow: hidden;
      &-record {
        padding: 10px 30px;
        &__header {
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        &__container {
          margin:0 auto;
          width: 800px;
          margin-bottom: 20px;
          .filter-title {
            padding: 10px;
            border: 1px solid #ebeef5;
            border-bottom: 0;
            &__item {
              display: inline-block;
              margin-left: 20px;
            }
          }
        }
        &__pagination {
          text-align: center;
        }
      }
      &-chart, &-calendar {
        padding: 10px 30px;
        &__header {
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        &__container {
          width: 100%;
          height: 500px;
          // #select-time {
          //   text-align:right;
          //   padding-right: 111px;
          // }
          .el-select {
            width: 120px;
            margin-right: 10px;
          }
          table{
            border-collapse: collapse;
            border-spacing: 0;
            margin:30px auto 0;
            width:800px;
            text-align:center;
            border-color:#ccc;
            color: #666;
            .tableTitle{
              background-color:#f9f9f9;
              th{
                height:60px;
                text-align:center;
                font-weight: normal;
              }
            }
            .table-content{
              border-bottom:1px dashed #ccc;
              td{
                position: relative;
                img{
                  width:20px;
                  height:20px;
                  position: absolute;
                  top:21px;
                  right:20%;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
