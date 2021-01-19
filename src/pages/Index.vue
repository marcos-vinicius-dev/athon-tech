<script>
import CrimeCard from '../components/organisms/card/CrimeCard.vue'
import DialogFooterMobile from '../components/organisms/dialogs/DialogFooterMobile.vue'
import FormSearch from '../components/organisms/forms/FormSearch.vue'
import SelectOrderBy from '../components/molecules/selects/SelectOrderBy.vue'

export default {
  name: 'PageIndex',

  components: {
    CrimeCard,
    DialogFooterMobile,
    FormSearch,
    SelectOrderBy
  },

  data () {
    return {
      crimeList: [],
      orderBy: null
    }
  },

  methods: {
    async __onDoneCrimeList (crimes) {
      this.crimeList = crimes
    },

    submitSearchForm () {
      if (this.crimeList.length > 0) {
        this.$nextTick(() => {
          this.$refs.searchForm.__onSubmit()
        })
      }
    }

  }
}
</script>

<template lang="pug">
div(class="full-width q-pa-md text-accent")
  div(class="row justify-between items-center q-mt-lg q-pt-md")
    h1(
      class="text-accent"
      :class="$q.screen.lt.md ? 'text-h5 text-bold' : ''"
    )
      | Crime list

    //- Button Add crime
    div(class="mobile-hide")
      q-btn(
        color="positive"
        class="full-height text-white"
        to="/crimeCreate"
      )
        div(class="row q-gutter-sm items-center")
          div
            q-icon(
              size="20px"
              name="fa fa-plus-square-o"
            )
          div(class="text-weight-bold")
            | ADD NEW CRIME

  //- Search
  div(class="row justify-center q-mt-lg")
    q-card(class="bg-white full-width shadow-card")
      q-card-section
        form-search(
          ref="searchForm"
          :orderBy="orderBy"
          @done="__onDoneCrimeList"
        )

  div(class="row justify-between items-center q-col-gutter-sm q-mt-xl")
    div(
      class="col-6 text-h6"
      v-text="`Showing ${crimeList.length} Crimes`"
    )
     | Showing 0 Crimes

    //- Order Crimes
    div(class="col-12 col-md-2 text-h6")
      select-order-by(
        v-model="orderBy"
        @input="submitSearchForm"
      )

  //- List Crimes
  div(
    class="row q-col-gutter-md q-pt-md q-mb-xl"
    v-if="crimeList.length"
  )
    q-intersection(
      class="col-12 col-md-6 col-lg-3 card"
      transition="slide-up"
      v-for="(crime, index) in crimeList"
      :key="crime.id_crime"
    )

      //-Card crime
      crime-card(
        :crime="crime"
        @remove="crimeList.splice(index, 1)"
      )

  //- Footer button
  dialog-footer-mobile
    q-btn(
      class="full-width text-weight-medium"
      color="positive"
      to="/crimeCreate"
    )
      div(class="row q-gutter-sm items-center")
        div
          q-icon(
            size="20px"
            name="fa fa-plus-square-o"
          )
        div(class="text-weight-bold")
          | ADD NEW CRIME

</template>
<style lang="scss" scoped>
.card {
  min-height: 166px
}

</style>
