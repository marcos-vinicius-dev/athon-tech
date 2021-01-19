import Vue from 'vue'

import AxiosPostMixin from '../../mixins/axios/post.js'

export default Vue.extend({
  name: 'ApiCrimeCreate',

  mixins: [AxiosPostMixin],

  created () {
    this.url = '/rest/crime'
  }
})
