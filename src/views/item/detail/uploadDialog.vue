<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-dialog
        :visible.sync="dialogVisible"
        title="ファイル追加"
        width="30%">
        <el-form-item label="アップロード">
          <el-button v-if="!form.file.name" type="primary" size="small" @click="handleAddFileBtnClick">アップロード</el-button>
          <span v-else @click="handleAddFileBtnClick" style="cursor: pointer">{{form.file.name}}</span>
          <input type="file" @change="handleFileInputChange" ref="fileInput" style="display: none">
        </el-form-item>
        <el-form-item label="種類">
          <el-radio-group v-model="form.type">
            <el-radio label="0">研究ノート</el-radio>
            <el-radio label="1">研究データ</el-radio>
            <el-radio label="2">操作履歴</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="アクティビティタイプ" prop="desc">
          <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">キャンセル</el-button>
          <el-button type="primary" size="small" @click="onSubmit">OK</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { uploadFile } from '@/api/ipfs'
import { addFile } from '@/api/item'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        file: {
          name: '',
          hash: '',
          size: ''
        },
        type: '',
        desc: ''
      }
    }
  },
  methods: {
    // 提交表单
    async onSubmit() {
      const data = {
        hash: this.form.file.hash,
        size: this.form.file.size,
        title: this.form.file.name,
        type: this.form.type,
        description: this.form.desc,
        projectId: this.$route.params.id
      }
      if (!data.hash) {
        return this.$message.error('ファイルをアップロードしてください！')
      }
      if (!data.type) {
        return this.$message.error('ファイルの種類を選択してください！')
      }
      if (!data.description) {
        return this.$message.error('ファイルの説明を入力してください！')
      }
      const res = await addFile(data)
      if (res.code === 0) {
        this.form.file.hash = ''
        this.form.file.name = ''
        this.form.type = ''
        this.form.desc = ''
        this.$refs.form.resetFields()
        this.dialogVisible = false
        this.$emit('refresh')
      }
    },
    // アップロード
    handleAddFileBtnClick() {
      this.$refs.fileInput.click()
    },
    // 文件框变化是执行
    handleFileInputChange (e) {
      const file = e.target.files[0]
      if (file) {
        uploadFile(file).then(res => {
          console.log(res)
          this.form.file.name = res[0].path
          this.form.file.hash = res[1].hash
          this.form.file.size = res[0].size
        }) 
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
