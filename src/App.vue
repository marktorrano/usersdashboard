<template>
  <div id="app">
    <div class="breadcrumbs">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
a,
a:link,
a:hover,
a:visited {
  color: #1867b3;
  text-decoration: none;
}
</style>
