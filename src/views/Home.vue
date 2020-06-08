<template>
  <div class="home">
    <!-- Search el -->
    <div class="row">
      <div class="col-sm-12">
        <div class="card fluid">
          <input
            type="text"
            placeholder="Character Name"
            style="border: none; padding: 0;"
            v-model="filter.name"
            @keydown="
              () => {
                page = 1
              }
            "
          />
        </div>
      </div>
    </div>
    <!-- Chatacter row -->
    <div
      class="row"
      v-if="!this.$apollo.queries.characters.loading && characters"
    >
      <Character
        v-for="character in characters.results"
        :key="character.id + character.name"
        :character="character"
      />
    </div>
    <!-- Loading row -->
    <div class="row" v-else-if="this.$apollo.queries.characters.loading">
      <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
        <div class="card fluid" style="text-align: center;">
          <h3>Loading...</h3>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="row"
      style="text-align: center;"
      v-if="characters && characters.info"
    >
      <div class="col-sm-12">
        <div class="paginate">
          <SlidingPagination
            :current="page"
            :total="characters.info.pages"
            @page-change="
              newPage => {
                page = newPage
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost'

import SlidingPagination from 'vue-sliding-pagination'
import Character from '@/components/Character.vue'

export default {
  name: 'Home',
  data: () => {
    return {
      page: 1,
      filter: {
        name: ''
      },
      characters: {
        info: {
          pages: 1
        },
        results: []
      }
    }
  },
  apollo: {
    characters: {
      query: gql`
        query Characters($page: Int, $filter: FilterCharacter) {
          characters(page: $page, filter: $filter) {
            info {
              pages
            }
            results {
              id
              name
              image
              episode {
                id
              }
            }
          }
        }
      `,
      variables() {
        return {
          page: this.page,
          filter: this.filter
        }
      },
      debounce: 200,
      deep: true // Make sure to listen to filter.name
    }
  },
  components: {
    Character,
    SlidingPagination
  }
}
</script>
