import {OPSIApi} from 'opsi-api'
const state = {
  // user: false,
  // password: false,
  server: 'https://localhost:4447',
  user: 'opsi',
  password: 'opsi',
  authenticated: true,
  loginState: 'success'
}

const mutations = {
}

const actions = {
}

const getters = {
  GET_API: state => {
    return new OPSIApi(state.server, state.user, state.password)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
