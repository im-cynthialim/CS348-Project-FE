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

        <v-card variant="text">
          <v-card class="mx-auto overflow-y-auto" variant="text" style="height: 850px">
            <v-list width="500">
              <v-list-item
                class="pa-5 border-sm"
                v-for="(booking, i) in testHistory"
                :key="i"
                :value="booking"
              >
                <div class="d-flex flex-row justify-space-between">
                 

                  <div class="font-weight-bold text-decoration-underline">
                    {{ booking.lotName }}
                  </div>

                 <div class="d-flex flex-row ga-3 align-center">
                  <div
                    class="px-2"
                    :class="booking.status == 'expired' ? 'cancelled' : 'expired'"
                  >
                    {{ booking.status == 'expired' ? 'completed' : booking.status }}
                  </div>

                    <img
                    v-if="booking.status == 'expired'"
                    style="right: 0; top: 0"
                    width="20"
                    :src="booking.liked ? liked : unliked"
                    @click="booking.liked = true"
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
                    <p>{{ booking.price == '0' ? 'Free' : '$' + booking.price }}</p>
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

export default {
  data: () => ({
    bookingHistory: [],
    unliked: unliked,
    liked: liked,
    testHistory: [
      {
        area: 'UW',
        address: 'XXX',
        lotName: 'DC',
        parkingType: 'pay',
        startTime: '2024-06-15T19:30:00.000+00:00',
        endTime: '2024-06-15T22:30:00.000+00:00',
        price: 15.0,
        status: 'expired',
        liked: false
      },
      {
        area: 'UW',
        address: 'XXX',
        lotName: 'DWE',
        parkingType: 'free',
        startTime: '2024-06-15T19:30:00.000+00:00',
        endTime: '2024-06-15T20:30:00.000+00:00',
        price: 0.0,
        status: 'expired',
        liked: false
      },
      {
        area: 'UW',
        address: 'XXX',
        lotName: 'SCH',
        parkingType: 'pay',
        startTime: '2024-06-15T19:30:00.000+00:00',
        endTime: '2024-06-15T20:30:00.000+00:00',
        price: 3.0,
        status: 'cancelled',
        liked: false
      },
      {
        area: 'UW',
        address: 'XXX',
        lotName: 'SCH',
        parkingType: 'pay',
        startTime: '2024-07-09T16:30:00.000+00:00',
        endTime: '2024-07-09T19:30:00.000+00:00',
        price: 3.0,
        status: 'cancelled',
        liked: false
      }
    ]
  }),
  computed: {},
  methods: {
    listBookingHistory() {
      api.get('/listBookingHistory'),
        {
          uid: 4
        }.then((res) => {
          this.bookingHistory = res
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

.cancelled {
  background-color: #c5e1a5;
}

.expired {
  background-color: #ffe0b2;
}
</style>
