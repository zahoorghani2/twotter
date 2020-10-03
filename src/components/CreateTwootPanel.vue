<template>
  <form class="create-twoot-panel" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
    <label for="newTwoot"><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)</label>
    <textarea id="newTwoot" rows="4" v-model="state.newTwootContent"/>

    <div class="create-twoot-panel__submit">
      <div class="create-twoot-type">
        <label for="newTwootType"><strong>Type: </strong></label>
        <select id="newTwootType" v-model="state.newTwootType">
          <option :value="option.value" v-for="(option, index) in state.twootType" :key="index">
            {{ option.name }}
          </option>
        </select>
      </div>

      <button>
        Twoot It!
      </button>
    </div>
  </form>
</template>

<script>
import {reactive, computed} from 'vue';
export default {
  name: "CreateTwootPanel",
  setup(props, ctx)
  {
      const state = reactive({

            newTwootContent : '',
            newTwootType : 'instant',
            twootType : [
            {value : 'draft', name : 'Draft'},
            {value : 'instant', name : 'Instant Tweet'}
        ]
      })

      const newTwootCharacterCount = computed(() => state.newTwootContent.length)

      function createNewTwoot(){
          if(state.newTwootContent && state.newTwootType != 'draft' && state.newTwootContent.length < 180)
          {
              ctx.emit('add-twoot', state.newTwootContent);
              state.newTwootContent = ''
          }
      }
      
      return{
          newTwootCharacterCount,
          state,
          createNewTwoot
      } 
  }
  
};
</script>

<style lang="scss" scoped>
.create-twoot-panel {
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  textarea {
    border: 1px solid #DFE3E8;
    border-radius: 5px;
  }
  .create-twoot-panel__submit {
    display: flex;
    justify-content: space-between;
    .create-twoot-type {
      padding: 10px 0;
    }
    button {
      padding: 5px 20px;
      margin: auto 0;
      border-radius: 5px;
      border: none;
      background-color: deeppink;
      color: white;
      font-weight: bold;
    }
  }
  &.--exceeded {
    color: red;
    border-color: red;
    .create-twoot-panel__submit {
      button {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>