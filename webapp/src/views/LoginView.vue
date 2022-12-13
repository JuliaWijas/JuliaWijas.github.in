<template>
  <div class="home">
    <div v-if="err" class="err">{{ err }}</div>
    <form @submit.prevent="submitForm">
      <label foe="username">Username</label>
      <input v-model="formData.username" name="username">
      <label for="password">Password</label>
      <input v-model="formData.password" name="password" type="password">
      <button>Log in</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data: function() {
    return {
      formData: {
        username: '',
        password: '',
      },
      err: '',
    }
  },
  methods: {
    async submitForm() {
      this.err = '';
      const { data } = await axios.post('/login', this.formData).catch(() => this.err = 'Wrong username or password! Try Again');
      if(data.username) {
        this.$store.commit('authenticate');
        this.$store.commit('login', data);
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-flow: column;
  width: 60%;
  margin: 0 auto;
}

label {
  padding: 5px 0px;
}

input {
  padding: 5px 5px;
}

button {
  padding: 5px 0;
  margin-top: 20px;
}

.err {
  font-size: 32px;
  color: red;
}
</style>