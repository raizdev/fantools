import { createRouter, createWebHistory } from 'vue-router'


import { environment } from "../../environment";
import  {version } from '../../package'

import store from '../Store'
import guest from './Middleware/Guest'
import auth from './Middleware/Auth'
import middlewarePipeline from './Middleware/MiddlewarePipeline'
import HomeView from '../Views/Pages/Home/Home.vue'
import SignInView from '../Views/Pages/Auth/Signin.vue'
import SignUpView from '../Views/Pages/Auth/Signup.vue'
import AccessAreaMigrationView from '../Views/Pages/Tools/AccessAreaMigrations.vue'
import TransportInstanceView  from '../Views/Pages/Tools/TransportInstance.vue'
import ContractorDetailsView from '../Views/Pages/Tools/ContractorDetails.vue'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: [
    { 
      path: '/',  
      name: 'home', 
      component: HomeView, 
      meta: {
        middleware: [
            auth
        ]
      }  
    },
    { path: '/auth/sign-in', name: 'sign-in', component: SignInView },
    { path: '/auth/sign-up', name: 'sign-up', component: SignUpView },
    { path: '/auth/sign-out', name: 'sign-out', component: SignInView },
    { 
      path: '/tools/accessarea-migration',  
      name: 'accessarea-migration', 
      component: AccessAreaMigrationView ,
      meta: {
        middleware: [
            auth
        ]
      }  
    },
    { 
      path: '/tools/transport-instance',  
      name: 'transport-instance', 
      component: TransportInstanceView,
      meta: {
        middleware: [
            auth
        ]
      }  
    },
    { 
      path: '/tools/contractor-details',  
      name: 'contractor-details', 
      component: ContractorDetailsView,
      meta: {
        middleware: [
            auth
        ]
      }  
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  document.title = `${environment.ApplicationName} - v${version}`

  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }


  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})

export default router;
