<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
    <div class="my-2 my-md-0 mr-md-3">
      <router-link to="/profile" class="p-2 text-white">{{user.name}}</router-link>
      <a class="p-2 text-white" href="javascript:void(0)" @click="logout">Sign out</a>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import {useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "NavComponent",
  setup() {
    const router = useRouter()
    const store = useStore();

    const user = computed(() => store.state.User.user)
    const logout = async () => {
      await axios.post('logout', {});

      await router.push('/login');
    }

    return {
      user,
      logout
    }
  }
}
</script>

<style scoped>

</style>