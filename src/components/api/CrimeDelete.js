import Vue from 'vue'

import AxiosDeleteMixin from '../../mixins/axios/delete.js'

export default Vue.extend({
  name: 'ApiCrimeDelete',

  mixins: [AxiosDeleteMixin],

  created () {
    this.url = '/rest/crime'
  }
})
