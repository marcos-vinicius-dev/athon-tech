<script>
import FormCrimeCreate from '../components/organisms/forms/FormCrimeCreate.vue'

export default {
  name: 'PageCrimeCreate',

  components: {
    FormCrimeCreate
  }
}
</script>

<template lang="pug">
div(class="q-pa-md full-width")
  h1(class="text-accent desktop-only q-mb-lg")
    | New crime

  form-crime-create

</template>
