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
                        placeholder="Search for contractors..."
                        @hit="setContractor($event)"
                        />
                  </div>
               </div>
            </form>
         </div>
      </div>
         
      <RecipientEdit 
         v-if="!this.contractorRecipients" 
      />

      <ContractorEdit 
         v-if="this.contractorRecipients"
         :contractor="this.contractorRecipients"
      />
   </div>
</template>
<script>
   import { mapActions, mapState } from 'pinia'
   import { useToolsStore } from '@/stores'
   
   import Typeahead from '@/Components/Input/Bootstrap/Typeahead.vue'
   import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
   import RecipientEdit from '@/Components/Module/Recipient/RecipientEdit.vue';
   import ContractorEdit from '@/Components/Module/Contractor/ContractorEdit.vue';
      
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
               contractorRecipients: 'contractorRecipients' ,
               getContractorByName: 'getContractorByName'
            }
         )
      },
   
      methods: {
         ...mapActions(
            useToolsStore, { 
               getContractors: 'getContractors',
               getContractorRecipients: 'getContractorRecipients',
            }
         ),
   
         handleInput(event){
            this.searchTerm = this.getContractorByName(event.target.value.toLowerCase());
         },

         setContractor(contractor) {
            this.getContractorRecipients(contractor.id)
         }
      },

      mounted() {
         this.getContractors()
      }
   }
</script>