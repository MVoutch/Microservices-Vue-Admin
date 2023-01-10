<template>
  <form @submit.prevent="submit">
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

    <div class="form-group">
      <label for="role">Role</label>
      <select name="role_id" id="role" class="form-control" v-model="role_id">
        <option>Select Role</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{role.title}}
        </option>
      </select>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import {ref, onMounted} from "vue";
import axios from "axios";
import {User} from "@/classes/user"
import {useRoute, useRouter} from "vue-router/dist/vue-router";

export default {
  name: "UsersEdit",
  setup() {
    const first_name = ref('');
    const last_name = ref('');
    const email = ref('');
    const role_id = ref(0);
    const roles = ref([]);
    const router = useRouter();
    const {params} = useRoute()

    onMounted(async () => {
      const response = await axios.get('roles');
      roles.value = response.data.data;

      const userCall = await axios.get(`users/${params.id}`);
      const user: User = userCall.data.data

      first_name.value = user.first_name;
      last_name.value = user.last_name;
      email.value = user.email;
      role_id.value = user.role.id;
    });

    const submit = async () => {
      await axios.put(`users/${params.id}`, {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: 'password',
        role_id: role_id.value,
      })

      await router.push(`/users`)
    }

    return {
      first_name,
      last_name,
      email,
      role_id,
      roles,
      submit
    }
  }
}
</script>

<style scoped>

</style>