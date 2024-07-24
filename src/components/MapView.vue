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
        <template v-for="preferredCityLot in cwLots">
          <li
            class="text-center"
            style="list-style-type: none"
            :key="preferredCityLot.lotName"
            v-if="preferredCityLot.selected"
          >
            {{ preferredCityLot.lotName }}
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
    uwLots: [],
    cwLots:[
{lotName: "Galaxy Cinemas Waterloo", points: [{lat:43.495766, lng: -80.52778},{lat:43.496095, lng: -80.524909},{lat:43.49516, lng: -80.524826},{lat:43.494998, lng: -80.527072}], selected: false},
{lotName: "Zehrs Conestoga", points: [{lat:43.4982, lng: -80.524452},{lat:43.497621, lng: -80.525088},{lat:43.496675, lng: -80.524028},{lat:43.497254, lng: -80.523446}], selected: false},
{lotName: "Home Depot", points: [{lat:43.504435, lng: -80.534556},{lat:43.503771, lng: -80.534935},{lat:43.502976, lng: -80.534281},{lat:43.503401, lng: -80.533365}], selected: false},
{lotName: "Waterloo Town Square (North)", points: [{lat:43.464236, lng: -80.523939},{lat:43.464482, lng: -80.523869},{lat:43.464553, lng: -80.523183},{lat:43.464303, lng: -80.52313}], selected: false},
{lotName: "City Centre Lot", points: [{lat:43.463883, lng: -80.519793},{lat:43.463668, lng: -80.519393},{lat:43.46438, lng: -80.518615},{lat:43.464509, lng: -80.5191}], selected: false},
{lotName: "Waterloo Town Square (South)", points: [{lat:43.461641, lng: -80.522792},{lat:43.461895, lng: -80.522183},{lat:43.462702, lng: -80.522582},{lat:43.46237, lng: -80.523378}], selected: false},
{lotName: "Perimeter Lot", points: [{lat:43.465385, lng: -80.527146},{lat:43.464997, lng: -80.527137},{lat:43.465015, lng: -80.526736},{lat:43.465387, lng: -80.526506}], selected: false},
{lotName: "Station Lot", points: [{lat:43.465111, lng: -80.520909},{lat:43.464752, lng: -80.520848},{lat:43.464818, lng: -80.520272},{lat:43.465171, lng: -80.520375}], selected: false},
{lotName: "Museum Lot", points: [{lat:43.464394, lng: -80.527087},{lat:43.464319, lng: -80.527242},{lat:43.464034, lng: -80.526859},{lat:43.464177, lng: -80.526343}], selected: false},
{lotName: "Forbes Motors Chevrolet Buick GMC", points: [{lat:43.46372, lng: -80.504123},{lat:43.462751, lng: -80.503482},{lat:43.463236, lng: -80.502071},{lat:43.463987, lng: -80.503357}], selected: false},
{lotName: "Carimex Auto Sale", points: [{lat:43.463751, lng: -80.502495},{lat:43.463373, lng: -80.501864},{lat:43.463529, lng: -80.501426},{lat:43.463967, lng: -80.501893}], selected: false},
{lotName: "Walmart", points: [{lat:43.470704, lng: -80.514375},{lat:43.469473, lng: -80.516179},{lat:43.46906, lng: -80.515877},{lat:43.470059, lng: -80.513522}], selected: false},
{lotName: "Conestoga Mall I", points: [{lat:43.498743, lng: -80.526403},{lat:43.498259, lng: -80.525038},{lat:43.498553, lng: -80.524529}, {lat:43.499426, lng: -80.526362}], selected: false},
{lotName: "Conestoga Mall II", points: [{lat:43.500013, lng: -80.528558},{lat:43.500001, lng: -80.528118},{lat:43.498191, lng: -80.528322},{lat:43.498195, lng: -80.529169}], selected: false},
{lotName: "Conestoga Mall III", points: [{lat:43.497366, lng: -80.529019},{lat:43.497347, lng: -80.528327},{lat:43.496024, lng: -80.528322},{lat:43.496078, lng: -80.52881}], selected: false},
{lotName: "Elam Martin Farmstead at RIM Park", points: [{lat:43.517386, lng: -80.494412},{lat:43.517262, lng: -80.494452},{lat:43.516987, lng: -80.493564},{lat:43.517105, lng: -80.493419}], selected: false},
{lotName: "RIM Park", points: [{lat:43.518255, lng: -80.502704},{lat:43.517849, lng: -80.502452},{lat:43.518092, lng: -80.500494},{lat:43.519164, lng: -80.500566}], selected: false},
{lotName: "Milestones", points: [{lat:43.439943, lng: -80.565112},{lat:43.439164, lng: -80.564319},{lat:43.439679, lng: -80.563367},{lat:43.440045, lng: -80.563762}], selected: false},
{lotName: "Library Lot", points: [{lat:43.465812, lng: -80.525633},{lat:43.465384, lng: -80.525451},{lat:43.465544, lng: -80.524928},{lat:43.465953, lng: -80.525266}], selected: false},
{lotName: "Grey Silo Golf Club", points: [{lat:43.517632, lng: -80.493981},{lat:43.517488, lng: -80.494057},{lat:43.516971, lng: -80.492691},{lat:43.517168, lng: -80.49251}], selected: false},
{lotName: "Uptown Parkade", points: [{lat:43.463665, lng: -80.521261},{lat:43.463293, lng: -80.521191},{lat:43.463339, lng: -80.520806},{lat:43.463719, lng: -80.520892}], selected: false}
    ]
  }),

  methods: {
    initMap(Map, AdvancedMarkerElement) {
      //uw lot markers
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

      // cw lot polygons

      this.cwLots.forEach((data, index) => {
      
      const lotMarker = new google.maps.Polygon({
        paths: data.points,
        strokeColor: this.cwLots[index].selected ? '#52b788' : '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: this.cwLots[index].selected ? '#52b788' : '#FF0000',
        fillOpacity: 0.35,
      });

    lotMarker.setMap(map);
      lotMarker.addListener("click", () => {
        this.cwLots[index].selected = !this.cwLots[index].selected
       lotMarker.setOptions({
        fillColor: this.cwLots[index].selected ? '#52b788' : '#FF0000',
        strokeColor: this.cwLots[index].selected ? '#52b788' : '#FF0000',
      });
        const contentString = `<div class="font-weight-bold text-subtitle"> ${data.lotName} </div>`
        
        const infoWindow = new google.maps.InfoWindow({position: {lat: (data.points[0].lat + data.points[2].lat)/2, lng: (data.points[1].lng + data.points[3].lng)/2}});
        infoWindow.setContent(contentString);
        infoWindow.open({
          map
        });
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
