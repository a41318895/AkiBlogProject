<template>
  <div class="app-container">

    <el-form ref="form" :model="form" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章標題" prop="title">
            <el-input
              v-model="form.title"
              placeholder="請輸入文章標題"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分類">
            <el-select v-model="form.categoryId" placeholder="請選擇">
              <el-option
                v-for="category in categoryList"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="標籤">
            <el-select v-model="form.tags" placeholder="請選擇" multiple>
              <el-option
                v-for="tag in tagList"
                :key="tag.id"
                :label="tag.name"
                :value="tag.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章摘要">
            <el-input v-model="form.summary" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="允許評論">
            <el-radio-group v-model="form.isComment">
              <el-radio :key="'1'" :label="'1'">允許</el-radio>
              <el-radio :key="'0'" :label="'0'">不允許</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否置頂">
            <el-radio-group v-model="form.isTop">
              <el-radio :key="'1'" :label="'1'">是</el-radio>
              <el-radio :key="'0'" :label="'0'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20" />

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章縮圖">
            <el-upload
              :file-list="fileList"
              class="upload-demo"
              list-type="picture"
              drag
              name="img"
              action="upload"
              :on-remove="fileRemove"
              :limit="1"
              :http-request="handleUpload"
              :on-exceed="onExceed"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">將檔案拖曳至此處，或者<em>點擊上傳</em></div>
              <div slot="tip" class="el-upload__tip">只能上傳 jpg / png 檔案，且大小不可超過2MB</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" size="medium" @click="handleSubmit">{{ aId?"更新":"發布" }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="!aId" type="info" @click="handleSave">保存至草稿箱</el-button>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <mavon-editor ref="md" v-model="form.content" :language="'zh-TW'" @imgAdd="addImg" />
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { listAllCategory } from '@/api/content/category'
import { uploadImg } from '@/api/content/upload'
import { addArticle, getArticle, updateArticle } from '@/api/content/article'
import { listAllTag } from '@/api/content/tag'
export default {
  name: 'Write',
  data() {
    return {
      form: {
        title: '',
        thumbnail: '',
        isTop: '0',
        isComment: '0',
        content: ''
      },
      categoryList: [],
      tagList: [],
      aId: -1,
      fileList: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.aId = route.query && route.query.id
      },
      immediate: true
    }
  },
  created() {
    this.getCategoryAndTag()
    if (this.aId) {
      this.getArticle()
    }
  },
  methods: {
    getArticle() {
      getArticle(this.aId).then(response => {
        this.form = response
        this.fileList.push({ name: '文章縮圖', url: response.thumbnail })
      })
    },
    handleSave() {
      this.form.status = '1'
      addArticle(this.form).then(response => {
        this.$modal.msgSuccess('保存草稿成功')
      })
    },
    handleSubmit() {
      if (!this.aId) {
        this.form.status = '0'
        addArticle(this.form).then(response => {
          this.$modal.msgSuccess('文章發布成功')
          this.$router.push({ path: '/content/article' })
        })
      } else {
        // 更新博客信息
        updateArticle(this.form).then(response => {
          this.$modal.msgSuccess('文章更新成功')
          this.$router.push({ path: '/content/article' })
        })
      }
    },
    onExceed() {
      this.$message.error('只能上傳一個檔案(圖片)')
    },
    handleUpload(img) {
      uploadImg(img.file).then(response => {
        this.form.thumbnail = response
        this.fileList.push({ name: img.file.name, url: response })
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    fileRemove(file, fileList) {
      this.fileList.pop()
    },
    // Bind @imgAdd Event
    addImg(pos, file) {
      // First, upload img to server
      uploadImg(file).then(response => {
        this.$refs.md.$img2Url(pos, response)
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    getCategoryAndTag() {
      listAllCategory().then((response) => {
        this.categoryList = response
      })
      listAllTag().then(response => {
        this.tagList = response
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上傳大頭貼, 圖片大小不能超過 2MB !')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
.el-col .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;

    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
