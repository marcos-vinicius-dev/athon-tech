<script>
import ApiCrimeList from '../../api/CrimeList.js'
import FieldCalendar from '../../molecules/fields/FieldCalendar.vue'
import SelectCrimesTypes from '../../molecules/selects/SelectCrimesTypes.vue'

const initFormData = {
  crime_type: '',
  final_datetime: '',
  initial_datetime: '',
  order_by: '',
  text_filter: ''
}

export default {
  name: 'FormSearch',

  components: {
    ApiCrimeList,
    FieldCalendar,
    SelectCrimesTypes
  },

  props: {
    orderBy: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      crime_type: 'All Crimes',
      formData: Object.assign({}, initFormData),
      resultCrimes: [],
      search: ''
    }
  },

  watch: {
    orderBy: {
      immediate: true,
      handler (val) {
        this.formData.order_by = val
      }
    }
  },

  methods: {
    __filteredList () {
      const result = this.resultCrimes.filter(post => {
        // Country
        return post.country.toLowerCase().includes(this.search.toLowerCase()) ||
        // Crime date
        post.crime_date.toLowerCase().includes(this.search.toLowerCase()) ||
        // Victims
        post.victims_crime.filter(victim => victim.victim.toLowerCase().includes(this.search.toLowerCase())).length > 0 ||
        // Weapons
        post.weapons_crime.filter(weapon => {
          return weapon.weapon.toLowerCase().includes(this.search.toLowerCase()) ||
          weapon.weapon_type.toLowerCase().includes(this.search.toLowerCase())
        }).length > 0 ||
        // Criminal Types
        post.criminal_crime_types.filter(criminal => {
          return criminal.criminal.toLowerCase().includes(this.search.toLowerCase()) ||
          criminal.crime_type.toLowerCase().includes(this.search.toLowerCase())
        }).length > 0
      })

      this.$emit('done', result)
    },

    async __onDone ({ data }) {
      const result = data && data.data
      this.resultCrimes = result.crimes
      this.search
        ? this.__filteredList()
        : this.$emit('done', result.crimes)

      return Promise.resolve()
    },

    async __onError (e) {
      if (e && e.message) {
        this.$q.notify({
          color: 'negative',
          message: e.message,
          position: 'top-right'
        })
      }
    },

    __onSubmit () {
      this.$refs.apiCrimeForm.submit()
    }

  }
}
</script>

<template lang="pug">
api-crime-list(
  ref="apiCrimeForm"
  v-slot="{ loading, submit }"
  :variables="formData"
  @error="__onError"
  @done="__onDone"
)
  ValidationObserver(
    ref="observer"
    v-slot="{ handleSubmit }"
  )
    q-form(
      class="row justify-center q-col-gutter-x-md text-accent text-weight-bold"
      @submit="handleSubmit(__onSubmit)"
    )

      //- Filter Text
      div(class="col-12 col-md-3")
        div(class="q-mb-sm")
          | Text filter

        q-input(
          dense
          outlined
          bottom-slots
          color="secondary"
          placeholder="Search for..."
          v-model="search"
          @input="__filteredList"
        )

      //- Select Type of Crime
      div(class="col-12 col-md-3")
        div(class="q-mb-sm")
          q-icon(
            class="q-mr-sm"
            name="fa fa-folder-open"
          )
          | Type of crime

        select-crimes-types(
          all-crimes
          v-model="formData.crime_type"
          @input="(v) => v ? formData.crime_type = v.value : null"
        )

      //- Input date - from
      div(class="col-12 col-md-2")
        div(class="q-mb-sm")
          q-icon(
            class="q-mr-sm"
            name="fa fa-calendar"
          )
          | Date - From

        field-calendar(v-model="formData.initial_datetime")

      //- Input date - to
      div(class="col-12 col-md-2")
        div(class="q-mb-sm")
          q-icon(
            class="q-mr-sm"
            name="fa fa-calendar"
          )
          | Date - To

        field-calendar(v-model="formData.final_datetime")

      //- Button Search
      div(class="col-12 col-md-2")
        div(class="q-mb-md q-pb-sm mobile-hide")
        q-btn(
          class="bg-secondary text-white full-width full-height"
          style="max-height: 40px"
          type="submit"
        )
          div(class="row q-gutter-sm items-center")
            q-icon(
              name="fa fa-search"
              size="20px"
            )
            div(class="text-weight-bold")
              | Search

</template>
