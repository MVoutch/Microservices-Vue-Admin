<template>
  <form @submit.prevent="submitInfo">
    <div class="form-group">
      <label for="first_name">First Name</label>
      <input type="text" class="form-control" id="first_name" v-model="first_name">
    </div>
    <div class="form-group">
      <label for="last_name">Last Name</label>
      <input type="text" class="form-control" id="last_name" v-model="last_name">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" v-model="email">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>

    <h2 class="mt-4">Change Password</h2>
    <hr>
    <form @submit.prevent="submitPassword">
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password" v-model="password">
      </div>
      <div class="form-group">
        <label>Password Confirm</label>
        <input type="password" class="form-control" name="password_confirm" v-model="passwordConfirm">
      </div>

      <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import {onMounted, ref, computed} from "vue";
import axios from "axios";
import {User} from "@/classes/user"
import {useStore} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  setup() {
    const first_name = ref('');
    const last_name = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const store = useStore()

    onMounted(async () => {
      const user = computed(() => store.state.User.user);

      first_name.value = user.value.first_name;
      last_name.value = user.value.last_name;
      email.value = user.value.email;
    })

    const submitInfo = async () => {
      const response = await axios.put('user/update/info', {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value
      });

      const u: User = response.data;

      await store.dispatch('User/setUser', new User(
          u.id,
          u.first_name,
          u.last_name,
          u.email,
          u.role,
          u.permissions,
      ))
    }
    const submitPassword = async () => {
      await axios.put('users/password', {
        password: password.value,
        password_confirm: passwordConfirm.value
      });
      password.value = '';
      passwordConfirm.value = '';
    }


    return {
      first_name,
      last_name,
      email,
      password,
      passwordConfirm,
      submitInfo,
      submitPassword
    }
  }
}
</script>

<style scoped>

</style>