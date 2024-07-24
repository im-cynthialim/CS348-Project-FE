<template>
  <div>
    <v-btn
      class="position-absolute pr-1"
      style="left: 75px"
      size="x-large"
      color="black"
      icon="fa: fas fa-arrow-right fa-rotate-180"
      @click="this.$router.push('/home')"
    ></v-btn>
    <div class="d-flex flex-row h-100">
      <v-card variant="text" class="mr-10" width="1000">
        <div class="text-h6 font-weight-bold">Available Lots</div>
        <div class="text-body font-italic mb-5">
          Search through available lots and book a specific spot
        </div>


        <v-card class="mx-auto overflow-y-auto" variant="text" style="height: 550px">
          <v-list>
            <v-list-item
              v-for="(item, i) in availableLots"
              :key="i"
              :value="item"
              @click="
                selectedLot = item;
                chosenSpot = '';
              "
            >
              <v-list-item-title v-text="item.lot_name"></v-list-item-title>
             <div class="position-absolute mr-8 mt-3 " style="right: 0; top: 0;">  {{item.likeNum}}
              <img
              class="position-absolute pl-2" style="margin-top: 6px;"
                      width="20"
                      src="../assets/images/heart-solid.svg"
                      @click="booking.liked = true"
                    />
            </div>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card>

      <div class="d-flex">
        <v-card variant="outlined" class="pa-4 mb-10" width="700" height="750">
          <v-container>
            <v-row justify="center" v-for="n in selectedLot.spots" :key="n" @click="errorMsg = false">
              <v-col v-if="!n.available" cols="6"> <!--already taken spot-->
                <v-sheet 
                  class="pa-4 bg-blue-grey-lighten-4 d-flex align-center justify-center"
                >
                  {{ n.sid }}
                </v-sheet>
              </v-col>
              <v-col v-else-if="n.parkingType == 'free'" cols="6"><!--free spot-->
                <v-sheet 
                  class="pa-4 bg-light-green-lighten-3 d-flex align-center justify-center"
                   @click="chosenSpot = n"
                >
                  {{ n.sid }}
                  
                </v-sheet>
              </v-col>
              <v-col v-else cols="6"> <!--default spot-->
                <v-sheet
                  class="pa-4 bg-indigo-lighten-1 d-flex align-center justify-center"
                  @click="chosenSpot = n"
                >
                  {{ n.sid }}
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
      <v-card variant="text" class="ml-10" width="1000">
        <div class="text-h6 font-weight-bold mb-8">Booking Details</div>

        <p class="font-weight-bold mb-1">Date and Time</p>
        <div v-if="startDate == endDate" class="mb-6 d-flex ga-3">
          <p>{{ startDate }}</p>
          <p>
            {{ startTimeHours }}:{{ startTimeMinutes }} - {{ endTimeHours }}:{{ endTimeMinutes }}
          </p>
        </div>

        <div v-else class="d-flex ga-3 mb-6 justify-center">
          <div>
            <p class="text-center">{{ startDate }}</p>
            <p class="text-center">{{ startTimeHours }}:{{ startTimeMinutes }}</p>
          </div>
          <p class="font-weight-bold">Until</p>
          <div>
            <p class="text-center">{{ endDate }}</p>
            <p class="text-center">{{ endTimeHours }}:{{ endTimeMinutes }}</p>
          </div>
        </div>

        <div class="d-flex ga-3">
          <div style="width: 50px; height: 70px">
            <p class="font-weight-bold">Lot</p>
            <p>{{ selectedLot.lot_name }}</p>
          </div>
          <div class="text-center 50px;">
            <p class="font-weight-bold">Spot</p>
            <p>{{ chosenSpot.sid }}</p>
          </div>
        </div>

        <div class="mb-6">
          <p class="font-weight-bold mb-1">Additional Details</p>
            <p v-show="`${chosenSpot.parkingType}` == 'pay'"> Price: ${{chosenSpot.price}} </p>
            <p v-show="`${chosenSpot.parkingType}` == 'free'"> Free </p>
            <p v-show="`${chosenSpot.address}` != 'XXX'"> {{chosenSpot.address}} </p>
        </div>
        <div v-if="this.errorMsg" class="text-red font-weight-bold text-center"> This spot has been booked by another user - try again later </div>  
        <v-btn class="mb-8 black-button" variant="tonal" @click="makeBooking()" block>
          Confirm Booking
        </v-btn>

        <div :style="{visibility: this.validBooking ? 'visible' : 'hidden'}" class="text-green font-weight-bold text-center"> {{validBooking}}</div>  
     
      </v-card>
    </div>
  </div>
</template>

<script>
import api from '../../axiosconfig'

export default {

  data: () => ({
    selectedLot: 1,
    countBookings: 0,
    availableLots: [],
    startDate: '',
    startTimeHours: '',
    startTimeMinutes: '',
    endDate: '',
    endTimeHours: '',
    endTimeMinutes: '',
    chosenSpot: '',
    maxBookings: false,
    errorMsg: false,
    validBooking: null,
  }),
    created() {
    const data = JSON.parse(this.$route.query.availableLots);
    this.availableLots = data.available_lots;
        this.countBookings = parseInt(this.$route.query.countBookings, 10)
    this.startDate = this.$route.query.startDate
    this.startTimeHours = this.$route.query.startTimeHours
    this.startTimeMinutes =
      this.$route.query.startTimeMinutes == '0'
        ? '0' + `${this.$route.query.startTimeMinutes}`
        : `${this.$route.query.startTimeMinutes}`

    this.endDate = this.$route.query.endDate
    this.endTimeHours = this.$route.query.endTimeHours
    this.endTimeMinutes =
      this.$route.query.endTimeMinutes == '0'
        ? '0' + `${this.$route.query.endTimeMinutes}`
        : `${this.$route.query.endTimeMinutes}`
  },
  methods: {
    makeBooking() {
      const parseStart = this.startDate.split(' ')
      const parseEnd = this.endDate.split(' ')

        api
          .post('makeBooking', {
            uid: this.$route.query.uid,
            lid: this.selectedLot.lid,
            sid: this.chosenSpot.sid,
            price: this.chosenSpot.price,
            startYear: parseStart[2],
            startMonth:
              new Date(`${parseStart[0]} ${parseStart[1]}, ${parseStart[2]}`).getMonth() + 1,
            startDate: parseStart[1],
            startHour: this.startTimeHours,
            startMinute: this.startTimeMinutes,
            endYear: parseEnd[2],
            endMonth: new Date(`${parseEnd[0]} ${parseEnd[1]}, ${parseEnd[2]}`).getMonth() + 1,
            endDate: parseEnd[1],
            endHour: this.endTimeHours,
            endMinute: this.endTimeMinutes
          })
          .then(() => {
            this.validBooking = "Booking successful!";
          }
          )
          .catch((err) => {
            if (err.response.status === 406) {
              this.errorMsg = true;
            }
          
          })
    },
  },

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
