<script>
export default {
  name: 'FieldCalendar',

  data () {
    return {
      valueLocal: ''
    }
  },

  watch: {
    value: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.valueLocal = val
        }
      }
    }
  },

  methods: {
    __openTime (val) {
      this.$emit('input', val)
      this.$refs.refTime.show()
    },

    __closeTime (val) {
      this.$emit('input', val)
      this.$refs.refDate.hide()
      this.$refs.refTime.hide()
    }
  }
}
</script>

<template lang="pug">
q-input(
  dense
  outlined
  bottom-slots
  color="secondary"
  bg-color="white"
  placeholder="YYYY-MM-DD HH:MM:SS"
  v-model="valueLocal"
  @click="$refs.refDate.show()"
  @input="(val) => $emit('input', val)"
)
  template(v-slot:prepend)
    q-popup-proxy(
      transition-show="scale"
      transition-hide="scale"
      ref="refDate"
    )
      q-date(
        color="secondary"
        mask="YYYY-MM-DD HH:mm:ss"
        v-model="valueLocal"
        @input="__openTime"
      )
        div(class="row items-center justify-end")
          q-btn(
            flat
            v-close-popup
            color="secondary"
            label="Fechar"
          )

    q-popup-proxy(
      ref="refTime"
      transition-hide="scale"
      transition-show="scale"
    )
      q-time(
        format24h
        with-seconds
        color="secondary"
        mask="YYYY-MM-DD HH:mm:ss"
        v-model="valueLocal"
        @input="__closeTime"
      )
        div(class="row items-center justify-end")
          q-btn(
            flat
            v-close-popup
            label="Fechar"
            color="secondary"
          )

</template>
