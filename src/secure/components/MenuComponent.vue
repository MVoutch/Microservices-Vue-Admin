<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3 sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" aria-current="page" to="/dashboard">
            Dashboard
          </router-link>
        </li>
        <li class="nav-item" v-if="user.canView('users')">
          <router-link class="nav-link" active-class="active" aria-current="page" to="/users">
            Users
          </router-link>
        </li>
        <li class="nav-item" v-if="user.canView('roles')">
          <router-link class="nav-link" active-class="active" aria-current="page" to="/roles">
            Roles
          </router-link>
        </li>
        <li class="nav-item" v-if="user.canView('products')">
          <router-link class="nav-link" active-class="active" aria-current="page" to="/products">
            Products
          </router-link>
        </li>
        <li class="nav-item" v-if="user.canView('orders')">
          <router-link class="nav-link" active-class="active" aria-current="page" to="/orders">
            Orders
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "MenuComponent",
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user)

    return {
      user
    }
  }
}
</script>