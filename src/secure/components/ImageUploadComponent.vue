<template>
  <label class="btn btn-primary">
    Upload <input type="file" hidden @change="upload($event.target.files)">
  </label>

</template>

<script>
import axios from "axios";

export default {
  name: "ImageUploadComponent",
  emits: [''],
  setup(_, {emit}) {
    const upload = async (files) => {
      const file = files.item(0);
      const data = new FormData;
      data.append('image', file);

      const response = await axios.post('products/image/upload', data)

      emit('file-upload', response.data.url);
    }

    return {
      upload
    }
  }
}
</script>

<style scoped>

</style>