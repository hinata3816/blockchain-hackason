<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.setRoles(userInfo.identity)
  },
  methods: {
    ...mapMutations({
      setRoles: 'SET_ROLES'
    })
  }
}
</script>
