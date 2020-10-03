<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
      <div class = "user-profile_user-panel">
          <h1 class="user-profile_username">@{{ state.user.username }}</h1>
          <h2>{{userId}}</h2>
          <div class = "user-profile_admin-badge" v-if = 'state.user.isAdmin'>Admin</div>
          <div class = "user-profile_follower-count">
            <strong>Followers : </strong> {{state.followers}}
          </div>

      </div>
        <CreateTwootPanel @add-twoot="addTwoot"/>
      </div>
      
      <div class = "user-profile_twoots-wrapper">
          <TwootItem 
            v-for = "t in state.user.twoots" 
            :key = "t.id" 
            :username = "state.user.username" 
            :twoot = "t"
            @favourite = "toggleFavourite"
            />
      </div>

  </div>
</template>
 

<script>
import {users} from '../assets/users'
import {useRoute} from 'vue-router'; 
import TwootItem from "../components/TwootItem";
import {reactive, computed} from 'vue';
import CreateTwootPanel from "../components/CreateTwootPanel";
export default {
    name : "UserProfile",
    components : {TwootItem,CreateTwootPanel},
    setup()
    {
      const route = useRoute();
      const userId = computed(()=> route.params.userId);
      const state = reactive({
        followers : 0,
        user : users[userId.value - 1] || users[0]
      })

      function addTwoot(twoot){      
        state.user.twoots.unshift({
          id : state.user.twoots.length + 1,
          content : twoot
        });

      }

      function toggleFavourite(id)
      {
          console.log(`Your favourite tweet is ${id}`);
      }

      function followUser()
      {
        state.followers++;
      }

      return {
        state,
        addTwoot,
        toggleFavourite,
        followUser,
        userId
      }
    },
  
  watch : {
    followers (newFollowersCount, oldFollowersCount)
    {
      if (oldFollowersCount < newFollowersCount)
      {
        console.log(`${state.user.userName} has gained a follower!`);
      }
    },


  },
    
  mounted()
  {
    this.followUser();
  }
  
}
</script>

<style lang = "scss" scoped>
.user-profile  {
  display : grid;
  grid-gap: 50px;
  grid-template-columns : 1fr 3fr;
  padding : 50px 5%;

  .user-profile_user-panel {
    display : flex;
    flex-direction : column;
    padding : 20px;
    background-color: white;
    border-radius: 5px;
    border : 1px solid #DFE3E8;
    margin-bottom: auto

    h1{
      margin : 0;
    }

    .user-profile_admin-badge{
      background : rebeccapurple;
      color : white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0px 10px;

    }

  }

  .user-profile_twoots-wrapper{
    display:grid;
    grid-gap: 10px;
    margin-bottom: auto
  }
}


</style>