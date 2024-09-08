<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="角色名稱" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="請輸入角色名稱"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="狀態" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色狀態"
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
      <el-col :span="1.5">
        <el-button
          v-hasPermission="['system:role:export']"
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
      :data="roleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="角色ID" prop="id" width="120" align="center" />
      <el-table-column
        label="角色名稱"
        prop="roleName"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        label="權限字符"
        prop="roleKey"
        :show-overflow-tooltip="true"
        width="220"
        align="center"
      />
      <el-table-column label="顯示順序" prop="roleSort" width="100" align="center" />
      <el-table-column label="狀態" align="center" width="100" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="創建時間" prop="createTime" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改時間" prop="updateTime" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope"> <!-- v-if="scope.row.id !== 1" -->
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

    <!-- Add or Update role config window -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名稱" prop="roleName">
          <el-input v-model="form.roleName" placeholder="請輸入角色名稱" />
        </el-form-item>
        <el-form-item prop="roleKey">
          <span slot="label">
            <el-tooltip
              content="控制器中定義的權限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
              placement="top"
            >
              <i class="el-icon-question" />
            </el-tooltip>
            權限字符
          </span>
          <el-input v-model="form.roleKey" placeholder="請輸入權限字符" />
        </el-form-item>
        <el-form-item label="角色順序" prop="roleSort">
          <el-input-number
            v-model="form.roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="狀態">
          <el-radio-group v-model="form.status">
            <el-radio :key="'0'" :label="'0'">正常</el-radio>
            <el-radio :key="'1'" :label="'1'">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜單權限">
          <el-checkbox
            v-model="menuExpand"
            @change="handleCheckedTreeExpand($event)"
          >展開 / 摺疊</el-checkbox>
          <el-checkbox
            v-model="menuNodeAll"
            @change="handleCheckedTreeNodeAll($event)"
          >全選 / 全不選</el-checkbox>
          <el-tree
            ref="menu"
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            node-key="id"
            :check-strictly="false"
            empty-text="加載中，請稍候"
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item label="備註">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="請輸入内容"
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
import {
  listRole,
  getRole,
  delRole,
  addRole,
  updateRole,
  changeRoleStatus,
  exportRole
} from '@/api/system/role'
import { treeSelect as menuTreeSelect, roleMenuTreeSelect } from '@/api/menu'

export default {
  name: 'Role',
  data() {
    return {
      // 遮罩层
      loading: true,
      exportLoading: false,
      // Selected role ids
      ids: [],
      // Not single forbidden
      single: true,
      // Not mutiple forbidden
      multiple: true,
      total: 0,
      roleList: [],
      // Pop-up layer title
      title: '',
      // Is show pop-up layer
      open: false,
      // Menu list
      menuOptions: [],
      menuExpand: false,
      menuNodeAll: false,

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      // Form params
      form: {},
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      // Form check
      rules: {
        roleName: [
          { required: true, message: '角色名稱不能為空', trigger: 'blur' }
        ],
        roleKey: [
          { required: true, message: '權限字符不能為空', trigger: 'blur' }
        ],
        roleSort: [
          { required: true, message: '角色順序不能為空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** Select role list */
    getList() {
      this.loading = true
      listRole(this.queryParams).then((response) => {
        this.roleList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** Select menu tree structure */
    getMenuTreeSelect() {
      menuTreeSelect().then((response) => {
        this.menuOptions = response
      })
    },
    // All menu node data
    getMenuAllCheckedKeys() {
      // Current menu node
      const checkedKeys = this.$refs.menu.getCheckedKeys()
      // half-select menu node
      const halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },
    /** Select menu tree structure via role id */
    getRoleMenuTreeSelect(id) {
      return roleMenuTreeSelect(id).then((response) => {
        this.menuOptions = response.menus
        return response
      })
    },
    // Role status update
    handleStatusChange(row) {
      const text = row.status === '0' ? '啟用' : '停用'
      this.$modal
        .confirm('確認要"' + text + '""' + row.roleName + '"角色嗎？')
        .then(function() {
          return changeRoleStatus(row.id, row.status)
        })
        .then(() => {
          this.$modal.msgSuccess(text + '成功')
        })
        .catch(function() {
          row.status = row.status === '0' ? '1' : '0'
        })
    },
    // cancel button
    cancel() {
      this.open = false
      this.reset()
    },
    // form reset
    reset() {
      if (this.$refs.menu !== undefined) {
        this.$refs.menu.setCheckedKeys([])
      }

      // eslint-disable-next-line no-sequences
      (this.menuNodeAll = false),
      (this.menuExpand = false),
      (this.form = {
        id: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: '0',
        menuIds: [],
        remark: undefined
      })
      this.resetForm('form')
    },
    /** search button */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** reset button */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // Mutiply choose data
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // Tree authority ( 展開 / 摺疊）
    handleCheckedTreeExpand(value) {
      const treeList = this.menuOptions
      for (let i = 0; i < treeList.length; i++) {
        this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value
      }
    },
    // Tree authority（all choose / all not choose）
    handleCheckedTreeNodeAll(value) {
      this.$refs.menu.setCheckedNodes(value ? this.menuOptions : [])
    },

    /** Add button */
    handleAdd() {
      this.reset()
      this.getMenuTreeSelect()
      this.open = true
      this.title = '添加角色'
    },
    /** update button */
    handleUpdate(row) {
      this.reset()
      const id = row.id || (Array.isArray(this.ids) && this.ids.length > 0 ? this.ids[0] : null)
      if (id === null) {
        this.$message.error('無法取得角色ID')
        return
      }
      console.log(id)
      const roleMenu = this.getRoleMenuTreeSelect(id)
      getRole(id).then((response) => {
        this.form = response
        this.open = true
        this.$nextTick(() => {
          roleMenu.then((res) => {
            const checkedKeys = res.checkedKeys
            checkedKeys.forEach((v) => {
              this.$nextTick(() => {
                this.$refs.menu.setChecked(v, true, false)
              })
            })
          })
        })
        this.title = '修改角色'
      })
    },
    /** Submit button */
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys()
            updateRole(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys()
            addRole(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },

    /** delete button */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否確認刪除角色編號為"' + ids + '"的資料？')
        .then(function() {
          return delRole(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('刪除成功')
        })
        .catch(() => {})
    },

    handleExport() {
      this.$modal.confirm('是否確認導出所有角色資料 ?').then(() => {
        this.exportLoading = true
        return exportRole()
      }).then(response => {
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>
