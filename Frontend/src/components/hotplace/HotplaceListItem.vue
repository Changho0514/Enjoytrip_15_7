<script setup>
defineProps({ hotplace: Object });

const urls = ({ saveFolder, saveFile }) =>
  `http://localhost:8080/enjoytrip/upload/${saveFolder}/${saveFile}`;
</script>

<template>
  <div class="bg-grey-lighten">
    <img
      :src="urls(hotplace)"
      style="aspect-ratio: 1; object-fit: cover"
      class="bd-placeholder-img card-img-top"
      :alt="hotplace.title"
    />
    <!-- <th scope="row">{{ hotplace.hotplaceNo }}</th>
    <td class="text-start">
      <router-link
        :to="{
          name: 'hotplace-view',
          params: { hotplaceno: hotplace.hotplaceNo },
        }"
        class="hotplace-title link-dark"
      >
        {{ hotplace.title }}
      </router-link>
    </td>
    <td>{{ hotplace.userId }}</td>
    <td>{{ hotplace.address }}</td>
    <td>{{ hotplace.date }}</td> -->
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
