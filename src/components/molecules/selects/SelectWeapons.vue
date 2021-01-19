<script>
import ApiWeapons from '../../api/Weapons.js'

export default {
  name: 'SelectWeapons',

  components: {
    ApiWeapons
  },

  props: {
    id: {
      type: Number,
      default: null
    },
    value: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      apiOptionsWeapons: null,
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
    async __onDoneWeapons ({ data }) {
      this.apiOptionsWeapons = data.data.map((weapon) => {
        return {
          value: weapon.id_weapon,
          label: weapon.tx_weapon_type
        }
      })
    }

  }
}
</script>

<template lang="pug">
api-Weapons(
  v-slot="{ loading }"
  @done="__onDoneWeapons"
)
  ValidationProvider(
    class="col-12"
    name="Weapon"
    v-slot="{ errors, invalid, validated }"
    :vid="`weapons-${id}`"
  )
    q-select(
      dense
      multiple
      outlined
      bottom-slots
      map-options
      no-error-icon
      stack-label
      use-chips
      bg-color="white"
      color="secondary"
      v-model="valueLocal"
      :error-message="errors[0]"
      :error="invalid && validated"
      :loading="loading"
      :options="apiOptionsWeapons"
      @input="$emit('input', valueLocal)"
    )

</div>

</template>
