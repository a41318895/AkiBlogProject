<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="分類名稱" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="請輸入分類名稱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="狀態" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="請選擇"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option :key="'0'" label="正常" :value="'0'" />
          <el-option :key="'1'" label="禁用" :value="'1'" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜尋</el-button>
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
          v-hasPermission="['content:category:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >導出</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="categoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="分類ID" align="center" prop="id" />
      <el-table-column label="分類名稱" align="center" prop="name" />
      <el-table-column label="分類描述" align="center" prop="description" />
      <el-table-column prop="status" label="狀態" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="創建時間" align="center" />
      <el-table-column prop="updateTime" label="更新時間" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
      @current-change="getList"
      @size-change="getList"
    />

    <!-- Add or Update category window -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分類名稱" prop="name">
          <el-input v-model="form.name" placeholder="請輸入分類名稱" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="請輸入內容" />
        </el-form-item>

        <el-form-item label="狀態">
          <el-select v-model="form.status" placeholder="請選擇">
            <el-option :key="'0'" label="正常" :value="'0'" />
            <el-option :key="'1'" label="禁用" :value="'1'" />
          </el-select>
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

import { listCategory, getCategory, delCategory, addCategory, updateCategory, exportCategory } from '@/api/content/category'

export default {
  name: 'Category',
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
        name: undefined,
        description: undefined,
        metaKeywords: undefined,
        metaDescription: undefined,
        status: undefined
      },
      // 表單參數
      form: {},
      // 表單校驗
      rules: {
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查詢分類列表 */
    getList() {
      this.loading = true
      listCategory(this.queryParams).then(response => {
        // 確保status為0或1
        this.categoryList = response.rows.map(category => {
          return {
            ...category,
            status: category.status === '1' ? '1' : '0'
          }
        })
        this.total = response.total
        this.loading = false
        console.log(this.status)
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
        pid: null,
        description: null,
        metaKeywords: null,
        metaDescription: null,
        status: '0',
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        delFlag: null
      }
      this.resetForm('form')
    },
    /** 搜索按鈕操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按鈕操作 */

    // 多選框選中數據
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按鈕操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加分類'
    },
    /** 修改按鈕操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCategory(id).then(response => {
        this.form = response
        this.open = true
        this.title = '修改分類'
      })
    },
    /** 提交按鈕 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCategory(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addCategory(this.form).then(response => {
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
      this.$modal.confirm('是否確認刪除分類編號為"' + ids + '"的資料？').then(function() {
        return delCategory(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('刪除成功')
      }).catch(() => {})
    },
    /** 導出按鈕操作 */
    handleExport() {
      this.$modal.confirm('是否確認導出所有分類資料？').then(() => {
        this.exportLoading = true
        return exportCategory()
      }).then(response => {
        // this.$download.name(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    },
    /** 狀態切換操作 */
    handleStatusChange(row) {
      const updatedCategory = {
        ...row,
        status: row.status
      }
      updateCategory(updatedCategory).then(response => {
        this.$modal.msgSuccess('狀態更新成功')
      }).catch(() => {
        this.$modal.msgError('狀態更新失敗')
        // 如果更新失敗，恢復原來的狀態
        row.status = row.status === '0' ? '1' : '0'
      })
    }
  }
}
</script>
