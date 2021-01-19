<script>
import axios from 'axios'

export default {
  name: 'AvatarGenerate',

  data () {
    return {
      src: null
    }
  },

  mounted () {
    axios
      .get('/avatar')
      .then(response => {
        this.src = window.URL.createObjectURL(new Blob([response.data]))
      })
  }
}
</script>

<template lang="pug">
q-avatar(size="60px")
  img(src="https://i.pravatar.cc")

</div>

</template>
