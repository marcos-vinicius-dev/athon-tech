<script>

export default {
  name: 'SelectOrderBy',

  props: {
    value: {
      type: String,
      default: 'Date'
    }
  },

  data () {
    return {
      orderList: [
        'Country',
        'Criminal',
        'Date',
        'Victim',
        'Weapon'
      ],
      valueLocal: 'Date'
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

  created () {
    this.$emit('input', this.valueLocal)
  }
}
</script>

<template lang="pug">
q-select(
  dense
  flat
  outlined
  no-caps
  bg-color="white"
  color="secondary"
  v-model="valueLocal"
  :display-value="`Order by: ${ valueLocal }`"
  :options="orderList"
  @input="$emit('input', valueLocal)"
)
  template(v-slot:prepend)
    q-icon(
      color="secondary"
      size="20px"
      name="fa fa-sort-amount-desc"
    )

</div>

</template>
