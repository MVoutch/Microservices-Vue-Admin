<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
      <h1 class="h3 mb-3 text-uppercase fw-bold">Please register</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="first_name" v-model="firstName" placeholder="First Name">
        <label for="first_name">First Name</label>
      </div>
      <div class="form-floating">
        <input type="text" class="form-control" id="last_name" v-model="lastName" placeholder="Last Name">
        <label for="last_name">Last Name</label>
      </div>
      <div class="form-floating">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com">
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
        <label for="password">Password</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="password_confirm" v-model="passwordConfirm" placeholder="Password">
        <label for="password_confirm">Password Confirm</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
    </form>
  </main>


</template>

<script>
import {ref} from 'vue';
import axios from 'axios';
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",

  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');

    const submit = async () => {
      await axios.post('register', {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        password_confirm: passwordConfirm.value,
      })

      await router.push('/login')
    }

    return {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      submit
    }

  },

}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input {
  margin-bottom: 10px;
}
</style>