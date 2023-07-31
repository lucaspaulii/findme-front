<script lang="ts">
import LangHandler from "./LangHandler.vue";

export default {
  name: "MapHandler",
  components: { LangHandler },
  props: ["Logo" as string, "Color", "ChangeLang", "Lang", "Dark"],
  data() {
    return {
      img: this.Logo
    } 
  }
};
</script>

<template>
  <div
    id="HEADER"
    class="w-full flex justify-between items-center h-fit pl-10 pr-10 sm:mb-0 mb-4"
  >
    <LangHandler :Lang="Lang" :ChangeLang="ChangeLang" :Dark="$props.Dark" />
    <img :src="img" class="sm:w-32 sm:h-32 w-32 h-32 -mr-3 sm:mr-0 p-[-1rem]"/>
      
  </div>
</template>
