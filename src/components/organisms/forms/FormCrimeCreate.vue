<script>
import ApiCrimeCreate from '../../api/CrimeCreate.js'
import DialogFooterMobile from '../dialogs/DialogFooterMobile.vue'
import FieldCalendar from '../../molecules/fields/FieldCalendar.vue'
import SelectCrimesTypes from '../../molecules/selects/SelectCrimesTypes.vue'
import SelectCriminal from '../../molecules/selects/SelectCriminals.vue'
import SelectVictims from '../../molecules/selects/SelectVictims.vue'
import SelectWeapons from '../../molecules/selects/SelectWeapons.vue'

const initDataCriminal = {
  criminal_id: null,
  id_crime_type: null
}

const initDataVictim = {
  victim_id: null
}

export default {
  name: 'FormCrimeCreate',

  components: {
    ApiCrimeCreate,
    DialogFooterMobile,
    FieldCalendar,
    SelectCrimesTypes,
    SelectCriminal,
    SelectVictims,
    SelectWeapons
  },

  data () {
    return {
      paciente: '',
      formData: {
        country: '',
        crime_date: '',
        criminal_list: [Object.assign({}, initDataCriminal)],
        victim_list: [Object.assign({}, initDataVictim)],
        weapon_list: []
      },
      formDataSubmit: null
    }
  },

  methods: {
    async __addCriminalInput () {
      this.formData.criminal_list.push(Object.assign({}, initDataCriminal))
    },

    async __addVictimInput () {
      this.formData.victim_list.push(Object.assign({}, initDataVictim))
    },

    async __onDone () {
      this.$q.notify({
        color: 'positive',
        message: 'Crime successfully created',
        position: 'top-right'
      })

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
      let weaponList = null

      weaponList = this.formData.weapon_list.map((weapon) => {
        return {
          weapon_id: weapon.value
        }
      })

      const victimList = (this.formData.victim_list[0].victim_id === null) ? [] : this.formData.victim_list

      this.formDataSubmit = {
        ...this.formData,
        weapon_list: weaponList,
        victim_list: victimList
      }

      this.$nextTick(() => {
        this.$refs.apiCrimeForm.submit()
      })
    },

    async __removeCriminalInput (index) {
      this.formData.criminal_list.splice(index, 1)
    },

    async __removeVictimInput (index) {
      this.formData.victim_list.splice(index, 1)
    }
  }
}
</script>

<template lang="pug">
api-crime-create(
  ref="apiCrimeForm"
  v-slot="{ loading, submit }"
  :variables="formDataSubmit"
  @error="__onError"
  @done="__onDone"
)
  validation-observer(
    ref="observer"
    v-slot="{ handleSubmit }"
    @submit="submit"
  )
    q-form(
      ref="apiForm"
      @submit="handleSubmit(__onSubmit)"
    )
      div(class="row q-col-gutter-x-md q-mt-lg")

        //- Date input
        div(class="col-12 col-md-6")
          div(class="q-mb-sm text-weight-medium")
            | Date

          ValidationProvider(
            name="crime_date"
            rules="required"
            v-slot="{ errors, invalid, validated }"
            vid="crime_date"
          )
            field-calendar(v-model="formData.crime_date")

        //- Country Input
        div(class="col-12 col-md-6")
          div(class="q-mb-sm text-weight-medium")
            | Country

          ValidationProvider(
            name="Country"
            rules="required"
            v-slot="{ errors, invalid, validated }"
            vid="country"
          )
            q-input(
              dense
              outlined
              bottom-slots
              no-error-icon
              bg-color="white"
              color="secondary"
              placeholder="Country"
              v-model="formData.country"
              :error-message="errors[0]"
              :error="invalid && validated"
            )

      //- Criminals Inputs
      div(class="row q-col-gutter-x-md q-mt-xs")
        div(
          class="col-12"
          v-for="(criminal, index) in formData.criminal_list"
        )
          div(class="row q-col-gutter-x-md")
            div(class="col-12 col-md-6")
              div(class="q-mb-sm text-weight-medium")
                | Criminal {{ index + 1 }}

              select-criminal(
                v-model="criminal.criminal_id"
                :id="index"
                @input="(v) => v ? criminal.criminal_id = v.value : null"
              )

            div(class="col-12 col-md-6")
              div(class="q-mb-sm text-weight-medium")
                | Type of crime committed

              div(class="row no-wrap items-start q-col-gutter-xs")
                select-crimes-types(
                  class="full-width"
                  v-model="criminal.id_crime_type"
                  @input="(v) => v ? criminal.id_crime_type = v.value : null"
                )
                div(
                  class="col-auto"
                  v-if="index > 0"
                )
                  q-btn(
                    class="bg-red text-white"
                    style="height: 40px"
                    @click="__removeCriminalInput"
                  )
                    q-icon(
                      size="20px"
                      name="fa fa-times"
                    )

        div(class="col-12")
          q-btn(
            class="bg-secondary text-white"
            @click="__addCriminalInput"
          )
            div(class="row q-gutter-sm items-center")
              div
                q-icon(
                  size="20px"
                  name="fa fa-plus-square-o"
                )
              div(class="text-weight-bold")
                | Add Criminal

      //- Victims Inputs
      div(class="row q-col-gutter-x-md q-mt-lg")
        div(
          class="col-12 col-md-6"
          v-for="(victim, index) in formData.victim_list"
        )
          div(class="q-mb-sm text-weight-medium")
            | Victim {{ index + 1 }}

          div(class="row no-wrap items-start q-col-gutter-xs")
            select-victims(
              class="full-width"
              v-model="victim.victim_id"
              @input="(v) => v ? victim.victim_id = v.value : null"
            )
            div(
              class="col-auto"
              v-if="index > 0"
            )
              q-btn(
                class="bg-red text-white"
                style="height: 40px"
                @click="__removeVictimInput"
              )
                q-icon(
                  size="20px"
                  name="fa fa-times"
                )

        div(class="col-12")
          q-btn(
            class="bg-secondary text-white"
            @click="__addVictimInput"
          )
            div(class="row q-gutter-sm items-center")
              div
                q-icon(
                  size="20px"
                  name="fa fa-plus-square-o"
                )
              div(class="text-weight-bold")
                | Add victim

      //- Weapons Select
      div(class="row q-col-gutter-x-md q-mt-lg")
        div(class="col-12 col-md-6")
          div(class="q-mb-sm text-weight-medium")
            | Weapons

          select-weapons(
            class="full-width"
            v-model="formData.weapon_list"
          )

      //- Button delete desktop
      div(class="row mobile-hide")
        div(class="col-12 col-md-6 q-mt-lg")
          q-btn(
            class="full-width text-weight-medium"
            color="positive"
            style="height: 50px"
            type="submit"
          )
            div(class="row q-gutter-sm items-center")
              div
                q-icon(
                  size="20px"
                  name="fa fa-plus-square-o"
                )
              div(class="text-weight-bold")
                | Save new crime

      //- Button delete mobile
      dialog-footer-mobile
        q-btn(
          class="full-width text-weight-medium"
          color="positive"
          @click="$refs.apiForm.submit()"
        )
          div(class="row q-gutter-sm items-center")
            div
              q-icon(
                size="20px"
                name="fa fa-plus-square-o"
              )
            div(class="text-weight-bold")
              | Save new crime

</template>
