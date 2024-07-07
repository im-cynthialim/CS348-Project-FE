<template>
  <div>
  <div class="d-flex flex-row">
  <div id="map">
    {{ map }}
    </div>
    <div class="pl-5">
    <p class="text-body-2 font-italic text-center"> The availability of these lots will be prioritized</p>
  <template v-for="preferredUniLot in uwLots">
  
    <li class="text-center" style="list-style-type:none;" v-if="preferredUniLot.selected">
      {{ preferredUniLot.name }}
    </li>
  </template>
  </div>
  </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'


export default {
  name: 'map',
  data: () => ({
      loader: new Loader({
        apiKey: 'AIzaSyAC8iihBmQY7yv8PQyH2fUgnteHGmhIRmM', //api key required
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
    uwLots: [
      {
        name: "DC",
        position:
          { lat: 43.4728963547522, lng: -80.54174093668153 },
        selected: false
      },
        {
        name: "QNC",
        position: { lat: 43.4712, lng: -80.5440 },
        selected: false
        },

        {
        name: "SLC",
        position: { lat: 43.4719, lng: -80.5454 },
        selected: false
        }
    ]
   
  }),

  methods: {
    initMap(Map, AdvancedMarkerElement){
      const map = new Map(document.getElementById('map'), this.mapOptions);

        this.uwLots.forEach((data, index) => {
          const lot = document.createElement("div");

          lot.className = "lot-style";
          lot.textContent = data.name;

          const marker = new AdvancedMarkerElement({
            map,
            position: data.position,
            content: lot,
        });

        marker.addListener("click", () => {
          this.uwLots[index].selected = !this.uwLots[index].selected;
          lot.style.backgroundColor = this.uwLots[index].selected ? '#52b788': '#4285F4';
          lot.style.borderTopColor = this.uwLots[index].selected ? '#52b788': '#4285F4';

        })
      });
    },
  },
 async mounted() {
      const { Map } = await this.loader.importLibrary("maps");
      const { AdvancedMarkerElement } = await this.loader.importLibrary("marker");
      
      this.initMap(Map, AdvancedMarkerElement);
 }
}
</script>

<style>

#map {
  width: 45vh;
  height: 45vh;
}

.lot-style {
  background-color: #4285F4;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 14px;
  border-top-color: #4285F4;
  padding: 10px 15px;
  position: relative;
}

.lot-style::after {
  content: "";
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
