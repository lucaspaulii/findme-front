<script setup lang="ts">
import { ref } from "vue";
import langPT from "./assets/langPT.json";
import langEN from "./assets/langEN.json";
import langES from "./assets/langES.json";
import MapHandler from "./components/MapHandler.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import MainLoader from "./components/MainLoader.vue";
import ClosedContainer from "./components/Closed.vue";
import { Ref } from "vue";
import { Label } from "./services/getLabel";
import putLocation from "./services/putLocation";

const configObj: Ref<Label> = ref({
  id: "0",
  providerId: "0",
  name: "FindMe",
  darkMode: true,
  color: "#00D256",
  logo: "/findme_logo.png",
  language: "pt",
});
const requestId: Ref<string> = ref("0");
const Loaded = ref(false);
const Closed = ref(false);
const countDown = ref(30);

routes: [{ path: "/:requestId/:labelId" }];

components: {
  MapHandler;
  Header;
  Main;
  MainLoader;
  ClosedContainer;
}

const accuracy = ref(0);
const dragging = ref(false);
const locationOn = ref(false);
const sendingLocation = ref(false);
const coords = ref({ lat: 0, lng: 0, accuracy: 0 });
const langObj = ref(
  (configObj.value.language === "pt" && langPT) ||
    (configObj.value.language === "en" && langEN) ||
    (configObj.value.language === "es" && langES)
);
const lang = ref(configObj.value.language);

let keyValue = 0;
function getAccuracy(value: number) {
  accuracy.value = value;
  keyValue++;
}

function setDragging(value: boolean) {
  dragging.value = value;
}

function setCoords(lat: number, lng: number, accuracy: number) {
  coords.value = { lat, lng, accuracy };
}

function turnOnLocation() {
  locationOn.value = true;
}

function changeLang(newLang: string) {
  if (newLang == "pt") {
    lang.value = newLang;
    langObj.value = langPT;
  }
  if (newLang == "es") {
    lang.value = newLang;
    langObj.value = langES;
  }
  if (newLang == "en") {
    lang.value = newLang;
    langObj.value = langEN;
  }
}

function changeLoad() {
  Loaded.value = true;
}

function handleRequestId(newReqId: string) {
  requestId.value = newReqId;
}

function handleClient(obj: Label) {
  configObj.value = obj;
}

function closeRequest() {
  Closed.value = true;
}

function startCountdown() {
  const timer = setInterval(async () => {
    if (dragging.value) {
      clearInterval(timer);
    }
    if (countDown.value == 0) {
      clearInterval(timer);
      //toDo sent location
      toggleSendingLocation();
      await putLocation(coords.value, requestId.value, closeRequest);
      toggleSendingLocation();
    } else {
      countDown.value--;
    }
  }, 1000);
}

function toggleSendingLocation() {
  sendingLocation.value = !sendingLocation.value;
}
</script>

<template>
  <div
    id="MAIN CONTAINER"
    class="h-screen w-screen flex flex-col font-montserrat"
    :class="{
      'bg-slate-950': configObj.darkMode,
      'bg-white': !configObj.darkMode,
    }"
    v-if="Loaded && !Closed"
  >
    <Header
      :Logo="configObj.logo"
      :Color="configObj.color"
      :Dark="configObj.darkMode"
      :ChangeLang="changeLang"
      :Lang="lang"
    ></Header>
    <Main
      :Lang="langObj"
      :Color="configObj.color"
      :Dark="configObj.darkMode"
      :key="keyValue"
      :Dragging="dragging"
      :Coords="coords"
      :Accuracy="accuracy"
      :Location="locationOn"
      :RequestId="requestId"
      :CloseRequest="closeRequest"
      :CountDown="countDown"
      :ToggleSendingLocation="toggleSendingLocation"
      :SendingLocation="sendingLocation"
    ></Main>
    <MapHandler
      @accuracy="getAccuracy"
      :Dragging="setDragging"
      :SetCoords="setCoords"
      :Coords="coords"
      :Location="turnOnLocation"
      :StartCountdown="startCountdown"
    ></MapHandler>
  </div>
  <div
    id="LOADER CONTAINER"
    class="h-screen w-screen bg-slate-950 flex flex-col font-montserrat"
    v-if="!Loaded"
  >
    <MainLoader
      :setLoading="changeLoad"
      :handleRequestId="handleRequestId"
      :handleClient="handleClient"
      :changeLang="changeLang"
    />
  </div>
  <div
    id="LOADER CONTAINER"
    class="h-screen w-screen bg-slate-950 flex flex-col font-montserrat"
    v-if="Closed"
  >
    <ClosedContainer :Lang="langObj" />
  </div>
</template>
