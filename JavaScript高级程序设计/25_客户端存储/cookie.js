class CookieUtil {
  // 用于取得给定名称的 cookie 值
  static get(name) {
    // 在 document.cookie 返回的字符串中查找是否存在名称后面加上等号
    let cookieName = `${encodeURIComponent(name)}=`,
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      )
      return cookieValue
    }
  }

  // 用于设置页面上的 cookie，接收多个参数：cookie 名称、cookie 值、可选的 Date 对象（表示何时删除 cookie）、可选的 URL 路径、可选的域以及可选的布尔值（表示是否添加 secure 标志）。
  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    // 依次检查其他参数
    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toGMTString()}`
    }

    if (path) {
      cookieText += `; path=${path}`
    }

    if (domain) {
      cookieText += `; domain=${domain}`
    }
    if (secure) {
      cookieText += "; secure"
    }
    document.cookie = cookieText
  }

  // 没有直接删除已有 cookie 的方法。为此，需要再次设置同名 cookie（包括相同路径、域和安全选项）
  static unset(name, path, domain, secure) {
    CookieUtil.set(name, "", new Date(0), path, domain, secure)
  }
}

// 设置cookie
CookieUtil.set("name", "John")
CookieUtil.set("age", 18)

// 获取cookie
console.log(CookieUtil.get("name"))
console.log(CookieUtil.get("age"))

// 删除cookie
CookieUtil.unset("name")
CookieUtil.unset("age")

CookieUtil.set("name", "John", new Date(0), "/", "example.com", true)
