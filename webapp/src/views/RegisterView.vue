<template>
  <div class="home">
    <div v-if="err" class="err">{{ err }}</div>
    <form @submit.prevent="submitForm">
      <label foe="username">Username</label>
      <input v-model="formData.username" name="username">
      <label for="password">Password</label>
      <input v-model="formData.password" name="password" type="password">
      <label for="email">Email</label>
      <input v-model="formData.email" name="email" type="email">
      <button>Sign up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data: function() {
    return {
      formData: {
        username: '',
        password: '',
        email: '',
      },
      err: '',
    }
  },
  methods: {
    async submitForm() {
      this.err = '';
      const { data } = await axios.post('/register', this.formData).catch(() => this.err = 'Wrong username or password or email! Try Again');
      if(data === 'User created') this.$router.push('/login');
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