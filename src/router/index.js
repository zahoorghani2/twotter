import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import {users} from '../assets/users'
import UserProfile from '../views/UserProfile.vue'
import Admin from '../views/Admin'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path : '/user/:userId',
    name: 'UserProfile',
    component: UserProfile
  },

  {
      path : '/admin',
      name : 'Admin',
      component : Admin,
      meta : {
          requiresAdmin : true
      }
  } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
    var isAdmin = false;
    if (to.params.userId)
    {
      isAdmin = users[to.params.userId - 1].isAdmin;
    }

    await store.dispatch('setUser', users[to.params.userId - 1]);

    
    
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);


    if (requiresAdmin && !isAdmin) next ({name : 'Home'})
    else if (isAdmin) next({name : 'Admin'})
    else next();
})



export default router