<template>
   <div>
      <div class="jumbotron jumbotron-fluid">
         <div class="container">
            <form>
               <div class="main">
                  <div class="form-group">
                     <FontAwesomeIcon
                        icon="fa-solid fa-magnifying-glass"
                        size="2x"
                        variant="light"
                        style="position: absolute; padding: 10px"
                        />
                     <Typeahead
                        @input="handleInput"
                        :data="this.searchTerm"
                        :serializer="s => s.slug"
                        :placeholder="$t('contractor.placeholder')"
                        @hit="setContractor($event)"
                        v-on:keydown.enter.prevent="this.contractorRecipients"
                        />
                  </div>
               </div>
            </form>
         </div>
      </div>

      <RecipientEdit />
   </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useToolsStore } from '@/stores'

import Typeahead from '@/components/Input/Bootstrap/Typeahead.vue'
import FontAwesomeIcon from '@/components/Icon/FontAwesomeIcon.vue';
import RecipientEdit from '@/components/Module/Recipient/RecipientEdit.vue';
import ContractorEdit from '@/components/Module/Contractor/ContractorEdit.vue';
   
export default {
   data() {
      return {
         searchTerm: []
      }
   },

   components: {
      Typeahead,
      FontAwesomeIcon,
      RecipientEdit,
      ContractorEdit
   },

   computed: {
      ...mapState(
         useToolsStore, { 
            contractorRecipients: 'contractorRecipients',
            getContractorByName: 'getContractorByName'
         }
      )
   },

   methods: {
      ...mapActions(
         useToolsStore, { 
            getContractors: 'getContractors',
            getContractorRecipients: 'getContractorRecipients',
            clearRecipients: 'clearRecipients'
         }
      ),

      handleInput(event){
         this.searchTerm = this.getContractorByName(event.target.value.toLowerCase());
      },

      setContractor(contractor) {
         this.$router.push({ name: 'contractor-by-name', params: { id: contractor.id } })
      },

      goBack() {
         this.clearRecipients()
      }
   },

   mounted() {
      this.getContractors()
   }
}
</script>