<template>
  <q-item
    clickable
    tag="a"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>
      <ul class="unstyled list-hover-slide">
        <li><a>{{title}}</a></li>
        <li><a>{{caption}}</a></li>
      </ul>
    <!-- <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section> -->
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
// COLORS
$orange: #DF4500;
$gray: #35302D;
$gray-shine: #3C3735;
$white-off: #dfdbd938;

// REUSABLE STYLES
.unstyled{ list-style: none; padding: 0; margin: 0;
  a{ text-decoration: none; }
}

.list-hover-slide{

  li{
    position: relative;
    overflow: hidden;
  }

  a{
    display: block;
    position: relative;
    z-index: 1;
    transition: .35s ease color;

    &:before{
      content: '';
      display: block;
      z-index: -1;
      position: absolute;
      left: -100%; top: 0;
      width: 100%; height: 100%;
      border-right: solid 5px $orange;
      background: $white-off;
      transition: .35s ease left;
    }

    &.is-current,
    &:hover{

      &:before{
        left: 0;
      }
    }
  }
}
</style>
