<template>
  <div class="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-bottom error-bg" >
    <div class="container">
      <div class="row">
        <div class="col-sm-10 offset-sm-2 text-gray-50 text-center -mt-52">
          <div class="relative ">
            <h1 class="text-gray-300 font-semibold -mr-10 -mt-3">Welcome to our Review Site</h1>
            <h1 class="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold ">Hey There!</h1>
            <!-- <span class="absolute  top-0-ml-12  text-gray-300 font-semibold">Hey There!</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CompositionComponent'
})
</script>
<style>
.error-bg {
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f0b608' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
}
.tracking-tighter-less {
letter-spacing: -0.50rem;
}
.text-shadow {
text-shadow: -8px 0 0 rgb(102 123 242);
}
</style>
