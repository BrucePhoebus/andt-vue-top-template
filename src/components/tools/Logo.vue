<template>
  <div class="logo">
    <router-link :to="{name:'index'}">
      <LogoSvg alt="logo" style="display: inline-block;" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: process.env.VUE_APP_TITLE,
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
}
</script>
