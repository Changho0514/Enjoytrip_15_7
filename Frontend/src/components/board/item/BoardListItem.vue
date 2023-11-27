<script setup>
defineProps({ article: Object });
</script>

<template>
  <tr class="text-center">
    <td scope="row">{{ article.articleNo }}</td>
    <th class="text-center">
      <router-link
        :to="{
          name: 'article-view',
          params: { articleno: article.articleNo },
        }"
        class="article-title link-dark"
      >
        {{ article.subject }}
      </router-link>
    </th>
    <td>{{ article.userId }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.comment }}</td>
    <td>{{ article.date.substr(0, 10) }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
