<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label for="title" class="sr-only">Title</label>
      <input type="text" id="title" class="form-control" placeholder="Product Title" required v-model="title">
    </div>
    <div class="form-group">
      <label for="description" class="sr-only">Description</label>
      <textarea id="description" class="form-control" required v-model="description"></textarea>
    </div>
    <div class="form-group">
      <label for="image" class="sr-only">Image</label>
      <div class="input-group">
        <input type="text" id="image" class="form-control" required v-model="image">
        <ImageUploadComponent @file-upload="image = $event" />
      </div>
    </div>
    <div class="form-group">
      <label for="price" class="sr-only">Price</label>
      <input type="number" id="price" class="form-control" required v-model="price">
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router/dist/vue-router";
import ImageUploadComponent from "@/secure/components/ImageUploadComponent.vue";

export default {
  name: "ProductsCreate",
  components: {ImageUploadComponent},

  setup() {
    const title = ref('');
    const description = ref('');
    const image = ref('');
    const price = ref('');
    const router = useRouter();

    const submit = async () => {
      await axios.post('products', {
        title: title.value,
        description: description.value,
        image: image.value,
        price: price.value,
      })

      await router.push(`/products`)
    }


    return {
      submit,
      title,
      description,
      image,
      price
    }
  }
}
</script>
