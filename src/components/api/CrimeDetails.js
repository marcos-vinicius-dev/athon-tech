import Vue from 'vue'

import AxiosGetMixin from '../../mixins/axios/get.js'

export default Vue.extend({
  name: 'ApiCrimeDetails',

  mixins: [AxiosGetMixin],

  created () {
    this.url = '/rest/crime'
  }
})
