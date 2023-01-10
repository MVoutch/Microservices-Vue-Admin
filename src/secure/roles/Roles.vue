<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0" v-if="userx.canEdit('roles')">
      <router-link class="btn btn-sm btn-outline-secondary" to="/roles/create">Add</router-link>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="role in roles" :key="role.id">
        <td>{{role.id}}</td>
        <td>{{role.title}}</td>
        <td>
          <div class="btn-group mr-2" v-if="userx.canEdit('roles')">
            <router-link :to="`/role/${role.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(role.id)">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {Entity} from "@/interfaces/entity";
import {useStore} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Roles",
  setup() {
    const roles = ref([]);
    const store = useStore();

    const userx = computed(() => store.state.User.user);

    onMounted(async () => {
      const response = await axios.get('roles');

      roles.value = response.data.data;
    })

    const del = async (id: number) => {
      if(confirm('Delete this role?')) {
        await axios.delete(`roles/${id}`)

        roles.value = roles.value.filter((e: Entity) => e.id !== id);
      }
    }

    return {
      roles,
      del,
      userx
    }
  }
}
</script>

<style scoped>

</style>