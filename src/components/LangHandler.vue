<script lang="ts">
import CountryFlag from "vue-country-flag-next";
import LangModal from "./LangModal.vue";
import { ref } from "vue";

const modal = ref(false);

export default {
  name: "LangHandler",
  props: ["ChangeLang", "Lang", "Dark"],
  components: { CountryFlag, LangModal },
  data() {
    return modal;
  },
  methods: {
    toggleModal() {
      const aux = modal.value;
      modal.value = !aux;
    },
    showModal() {
      return modal.value;
    },
  },
};
</script>

<template>
  <LangModal
    :Modal="$data.value"
    :ChangeLang="ChangeLang"
    :Lang="Lang"
    :Dark="Dark"
    :ToggleModal="toggleModal"
  />
  <div
    class="flex gap-2 h-full items-center justify-center mt-2 hover:cursor-pointer"
    @click="toggleModal()"
  >
    <h1
      class="font-semibold text-xl"
      :class="{ 'text-white': Dark, 'text-black': !Dark }"
    >
      {{ Lang.toUpperCase() }}
    </h1>
    <div>
      <CountryFlag country="br" size="medium" v-if="Lang == 'pt'" />
      <CountryFlag country="us" size="medium" v-if="Lang == 'en'" />
      <CountryFlag country="es" size="medium" v-if="Lang == 'es'" />
    </div>
    <div
      class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-white rounded scale-75 rotate-90 ml-2"
      :class="{ 'border-white': Dark, 'border-gray-950': !Dark }"
      v-if="!$data.value"
    ></div>
    <div
      class="h-0 w-0 border-x-8 border-x-transparent border-b-[16px] border-white rounded scale-75 rotate-180 ml-2"
      :class="{ 'border-white': Dark, 'border-gray-950': !Dark }"
      v-if="$data.value"
    ></div>
  </div>
</template>
