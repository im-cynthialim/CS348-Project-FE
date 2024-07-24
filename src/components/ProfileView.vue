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
    <div class="d-flex">
      <v-card variant="text">
        <div class="text-h4 font-weight-bold mb-2">Booking History</div>

      <v-select
        class="mx-auto"
        max-width="500"
        label="Sort by"
        :items="['None', 'Price', 'Likes']"
        variant="underlined"
        v-model="sort"
        ></v-select>
        <v-card variant="text">
          <v-card class="mx-auto overflow-y-auto" variant="text" style="height: 850px">
            <v-list width="500">
              <v-list-item
                class="pa-5 border-sm"
                v-for="booking in bookingHistory"
                :key="booking.bid"
                :value="booking"
              >
                <div class="d-flex flex-row justify-space-between">
                  <div class="font-weight-bold text-decoration-underline">
                    {{ booking.lotName }}
                  </div>

                  <div class="d-flex flex-row align-center">
                    <div
                      class="px-2 mr-3"
                      :class="booking.status == 'expired' ? 'cancelled' : 'expired'"
                    >
                      {{ booking.status == 'expired' ? 'completed' : booking.status }}
                    </div>
                    <div v-if="booking.status == 'expired'" class="mr-2"> {{booking.likeNum}} </div>

                    <img
                      v-if="booking.status == 'expired'"
                      style="right: 0; top: 0"
                      width="20"
                      :src="booking.liked ? liked : unliked"
                      @click="likeLot(booking.lid)"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <p class="font-weight-bold">Start</p>
                    {{ formatDate(booking.startTime) }} {{ formatTime(booking.startTime) }}
                  </div>

                  <div class="mb-1">
                    <p class="font-weight-bold">End</p>
                    {{ formatDate(booking.endTime) }} {{ formatTime(booking.endTime) }}
                  </div>
                  <div>
                    <p class="font-weight-bold">Additional Details</p>
                    <p>{{ booking.parkingType == 'free' ? 'Free' : '$' + booking.price }}</p>
                    {{uid}}
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script>
import unliked from '../assets/images/heart-regular.svg'
import liked from '../assets/images/heart-solid.svg'
import api from '../../axiosconfig'

export default {
  data: () => ({
    bookingHistory: [],
    unliked: unliked,
    liked: liked,
    uid: null,
    sort: null
  }),
  mounted() {

    this.listBookingHistory();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { year: 'numeric', month: 'long', day: '2-digit' }
      return date.toLocaleDateString('en-US', options)
    },
    formatTime(dateString) {
      const date = new Date(dateString)
      const options = { hour: '2-digit', minute: '2-digit', hour12: false }
      return date.toLocaleTimeString('en-US', options)
    },
    listBookingHistory(){
      api
      .post('bookingHistory', {
        uid: JSON.parse(sessionStorage.getItem('uid')),
        priceDesc: this.sort == 'Price' ? true : false,
        likeNumDesc: this.sort == 'Likes' ? true : false
      })
      .then((res) => {
        this.bookingHistory = res.data.filter((booking) => booking.status != 'booked')
      })
    },
    likeLot(lid) {
      api.post(`likeLot?uid=${JSON.parse(sessionStorage.getItem('uid'))}&lid=${lid}`)
      .then(() => {
      this.listBookingHistory()
    });
    }
  },
  watch: {
    sort() {
      this.bookingHistory = [];
      this.listBookingHistory();
    },
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

.cancelled {
  background-color: #c5e1a5;
}

.expired {
  background-color: #ffe0b2;
}
</style>
