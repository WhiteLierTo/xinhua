class Store {
  // localStore存取
  static set(key, value) {
    localStorage.setItem(key, value)
  }

  static get(key, defaultValue) {
    return localStorage.getItem(key) || defaultValue;
  }

  static delete(key) {
    localStorage.removeItem(key)
  }
}


export default Store