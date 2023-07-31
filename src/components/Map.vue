<script lang="ts">
/*eslint-disable no-undef*/
import { Loader } from "@googlemaps/js-api-loader";
import { Ref, onMounted, ref } from "vue";

export default {
  name: "Map",
  props: ["Coords", "Dragging", "SendCoords"],
  data() {
    return {
      coords: {
        lat: this.Coords.latitude,
        lng: this.Coords.longitude,
      },
    };
  },
  setup(props) {
    const loader = new Loader({
      apiKey: "AIzaSyAxuQ_SZyPpdHnxsQKvz6iU81Y8WPQFAys",
      version: "weekly",
      libraries: ["places"],
    });
    const mapDiv: Ref<null | HTMLElement> = ref(null);
    let map: google.maps.Map;
    let marker: google.maps.Marker;
    let coords = ref({
      lat: props.Coords.latitude,
      lng: props.Coords.longitude,
    });

    onMounted(async () => {
      loader
        .load()
        .then((google) => {
          map = new google.maps.Map(mapDiv.value as HTMLElement, {
            center: { lat: coords.value.lat, lng: coords.value.lng },
            zoom: 19,
            mapTypeId: "satellite",
            tilt: 0,
            draggable: true,
            streetViewControl: false,
          });
          marker = new google.maps.Marker({
            position: {
              lat: coords.value.lat,
              lng: coords.value.lng,
            },
            map: map,
          });
          map.addListener("drag", () => {
            const center = map.getCenter() as google.maps.LatLng;
            marker.setPosition(center);
            coords.value.lat = center.lat();
            coords.value.lng = center.lng();
            props.Dragging(true);
          });
          map.addListener("idle", () => {
            const center = map.getCenter() as google.maps.LatLng;
            marker.setPosition(center);
            coords.value.lat = center.lat();
            coords.value.lng = center.lng();
            props.SendCoords(center.lat(), center.lng(), 0);
          });
        })
        .catch(() => {});
    });
    return { mapDiv };
  },
  watch: {
    coords: function (newValue) {
      console.log(newValue);
    },
  },
};
</script>

<template>
  <div ref="mapDiv" :key="1" style="width: 100%; height: 100%"></div>
</template>
