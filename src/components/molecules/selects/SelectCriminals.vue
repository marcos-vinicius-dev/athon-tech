<script>
import ApiCriminals from '../../api/Criminals.js'

export default {
  name: 'SelectCriminal',

  components: {
    ApiCriminals
  },

  props: {
    id: {
      type: Number,
      default: null
    },
    value: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      apiOptionsCriminals: null,
      optionsCriminals: [],
      valueLocal: null
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

    __filterCriminals (val, update) {
      if (val === '') {
        update(() => {
          this.optionsCriminals = this.apiOptionsCriminals
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.optionsCriminals = this.apiOptionsCriminals.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    async __onDoneCriminals ({ data }) {
      this.apiOptionsCriminals = data.data.map((criminal) => {
        return {
          value: criminal.id_criminal,
          label: criminal.tx_name
        }
      })
    }

  }
}
</script>

<template lang="pug">
api-criminals(
  v-slot="{ loading }"
  @done="__onDoneCriminals"
)
  ValidationProvider(
    class="col-12"
    name="Criminal"
    rules="required"
    v-slot="{ errors, invalid, validated }"
    :vid="`criminals-${id}`"
  )
    q-select(
      dense
      outlined
      bottom-slots
      map-options
      no-error-icon
      use-input
      bg-color="white"
      color="secondary"
      input-debounce="0"
      v-model="valueLocal"
      :error-message="errors[0]"
      :error="invalid && validated"
      :loading="loading"
      :options="optionsCriminals"
      :placeholder="valueLocal ? '' : 'Type the name of the criminal...'"
      @filter="__filterCriminals"
      @input="$emit('input', valueLocal)"
    )

</div>

</template>
