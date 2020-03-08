const getters = {
  id: state => state.user.id,
  role: state => state.user.role,
  token: state => state.user.token
}

export default getters