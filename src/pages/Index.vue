<template>
  <v-layout column wrap fill-height fill-width pa-0 style="max-width: 100%;">
    <ksvuefp :options="options" :sections="contentSections" style="height: 100%; width: 100%;">
      <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app dark floating class="hidden-sm-and-up" width="225px">
        <v-layout column wrap fill-height align-end justify-center>
          <v-list>
            <div v-for="(sideMenuSection, i) in contentSections" :key="i">
              <v-list-tile @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: sideMenuSection.sectionId})" @click="drawer = false" class="my-3">
                  <v-list-tile-content>
                      <v-list-tile-title v-text="sideMenuSection.sectionMenu" justify-end/>
                  </v-list-tile-content>
              </v-list-tile>
            </div>
          </v-list>
        </v-layout>
      </v-navigation-drawer>
      <v-toolbar
        :color="'#1C1B20'"
        :clipped-left="clipped"
        fixed
        app
        flat
        class="hidden-sm-and-down pa-0"
        style="height: 15%;"
      >
        <v-layout column justify-center align-center style="height: 100%; width: 100%; max-width: 100%;">
          <v-toolbar-side-icon @click="drawer = !drawer" class="hover hidden-sm-and-up" style="color: whitesmoke;"/>
          <template v-if="homeSection.useIcon">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
              class="ma-2 pt-2"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title style="height: 50%;" class="title default-color ma-2 pt-2" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: homeSection.sectionId})">{{ homeSection.sectionMenu }}</v-toolbar-title>
          </template>
          <v-layout row justify-center align-center style="height: 50%;">
            <template
            v-for="toolbarSection in menuSections">
              <v-btn flat :key="toolbarSection.id" depressed color="white" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: toolbarSection.sectionId})" class="hidden-sm-and-down">
                {{ toolbarSection.sectionMenu }}
              </v-btn>
            </template>
          </v-layout>
        </v-layout>
      </v-toolbar>
      <v-toolbar
        :color="'#1C1B20'"
        :clipped-left="clipped"
        fixed
        app
        flat
        class="hidden-sm-and-up"
        style="height: 15%;"
      >
        <v-layout justify-left align-center style="height: 100%; width: 100%;">
          <v-toolbar-side-icon @click="drawer = !drawer" class="hover hidden-sm-and-up" style="color: whitesmoke;"/>
          <template v-if="homeSection.useIcon">
            <v-btn
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-toolbar-title class="title default-color" @click.prevent="$ksvuefp.$emit('ksvuefp-nav-click', {nextIndex: 0})">{{ homeSection.sectionMenu }}</v-toolbar-title>
          </template>
        </v-layout>
      </v-toolbar>
      <ksvuefp-section
        :section-index="section.sectionId"
        class="content-wrapper"
        v-for="section in contentSections"
        :section="section"
        :key="section.id"
      >
        <template v-if="section.sectionName == 'home'">
          <v-layout column ma-0 pa-0 justify-center align-center section-content style="background-color: #9EA1A1;">
            <v-parallax
              dark
              :src="welcomePost.cover_image"
              class="cover-image-full hidden-sm-and-down"
              height="100%">
                <v-layout column wrap justify-center align-center>
                  <span class="display-3 font-weight-strong mb-5 text-xs-center">{{ welcomePost.title}}</span>
                  <span class="subheading text-xs-center" v-html="welcomePost.html_content" />
                </v-layout>
            </v-parallax>
            <v-parallax
              dark
              :src="welcomePost.cover_image"
              class="cover-image-full hidden-sm-and-up"
              height="100%">
                <v-layout column wrap justify-center align-center>
                  <span class="display-1 font-weight-strong mb-5 text-xs-center text-xs-center">{{ welcomePost.title}}</span>
                  <span class="subheading text-xs-center" v-html="welcomePost.html_content" />
                </v-layout>
            </v-parallax>
          </v-layout>
        </template>
        <template v-else-if="section.sectionName == 'product'">
          <v-layout column ma-0 pa-0 section-content hidden-sm-and-down style="background-color: #FDFFFD">
            <v-parallax
              dark
              :src="productPost.cover_image"
              class="ma-0 pa-0 product-parallax"
              style="height: 35%;">
                <v-layout column wrap ustify-center align-center pa-0 style="height: 100%; width: 100%; max-width: 100%; color: #000000;">
                  <span class="display-1 text-xs-center font-weight-strong pt-3">{{ productPost.title}}</span>
                  <span class="body-1 text-xs-center pa-3" v-html="productPost.html_content"></span>
                </v-layout>
            </v-parallax>
            <v-layout column wrap pa-0 style="height: 65%; width: 100%; max-width: 100%;">
              <v-carousel hide-delimiters dark @click.native="carouselClick">
                <v-carousel-item>
                  <v-layout row fill-height justify-center align-start style="width: 100%; max-width: 100%; padding-top: 60px;">
                    <v-flex
                      xs5
                      sm5
                      md5
                      lg5
                      v-for="featured in featuredList"
                      :items="featured"
                      v-bind:key="featured.id"
                      pa-0
                      ma-2
                      style="height: 50%;"
                    >
                      <v-card style="height: 100%; width: 100%;" flat :img="featured.image_main">
                        <v-card-text style="height: 50%; width: 100%; background_color: white;">
                          <v-layout column wrap fill-width fill-height justify-center align-center>
                            <span class="title font-weight-regular mb-2">{{ featured.name }}</span>
                            <span class="subheading font-weight-light mb-2 px-2 text-xs-center">{{ featured.summary }}</span>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-carousel-item>
              </v-carousel>
            </v-layout>
          </v-layout>
        </template>
        <template v-else-if="section.sectionName == 'food'">
          <v-app>
            <v-layout column ma-0 pa-0 section-content hidden-sm-and-down style="background-color: #FDFFFD">
              <v-parallax
                dark
                :src="menuPost.cover_image"
                class="ma-0 pa-0 product-parallax"
                style="height: 30%;">
                  <v-layout column wrap ustify-center align-center pa-0 style="height: 100%; width: 100%; max-width: 100%; color: #000000;">
                    <span class="display-1 text-xs-center font-weight-strong pt-3">{{ menuPost.title}}</span>
                    <span class="body-1 text-xs-center pa-3" v-html="menuPost.html_content"></span>
                  </v-layout>
              </v-parallax>
              <v-layout column wrap pa-0 style="height: 70%; width: 100%; max-width: 100%;">
                <v-tabs
                  color="white"
                  centered
                  dark
                  icons-and-text
                >
                  <v-tabs-slider color="blue" />
                  <v-tab href="#food_tab" class="minify caption resize" style="color: black;" @click="fetchFnbData(1)">
                    Makanan
                    <v-icon small color="black">fastfood</v-icon>
                  </v-tab>
                  <v-tab href="#drink_tab" class="minify caption ml-1 resize" style="color: black;" @click="fetchFnbData(2)">
                    Minuman
                    <v-icon small color="black">local_drink</v-icon>
                  </v-tab>
                  <v-tab-item :value="'food_tab'">
                    <v-layout row wrap class="tab-content pa-0 justify-center align-start" style="height: 100%; width: 100%; max-width: 100%;">
                      <v-flex
                        xs2
                        sm2
                        md2
                        lg2
                        v-for="fnb in fnbList"
                        :items="fnb"
                        v-bind:key="fnb.id"
                        style="height: 40%;"
                        pa-0
                        ma-3
                      >
                        <v-card style="height: 100%; width: 100%;" flat :img="fnb.image_main" @click="selectCard(fnb)">
                          <v-layout v-show="!fnb.isShow" fill-height fill-width justify-center align-center pa-0 style="background-color: rgba(0,0,0,0.5); color: white;">
                            <v-card-title class="subheading font-weight-regular text-xs-center">{{ fnb.name }}</v-card-title>
                          </v-layout>
                          <v-layout v-show="fnb.isShow" column fill-height fill-width justify-start align-start pa-0 pl-2 pt-2 style="background-color: rgba(255,255,255,0.75); color: black;">
                            <span class="body-2 font-weight-bold text-xs-left">{{ fnb.name }}</span>
                            <span class="caption font-weight-regular text-xs-left">{{ fnb.summary }}</span>
                            <span class="body-2 font-weight-medium text-xs-left">{{ fnb.description }}</span>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>
                  <v-tab-item :value="'drink_tab'">
                    <v-layout row wrap class="tab-content pa-0 justify-center align-start" style="height: 100%; width: 100%; max-width: 100%;">
                      <v-flex
                        xs2
                        sm2
                        md2
                        lg2
                        v-for="fnb in fnbList"
                        :items="fnb"
                        v-bind:key="fnb.id"
                        style="height: 40%;"
                        pa-0
                        ma-3
                      >
                        <v-card style="height: 100%; width: 100%;" flat :img="fnb.image_main" @click="selectCard(fnb)">
                          <v-layout v-show="!fnb.isShow" fill-height fill-width justify-center align-center pa-0 style="background-color: rgba(0,0,0,0.5); color: white;">
                            <v-card-title class="subheading font-weight-regular text-xs-center">{{ fnb.name }}</v-card-title>
                          </v-layout>
                          <v-layout v-show="fnb.isShow" column fill-height fill-width justify-start align-start pa-0 pl-2 pt-2 style="background-color: rgba(255,255,255,0.75); color: black;">
                            <span class="body-2 font-weight-bold text-xs-left">{{ fnb.name }}</span>
                            <span class="caption font-weight-regular text-xs-left">{{ fnb.summary }}</span>
                            <span class="body-2 font-weight-medium text-xs-left">{{ fnb.description }}</span>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-tab-item>
                </v-tabs>
              </v-layout>
            </v-layout>
          </v-app>
        </template>
        <template v-else-if="section.sectionName == 'contact'">
          <v-layout v-if="!isLoading" column ma-0 pa-0 section-content style="background-color: #24232A">
            <v-layout row ma-0 pa-0 justify-center align-center style="height: 50%; width: 100%; max-width: 100%; background-color: #A0A0A0;">
              <v-layout pa-0 ma-0 justify-end align-center style="height: 100%; width: 50%;">
                <div id="map" />
              </v-layout>
              <v-layout column pa-0 ma-0 justify-center align-start style="height: 100%; width: 50%">
                <v-layout column pa-2 ma-0 justify-center align-center style="max-height: 90%; width: 80%; background-color: #FFFFFF; color: #000000;">
                  <span class="title font-weight-regular text-xs-center">{{ location.value.name }}</span>
                  <span class="subheading font-weight-light text-xs-center">{{ location.value.description }}</span>
                </v-layout>
              </v-layout>
            </v-layout>
            <v-layout row ma-0 pa-0 justify-center align-center style="height: 10%; width: 100%; max-width: 100%; color: #FFFFFF;">
              <span class="body-2 font-weight-regular">Kirimkan email ke kami untuk pertanyaan lebih lanjut</span>
              <v-btn :href="config.mailLink" color="#707070" style="color: #FFFFFF; border-radius: 10px;">Hubungi Kami</v-btn>
            </v-layout>
            <v-layout row ma-0 pa-0 pt-2 justify-center align-center style="height: 35%; width: 100%; max-width: 100%;">
              <v-flex
                xs4
                pa-2
                ma-0
                fill-height
              >
                <v-layout column fill-height fill-width justify-start align-center style="color: #FFFFFF;">
                  <span class="title font-weight-regular text-xs-center">Alamat</span>
                  <span class="subheading font-weight-light text-xs-center mt-2">{{ address.value.addressStr }}</span>
                </v-layout>
              </v-flex>
              <v-flex
                xs4
                pa-2
                ma-0
                fill-height
              >
                <v-layout column fill-height fill-width justify-start align-center style="color: #FFFFFF;">
                  <span class="title font-weight-regular text-xs-center">Jam Operasional</span>
                  <span class="subheading font-weight-light text-xs-center mt-2"></span>
                </v-layout>
              </v-flex>
              <v-flex
                xs4
                pa-2
                ma-0
                fill-height
              >
                <v-layout column fill-height fill-width justify-start align-center style="color: #FFFFFF;">
                  <span class="title font-weight-regular text-xs-center">Media Sosial</span>
                  <v-layout row wrap fill-width justify-center align-start>
                    <template v-for="(item, i) in socialMedia">
                        <v-img :key="i" :src="item.value.icon_src" height="25px" width="25px" contain class="clickable ma-2"></v-img>
                    </template>
                  </v-layout>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout pa-0 ma-0 justify-center align-center style="height: 5%; width: 100%; max-width: 100%; background-color: #1C1B20; color: #FFFFFF;">
              <span class="caption font-weight-bold text-xs-center">Created by Ordent, Geared Up with Gapura</span>
            </v-layout>
          </v-layout>
        </template>
      </ksvuefp-section>
    </ksvuefp>
  </v-layout>
</template>

<script>
import axios from 'axios'
import maps from '~/utils/maps'

export default {
  metaInfo: {
    title: process.env.GRISOME_SITE_TITLE,
    sections: [],
  },
  computed: {
    currentIndex() {
      return this.$ksvuefp.currentIndex
    },
    config() {
      return this.$store.state.config
    },
    welcomePost() {
      return this.$store.state.welcomePost
    },
    profilePost() {
      return this.$store.state.profilePost
    },
    productPost() {
      return this.$store.state.productPost
    },
    menuPost() {
      return this.$store.state.menuPost
    },
    meta() {
      return this.$store.state.meta
    },
    featuredList() {
      return this.$store.state.featuredList
    },
    fnbList() {
      return this.$store.state.fnbList
    },
    location() {
      let location = Object.assign({}, this.$store.state.location)
      if (location.id == null){
        let value = {
          description: 'Default Location Description',
          name: 'Default Location'
        }
        location.value = value
      }

      return location
    },
    address() {
      let address = Object.assign({}, this.$store.state.address)
      if (address.id == null){
        let addressStr = 'Default Address, Default Subdistrict, Default District. Default Province. 11221'
        let value = {
          addressStr: addressStr
        }
        address.value = value
      } else {
        let addressStr = address.value.address + ', ' + address.value.subdistrict + ', ' + address.value.district + ', ' + address.value.province + '. ' + address.value.zipcode
        let value = {
          addressStr: addressStr
        }
        address.value = value
      }

      return address
    },
    socialMedia() {
      return this.$store.state.socialMedia
    }
  },
  data() {
    return {
      options: {
        duration: 1000,
        easing: [1, 0, 0, 1],
        loopBottom: false,
        preloaderEnabled: true,
        preloaderBgColor: '#fff',
        preloaderColor: '#212121',
        preloaderText: 'Loading...',
        dotNavEnabled: false,
        parallax: true
      },
      headers: {
        'Project-ID': process.env.GRIDSOME_PROJECT_ID
      },
      clipped: false,
      drawer: false,
      miniVariant: false,
      isLoading: true,
      contactList: [],
      productList: [],
      menuSections: [],
      contentSections: [],
      homeSection: {},
      sideMenu: [],
      page: 1,
      limit: 2
    }
  },
  async mounted() {
    let Velocity = require('velocity-animate')
    let hammerjs = require('hammerjs')

    this.velocity = Velocity
    this.hammerjs = hammerjs
    
    this.loadSections(this.headers)
    this.fetchWelcomePost(this.headers)
    if (this.maps == null){
      const google = await maps()
    }
  },
  methods: {
    async selectCard(card) {
      if (!card.isShow){
        card.isShow = true
      } else {
        card.isShow = false
      }
      this.$forceUpdate()
    },
    async loadSections(headers) {
      await this.$store.dispatch('fetchConfig', headers)

      let sections = []
      let contentSections = []
      let sectionId = 0
      let config = this.config

      if (config.use_home){
        this.homeSection = {
          id: 1,
          sectionName: 'home',
          sectionMenu: config.home_menu,
          sectionId: sectionId,
          useIcon: config.use_home_icon,
          iconUrl: config.home_icon
        }

        contentSections.push(this.homeSection)
        sectionId++
      }

      if (config.use_profiles){
        sections.push({
          id: 2,
          sectionName: 'profile',
          sectionMenu: config.profile_menu,
          sectionId: sectionId,
        })
        sectionId++
      }

      if (config.use_products){
        sections.push({
          id: 3,
          sectionName: 'product',
          sectionMenu: config.product_menu,
          sectionId: sectionId,
        })
        sectionId++
      }

      if (config.use_food){
        sections.push({
          id: 4,
          sectionName: 'food',
          sectionMenu: config.food_menu,
          sectionId: sectionId,
        })
        sectionId++
      }

      if (config.use_contacts){
        sections.push({
          id: 5,
          sectionName: 'contact',
          sectionMenu: config.contact_menu,
          sectionId: sectionId,
        })
        sectionId++
      }

      this.menuSections = sections
      this.contentSections = contentSections.concat.apply(contentSections, sections)
    },
    async carouselClick(param) {
      let halfScreen = Math.floor(screen.width / 2)
      if (param.screenX > halfScreen){
        this.page++
      } else {
        this.page--
      }
    },
    async fetchWelcomePost(headers) {
      await this.$store.dispatch('fetchWelcomePost', headers)
      this.isLoading = false
    },
    async fetchProfilePost(headers) {
      await this.$store.dispatch('fetchProfilePost', headers)
      this.isLoading = false
    },
    async fetchProductPost(page, limit, headers) {
      await this.$store.dispatch('fetchProductPost', headers)
      await this.$store.dispatch('fetchFeaturedList', {
        page: page,
        limit: limit,
        headers: headers
      })
      this.isLoading = false
    },
    async fetchMenuPost(headers) {
      await this.$store.dispatch('fetchMenuPost', headers)
      this.isLoading = false
    },
    async fetchFnbData(type) {
      let queryParams = {
        headers: this.headers,
        type: type,
        page: 1,
        limit: 10
      }

      await this.$store.dispatch('fetchFnbList', queryParams) 
    },
    async fetchContactData(headers) {
      let request = {
        headers: headers
      }

      await this.$store.dispatch('fetchContactData', request)
      this.isLoading = false
    }
  },
  watch: {
    currentIndex: async function(newIndex, oldIndex) {
      if (newIndex == 0){
        this.isLoading = true
        await this.fetchWelcomePost(this.headers)
      } else if (newIndex == 1) {
        this.isLoading = true
        await this.fetchProfilePost(this.headers)
      } else if (newIndex == 2) {
        this.isLoading = true
        await this.fetchProductPost(this.page, this.limit, this.headers)
      } else if (newIndex == 3) {
        this.isLoading = true
        await this.fetchFnbData(1)
        await this.fetchMenuPost(this.headers)
      } else if (newIndex == 4){
        this.isLoading = true
        await this.fetchContactData(this.headers)
        this.$nextTick(function() {
          try {
            const coordinate = this.location.id != null ? this.location.value.location : {lat: -6.914744, lng: 107.6191}
            const mapDiv = document.getElementById('map')
            const map = new google.maps.Map(mapDiv, {zoom: 16, center: coordinate, mapTypeId: 'roadmap', disableDefaultUI: true})
            const marker = new google.maps.Marker({position: coordinate, draggable: true, map: map})

            this.map = map
            this.marker = marker
          }catch(error) {
              console.log(error)
          }
        })
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  height: 100%;
}
html {
  height: 100%
}
.ksvuefp-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
  opacity: 1;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.ksvuefp-section, .ksvuefp-section__overlay {
  height: 0%;
  width: 0%;
  top: 0;
  left: 0;
}
.ksvuefp-section, .ksvuefp-section__content {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: relative;
}
.ksvuefp-section, .ksvuefp-section__content, .content-wrapper {
  position: relative;
}

.ksvuefp-sections {
  height: 100%;
}
.default-color {
  color: whitesmoke
}
.v-toolbar__content {
  height: 100% !important;
}
#app {
  overflow: hidden;
}
.section-content {
  height: 85%; 
  max-width: 100%; 
  width: 100%; 
  position: absolute; 
  bottom: 0;
}
.cover-image-full {
  height: 100%;
  width: 100%;
}
.v-parallax__content, .product-parallax {
  padding: 0 0;
}
.v-btn .v-btn__content .v-icon {
  color: #000;
}
.v-tabs {
  height: 100%;
}
.v-tabs__bar {
  height: 10%;
}
.v-tabs__wrapper {
  overflow: hidden;
  contain: content;
  display: flex;
  height: 100%;
}
.v-tabs__container--icons-and-text {
  height: 100%;
}
.v-tabs__slider-wrapper, .minify {
  width: 83px !important;
}
.v-tabs__container--icons-and-text .v-tabs__div, .resize {
  min-width: 83px;
}
.v-tabs__item, .minify {
  max-width: 83px;
}
.v-window, .tab-content {
  height: 90%;
}
.v-window__container, .tab-content {
  height: 100%;
}
.v-window-item, .tab-content {
  height: 100%;
}
.clickable {
  cursor: pointer;
}
#map {
  height: 90%;
  width: 80%;
  background-color: #ffffff;
}
</style>
