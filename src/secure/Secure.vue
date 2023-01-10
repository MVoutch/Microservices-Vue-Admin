<template>
  <NavComponent/>

  <div class="container-fluid">
    <div class="row">
      <MenuComponent />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view v-if="user?.id" />
      </main>
    </div>
  </div>
</template>


<script lang="ts">
import {onMounted, ref} from "vue";
import NavComponent from "@/secure/components/NavComponent.vue";
import MenuComponent from "@/secure/components/MenuComponent.vue";
import axios from "axios";
import {useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";
import {User} from "@/classes/user"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Secure",
  components: {
    MenuComponent,
    NavComponent,
  },

  setup() {
    const router = useRouter();
    const user = ref(null);
    const store = useStore()

    onMounted(async () => {
      try {
        const response = await axios.get('user');

        const u: User = response.data.data

        await store.dispatch('User/setUser', new User(
            u.id,
            u.first_name,
            u.last_name,
            u.email,
            u.role,
            u.permissions,
        ))
        user.value = response.data.data;
      } catch (e) {
        await router.push('/login');
      }

    });

    return {
      user
    };
  }
}

</script>

<style scoped>

</style>