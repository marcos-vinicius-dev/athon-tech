<script>
import { mdiMenu } from '@quasar/extras/mdi-v5'

export default {
  name: 'MainLayout',

  data () {
    return {
      mdiMenu: ''
    }
  },

  created () {
    this.mdiMenu = mdiMenu
  }
}
</script>

<template lang="pug">
q-layout(view="hHh lpR fff")
  q-header(
    elevated
    class="bg-primary"
  )
    q-toolbar(
      bordered
      class="cinzel"
      style="min-height:67px"
    )
      q-img(
        src="../assets/logo.svg"
        width="114px"
        class="cursor-pointer"
        @click="$router.push('/')"
      )

  q-page-container()
    q-page(
      class="row justify-center montserrat"
      style="background-color: #F1F9FF"
    )
      router-view

  q-footer(
    class="bg-primary"
  )

</template>
