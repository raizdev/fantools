<template>

   <Notifications />

   <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            {{ this.applicationName }}
        </router-link>
         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         </ul>
         <a href="#" v-b-toggle.sidebar-right>
            <FontAwesomeIcon
               icon="fa-solid fa-bars"
               size="1x"
               variant="light"
            />
            {{ $t('header.button.menu') }}
         </a>
      </div>
   </nav>

   <b-sidebar id="sidebar-right" aria-labelledby="sidebar-no-header-title" no-header right shadow :width="offCanvasWidth" :backdrop-variant="dark" backdrop>

      <div class="offcanvas-header p-3">
         <h5 id="offcanvasRightLabel">{{ $t('header.button.menu') }}</h5>
         <button class="btn" style="padding: 0 !important; background-color: #fff">
            <LanguageSwitcher/>
         </button>
      </div>

      <nav>
         <b-nav vertical>
            <div v-if="!authenticated">
               <b-nav-item @click="hide" :to="{ name: 'sign-in' }" v-if="!authenticated">
                  Login
               </b-nav-item>
            </div>
            <div v-else>
               <b-nav-item @click="signOut()" :to="{ name: 'sign-out' }">
                  Access Area Migrations
               </b-nav-item>
               <b-nav-item @click="signOut()" :to="{ name: 'sign-out' }">
                  Transport Instances
               </b-nav-item>
               <b-nav-item @click="signOut()" :to="{ name: 'sign-out' }">
                  Grabber (RODGS)
               </b-nav-item>
               <b-nav-item @click="signOut()" :to="{ name: 'sign-out' }" v-role="'escalatiedesk'">
                  Contactpersonen
               </b-nav-item>
               <b-nav-item @click="signOut()" :to="{ name: 'sign-out' }">
                  User Panel
               </b-nav-item>
               <b-nav-item @click="signOut()" :to="{ name: 'sign-out' }">
                  Logout
               </b-nav-item>
            </div>
         </b-nav>
      </nav>
    </b-sidebar>

   <div :class="!bodyContainerStyling ? 'container-lg p-4' : ''">
      <router-view v-slot="{ Component }">
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
            offCanvasWidth: '250px',
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
            permissions: 'auth/permission'
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
      this.$router.push('/');

      this.$zo.setRoles(this.permissions);
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

    button {
      border: 0;
      background-color: #f8f9fa
    }

    #offcanvasRightLabel {
      color: #000
    }
</style>