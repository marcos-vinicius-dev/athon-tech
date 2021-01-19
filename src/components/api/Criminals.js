import Vue from 'vue'

import AxiosGetMixin from '../../mixins/axios/get.js'

export default Vue.extend({
  name: 'ApiCriminals',

  mixins: [AxiosGetMixin],

  created () {
    this.url = '/rest/criminals'
  }
})
