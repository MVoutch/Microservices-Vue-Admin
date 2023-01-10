<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0">
      <router-link class="btn btn-sm btn-outline-secondary" to="/users/create" v-if="userx.canEdit('users')">Add</router-link>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.first_name}} {{user.last_name}}</td>
        <td>{{user.email}}</td>
        <td>{{user.role.title}}</td>
        <td>
          <div class="btn-group mr-2" v-if="userx.canEdit('users')">
            <router-link :to="`/user/${user.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <PaginatorComponent :last-page="lastPage" @page-changed="load($event)"/>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {Entity} from "@/interfaces/entity";
import {useStore} from "vuex";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",

  setup() {
    const users = ref([]);
    const lastPage = ref(0)
    const store = useStore();

    const userx = computed(() => store.state.User.user);

    const load = async (page = 1) => {
      const response = await axios.get(`users?page=${page}`);

      users.value = response.data.data
      lastPage.value = response.data.meta.last_page
    }

    const del = async (id: number) => {
      if(confirm('Delete this user?')) {
        await axios.delete(`users/${id}`)

        users.value = users.value.filter((e: Entity) => e.id !== id);
      }
    }

    onMounted(load)

    return {
      users,
      del,
      lastPage,
      load,
      userx
    }
  }
}
</script>

<style scoped>

</style>