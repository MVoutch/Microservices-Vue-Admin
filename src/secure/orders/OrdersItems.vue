<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Product Title</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="orderItem in orderItems" :key="orderItem.id">
        <td>{{orderItem.id}}</td>
        <td>{{orderItem.product_title}}</td>
        <td>{{orderItem.price}}</td>
        <td>{{orderItem.quantity}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import axios from "axios";

export default {
  name: "OrdersItems",
  setup () {
    const orderItems = ref([]);
    const {params} = useRoute()

    onMounted(async () => {
      const response = await axios.get(`orders/${params.id}`);

      orderItems.value = response.data.data.order_items;
    })

    return {
      orderItems
    }
  }
}
</script>

<style scoped>

</style>