import Cookies from 'js-cookie'

export default {
  authHeader () {
    const user = localStorage.getItem('user_tk')
    if (user) {
      return { Authorization: 'Bearer ' + user }
    } else {
      return {}
    }
  },

  postHeader () {
    const user = localStorage.getItem('user_tk')
    if (user) {
      return { Authorization: 'Bearer ' + user, 'Content-Type': 'application/json' }
    } else {
      return {}
    }
  },

  setCookie (nombre, valor) {
    Cookies.set(nombre, valor, { sameSite: 'lax', secure: true })
  },

  getCookie (nombre) {
    return Cookies.get(nombre)
  },
  
  deleteCookie (nombre) {
    Cookies.remove(nombre)
  }
}
