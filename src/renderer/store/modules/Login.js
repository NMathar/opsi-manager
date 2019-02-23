import {OPSIApi} from 'opsi-api'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGOUT = 'LOGOUT'

const state = {
  // user: false,
  // password: false,
  pending: false,
  isLoggedIn: !!localStorage.getItem('password')
}

const mutations = {
  [LOGIN] (state) {
    state.pending = true
  },
  [LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [LOGIN_ERROR] (state) {
    state.isLoggedIn = false
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
      localStorage.setItem('user', creds.user)
      localStorage.setItem('url', creds.url)
      localStorage.setItem('password', creds.password)
    } else {
      commit(LOGIN_ERROR)
      // return 'Login Failed'
      throw new Error('Login Failed')
    }
  },
  logout ({commit}) {
    localStorage.removeItem('url')
    localStorage.removeItem('user')
    localStorage.removeItem('password')
    commit(LOGOUT)
  }
}

const getters = {
  GET_API: state => {
    return new OPSIApi(localStorage.getItem('url'), localStorage.getItem('user'), localStorage.getItem('password'))
  },
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  isLoginPending: state => {
    return state.pending
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
