<template>
  <div>
    <v-btn
      class="position-absolute"
      style="left: 75px"
      size="x-large"
      color="#4285F4"
      icon="fa: fas fa-gear"
      @click="this.$router.push('/profile')"
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
      <v-card variant="text" class="px-16 overflow-y-auto" width="378" height="850">
        <div class="text-h6 font-weight-bold mb-2">Upcoming</div>
        <div v-for="booking in upcomingBookings" :key="booking.bid">
          <v-card
            class="d-flex flex-column pa-6 mx-0 rounded-t-lg rounded-0"
            :style="{width: upcomingBookings.length > 2 ? '235px': '250px'}"
            variant="outlined"
          >
            <div
                class="px-2 position-absolute right-0 mr-5" 
                :style="{visibility: [0, 1, 2, 3, 4].includes(this.uid) ? `visible` : `hidden`}"
                :class="booking.uid == this.uid ? 'admin' : 'user'"
              >
              {{booking.uid == this.uid ? "admin" : "user"}}
              </div>
            <div class="mb-1 d-flex justify-space-between">
              <p class="font-weight-bold text-decoration-underline">{{ booking.lotName }}</p>
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
            class="mb-8 black-button rounded-b-lg rounded-0"
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
            <v-card variant="outlined" class="pa-4 mb-10" width="700" height="830">
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
               <v-checkbox
                class="align-end d-flex pl-3"
                v-model="freeLots"
                color="#4285F4"
                label="Free parking only"
                density="compact"
              ></v-checkbox>
              <div class="pa-3 pb-0">
                <div class="text-h6">Preferred Lot Locations</div>
                <MapView @update-preferred="updatePreferred" class="mx-auto mt-0 pb-2"></MapView>
              </div>
              <div :style="{visibility: this.errorMsg ? 'visible' : 'hidden'}" class="text-red font-weight-bold text-center"> {{errorMsg}}</div>  
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
    upcomingBookings: [],
    countBookings: 0,
    preferredLots: [],
    errorMsg: null,
    freeLots: false,
    uid: null,
  }),
  mounted() {
    
    if (sessionStorage.getItem('uid')) { // get uid of session
      this.uid = JSON.parse(sessionStorage.getItem('uid'))
    }
    this.listUpcomingBookings();

  },
  methods: {
    listUpcomingBookings() {
               api
      .get(`upcomingBookings?uid=${this.uid}`)
      .then((res) => {
        this.upcomingBookings = res.data
      })
    },
    updatePreferred(data) {
      this.preferredLots = data;
    },
    navBooking() {
      api.post('listAvailableSpots', {
          "uid": this.uid,
          "location": this.preferredLots,
          "freeOnly": this.freeLots,
          "startYear": `${this.startDate.getFullYear()}`,
          "startMonth": `${this.startDate.getMonth()}`.length != 2 ? "0" + `${this.startDate.getMonth()}` : this.startDate.getMonth(),
          "startDate": `${this.startDate.getDate()}`,
          "startHour": `${this.startTime.hours}`,
          "startMinute": `${this.startTime.hours}`,
          "endYear": this.endDate.getFullYear(),
          "endMonth": `${this.endDate.getMonth()}`.length != 2 ? "0" + `${this.endDate.getMonth()}` : this.endDate.getMonth(),
          "endDate": `${this.startDate.getDate()}`,
          "endHour": `${this.endTime.hours}`,
          "endMinute": `${this.endTime.minutes}`,
      })
      .then((res) => {
          this.$router.push({
            path: '/booking',
            query:{
              uid: this.uid,
              availableLots: JSON.stringify(res.data),
              startDate: `${this.startDate.toLocaleString('en-us', { month: 'long' })} ${this.startDate.getDate()} ${this.startDate.getFullYear()}`,
              endDate: `${this.endDate.toLocaleString('en-us', { month: 'long' })} ${this.endDate.getDate()} ${this.endDate.getFullYear()}`,
              startTimeHours: this.startTime.hours,
              startTimeMinutes: this.startTime.minutes, 
              endTimeHours: this.endTime.hours,
              endTimeMinutes: this.endTime.minutes,
            }
          })
      })
      .catch(e => {
          if (e.response.status === 406) {
            this.errorMsg = "Maximum number of bookings reached, no additional bookings can be made";
          }
          else if (e.response.status === 404) {
            this.errorMsg = "User not found - retry login";
          }
    })
    },
    cancelBooking(booking) {
      var rmUid;
      if (this.uid == booking.uid) { // admin booking
        rmUid = this.uid;
      }
      else {
        rmUid = booking.uid;
      }
      api
        .delete(`cancelBooking?uid=${rmUid}&bid=${booking.bid}`, {})
        .then(this.listUpcomingBookings())
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

<style scoped>
.black-button {
  background-color: black;
  color: white;
  width: 1000px;
}

.dates {
  position: relative;
  z-index: 0;
}

.input-slot-image {
  margin-left: 15px;
  height: 12px;
}

.admin {
  background-color: #FFAB91;
}

.user {
  background-color: #BBDEFB;
}
</style>
