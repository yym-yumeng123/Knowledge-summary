/**
 * 接口中使用泛型与泛型多类型
 */

// * 泛型
interface ArticleInterface<B, C> {
  title: string
  isLock: B
  comments: C[]
}

type CommmentType = {
  content: string
}

const yym: ArticleInterface<Boolean, CommmentType> = {
  title: "标题",
  isLock: true,
  comments: [{ content: "this is a comments" }],
}


/**
 * ! readonly
 */
class Axios {
  readonly site: string = 'wwww'
  constructor(site?: string) {
    this.site = site || this.site
  }
  public get(url: string): string {
    return this.site
  }
}
const i = new Axios()
i.get('user')