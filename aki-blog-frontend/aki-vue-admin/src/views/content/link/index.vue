<template>
  <div class="app-container">
    <el-form
      v-show="showSearch"
      ref="queryForm"
      :model="queryParams"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="名稱" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="請輸入友情連結名稱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="審核狀態" prop="status">
        <el-select v-model="queryParams.status" placeholder="請選擇" clearable>
          <el-option :key="'0'" label="審核通過" :value="'0'" />
          <el-option :key="'1'" label="審核未通過" :value="'1'" />
          <el-option :key="'2'" label="未審核" :value="'2'" />
        </el-select>
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
          v-hasPermission="['content:link:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >導出</el-button>
      </el-col> -->
    </el-row>

    <el-table
      v-loading="loading"
      :data="linkList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" width="40px" />
      <el-table-column label="名稱" align="center" prop="name" width="120px" />
      <el-table-column label="描述" align="center" prop="description" width="120px" />
      <el-table-column label="logo" align="center" prop="logo" type="img">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.logo"
            fit="fill"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="連接網址" align="center" />
      <el-table-column prop="status" label="審核狀態" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '0'" type="success">通過</el-tag>
          <el-tag v-if="scope.row.status === '1'" type="danger">未通過</el-tag>
          <el-tag v-if="scope.row.status === '2'" type="danger">未審核</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="創建時間" align="center" prop="createTime" />
      <el-table-column label="更新時間" align="center" prop="updateTime" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-hasPermission="['content:link:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermission="['content:link:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >刪除</el-button>
          <el-button
            v-if="scope.row.status === '2'"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleChangeStatus(scope.row, '0')"
          >審核通過</el-button>
          <el-button
            v-if="scope.row.status === '2'"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleChangeStatus(scope.row, '1')"
          >審核不通過</el-button>
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

    <!-- Add or Update Link window -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名稱" prop="name">
          <el-input v-model="form.name" placeholder="請輸入名稱" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="請輸入描述"
          />
        </el-form-item>
        <el-form-item label="logo" prop="logo">
          <el-input v-model="form.logo" placeholder="請輸入logo連接網址" />
        </el-form-item>
        <el-form-item label="連接網址" prop="address">
          <el-input v-model="form.address" placeholder="請輸入連接網址" />
        </el-form-item>
        <el-form-item label="狀態" prop="status">
          <el-select v-model="form.status" placeholder="請選擇">
            <el-option :key="'0'" label="審核通過" :value="'0'" />
            <el-option :key="'1'" label="審核未通過" :value="'1'" />
            <el-option :key="'2'" label="未審核" :value="'2'" />
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
import {
  listLink,
  getLink,
  delLink,
  addLink,
  updateLink,
  changeLinkStatus,
  exportLink
} from '@/api/content/link'

export default {
  name: 'Link',
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
      // 友鏈表格數據
      linkList: null,
      // 彈出層標題
      title: '',
      // 是否顯示彈出層
      open: false,
      // 查詢參數
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        description: null,
        address: null,
        status: null,
        logo: undefined
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
    /** 查詢友鏈列表 */
    getList() {
      this.loading = true
      listLink(this.queryParams).then((response) => {
        this.linkList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleChangeStatus(link, newStatus) {
      this.loading = true
      changeLinkStatus(link.id, newStatus).then((response) => {
        this.$modal.msgSuccess('審核成功')
        this.open = false
        this.getList()
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
        description: null,
        address: null,
        logo: null,
        status: '2'
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
      this.title = '添加友情連結'
    },
    /** 修改按鈕操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLink(id).then((response) => {
        this.form = response
        this.open = true
        this.title = '修改友情連結'
      })
    },
    /** 提交按鈕 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateLink(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLink(this.form).then((response) => {
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
        .confirm('是否確認刪除友情連結編號為"' + ids + '"之項 ？')
        .then(function() {
          return delLink(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('刪除成功')
        })
        .catch(() => {})
    },
    handleExport() {
      this.$modal.confirm('是否確認導出所有友情連結資料 ?').then(() => {
        this.exportLoading = true
        return exportLink()
      }).then(response => {
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

