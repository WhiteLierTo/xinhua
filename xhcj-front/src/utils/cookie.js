import Cookies from 'js-cookie'
import setting from "../setting"

const TokenKey = 'Admin-Token';

class Token {
  constructor(tokenKey) {
    this.tokenKey = tokenKey
  }

  get() {
    return Cookies.get(this.tokenKey)
  }

  set(token) {
    return Cookies.set(this.tokenKey, token, {expires: setting.cookieExpireDays})
  }

  delete() {
    return Cookies.remove(this.tokenKey)
  }

  update(token) {
    this.delete();
    this.set(token);
  }
}

export default new Token(TokenKey);
