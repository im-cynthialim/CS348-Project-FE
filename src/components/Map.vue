<template>
    <!-- <div> -->
      <div id="map"> 
      {{ map }}
      </div>
    
</template>


<script>
    import { Loader } from "@googlemaps/js-api-loader";

  export default {
    
    name: 'map',
    data() {
      return {
        loader: new Loader({
            apiKey: "", //api key required
        }),
        mapOptions: {
            center: {
                lat: 43.4723, 
                lng: -80.5449,
            },
            zoom: 15,
            disableDefaultUI: false,
            // mapId: 'f3bc09b7bf4dc05a'
        },
        start: {
          lat: 43.4719,
          lng: -80.5454
        },
        end: {
          lat: 43.4730,
          lng: -80.5395
        }
      }
    },
    created(){
        this.loader
            .load()
            .then((google) => {
           
                  var directionsService = new google.maps.DirectionsService();
                  var directionsRenderer = new google.maps.DirectionsRenderer();
                  var map = new google.maps.Map(document.getElementById('map'), this.mapOptions);
                  directionsRenderer.setMap(map);
                


                  var request = {
                    origin: this.start,
                    destination: this.end,
                    waypoints: [{
                      location: {
                        lat: 43.466115,
                        lng: -80.524383
                      },
                      

                    }]

                  };

                  directionsService.route(request, function(result, status) {
                    if (status == 'OK') {
                      directionsRenderer.setDirections(result);
                    }
                    else{
                      console.log("error");
                    }
                  });



                // marker example
                // const marker = new google.maps.Marker({
                //   position: this.mapOptions.center,
                //   map,
                // });
            })
            .catch((e) => {
                console.log(e);
            });
    },

  }
</script>
 

<style>
#map {
    margin: 2.5rem;
    height: 70vh;
    width: auto;
}

</style>