<template>
  <form @submit.prevent="submit">
    <div class="form-group mb-3">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" v-model="title">
    </div>
    <div class="form-group row">
      <label for="permissions" class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-18">
        <div class="form-check form-check-inline col-3" v-for="permission in permissions" :key="permission.id">
          <input type="checkbox" class="form-check-input"
                 :value="permission.id"
                 @change="select(permission.id, $event.target.checked)"
                 :checked="checked(permission.id)"
          >
          <label class="form-check-label">{{permission.name}}</label>
        </div>
      </div>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {Role} from "@/classes/role";

export default {
  name: "RolesEdit",
  setup() {
    const title = ref('');
    const permissions = ref([]);
    const selected = ref([] as number[]);
    const router = useRouter()
    const {params} = useRoute();

    onMounted(async () => {
      const response = await axios.get('permissions')

      permissions.value = response.data.data;

      const RoleCall = await axios.get(`roles/${params.id}`);

      const role: Role = RoleCall.data.data;

      title.value = role.title;
      selected.value = role.permissions.map(p => p.id);

    })

    const select = (id: number, checked: boolean) => {
      if(checked) {
        selected.value = [...selected.value, id];
        return;
      }

      selected.value = selected.value.filter(s => s !== id)
    }

    const checked = (id:number) => selected.value.some(s => s === id)

    const submit = async () => {
      await axios.put(`roles/${params.id}`, {
        title: title.value,
        permissions: selected.value,
      })

      await router.push('/roles')
    }

    return {
      title,
      permissions,
      select,
      submit,
      checked
    }
  }
}
</script>
