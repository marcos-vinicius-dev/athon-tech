import Vue from 'vue'

import AxiosGetMixin from '../../mixins/axios/get.js'

export default Vue.extend({
  name: 'ApiCrimeTypes',

  mixins: [AxiosGetMixin],

  created () {
    this.url = '/rest/crime_types'
  }
})
