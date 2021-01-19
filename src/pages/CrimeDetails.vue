<script>
import ApiCrimeDelete from '../components/api/CrimeDelete.js'
import ApiCrimeDetails from '../components/api/CrimeDetails.js'
import AvatarGenerate from '../components/molecules/avatars/AvatarGenerate.vue'

import { date } from 'quasar'

export default {
  name: 'CrimeDetails',

  components: {
    ApiCrimeDelete,
    ApiCrimeDetails,
    AvatarGenerate
  },

  data () {
    return {
      crime: null,
      idCrime: null,
      criminal_crime_types: [
        {
          criminal: 'Ronaldinho (Wizard)',
          crime_type: 'ideological falsehood'
        }
      ]
    }
  },

  computed: {
    dateFormated () {
      return date.formatDate(this.crime.crime_date, 'YYYY/MM/DD HH:mm:ss')
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler (val) {
        this.idCrime = val.params.crimeId
      }
    }
  },

  methods: {
    async __onError (e) {
      if (e && e.message) {
        this.$q.notify({
          color: 'negative',
          message: e.message,
          position: 'top-right'
        })
      }
    },

    async __onDone (value) {
      this.$q.notify({
        color: 'positive',
        message: 'Crime successfully deleted.',
        position: 'top-right'
      })
    },

    async __onDoneCrimeDetails ({ data }) {
      this.crime = data.data
    }
  }
}
</script>

<template lang="pug">
api-crime-details(
  class="full-width q-pa-md text-accent"
  :variables="{ crime_id: idCrime }"
  @done="__onDoneCrimeDetails"
)
  div(class="row")
    div(class="text-h5 text-bold cinzel q-mb-ms")
      | Crime

  q-card(
    class="shadow-card bg-white q-mt-md"
    v-if="crime"
  )
    q-card-section

      //- Crime Type
      div(class="row q-mt-md")
        div(class="text-h5 text-bold q-mb-xs")
          | Crime Name
        div(class="text-weight-medium text-grey-9 col-12")
          | Principal crime

      //- Local
      div(class="row q-mt-sm q-pt-sm")
        div(class="text-h5 text-bold q-mb-xs")
          | {{ dateFormated }}

        div(class="text-weight-medium text-grey-9 col-12")
          | {{ crime.country }}

      //- Criminals
      div(class="row q-mt-sm q-pt-sm")
        div(class="col-12 text-h4 text-bold q-mb-sm")
          | Criminals

        div(
          class="row items-center q-gutter-md"
          v-show="crime.criminal_crime_types.length === 0"
        )
          div(class="col-auto")
            div(class="text-h6 text-bold q-mb-xs")
              | No criminal

            div(class=" text-weight-medium text-grey-9 col-12")
              | No criminal

          div(class="col-auto")
            q-avatar(
              color="grey-3"
              font-size="40px"
              icon="face"
              size="60px"
              text-color="text-accent"
            )

        div(
          class="row items-center q-gutter-md"
          v-for="(criminal, index) in crime.criminal_crime_types"
        )
          div(class="col-auto")
            div(
              class="text-h6 text-bold q-mb-xs"
              v-clipboard:copy="criminal.criminal"
            )
              | {{ criminal.criminal }}

            div(class=" text-weight-medium text-grey-9 col-12")
              | {{ criminal.crime_type }}

          div(class="col-auto")
            avatar-generate

      //- Victims
      div(class="row q-mt-sm q-pt-sm")
        div(class="col-12 text-h4 text-bold q-mb-sm")
          | Victims

        div(
          class="row items-center q-gutter-md"
          v-if="crime.victims_crime.length === 0"
        )
          div(class="col-auto")
            div(class="text-h6 text-bold q-mb-xs")
              | No victim

            div(class=" text-weight-medium text-grey-9 col-12")
              | No Victim

          div(class="col-auto")
            q-avatar(
              color="grey-3"
              font-size="40px"
              icon="face"
              size="60px"
              text-color="text-accent"
            )

        div(
          class="row items-center q-gutter-md"
          v-for="(victim, index) in crime.victims_crime"
        )
          div(class="col-auto")
            div(
              class="text-h6 text-bold q-mb-xs"
              v-clipboard:copy="victim.victim"
            )
              | {{ victim.victim }}

            div(class="text-weight-medium text-grey-9 col-12")
              | Victim {{ index + 1 }}

          div(class="col-auto")
            avatar-generate

      //- Weapons
      div(class="row q-mt-sm q-pt-sm")
        div(class="col-12 text-h4 text-bold q-mb-sm")
          | Weapons

        div(
          class="row items-center q-gutter-md"
          v-for="(weapon, index) in crime.weapons_crime"
        )
          div(class="col-auto")
            div(
              class="text-h6 text-bold q-mb-xs"
              v-clipboard:copy="weapon.weapon"
            )
              | {{ weapon.weapon }}

            div(class="text-weight-medium text-grey-9 col-12")
              | {{ weapon.weapon_type }}

      div(class="row q-mt-lg")
        api-crime-delete(
          class="full-width"
          v-slot="{ loading, submit }"
          :variables="{ crime_id: crime.id_crime } "
          @error="__onError"
          @done="__onDone"
        )
          q-btn(
            class="text-white bg-red full-width"
            @click="submit"
          )
            div(class="row q-gutter-sm items-center")
              q-icon(
                name="fa fa-trash"
                size="20px"
              )
              div(class="text-weight-bold")
                | Delete

</template>
