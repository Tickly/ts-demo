/**
 * 假设接口是 /user/list
 * 然后支持参数 name 过滤查询
 * 
 * 我理想的情况就是，定义好一个接口封装对象，直接调用方法
 * user.List('小明')
 * 
 * 然后可以给到提示，这个方法返回的是Promise，并且返回的值是我定义好的类型
 * 
 * 如何解决目前的报错问题
 */
const http = {
  post (url: string, data: any): Promise<any> {
    return Promise.resolve({})
  }
}

const Post = function () {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const value = descriptor.value as Function
    // 重写方法
    descriptor.value = function (...args) {
      // 先拿到所有要提交的参数
      const params = value.apply(target, args)
      // 拼接url
      const url = '这里有相关自动拼接接口路径的代码'
      return http.post(url, params)
    }
  }
}
// 项目里接口统一的返回格式
interface ResponseData {
  code: number,
  data: any,
  message: string,
}

/**
 * 
 */
class User {
  @Post()
  List (name: string): Promise<ResponseData> {
    return {
      name
    }
  }
}

const user = new User()

user.List('小明').then(res => {
  console.log(res.code)
})