class SubCookieUtil {
  // 用于取得一个子 cookie 的值
  static get(name, subName) {
    let subCookies = SubCookieUtil.getAll(name)
    return subCookies ? subCookies[subName] : null
  }

  // 用于取得所有子 cookie, 以对象形式返回，对象的属性是子 cookie 的名称，值是子 cookie 的值
  static getAll(name) {
    let cookieName = encodeURIComponent(name) + "=",
      cookieStart = document.cookie.indexOf(cookieName)
    cookieValue = null
    cookieEnd, subCookies, parts, (result = {})

    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(";", cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = document.cookie.substring(
        cookieStart + cookieName.length,
        cookieEnd
      )
      if (cookieValue.length > 0) {
        subCookies = cookieValue.split("&")
        for (let i = 0; i < subCookies.length; i++) {
          parts = subCookies[i].split("=")
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
        }
        return result
      }
    }
    return null
  }
}

// document.cookie=data=name=Nicholas&book=Professional&JavaScript 