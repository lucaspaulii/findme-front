<script lang="ts">
import CountryFlag from "vue-country-flag-next";

export default {
  name: "LangModal",
  props: ["Modal", "Lang", "ChangeLang", "ToggleModal", "Dark"],
  components: { CountryFlag },
  methods: {
    handleClick(value: string) {
      this.ChangeLang(value);
      this.ToggleModal();
    },
  },
};
</script>

<template>
  <div
    class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
    v-if="Modal"
    @click="ToggleModal"
  ></div>
  <div
    class="fixed w-[100px] h-1/5 top-[5%] left-[5%] flex items-center justify-center z-20 gap-2"
    v-if="Modal"
  >
    <div class="flex flex-col h-fit w-full bg-white bg-opacity-90" :class="{ 'bg-white': Dark, 'bg-black': !Dark }">
      <div
        class="flex justify-around items-center w-full h-fit p-1 border-b-2 border-black hover:cursor-pointer"
        :class="{ 'border-black': Dark, 'border-white': !Dark }"
        @click="handleClick('pt')"
      >
        <h1 class="font-bold  text-xl" :class="{'text-gray-700': Dark, 'text-gray-600': !Dark }">PT</h1>
        <div><CountryFlag country="br" size="medium" /></div>
      </div>
      <div
        class="flex justify-around w-full h-fit p-1 border-b-2 hover:cursor-pointer"
        :class="{ 'border-black': Dark, 'border-white': !Dark }"
        @click="handleClick('en')"
      >
        <h1 class="font-bold text-xl mt-1" :class="{'text-gray-700': Dark, 'text-gray-600': !Dark }">EN</h1>
        <div><CountryFlag country="us" size="medium" /></div>
      </div>
      <div
        class="flex justify-around w-full h-fit p-1 hover:cursor-pointer"
        @click="handleClick('es')"
      >
        <h1 class="font-bold text-xl mt-1" :class="{'text-gray-700': Dark, 'text-gray-600': !Dark }">ES</h1>
        <div><CountryFlag country="es" size="medium" /></div>
      </div>
    </div>
  </div>
</template>
