<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-form
          v-show="showSearch"
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="文章標題" prop="title">
            <el-input
              v-model="queryParams.title"
              placeholder="請輸入文章標題"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="摘要" prop="summary">
            <el-input
              v-model="queryParams.summary"
              placeholder="請輸入摘要"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
            >搜尋</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >單項 / 批量刪除</el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button
              v-hasPermission="['content:article:export']"
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              :loading="exportLoading"
              @click="handleExport"
            >導出</el-button>
          </el-col> -->
          <!-- <right-toolbar
            :show-search.sync="showSearch"
            :columns="columns"
            @queryTable="getList"
          /> -->
        </el-row>

        <el-table :data="articleList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="文章ID" align="center" />
          <el-table-column prop="title" label="標題" align="center" />
          <el-table-column prop="summary" label="摘要" align="center" />
          <el-table-column prop="createTime" label="創建時間" align="center" />
          <el-table-column prop="updateTime" label="更新時間" align="center" />

          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination
      :page-size.sync="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      :current-page.sync="queryParams.pageNum"
      @current-change="getList"
      @size-change="getList"
    />
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import {
  listArticle,
  delArticle,
  exportArticle
}
from '@/api/content/article'

export default {
  name: 'Article',
  data() {
    return {
      exportLoading: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phoneNumber: undefined,
        status: undefined
      },
      title: '',
      summary: '',
      // Is show pop-up layer
      open: false,
      multiple: true,
      total: 0,
      articleList: [],
      showSearch: true
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    /** Search button */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    // Mutiply choose data
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // cancel button
    cancel() {
      this.open = false
      this.reset()
    },
    /** select user list */
    getList() {
      this.loading = true
      listArticle({
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        title: this.queryParams.title,
        summary: this.queryParams.summary
      }).then((response) => {
        this.articleList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** update button */
    handleUpdate(row) {
      this.$router.push('/write?id=' + row.id)
    },
    /** add new user */
    handleAdd() {
      this.$router.push('/write')
    },
    /** delete button */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否確認要刪除分類編號為"' + ids + '"的資料？').then(function() {
        return delArticle(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('刪除成功')
      }).catch(() => {})
    },
    handleExport() {
      this.$modal.confirm('是否確認導出所有文章資料 ?').then(() => {
        this.exportLoading = true
        return exportArticle()
      }).then(response => {
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>
