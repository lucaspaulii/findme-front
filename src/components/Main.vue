<script lang="ts">
import putLocation from "../services/putLocation";
import { ref } from "vue";

export default {
  data() {
    return {
      sendingLocation: ref(false),
    };
  },
  name: "MapHandler",
  components: { Map },
  props: [
    "Lang",
    "Coords",
    "Color",
    "Dark",
    "Dragging",
    "Accuracy",
    "Location",
    "RequestId",
    "CloseRequest",
    "CountDown",
    "SendingLocation",
    "ToggleSendingLocation"
  ],
  methods: {
    async handleSend() {
      this.ToggleSendingLocation()
      this.Coords.accuracy = this.Accuracy;
      try {
        await putLocation(this.Coords, this.RequestId, this.CloseRequest);
        this.ToggleSendingLocation()
      } catch (error) {
        this.ToggleSendingLocation()
      }
    },
  },
};
</script>

<template>
  <div
    class="w-full flex justify-center items-center"
    :class="{ 'text-white': Dark, 'text-black': !Dark }"
    :key="$props.key"
    v-if="!Dragging && Location"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-center font-bold sm:text-3xl text-2xl">
        {{ $props.Lang.found[1] }}
      </h1>
      <h2
        class="text-center font-semibold sm:text-xl text-lg text-gray-400 pb-4 border-b-4 w-[130%] doc-border"
        :class="{ 'text-gray-400': Dark, 'text-gray-500': !Dark }"
      >
        {{ $props.Lang.found[2] }} {{ $props.Accuracy.toFixed(1) }}
        {{ $props.Lang.found.meters }}
      </h2>
      <p
        class="text-center pt-4 pb-5 font-semibold sm:text-base text-sm sm:pl-0 sm:pr-0 pl-2 pr-2"
      >
        {{ $props.Lang.found[3] }}<br />
        {{ $props.Lang.found[4] }} <br />
        
      </p>
      <button
        class="text-center p-3 w-28 h-12 rounded doc-color-bg font-extrabold flex items-center justify-center text-white"
        @click="handleSend"
      >
        <h1 v-if="!SendingLocation">{{ $props.Lang.found[6] }}</h1>
        <h1 v-if="SendingLocation">
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-gray-900"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </h1>
      </button>
      <p
        class="text-center pb-3 text-sm pt-1 text-gray-400"
        :class="{ 'text-gray-400': Dark, 'text-gray-500': !Dark }"
      >
        {{ $props.Lang.found[7] + CountDown + $props.Lang.found.seconds }}
      </p>
    </div>
  </div>
  <div
    class="w-full flex justify-center items-center h-fit"
    :class="{ 'text-white': Dark, 'text-black': !Dark }"
    :key="$props.Coords.value"
    v-if="Dragging && Location"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-center font-bold text-2xl sm:text-3xl -mt-4 sm:mt-0">{{ $props.Lang.drag[1] }}</h1>
      <h2 class="text-center font-semibold sm:text-xl text-base sm:mt-0 mt-2 text-gray-400 pb-4">
        {{ $props.Lang.drag[2] }}
      </h2>
      <button
        class="text-center p-3 mt-4 mb-8 w-28 h-12 rounded doc-color-bg font-extrabold flex items-center justify-center text-white"
        @click="handleSend"
      >
        <h1 v-if="!SendingLocation">{{ $props.Lang.drag[3] }}</h1>
        <h1 v-if="SendingLocation">
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-2 text-white animate-spin dark:text-gray-600 fill-gray-900"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </h1>
      </button>
    </div>
  </div>
  <div
    class="w-full text-white flex justify-center items-center h-fit"
    :key="$props.Coords.value"
    v-if="!Location"
  >
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-center font-bold text-3xl">
        {{ $props.Lang.location[1] }}
      </h1>
      <h2 class="text-center font-semibold text-xl text-gray-400 pb-4 mb-8">
        {{ $props.Lang.location[2] }}
      </h2>
    </div>
  </div>
</template>

<style scoped>
.doc-color-bg {
  background-color: v-bind(Color);
}

.doc-border {
  border-color: v-bind(Color);
}
</style>
