<script>
import ApiCrimeDelete from '../../api/CrimeDelete.js'
import DialogCrimeDetails from '../dialogs/DialogCrimeDetails.vue'

import { date } from 'quasar'

export default {
  name: 'CrimeCard',

  components: {
    ApiCrimeDelete,
    DialogCrimeDetails
  },

  props: {
    crime: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      dialog: false
    }
  },

  computed: {
    dateFormated () {
      return date.formatDate(this.crime.crime_date, 'YYYY/MM/DD HH:mm:ss')
    }
  },

  methods: {
    __goToPage () {
      this.$q.screen.lt.sm ? this.$router.push(`/crimeDetails/${this.crime.id_crime}`) : this.dialog = !this.dialog
    }
  }
}
</script>

<template lang="pug">
div
  //- Dialog Details
  dialog-crime-details(
    v-model="dialog"
    :crime="crime"
    @remove="$emit('remove')"
  )

  q-card(
    class="shadow-card full-width cursor-pointer"
    @click="__goToPage"
  )
    q-card-section
      div(class="row")
        div(class="text-bold text-grey-9 col-12 q-mb-xs")
          | Principal Crime

        div(class="text-grey-7 q-mb-sm")
          | Crime type

        div(class="text-bold text-grey-9 col-12 q-mt-sm q-mb-xs")
          | {{ dateFormated }}

        div(class="text-grey-7")
          | {{ crime.country }}

      div(class="row justify-end")
        q-btn(
          dense
          flat
          class="text-secondary"
          icon="fa fa-search-plus"
          size="11.67px"
        )

</template>
