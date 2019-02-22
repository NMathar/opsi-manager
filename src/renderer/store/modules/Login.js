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
  GET_LOGIN: state => {
    return {server: state.server, user: state.user, password: state.password}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
