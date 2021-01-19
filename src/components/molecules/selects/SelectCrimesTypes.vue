<script>
import ApiCrimesTypes from '../../api/CrimesTypes.js'

export default {
  name: 'SelectCrimesTypes',

  components: {
    ApiCrimesTypes
  },

  props: {
    allCrimes: {
      type: Boolean
    },
    id: {
      type: Number,
      default: null
    },
    value: {
      type: [Number, String],
      default: null
    }
  },

  data () {
    return {
      apiOptionsCrimesTypes: null,
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

    async __onDoneCrimesTypes ({ data }) {
      this.apiOptionsCrimesTypes = data.data.crime_types.map((crime) => {
        return {
          label: crime.tx_type,
          value: crime.id_crime_type
        }
      })

      if (this.allCrimes) {
        this.apiOptionsCrimesTypes.push(
          {
            label: 'All Crimes',
            value: null
          }
        )
      } else {
        this.valueLocal = 'Select an option...'
      }
    }

  }
}
</script>

<template lang="pug">
api-CrimesTypes(
  v-slot="{ loading }"
  @done="__onDoneCrimesTypes"
)
  validation-provider(
    class="col-12"
    name="CrimesTypes"
    v-slot="{ errors, invalid, validated }"
    :vid="`crimes-types-${id}`"
  )
    q-select(
      dense
      outlined
      bottom-slots
      map-options
      no-error-icon
      bg-color="white"
      color="secondary"
      v-model="valueLocal"
      :error-message="errors[0]"
      :error="invalid && validated"
      :loading="loading"
      :options="apiOptionsCrimesTypes"
      @input="$emit('input', valueLocal)"
    )

</div>

</template>
