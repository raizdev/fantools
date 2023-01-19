<template>

   <Notifications/>

   <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            {{ applicationName }}
        </router-link>
         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         </ul>
         <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <FontAwesomeIcon
               icon="fa-solid fa-bars"
               size="1x"
               variant="light"
            />
            {{ $t('header.button.menu') }}
         </a>
      </div>
   </nav>

   <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" :style="{ width: offCanvasWidth + 'px' }">
      <div class="offcanvas-header">
         <h5 id="offcanvasRightLabel">{{ $t('header.button.menu') }}</h5>
         <button class="btn" style="padding: 0 !important; background-color: #fff">
            <LanguageSwitcher/>
         </button>
      </div>
      <div class="offcanvas-body" v-if="!authenticated">
       <router-link :to="{ name: 'sign-in' }" class="btn btn-primary">
            Login
        </router-link>
      </div>
      <div class="offcanvas-body" v-if="authenticated">
         <a @click="signOut" class="btn btn-primary">
            Logout
        </a>
      </div>
   </div>

   <div :class="!bodyContainerStyling ? 'container-lg p-4' : ''">
      <router-view :key="$route.fullPath" v-slot="{ Component }">
         <transition name="fade" mode="out-in">
            <component :is="Component"></component>
         </transition>
      </router-view>
   </div>
</template>
<script>
import LanguageSwitcher from '@/Components/LanguageSwitcher/LanguageSwitcher.vue';
import Notifications from '@/Components/Notification/notifications.vue'
import { environment } from '../environment'
import { mapActions, mapGetters } from 'vuex';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';

export default {
   
    data() {
        return {
            offCanvasWidth: '250',
            applicationName: environment.ApplicationName,
            bodyContainerStyling: false
        }
    },

    components: {
        Navigation,
        Notifications,
        LanguageSwitcher,
        FontAwesomeIcon
    },

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            notifications: 'notifications/list'
        })
    },

    methods: {
      ...mapActions({
         signOutAction: 'auth/signOut'
      }),

      signOut () {
         this.signOutAction().then(() => {
            this.$router.push('/auth/sign-in')
      })
      }
    },
    
    watch:{
        $route (){
            this.bodyContainerStyling = (this.$route.name === "contractor-details")
        },
        deep: true
    },

    created() {
      // Prevent blank screen in Electron builds
      this.$router.push('/')
    }
}
</script>
<style>
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.50s ease;
    }
    .fade-enter-from,
    .fade-leave-active {
    opacity: 0;
    }
</style>