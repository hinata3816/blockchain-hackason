<template>
  <div id="add-item">
    <el-card style="margin: 20px;">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="项目名称">
            <el-input v-model="form.name" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox v-for="(item, index) in userList" :label="item.id" :key="index">{{ item.login_name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getUserList, addProject } from '@/api/item'
export default {
  data() {
    return {
      userList: [],
      form: {
        name: '',
        type: []
      }
    }
  },
  async created() {
    const res = await getUserList()
    this.userList = res.data
  },
  methods: {
    async onSubmit() {
      const data = {
        projectName: this.form.name,
        userIds: this.form.type.join(',')
      }
      if (!data.projectName) {
        return this.$message.error('请输入项目名称！')
      }
      if (!data.userIds) {
        return this.$message.error('请选择研究者！')
      }
      const res = await addProject(data)
      if (res.code === 0) {
        this.$message.success(res.msg)
        this.$router.push('/item/index')
      }
    }
  }
}
</script>