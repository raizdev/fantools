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
                        :data="contractors"
                        :serializer="s => s.slug"
                        placeholder="Search for contractors..."
                        @hit="setContractorId($event)"
                        />
                  </div>
               </div>
            </form>
         </div>
      </div>
         
      <RecipientEdit 
         v-if="!contractorId" 
      />

      <ContractorEdit 
         v-if="contractorId"
         :contractorId="contractorId"
         :key="componentKey"
      />
   </div>
</template>
<script>
   import { mapActions } from 'pinia'
   import { useToolsStore } from '@/stores'
   
   import Typeahead from '@/Components/Input/Bootstrap/Typeahead.vue'
   import FontAwesomeIcon from '@/Components/Icon/FontAwesomeIcon.vue';
   import RecipientEdit from '@/Components/Module/Recipient/RecipientEdit.vue';
   import ContractorEdit from '@/Components/Module/Contractor/ContractorEdit.vue';
      
   export default {
      data() {
         return {
            contractors: [],
            contractorId: null,
            componentKey: 0
         }
      },
   
      components: {
         Typeahead,
         FontAwesomeIcon,
         RecipientEdit,
         ContractorEdit
      },
   
      methods: {
         ...mapActions(
            useToolsStore, { 
               getContractors: 'getContractors',
               getContractorById: 'getContractorById'
            }
         ),

         forceRerender() {
            this.componentKey += 1;
         },
   
         handleInput(event){
            this.getContractors(event.target.value).then((result) => {
                  this.contractors = result
            })
         },

         setContractorId(contractor) {
            this.contractorId = contractor.id
            this.forceRerender()
         }
      }
   }
</script>