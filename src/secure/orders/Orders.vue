<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0">
      <a class="btn btn-sm btn-outline-secondary" href="javascript:void(0)" @click="exportFile">Export</a>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Total</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{order.id}}</td>
        <td>{{order.first_name}} {{order.last_name}}</td>
        <td>{{order.email}}</td>
        <td>{{order.total}}</td>
        <td>
          <div class="btn-group mr-2" v-if="userx.canView('orders')">
            <router-link :to="`/orders/${order.id}`" class="btn btn-sm btn-outline-secondary">View</router-link>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <PaginatorComponent :last-page="lastPage" @page-changed="load($event)"/>

</template>


<script>
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import PaginatorComponent from "@/secure/components/PaginatorComponent";
import {useStore} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Orders",
  components: {PaginatorComponent},
  setup() {
    const orders = ref([]);
    const lastPage = ref(0);
    const store = useStore();

    const userx = computed(() => store.state.User.user)

    const load = async (page = 1) => {
      const response = await axios.get(`orders?page=${page}`);
      orders.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
    }

    onMounted(load);

    const exportFile = async () => {
      const response = await axios.get('orders/export', {responseType: 'blob'});
      const blob = new Blob([response.data], {type: 'text/csv'});
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'orders.csv';
      link.click()
    }

    return {
      orders,
      lastPage,
      load,
      exportFile,
      userx
    }
  }
}
</script>

<style scoped>

</style>