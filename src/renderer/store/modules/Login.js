import {OPSIApi} from 'opsi-api'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

const state = {
  // user: false,
  // password: false,
  isLoggedIn: !!localStorage.getItem('api')
}

const mutations = {
  [LOGIN] (state) {
    state.pending = true
  },
  [LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [LOGOUT] (state) {
    state.isLoggedIn = false
  }
}

const actions = {
  async login ({commit}, creds) {
    commit(LOGIN) // show spinner
    const api = new OPSIApi(creds.url, creds.user, creds.password)
    const {success} = await api.isUserAdmin()
    if (success) {
      commit(LOGIN_SUCCESS)
      localStorage.setItem('api', api)
    }
  },
  logout ({commit}) {
    localStorage.removeItem('api')
    commit(LOGOUT)
  }
}

// const getters = {
//   GET_API: state => {
//     return new OPSIApi(state.server, state.user, state.password)
//   }
// }

export default {
  state,
  mutations,
  actions
  // getters
}
