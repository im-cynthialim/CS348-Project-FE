<template>
  <div>
    <div class="d-flex">
      <v-card variant="text" class="px-16">
        <div class="text-h6 font-weight-bold mb-2">Upcoming</div>
        <!-- <template v-for="name in testArray" :key="name"> -->
        <div v-for="name in testArray" class="" :key="name">
          <v-card
            class="d-flex flex-column pa-6 rounded-t-lg rounded-0 upcoming-bookings"
            variant="outlined"
          >
            <!-- <v-card class="d-flex flex-column pa-8 rounded-t-xl rounded-0 upcoming-bookings" variant="outlined"> -->
            <div>
              {{ name.name }}
            </div>
            <div>
              {{ name.address }}
            </div>
            <div>
              {{ name.details }}
            </div>
            <div>
              {{ name.date }}
            </div>
          </v-card>
          <v-btn class="mb-8 rounded-b-lg rounded-0 black-button" variant="tonal" block>
            Cancel
          </v-btn>
          <!-- <v-btn class="mb-8 rounded-b-xl rounded-0 black-button" variant="tonal" block> Cancel </v-btn> -->
        </div>
      </v-card>
      <v-card variant="text" class="px-16">
        <div class="text-h4 font-weight-bold mb-2">Reserve a parking spot</div>

      <div class="d-flex flex-row"> 

        <div>      
        <v-card variant="outlined" class="pa-8">
          <div class="text-h6">Filters</div>
          <v-row>
            <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Permit" value="permit"></v-checkbox>
              <v-checkbox v-model="selected" label="All day" value="all-day"></v-checkbox>

              <v-checkbox v-model="selected" label="Accessible" value="accessible"></v-checkbox>
            </v-col>
            <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Free" value="free"></v-checkbox>
              <v-checkbox v-model="selected" label="Visitor" value="visitor"></v-checkbox>
            </v-col>
          </v-row>
        </v-card>

            <div class="pa-8">
          <div class="text-h6">Parking Date and Time</div>
          <VueDatePicker class="date-picker" v-model="date" enable-time-picker="false"></VueDatePicker>
           <VueDatePicker v-model="date" enable-time-picker="false" ></VueDatePicker>
      </div>

        <div>
       
        Booking Details here
        </div>
        </div>
        <div>
                <v-card variant="outlined" class="pa-8">
          <div class="text-h6">Available Lots</div>
          <v-row> <!-- grid here of options-->
            <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Permit" value="permit"></v-checkbox>
              <v-checkbox v-model="selected" label="All day" value="all-day"></v-checkbox>

              <v-checkbox v-model="selected" label="Accessible" value="accessible"></v-checkbox>
            </v-col>
            <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Free" value="free"></v-checkbox>
              <v-checkbox v-model="selected" label="Visitor" value="visitor"></v-checkbox>
            </v-col>
                  <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Free" value="free"></v-checkbox>
              <v-checkbox v-model="selected" label="Visitor" value="visitor"></v-checkbox>
            </v-col>
            
                  <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Free" value="free"></v-checkbox>
              <v-checkbox v-model="selected" label="Visitor" value="visitor"></v-checkbox>
            </v-col>
                  <v-col cols="8" md="6" sm="3">
              <v-checkbox v-model="selected" label="Free" value="free"></v-checkbox>
              <v-checkbox v-model="selected" label="Visitor" value="visitor"></v-checkbox>
            </v-col>
          </v-row>
          <!-- add map -->
        </v-card>
        </div>
        
    </div>
    </v-card>
    </div>
         <div>
          <v-btn class="mb-8 rounded-b-lg rounded-0 black-button" variant="tonal" block>
            Cancel
          </v-btn>
    </div>
 
  </div>
</template>

<script>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
   components: { VueDatePicker },
  setup() {
    const date = ref();
     return {
      date
    }
  },
  data: () => ({
    testArray: [
      {
        name: 'test',
        location: 'address',
        details: 'free',
        date: 'may 31st'
      },
      { name: 'test', location: 'address', details: 'free', date: 'may 31st' }
    ],
    selected: []
  })
}
</script>

<style>
.black-button {
  background-color: black;
  color: white;
}

.upcoming-bookings {
  width: 250px;
}

.date-picker {
  z-index: 1;
  position: relative;
}

.dates {
  position: relative;
  z-index: 0;
}
</style>
