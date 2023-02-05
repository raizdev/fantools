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
         <ThemeButton/>
      </div>
      <span v-role="'test'">test</span>
      <nav>
         <b-nav vertical>
            <div v-if="!authenticated">
               <b-nav-item @click="hide" :to="{ name: 'sign-in' }">
                  Login
               </b-nav-item>
               <b-nav-item @click="hide" :to="{ name: 'sign-up' }">
                  Registreren
               </b-nav-item>
            </div>
            <div v-else>
               <b-nav-item :to="{ name: 'accessarea-migrations'}">
                  {{ $t('tiles.accessarea.title') }}
               </b-nav-item>
               <b-nav-item :to="{ name: 'transport-instance'}">
                  {{ $t('tiles.transport.title') }}
               </b-nav-item>
               <b-nav-item :to="{ name: 'grabber'}">
                  {{ $t('tiles.grabber.title') }}
               </b-nav-item>
               <b-nav-item :to="{ name: 'contractor-details'}" v-role:any="'escalatiedesk-view|super-admin'">
                  {{ $t('tiles.contractor.title') }}
               </b-nav-item>
               <b-nav-item :to="{ name: 'admin-userpanel'}" v-role:any="'super-admin'">
                  User Panel
               </b-nav-item>
               <b-nav-item @click="this.logout()">
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
import { mapActions, mapState } from 'pinia';
import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
import { useAuthStore, useGatesStore } from '@/stores'
import { Notyf } from 'notyf';
import ThemeButton from '@/components/Input/ThemeButton.vue';

const NotfyProvider = new Notyf({
   duration: 5000,
   dismissible: true,
   ripple: false,
   position: {
      x: 'right',
      y: 'top'
   },
   types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning'
      }
    },
    {
      type: 'error',
      background: 'indianred',
      duration: 2000,
      dismissible: true
    }
   ]
})

export default {

   setup() {
      const gateStore = useGatesStore();
      gateStore.setRoles()
   },

   data() {
      return {
         offCanvasWidth: '250px',
         applicationName: environment.ApplicationName,
         bodyContainerStyling: false
      }
   },

   provide: {
      notyf: NotfyProvider
   },

   components: {
      Navigation,
      Notifications,
      LanguageSwitcher,
      FontAwesomeIcon,
      ThemeButton
   },

   computed: {
      ...mapState(
         useAuthStore, { 
            authenticated: 'authenticated'
         }
      )
   },

   methods: {
      ...mapActions(
         useAuthStore, { 
            logout: 'logout'
         }
      )
   },
   
   watch:{
      $route (){
         this.bodyContainerStyling = (this.$route.name === "contractor-details" || this.$route.name === "contractor-by-name")
      },
      deep: true
   },

   created() {
      this.$router.push('/');
   }
}
</script>
<style>
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.25s ease;
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
