<template>
  <main>
    <div class="row">
      <div class="col-sm-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
        <div class="card fluid" style="text-align: center;">
          <img
            :src="character.image"
            class="section media"
            :alt="character.name"
            style="height: unset; max-height: 70vh;"
          />
          <div class="section dark">
            <h2>{{ character.name }}</h2>
          </div>
          <div class="section">
            <h4>Status</h4>
            <h6>{{ character.status }}</h6>
          </div>
          <div class="section">
            <h4>Species</h4>
            <h6>{{ character.species }}</h6>
          </div>
          <div class="section" v-if="character.type">
            <h4>Type</h4>
            <h6>{{ character.type }}</h6>
          </div>

          <div class="section">
            <h4>Gender</h4>
            <h6>{{ character.gender }}</h6>
          </div>
          <div class="section">
            <h4>Originated</h4>
            <h6>
              {{
                character.origin.dimension
                  ? `${character.origin.dimension}: `
                  : ''
              }}{{ character.origin.name
              }}{{ character.origin.type ? ` (${character.origin.type})` : '' }}
            </h6>
          </div>
          <div class="section">
            <h4>Current Location</h4>
            <h6>
              {{
                character.location.dimension
                  ? `${character.location.dimension}: `
                  : ''
              }}{{ character.location.name
              }}{{
                character.location.type
                  ? `
              (${character.location.type})`
                  : ''
              }}
            </h6>
          </div>
          <div class="section">
            <h4>Appearances:</h4>
            <table>
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="episode in character.episode" :key="episode.episode">
                  <td>{{ episode.episode }}</td>
                  <td>{{ episode.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { gql } from 'apollo-boost'
export default {
  data() {
    return {
      id: this.$route.params.id,
      character: {
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: {
          name: '',
          type: '',
          dimension: ''
        },
        location: {
          name: '',
          type: '',
          dimension: ''
        },
        image: '',
        episode: []
      }
    }
  },

  apollo: {
    character: {
      query: gql`
        query Character($id: ID) {
          character(id: $id) {
            id
            name
            status
            species
            type
            gender
            origin {
              name
              type
              dimension
            }
            location {
              name
              type
              dimension
            }
            image
            episode {
              name
              episode
            }
          }
        }
      `,
      variables() {
        return {
          id: this.id
        }
      }
    }
  }
}
</script>
