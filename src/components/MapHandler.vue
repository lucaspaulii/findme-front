<script lang="ts">
/*eslint-disable no-undef*/
import { onMounted, ref } from "vue";
import Map from "./Map.vue";

export default {
  name: "MapHandler",
  components: { Map },
  props: ["Dragging", "SetCoords", "Coords", "Location", "StartCountdown"],
  setup(props) {
    const coords = ref({
      latitude: props.Coords.lat,
      longitude: props.Coords.lng,
      accuracy: props.Coords.accuracy,
    });
    const isSupported = "navigator" in window && "geolocation" in navigator;

    onMounted(async () => {
      if (isSupported)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            props.Location();
            coords.value = position.coords;
            props.StartCountdown();
          },
          () => console.log("failed"),
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        );
    });
    return { coords };
  },
  data() {
    return {
      number: 0,
      latitude: 0,
      longitude: 0,
    };
  },
  methods: {
    sendAccuracy(accuracy: number) {
      this.$emit("accuracy", accuracy);
    },
    rerenderComponent(newLat: number, newLng: number) {
      this.number++;
      this.latitude = newLat;
      this.longitude = newLng;
    },
    recalculatePosition() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords = position.coords;
      });
    },
    sendCoords(lat: number, lng: number, accuracy: number) {
      this.SetCoords(lat, lng, accuracy);
    },
  },
  watch: {
    coords: function (newValue) {
      this.rerenderComponent(newValue.latitude, newValue.longitude);
      this.sendAccuracy(newValue.accuracy);
      this.sendCoords(newValue.latitude, newValue.longitude, newValue.accuracy);
    },
  },
};
</script>

<template>
  <Map
    :Coords="{ latitude: latitude, longitude: longitude }"
    :Dragging="Dragging"
    :key="number"
    :SendCoords="sendCoords"
  ></Map>
</template>
