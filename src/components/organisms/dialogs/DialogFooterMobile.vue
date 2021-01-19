<script>

export default {
  name: 'DialogFooterMobile',

  data () {
    return {
      dialog: null
    }
  },

  watch: {
    '$q.screen.lt.sm': {
      immediate: true,
      handler (val) {
        val ? this.dialog = true : this.dialog = false
      }
    }
  }
}
</script>

<template lang="pug">
q-dialog(
  seamless
  position="bottom"
  v-model="dialog"
  @input="(value) => $emit('input', value)"
)
  q-card(class="bg-transparent no-shadow")
    q-card-section(class="q-pa-none q-pt-lg")
      div(class="row shadow-up-6 q-pa-md bg-primary justify-between")
        slot

</template>
