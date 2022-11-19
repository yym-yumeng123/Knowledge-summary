// 表示项目中 TS 自定义类型声明

/**
 * 过指定任何以 .svg 结尾的导入(import)，将 SVG 声明(declare) 为一个新的模块(module)，并将模块的 content 定义为 any
 */

declare module "*.svg" {
  const content: any
  export default content
}
