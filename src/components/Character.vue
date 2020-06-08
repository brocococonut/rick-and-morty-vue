<template>
  <router-link
    :to="'/character/' + character.id"
    class="col-sm-12 col-md-4 col-lg-3"
  >
    <div class="card fluid">
      <img :src="character.image" :alt="character.name" class="section media" />
      <div class="section">{{ character.name }}</div>
      <div class="section">
        <span>Appeared in {{ character.episode.length }} episodes</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    character: {}
  }
}
</script>
