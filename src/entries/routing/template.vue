<template>
  <div class="routing-template">
    <div class="routing-template__filter-bar">
      <el-collapse v-model="filterBarActiveName">
        <el-collapse-item title="筛选条件" name="1">
          <filter-bar
            :parentMerchantOptions="parentMerchantOptions"
            @query-click="queryTemplate"
            @reset-click="queryTemplate">
          </filter-bar>
        </el-collapse-item>
      </el-collapse>

    </div>

    <template>
      <div class="routing-template__table">
        <template-table :withdraw="templateList" @delete-template="deleteTemplateShow"></template-table>
      </div>
    </template>

    <div class="routing-template__pagination-bar" v-if="templateListTotal > 0">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="templateListTotal"
        @current-change="currentPageChange">
      </el-pagination>
    </div>
    <delete-template
      v-if="deleteDialogShow"
      :deleteId="deleteTemplateId"
      @close-click="deleteDialogShow = false"
      @delete-template="deleteTemplate">
    </delete-template>
  </div>
</template>

<script>
  import api      from '@/api/api';
  import moment   from 'moment';

  import FilterBar        from './template/FilterBar';
  import TemplateTable    from './template/TemplateTable';
  import DeleteTemplate   from './template/DeleteTemplate';

  export default {
    components: {
      FilterBar,
      TemplateTable,
      DeleteTemplate
    },

    data() {
      return {
        filterBarActiveName: ['1'],
        deleteDialogShow: false,
        deleteTemplateId: '',
        templateList: [],
        templateListTotal: 0,
        parentMerchantOptions: [],
        currentFilter: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          userId: '',
          data: '',
        },
        currentPage: 1,
        pageSize: 10,
      };
    },

    methods: {
      __fetchTemplate(filter) {
        let filters = Object.assign({}, filter, {
          page: this.currentPage,
          pageSize: this.pageSize
        });

        api.getRoutingTemplates(filters)
          .then(rep => {
            console.log(rep);
            if(rep) {
              this.parentMerchantOptions = rep.data.list ? rep.data.list.filter(it => it != null) : [];
              if(rep.data.data.pageData.length <= 0) {
                this.templateList = [];
                this.templateListTotal = rep.data.data.total;
                // this.$message.error('暂无数据')

              }else {
                let offset = (this.currentPage - 1) * this.pageSize;
                this.templateList = rep.data.data.pageData.map((t, i) => Object.assign({}, t, {
                  no: offset + i + 1
                }));
                this.templateListTotal = rep.data.total;
              }
            }else {
              this.$message.error('暂无数据')
            }
          })
          .catch(err => this.$message.error(err))
      },

      queryTemplate(filter) {
        console.log(filter)
        this.currentPage = 1;
        this.currentFilter = filter;

        this.__fetchTemplate(filter);
      },

      currentPageChange(page) {
        this.currentPage = page;

        this.__fetchTemplate(this.currentFilter);
      },

      deleteTemplateShow(id) {
        this.deleteDialogShow = true;
        this.deleteTemplateId = id;

      },

      deleteTemplate() {
        api.deleteRoutingTemplates(this.deleteTemplateId)
          .then(rep => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.deleteDialogShow = false;
            this.__fetchTemplate(this.currentFilter);
          })
          .catch(err => this.$message.error(err))
      }

    },

    created() {
      this.__fetchTemplate(this.currentFilter);
    }
  };
</script>

<style lang="scss" scoped>
  @import '~styles/base/variable';

  .routing-template {
    &__table {
      margin-top: 20px;
    }
    &__empty {
      color: $gray-dark;
      text-align: center;
      opacity: .8;
    }

    &__pagination-bar {
      margin-top: 20px;
      text-align: right;
    }
  }
</style>
