<script>
import ApiVictims from '../../api/Victims.js'

export default {
  name: 'SelectVictims',

  components: {
    ApiVictims
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
      apiOptionsVictims: null,
      optionsVictims: [],
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

    __filterVictims (val, update) {
      if (val === '') {
        update(() => {
          this.optionsVictims = this.apiOptionsVictims
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.optionsVictims = this.apiOptionsVictims.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    async __onDoneVictims ({ data }) {
      this.apiOptionsVictims = data.data.map((victim) => {
        return {
          value: victim.id_victim,
          label: victim.tx_name
        }
      })
    }

  }
}
</script>

<template lang="pug">
api-Victims(
  v-slot="{ loading }"
  @done="__onDoneVictims"
)
  ValidationProvider(
    class="col-12"
    name="Victim"
    v-slot="{ errors, invalid, validated }"
    :vid="`victims-${id}`"
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
      :options="optionsVictims"
      :placeholder="valueLocal ? '' : 'Type the name of the victim...'"
      @filter="__filterVictims"
      @input="$emit('input', valueLocal)"
    )

</div>

</template>
