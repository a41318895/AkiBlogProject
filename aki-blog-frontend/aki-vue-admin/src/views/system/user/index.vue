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
          <el-form-item label="用戶名稱" prop="userName">
            <el-input
              v-model="queryParams.userName"
              placeholder="請輸入用戶名稱"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手機號碼" prop="phoneNumber">
            <el-input
              v-model="queryParams.phoneNumber"
              placeholder="請輸入手機號碼"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="狀態" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用戶狀態"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option :key="'0'" label="正常" :value="'0'" />
              <el-option :key="'1'" label="停用" :value="'1'" />
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
              v-hasPermission="['system:user:export']"
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

        <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="用戶ID" align="center" />
          <el-table-column prop="userName" label="用戶名稱" align="center" />
          <el-table-column prop="nickName" label="用戶暱稱" align="center" />
          <el-table-column prop="phoneNumber" label="手機號碼" align="center" />
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
          <el-table-column prop="updateTime" label="修改時間" align="center" />

          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">  <!-- v-if="scope.row.id !== 1" -->
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
    <!-- Add or Update param config window -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用戶暱稱" prop="nickName">
              <el-input
                v-model="form.nickName"
                placeholder="請輸入用戶暱稱"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手機號碼" prop="phoneNumber">
              <el-input
                v-model="form.phoneNumber"
                placeholder="請輸入手機號碼"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="電子郵件" prop="email">
              <el-input
                v-model="form.email"
                placeholder="請輸入電子郵件"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              v-if="form.id == undefined"
              label="用戶名稱"
              prop="userName"
            >
              <el-input
                v-model="form.userName"
                placeholder="請輸入用戶名稱"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.id == undefined"
              label="用戶密碼"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="請輸入用戶密碼"
                type="password"
                maxlength="20"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用戶性別">
              <el-select v-model="form.sex" placeholder="請選擇">
                <el-option :key="'0'" label="男" :value="'0'" />
                <el-option :key="'1'" label="女" :value="'1'" />
                <el-option :key="'2'" label="未知" :value="'2'" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="狀態">
              <el-radio-group v-model="form.status">
                <el-radio :key="'0'" :label="'0'">正常</el-radio>
                <el-radio :key="'1'" :label="'1'">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" placeholder="請選擇" multiple>
                <el-option
                  v-for="item in roleOptions"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                  :disabled="item.status == '1'"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">確 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  changeUserStatus,
  exportUser
}
from '@/api/system/user'
import {
  listAllRole
}
from '@/api/system/role'
export default {
  name: 'User',
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phoneNumber: undefined,
        status: undefined
      },
      title: '',
      multiple: true,
      exportLoading: false,
      // Is show pop-up layer
      open: false,
      // Form check
      rules: {
        userName: [
          { required: true, message: '用戶名稱不能為空', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '用戶名稱長度必須介於 2 和 20 之間',
            trigger: 'blur'
          }
        ],
        nickName: [
          { required: true, message: '用戶暱稱不能為空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用戶密碼不能為空', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '用戶密碼長度必須介於 5 和 20 之間',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            message: "'請輸入正確的電子郵件",
            trigger: ['blur', 'change']
          }
        ],
        phoneNumber: [
          {
            pattern: /^09\d{8}$/,
            message: '請輸入正確的手機號碼',
            trigger: 'blur'
          }
        ]
      },
      // Role Options
      roleOptions: [],
      // Show select conditions
      showSearch: true,
      // 遮罩層
      loading: true,
      // User form data
      userList: null,
      total: 0,
      // Selected ids
      ids: [],
      form: {}
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  methods: {
    /** Select button */
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
    /** Select user list */
    getList() {
      this.loading = true
      listUser(this.queryParams).then((response) => {
        this.userList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // User status udpate
    handleStatusChange(row) {
      const text = row.status === '0' ? '啟用' : '停用'
      this.$modal
        .confirm('確認要"' + text + '""' + row.userName + '"用戶嗎 ?')
        .then(function() {
          return changeUserStatus(row.id, row.status)
        })
        .then(() => {
          this.$modal.msgSuccess(text + '成功')
        })
        .catch(function() {
          row.status = row.status === '0' ? '1' : '0'
        })
    },
    /** Update button */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getUser(id).then((response) => {
        this.form = response.user
        this.roleOptions = response.roles
        this.form.roleIds = response.roleIds
        this.open = true
        this.title = '修改用戶'
        this.form.password = response.password
      })
    },
    // Form reset
    reset() {
      this.form = {
        id: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phoneNumber: undefined,
        email: undefined,
        sex: undefined,
        status: '0',
        remark: undefined,
        roleIds: []
      }
      this.resetForm('form')
    },
    /** Add user */
    handleAdd() {
      this.reset()
      listAllRole().then((response) => {
        this.roleOptions = response
        this.open = true
        this.title = '添加用戶'
      })
    },
    /** Delete button */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否確認刪除用戶ID為"' + ids + '"的資料？')
        .then(function() {
          return delUser(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('刪除成功')
        })
        .catch(() => {})
    },
    /** Submit button*/
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },

    handleExport() {
      this.$modal.confirm('是否確認導出所有用戶資料 ?').then(() => {
        this.exportLoading = true
        return exportUser()
      }).then(response => {
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>
