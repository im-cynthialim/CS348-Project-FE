<template>
  <div>
    <v-btn
      class="position-absolute"
      style="left: 75px"
      size="x-large"
      color="#4285F4"
      icon="fa: fas fa-gear"
      @click="navProfile()"
    ></v-btn>

    <v-btn
      class="position-absolute pr-1"
      style="left: 75px; top: 130px"
      size="x-large"
      color="#3170D5"
      icon="fa: fas fa-sign-out fa-rotate-180"
      @click="this.$router.push('/')"
    ></v-btn>
    <div class="d-flex">
      <v-card variant="text" class="px-16 overflow-y-auto" height="850">
        <div class="text-h6 font-weight-bold mb-2">Upcoming</div>
        <div v-for="booking in upcomingBookings" :key="booking.bid">
          <v-card
            class="d-flex flex-column pa-6 rounded-t-lg rounded-0 upcoming-bookings"
            variant="outlined"
          >
            <div class="mb-1 d-flex justify-space-between">
              <p class="font-weight-bold text-decoration-underline"> {{ booking.lotName }}</p>
            </div>

            <div class="mb-1">
              <p class="font-weight-bold">Start</p>
              {{ formatDate(booking.startTime) }} {{ formatTime(booking.startTime) }}
            </div>
            <div class="mb-1">
              <p class="font-weight-bold">End</p>
               {{ formatDate(booking.endTime) }} {{ formatTime(booking.endTime) }}
            </div>
            <div>
              <p class="font-weight-bold">Additional Details</p>
              {{ booking.price == '0' ? 'Free' : '$' + booking.price }}
            </div>
          </v-card>
          <v-btn
            class="mb-8 rounded-b-lg rounded-0 black-button"
            variant="tonal"
            block
            @click="cancelBooking(booking)"
          >
            Cancel
          </v-btn>
        </div>
      </v-card>
      <v-card variant="text" class="px-16">
        <div class="text-h4 font-weight-bold mb-2">Find a parking spot</div>

        <div class="d-flex flex-row">
          <div>
            <v-card variant="outlined" class="pa-4 mb-10" width="700" height="800">
              <!-- permit spot end date can't be more than 7 days from today-->
              <div class="pa-4 d-flex flex-row">
                <div>
                  <div class="text-h6 pb-3">Parking Date and Time</div>

                  <div class="d-flex flex-row mb-4">
                    <div class="mr-4">
                      Start Date
                      <VueDatePicker
                        class="w-80 pt-1"
                        v-model="startDate"
                        :enable-time-picker="false"
                        :min-date="new Date()"
                        placeholder="Start Date"
                      >
                        <template #input-icon>
                          <img
                            class="input-slot-image"
                            src="../assets/images/calendar-regular.svg"
                          />
                        </template>
                      </VueDatePicker>
                    </div>

                    <div>
                      Start Time
                      <VueDatePicker
                        class="w-80 pt-1"
                        v-model="startTime"
                        time-picker
                        minutes-increment="30"
                        no-minutes-overlay
                        placeholder="Start Time"
                      >
                        <template #input-icon>
                          <img class="input-slot-image" src="../assets/images/clock-regular.svg" />
                        </template>
                      </VueDatePicker>
                    </div>
                  </div>

                  <div class="d-flex flex-row">
                    <div class="mr-4">
                      End Date
                      <VueDatePicker
                        class="w-80 pt-1"
                        v-model="endDate"
                        :enable-time-picker="false"
                        :min-date="startDate"
                        placeholder="End Date"
                      >
                        <template #input-icon>
                          <img
                            class="input-slot-image"
                            src="../assets/images/calendar-regular.svg"
                          />
                        </template>
                      </VueDatePicker>
                    </div>
                    <div>
                      End Time
                      <VueDatePicker
                        class="w-80 pt-1"
                        v-model="endTime"
                        time-picker
                        minutes-increment="30"
                        no-minutes-overlay
                        placeholder="End Time"
                        :min-time="
                          startDate.getDate() == endDate.getDate()
                            ? { hours: startTime.hours, minutes: startTime.minutes + 30 }
                            : { hours: 0, minutes: 0 }
                        "
                      >
                        <template #input-icon>
                          <img class="input-slot-image" src="../assets/images/clock-regular.svg" />
                        </template>
                      </VueDatePicker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="pa-3">
                <div class="text-h6">Preferred Lot Locations</div>
                <MapView class="mx-auto mt-0 pb-2"></MapView>
              </div>
              <v-btn
                class="mb-8 rounded-lg black-button"
                variant="tonal"
                @click="navBooking()"
                block
              >
                Find available lots
              </v-btn>
            </v-card>
          </div>
        </div>
      </v-card>
    </div>
    <div></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import MapView from './MapView.vue'

import api from '../../axiosconfig'

export default {
  components: { VueDatePicker, MapView },
  setup() {
    const startDate = ref(new Date())

    const endDate = ref(new Date())

    const startTime = ref({
      hours: new Date().getHours(),
      minutes: 0
    })

    const endTime = ref({
      hours: new Date().getHours(),
      minutes: 30
    })

    return {
      startDate,
      endDate,
      startTime,
      endTime
    }
  },
  data: () => ({
    selected: [],
    upcomingBookings: []
  }),
  mounted() {
    api.post('bookingHistory',
      {
        uid: 4,
      }).then((res) => {
        this.upcomingBookings = res.data;
      })
  },
  methods: {
    navProfile() {
      this.$router.push('/profile')
    },
    navBooking() {
      this.$router.push({
        path: '/booking',
        query: {
          startDate: `${this.startDate.toLocaleString('en-us', { month: 'long' })} ${this.startDate.getDate()} ${this.startDate.getFullYear()}`,
          endDate: `${this.endDate.toLocaleString('en-us', { month: 'long' })} ${this.endDate.getDate()} ${this.endDate.getFullYear()}`,
          startTimeHours: this.startTime.hours,
          startTimeMinutes: this.startTime.minutes,
          endTimeHours: this.endTime.hours,
          endTimeMinutes: this.endTime.minutes,
          uid: 4 //TBD
        }
      })
    },
    cancelBooking(booking) {
      api
        .delete(`cancelBooking?uid=4&bid=${booking.bid}`, {
        })
        .then(console.log('Booking cancelled successfully'))
        .catch((err) => {
          console.log(err)
        })
    },
     formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: '2-digit' }
      return date.toLocaleDateString('en-US', options)
    },
    formatTime(dateString) {
      const date = new Date(dateString)
      const options = { hour: '2-digit', minute: '2-digit', hour12: false }
      return date.toLocaleTimeString('en-US', options)
    }
   
  }
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

.dates {
  position: relative;
  z-index: 0;
}

.input-slot-image {
  margin-left: 15px;
  height: 12px;
}
</style>
