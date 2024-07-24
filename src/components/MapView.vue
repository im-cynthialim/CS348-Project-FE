<template>
  <div>
    <div class="d-flex flex-row">
      <div @click="handlePreferred" id="map">
        {{ map }}
      </div>
      <div class="pl-5">
        <p class="text-body-2 font-italic text-center mb-2">
          Checking the availability of the lots below will be prioritized
        </p>
        <template v-for="preferredUniLot in uwLots">
          <li
            class="text-center"
            style="list-style-type: none"
            :key="preferredUniLot.lotName"
            v-if="preferredUniLot.selected"
          >
            {{ preferredUniLot.lotName }}
          </li>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import api from '../../axiosconfig'

export default {
  name: 'map',
  data: () => ({
    loader: new Loader({
      apiKey: //api key required
    }),
    mapOptions: {
      center: {
        lat: 43.4723,
        lng: -80.5449
      },
      zoom: 15,
      disableDefaultUI: false,
      mapId: 'f3bc09b7bf4dc05a'
    },
    start: {
      lat: 43.4719,
      lng: -80.5454
    },
    end: {
      lat: 43.473,
      lng: -80.5395
    },
    uwLots: []
  }),

  methods: {
    initMap(Map, AdvancedMarkerElement) {
      const map = new Map(document.getElementById('map'), this.mapOptions)

      this.uwLots.forEach((data, index) => {
        const lot = document.createElement('div')

        lot.className = 'lot-style'
        lot.textContent = data.lotName

        const marker = new AdvancedMarkerElement({
          map,
          position: {lat: data.latitude, lng: data.longitude},
          content: lot
        })

        marker.addListener('click', () => {
          this.uwLots[index].selected = !this.uwLots[index].selected
          lot.style.backgroundColor = this.uwLots[index].selected ? '#52b788' : '#4285F4';
          lot.style.borderTopColor = this.uwLots[index].selected ? '#52b788' : '#4285F4';
        })
      })
    },
    handlePreferred() {
      const preferred = this.uwLots.filter((lot) => lot.selected).map((lot) => lot.lotName);
      this.$emit('update-preferred', preferred);
    }
  },
  async created() {
    const { Map } = await this.loader.importLibrary('maps')
    const { AdvancedMarkerElement } = await this.loader.importLibrary('marker')

    api.get('/lots').then((res) => {
      this.uwLots = res.data.map((obj) => {
        return {
          ...obj,           
          selected: false 
        }
    })
    this.initMap(Map, AdvancedMarkerElement)
    });
  }
}
</script>

<style>
#map {
  width: 45vh;
  height: 45vh;
}

.lot-style {
  background-color: #4285f4;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  border-top-color: #4285f4;
  padding: 10px 15px;
  position: relative;
}

.lot-style::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid;
  border-top-color: inherit;
}
</style>
