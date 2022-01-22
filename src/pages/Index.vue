<template>
  <q-page class="row items-center justify-evenly" style="background-color:SlateBlue;">
    <HomePage/>
  </q-page>
</template>

<script lang="ts">
import HomePage from 'src/pages/HomePage.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  components: { HomePage }
})
</script>
