<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="標籤名稱" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="請輸入標籤名稱"
          clearable
          size="small"
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

      <el-col :span="1.5">
        <el-button
          v-hasPermission="['content:tag:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >導出</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="categoryList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="標籤ID" align="center" prop="id" width="100" />
      <el-table-column label="標籤名稱" align="center" prop="name" width="140" />
      <el-table-column label="備註" align="center" prop="remark" min-width="240" />
      <el-table-column label="創建時間" align="center" prop="createTime" />
      <el-table-column label="更新時間" align="center" prop="updateTime" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="150"
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

    <el-pagination
      :page-size.sync="queryParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      :current-page.sync="queryParams.pageNum"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
    />

    <!-- 添加或修改分类对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="標籤名稱" prop="name">
          <el-input v-model="form.name" placeholder="請輸入標籤名稱" />
        </el-form-item>
        <el-form-item label="備註" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="請輸入備註"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">確 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { listTag, getTag, delTag, addTag, updateTag, exportTag } from '@/api/content/tag'

export default {
  name: 'Tag',
  data() {
    return {
      // 遮罩層
      loading: true,
      // 導出遮罩層
      exportLoading: false,
      // 選中數組
      ids: [],
      // 非單個禁用
      single: true,
      // 非多個禁用
      multiple: true,
      // 顯示搜索條件
      showSearch: true,
      // 總條數
      total: 0,
      // 分類表格數據
      categoryList: null,
      // 彈出層標題
      title: '',
      // 是否顯示彈出層
      open: false,
      // 查詢參數
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null
      },
      // 表單參數
      form: {},
      // 表單校驗
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查詢分類列表 */
    getList() {
      this.loading = true
      listTag(this.queryParams).then((response) => {
        this.categoryList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按鈕
    cancel() {
      this.open = false
      this.reset()
    },
    // 表單重置
    reset() {
      this.form = {
        id: null,
        name: null,
        remark: null
      }
      this.resetForm('form')
    },
    /** 搜索按鈕操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按鈕操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多選框選中數據
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按鈕操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加標籤'
    },
    /** 修改按鈕操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getTag(id).then((response) => {
        this.form = response
        this.open = true
        this.title = '修改標籤'
      })
    },
    /** 提交按鈕 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateTag(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addTag(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 刪除按鈕操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否確認刪除標籤編號為"' + ids + '"的資料 ？')
        .then(function() {
          return delTag(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('刪除成功')
        })
        .catch(() => {})
    },

    // 處理頁碼變化
    handlePageChange(page) {
      this.queryParams.pageNum = page
      this.getList()
    },
    // 處理頁面大小變化
    handlePageSizeChange(size) {
      this.queryParams.pageSize = size
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleExport() {
      this.$modal.confirm('是否確認導出所有標籤資料 ?').then(() => {
        this.exportLoading = true
        return exportTag()
      }).then(response => {
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

