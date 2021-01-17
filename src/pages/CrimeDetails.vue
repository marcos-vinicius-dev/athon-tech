<script>
import ApiCrimeDelete from '../components/api/CrimeDelete.js'
import ApiCrimeDetails from '../components/api/CrimeDetails.js'

export default {
  name: 'CrimeDetails',

  components: {
    ApiCrimeDelete,
    ApiCrimeDetails
  },

  data () {
    return {
      crime: null,
      idCrime: null
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
  class="container full-width q-pa-md"
  :variables="{ crime_id: idCrime }"
  @done="__onDoneCrimeDetails"
)
  div(class="row q-mt-md")
    div(class="text-h6 text-bold cinzel q-mb-sm")
      | Crime

  q-card(
    class="shadow-card bg-white q-mt-md"
    v-if="crime"
  )
    q-card-section
      //- Criminals
      div(class="row q-mt-md q-pt-xs")
        div(class="text-h6 text-bold cinzel q-mb-sm")
          | Criminals

      q-item(class="no-padding")
        q-item-section(avatar)
          q-avatar(size="110px")
            img(src='https://cdn.quasar.dev/img/avatar2.jpg')

        q-item-section
          q-item-label(class="text-weight-medium text-grey-9 q-mt-sm q-mb-xs")
            | Sem vítimas

          q-item-label(class="text-grey-7")
            | Victim

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
