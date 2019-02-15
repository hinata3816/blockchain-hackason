<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-dialog
        title="添加文件"
        :visible.sync="dialogVisible"
        width="30%">
          <el-form-item label="上传文件">
            <el-button v-if="!form.file.name" type="primary" size="small" @click="handleAddFileBtnClick">上传</el-button>
            <span v-else @click="handleAddFileBtnClick" style="cursor: pointer">{{form.file.name}}</span>
            <input type="file" @change="handleFileInputChange" ref="fileInput" style="display: none">
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="form.type">
              <el-radio label="0">研究笔记</el-radio>
              <el-radio label="1">研究数据</el-radio>
              <el-radio label="2">操作履历</el-radio>
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
      console.log('submit!');
      const data = {
        hash: this.form.file.hash,
        size: this.form.file.size,
        title: this.form.file.name,
        type: this.form.type,
        description: this.form.desc,
        projectId: this.$route.params.id
      }
      if (!data.hash) {
        return this.$message.error('请上传文件！')
      }
      if (!data.type) {
        return this.$message.error('请选择文件类型！')
      }
      if (!data.description) {
        return this.$message.error('请输入文件描述！')
      }
      const res = await addFile(data)
      if (res.code === 0) {
        this.$emit('refresh')
      }
    },
    // 上传文件
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
