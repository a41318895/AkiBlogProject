<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="菜單名稱" prop="menuName">
        <el-input
          v-model="queryParams.menuName"
          placeholder="請輸入菜單名稱"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="狀態" prop="status">
        <el-select v-model="queryParams.status" placeholder="菜單狀態" clearable size="small">
          <el-option :key="'0'" label="正常" :value="'0'" />
          <el-option :key="'1'" label="停用" :value="'1'" />
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
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="menuList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="menuName" label="菜單名稱" :show-overflow-tooltip="true" width="160" align="center" />
      <el-table-column prop="icon" label="圖示" align="center" width="100">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" width="60" align="center" />
      <el-table-column prop="perms" label="權限標示" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="component" label="前端組件路徑" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="status" label="狀態" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status== '0'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status== '1'" type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="創建時間" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改時間" align="center" prop="updateTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
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
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >刪除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改菜單對話框 -->
    <el-dialog :title="title" :visible.sync="open" width="680px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上級菜單">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="選擇上級菜單"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜單類型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目錄</el-radio>
                <el-radio label="C">菜單</el-radio>
                <el-radio label="F">按鈕</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" label="菜單圖示">
              <!-- <IconSelect ref="iconSelect" @selected="selected" /> -->
              <el-select
                v-model="form.icon"
                placeholder="圖示"
                clearable
                size="small"
                style="width: 240px"
              >
                <el-option v-for="(item, index) in icons" :key="index" :value="item">
                  <svg-icon :icon-class="item" />
                  <span>{{ item }}</span>
                </el-option>

              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜單名稱" prop="menuName">
              <el-input v-model="form.menuName" placeholder="請輸入菜單名稱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="顯示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" prop="path">
              <span slot="label">
                <el-tooltip content="訪問的路由地址，如：`user`" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                路由地址
              </span>
              <el-input v-model="form.path" placeholder="請輸入路由地址" />
            </el-form-item>
          </el-col>
          <el-col v-if="form.menuType == 'C'" :span="12">
            <el-form-item prop="component">
              <span slot="label">
                <el-tooltip content="訪問的組件路徑，如：`system/user/index`，默認在`views`目錄下" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                組件路徑
              </span>
              <el-input v-model="form.component" placeholder="請輸入組件路徑" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'M'">
              <el-input v-model="form.perms" placeholder="請輸入權限標識" maxlength="100" />
              <span slot="label">
                <el-tooltip content="控制器中定義的權限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                權限字符
              </span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'">
              <span slot="label">
                <el-tooltip content="選擇隱藏則路由將不會出現在側邊欄，但仍然可以訪問" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                顯示狀態
              </span>
              <el-radio-group v-model="form.visible">
                <el-radio :key="'0'" :label="'0'">顯示</el-radio>
                <el-radio :key="'1'" :label="'1'">隱藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'">
              <span slot="label">
                <el-tooltip content="選擇停用則路由將不會出現在側邊欄，也不能被訪問" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                菜單狀態
              </span>
              <el-radio-group v-model="form.status">
                <el-radio :key="'0'" :label="'0'">正常</el-radio>
                <el-radio :key="'1'" :label="'1'">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item v-if="form.menuType == 'M'">
              <span slot="label">
                <el-tooltip content="是否緊閉子菜單" placement="top">
                  <i class="el-icon-question" />
                </el-tooltip>
                緊閉子菜單
              </span>
              <el-radio-group v-model="form.isCache">
                <el-radio :key="'0'" :label="'0'">是</el-radio>
                <el-radio :key="'1'" :label="'1'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listMenu, getMenu, delMenu, addMenu, updateMenu, treeSelect } from '@/api/menu'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Menu',
  components: { Treeselect },
  data() {
    return {
      // 遮罩層
      loading: true,
      // 顯示搜索條件
      showSearch: true,
      // 菜單表格樹數據
      menuList: [],
      // 菜單樹選項
      menuOptions: [],
      // 彈出層標題
      title: '',
      // 是否顯示彈出層
      open: false,
      // 是否展開，默認全部折疊
      isExpandAll: false,
      // 重新渲染表格狀態
      refreshTable: true,
      // 查詢參數
      queryParams: {
        menuName: undefined,
        status: undefined
      },
      icons: [],
      // 表單參數
      form: { parentId: null },
      // 表單校驗
      rules: {
        menuName: [
          { required: true, message: '菜單名稱不能為空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '菜單順序不能為空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能為空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.icons = this.getIcons()
  },
  methods: {
    getIcons() {
      const req = require.context('@/assets/icons/svg', false, /\.svg$/)
      const requireAll = requireContext => requireContext.keys()
      const re = /\.\/(.*)\.svg/

      const arr = requireAll(req).map(i => {
        return i.match(re)[1]
      })
      return arr
    },
    // 選擇圖標
    selected(name) {
      this.form.icon = name
    },
    /** 查詢菜單列表 */
    getList() {
      this.loading = true

      const queryParams = {
        ...this.queryParams,
        menuName: this.queryParams.menuName || '', // 如果 menuName 未定義則設置為空string
        status: this.queryParams.status || '0'
      }

      listMenu(queryParams).then(response => {
        this.menuList = this.handleTree(response, 'id')
        this.loading = false
      }).catch(error => {
        console.error(error)
        this.loading = false
      })
    },
    // 轉換菜單數據結構
    handleTree(data, idKey) {
      const tree = []
      const map = {}
      data.forEach(item => {
        map[item[idKey]] = item
        item.children = []
      })

      data.forEach(item => {
        const parent = map[item.parentId]
        if (parent) {
          parent.children.push(item)
        } else {
          tree.push(item)
        }
      })

      return tree
    },
    // 標準化 treeselect 的選項
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.menuName,
        children: node.children
      }
    },
    /** 查詢菜單下拉樹結構 */
    getTreeSelect() {
      this.loading = true

      treeSelect().then(response => {
        this.menuOptions = []
        const menu = { id: 0, menuName: '主類目', children: [] }
        const processedMenus = this.processMenuTree(response) // 處理菜單樹結構，獲取所有子菜單

        menu.children = processedMenus
        this.menuOptions.push(menu)
      }).finally(() => {
        this.loading = false
      })
    },

    /** 處理菜單樹結構，獲取所有子菜單 */
    processMenuTree(menus) {
      const processed = []
      menus.forEach(menu => {
        const processedMenu = {
          id: menu.id,
          menuName: menu.menuName
        }

        if (menu.children && menu.children.length > 0) {
          processedMenu.children = this.processMenuTree(menu.children)
        }

        processed.push(processedMenu)
      })

      return processed
    },
    // 取消按鈕
    cancel() {
      this.open = false
      this.reset()
    },
    // 表單重置
    reset() {
      this.form = {
        id: undefined,
        parentId: 0,
        menuName: undefined,
        icon: undefined,
        menuType: 'M',
        orderNum: undefined,
        isCache: '0',
        visible: '0',
        status: '0'
      }
      this.resetForm('form')
    },
    /** 搜尋按鈕操作 */
    handleQuery() {
      this.getList()
    },
    /** 新增按鈕操作 */
    handleAdd(row) {
      this.reset()
      this.getTreeSelect()
      if (row != null && row.id) {
        this.form.parentId = row.id
      } else {
        this.form.parentId = 0
      }
      this.open = true
      this.title = '添加菜單'
    },

    /** 修改按鈕操作 */
    handleUpdate(row) {
      this.reset()
      this.getTreeSelect()
      getMenu(row.id).then(response => {
        this.form = response
        this.open = true
        this.title = '修改菜單'
      })
    },
    /** 提交按鈕 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateMenu(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMenu(this.form).then(response => {
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
      this.$modal.confirm('是否確認刪除名稱為"' + row.menuName + '"的資料？').then(function() {
        return delMenu(row.id)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('刪除成功')
      }).catch(() => {})
    }
  }
}
</script>

