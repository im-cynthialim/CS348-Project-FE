<template>
  <div>
    <v-btn
      class="position-absolute pr-1"
      style="left: 75px"
      size="x-large"
      color="black"
      icon="fa: fas fa-arrow-right fa-rotate-180"
      @click="this.$router.push('/')"
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
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              @click="
                selectedLot = item;
                chosenSpot = ''
              "
            >
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-card>

      <div class="d-flex">
        <v-card variant="outlined" class="pa-4 mb-10" width="700" height="750">
          <v-container>
            <v-row justify="center" v-for="n in selectedLot.spots" :key="n">
              <v-col v-if="n > 2" cols="6">
                <v-sheet
                  class="pa-4 bg-blue-grey-lighten-4 d-flex align-center justify-center"
                  @click="chosenSpot = n"
                >
                  {{ n }}
                </v-sheet>
              </v-col>
              <v-col v-else cols="6">
                <v-sheet
                  class="pa-4 bg-light-blue-lighten-2 d-flex align-center justify-center"
                  @click="chosenSpot = n"
                >
                  {{ n }}
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
            <p>{{ startDate }}</p>
            <p class="text-center">{{ startTimeHours }}:{{ startTimeMinutes }}</p>
          </div>
          <p class="font-weight-bold">Until</p>
          <div>
            <p>{{ endDate }}</p>
            <p class="text-center">{{ endTimeHours }}:{{ endTimeMinutes }}</p>
          </div>
        </div>

        <div class="d-flex ga-3">
          <div style="width: 50px; height: 70px">
            <p class="font-weight-bold">Lot</p>
            <p>{{ selectedLot.name }}</p>
          </div>
          <div class="text-center 50px;">
            <p class="font-weight-bold">Spot</p>
            <p>{{ chosenSpot }}</p>
          </div>
        </div>

        <div class="mb-6">
          <p class="font-weight-bold mb-1">Additional Details</p>
          {{ selectedLot.description }}
        </div>

        <v-btn class="mb-8 black-button" variant="tonal" @click="makeBooking()" block>
          Confirm Booking
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import api from '../../axiosconfig'

export default {
  mounted() {
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
  data: () => ({
    selectedLot: 1,
    items: [
      {
        name: 'DC',
        lid: 1,
        spots: 4,
        description: 'Free'
      },
      {
        name: 'OPT',
        lid: 2,
        spots: 5,
        description: 'Permit required'
      },
      {
        name: 'DWE',
        lid: 3,
        spots: 7,
        description: '$5 per entry'
      }
    ],
    startDate: '',
    startTimeHours: '',
    startTimeMinutes: '',
    endDate: '',
    endTimeHours: '',
    endTimeMinutes: '',
    chosenSpot: ''
  }),

  methods: {
    makeBooking() {
      const parseStart = this.startDate.split(' ');
      const parseEnd = this.endDate.split(' ');

      api.post('makeBooking', {
        uid: this.$route.query.uid,
        lid: this.selectedLot.lid,
        sid: this.chosenSpot,
        startYear: parseStart[2],
        startMonth: new Date(`${parseStart[0]} ${parseStart[1]}, ${parseStart[2]}`).getMonth()+1,
        startDate: parseStart[1],
        startHour: this.startTimeHours,
        startMinute: this.startTimeMinutes,
        endYear: parseEnd[2],
        endMonth: new Date(`${parseEnd[0]} ${parseEnd[1]}, ${parseEnd[2]}`).getMonth()+1,
        endDate: parseEnd[1],
        endHour: this.endTimeHours,
        endMinute: this.endTimeMinutes
      })
      .then(
        console.log("Success")
      )
      .catch((err) => {
        console.log(err);
      })
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
