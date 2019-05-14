// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import KsVueFullpage from 'ks-vue-fullpage'
import Vuex from 'vuex'
import axios from 'axios'

import '../node_modules/vuetify/dist/vuetify.min.css'

export default function (Vue, { router, head, isClient, appOptions }) {
  let apiUrl = process.env.GRIDSOME_API_URL

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })

  Vue.use(Vuetify, {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  })

  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      config: {},
      welcomePost: {},
      profilePost: {},
      productPost: {},
      menuPost: {},
      meta: {},
      featuredList: [],
      fnbList: [],
      location: {},
      address: {},
      socialMedia: [],
      operationalHours: []
    },
    mutations: {
      setConfig(state, val) {
        state.config = val
      },
      setWelcomePost(state, val) {
        state.welcomePost = val
      },
      setProfilePost(state, val) {
        state.profilePost = val
      },
      setProductPost(state, val) {
        state.productPost = val
      },
      setMenuPost(state, val) {
        state.menuPost = val
      },
      setFeaturedList(state, val) {
        state.featuredList = val
      },
      setMeta(state, val) {
        state.meta = val
      },
      setFnbList(state, val) {
        state.fnbList = val
      },
      setLocation(state, val) {
        state.location = val
      },
      setAddress(state, val) {
        state.address = val
      },
      setSocialMedia(state, val) {
        state.socialMedia = val
      },
      setOperationalHours(state, val) {
        state.operationalHours = val
      }
    },
    actions: {
      async fetchConfig({commit}, headers) {
          let url = apiUrl + '/api/config'

          try {
            let response = await axios.get(url, {headers: headers})
            commit('setConfig', response.data.data)
          }catch(error) {
            console.log(error)
            return
          }
      },
      async fetchWelcomePost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/2'

        try {
          let response = await axios.get(url, {headers: headers})
          if (response.data.data != null){
            commit('setWelcomePost', response.data.data)
          } else {
            commit('setWelcomePost', {
              id: 1,
              title: 'Default Home',
              html_content: '<p>Hello World!</p><p>Some initial <strong>Home</strong> text</p>'
            })
          }
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchProfilePost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/3'

        try {
          let response = await axios.get(url, {headers: headers})
          if (response.data.data != null){
            commit('setProfilePost', response.data.data)
          } else {
            commit('setProfilePost', {
              id: 1,
              title: 'Default Profile',
              html_content: '<p>Hello World!</p><p>Some initial <strong>Profile</strong> text</p>'
            })
          }
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchProductPost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/4'

        try {
          let response = await axios.get(url, {headers: headers})
          if (response.data.data != null){
            commit('setProductPost', response.data.data)
          } else {
            commit('setProductPost', {
              id: 1,
              title: 'Default Product',
              html_content: '<p>Hello World!</p><p>Some initial <strong>Product</strong> text</p>'
            })
          }
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchMenuPost({commit}, headers) {
        let url = apiUrl + '/api/post/type/single/5'

        try {
          let response = await axios.get(url, {headers: headers})
          if (response.data.data != null){
            commit('setMenuPost', response.data.data)
          } else {
            commit('setMenuPost', {
              id: 1,
              title: 'Default Menu',
              html_content: '<p>Hello World!</p><p>Some initial <strong>Menu</strong> text</p>'
            })
          }
        }catch(error) {
          console.log(error)
          return
        }
      },
      async fetchFeaturedList({commit}, params) {
        let page = params.page
        let limit = params.limit
        let url = apiUrl + '/api/product?type=0&orderBy=created_at&page=' + page + '&limit=' + limit

        try {
          let response = await axios.get(url, {headers: params.headers})
          if (response.data.data != null && response.data.data.length > 0){
            commit('setFeaturedList', response.data.data)
            commit('setMeta', response.meta.meta)
          } else {
            let featuredList = []
            featuredList.push({
              id: 1,
              name: 'Default Featured 1',
              summary: 'Default Summary 1',
              image_main: 'https://img.etimg.com/thumb/msid-67055775,width-643,imgsize-709079,resizemode-4/coffeebeans.jpg'
            })
            featuredList.push({
              id: 2,
              name: 'Default Featured 2',
              summary: 'Default Summary 2',
              image_main: 'https://img.etimg.com/thumb/msid-67055775,width-643,imgsize-709079,resizemode-4/coffeebeans.jpg'
            })

            commit('setFeaturedList', featuredList)
            commit('setMeta', {
              page: 1,
              perPage: 2,
              total: 0,
            })
          }
        }catch(error) {
          console.log(error)
        }
      },
      async fetchFnbList({commit}, params) {
        let type = params.type
        let limit = params.limit
        let page = params.page
        let headers = params.headers
        let url = apiUrl + '/api/product?type=' + type + '&page=' + page + '&limit=' + limit

        let response = await axios.get(url, {headers: headers})        
        let data = response.data.data

        if (data.length == 0){
          for (let i = 1; i <= 10; i++){
            data.push({
              id: i,
              name: 'Default FnB ' + i,
              summary: 'Default Summary ' + i,
              image_main: 'https://img.etimg.com/thumb/msid-67055775,width-643,imgsize-709079,resizemode-4/coffeebeans.jpg',
              description: 'Rp. 10K'
            })
          }
        }
        
        commit('setFnbList', data)
      },
      async fetchContactData({commit}, params) {
        let headers = params.headers
        let url = apiUrl + '/api/contact'

        let response = await axios.get(url, {headers: headers})
        let contactList = response.data.data
        let location = {}
        let address = {}
        let socialMedia = []
        let operationalHour = []
        contactList.forEach(element => {
          if (element.type == 'location'){
            location = element
          } else if (element.type == 'address'){
            address = element
          } else if (element.type == 'social_media'){
            socialMedia.push(element)
          } else if (element.type == 'operational_hour'){
            operationalHour.push(element)
          }
        })

        commit('setLocation', location)
        commit('setAddress', address)
        commit('setSocialMedia', socialMedia)
        commit('setOperationalHours', operationalHour)
      }
    }
  })

  Vue.use(KsVueFullpage)

}
