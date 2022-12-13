<template>
  <div class="home">
    <span>Username: <b>{{ $store.state.user.username }}</b></span>
    <span>Email: <b>{{ $store.state.user.email }}</b></span>
    <button type="button" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('login');
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>