<script lang="ts">
export default {
  name: "ClosedContainer",
  props: ["Lang"],
};
</script>

<template>
  <div
    id="CLOSED CONTAINER"
    class="w-full h-full flex flex-col gap-3 justify-center items-center"
  >
    <h1 class="font-extrabold sm:text-2xl text-base sm:p-0 p-2 text-center doc-color-txt text-white">
      {{ $props.Lang.closed[1] }}
    </h1>
  </div>
</template>

<style scoped></style>
