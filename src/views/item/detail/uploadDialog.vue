<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-dialog
        title="添加文件"
        :visible.sync="dialogVisible"
        width="30%">
          <el-form-item label="上传文件">
            <el-button v-if="!form.fileName" type="primary" size="small" @click="handleAddFileBtnClick">上传</el-button>
            <span v-else @click="handleAddFileBtnClick" style="cursor: pointer">{{form.fileName}}</span>
            <input type="file" @change="handleFileInputChange" ref="fileInput" style="display: none">
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="form.type">
              <el-radio label="研究笔记"></el-radio>
              <el-radio label="研究数据"></el-radio>
              <el-radio label="操作履历"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="onSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import { uploadFile } from '@/api/ipfs'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        fileName: '',
        fileHash: '',
        type: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleAddFileBtnClick() {
      this.$refs.fileInput.click()
    },
    handleFileInputChange (e) {
      const file = e.target.files[0]
      if (file) {
        uploadFile(file).then(res => {
          this.form.fileName = res[0].path
          this.form.fileHash = res[1].hash
        }) 
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
