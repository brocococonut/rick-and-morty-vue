import 'mini.css/dist/mini-default.css'
import '@/assets/App.scss'

import ApolloClient from 'apollo-boost'
import Vue from 'vue'
import VueApollo from 'vue-apollo'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://rickandmortyapi.com/graphql/'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
