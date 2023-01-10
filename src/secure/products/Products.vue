<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0" v-if="userx.canEdit('products')">
      <router-link class="btn btn-sm btn-outline-secondary" to="/products/create">Add</router-link>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Image</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{product.id}}</td>
        <td><img :src="product.image" height="58" alt=""></td>
        <td>{{product.title}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}</td>
        <td>
          <div class="btn-group mr-2" v-if="userx.canEdit('products')">
            <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(product.id)">Delete</a>
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
import PaginatorComponent from "@/secure/components/PaginatorComponent.vue";
import {useStore} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Products",
  components: {PaginatorComponent},

  setup() {
    const products = ref([])
    const lastPage = ref(0)
    const store = useStore();

    const userx = computed(() => store.state.User.user);

    const load = async (page = 1) => {
      const response = await axios.get(`products?page=${page}`)
      products.value = response.data.data
      lastPage.value = response.data.meta.last_page
    }

    onMounted(load)

    const del = async (id: number) => {
      if(confirm('Delete this product?')) {
        await axios.delete(`products/${id}`)

        products.value = products.value.filter((e: Entity) => e.id !== id);
      }
    }

    return {
      products,
      lastPage,
      del,
      load,
      userx
    }
  }
}
</script>
