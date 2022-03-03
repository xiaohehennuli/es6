/**
 * 记录一些 promies 的理解和操作
 */

//1. 用promise 封装一个ajax

// function get(url) {
//   return new Promise((resolve, reject) => {
//     const client = new XMLHttpRequest()
//     client.open("GET", url)
//     client.responseType = "json"
//     client.setRequestHeader("Accept", "application/json")
//     client.send()
//     client.onreadystatechange = () => {
//       if (this.status === 200) {
//         resolve(this.response)
//       } else {
//         reject(new Error(this.statusText))
//       }
//     }
//   })
// }

// get("url").then(
//   (res) => {
//     console.log(res)
//   },
//   (err) => {
//     console.log(err)
//   }
// )

//2. promise套用 promise2的状态将由promise1来决定

// const p1 = new Promise((resolve, reject) => {
//   // reject 和 reslove不会终止promise执行,reject会放到所有同步脚本后执行
//   reject("1")
//   console.log("2")
// })

// const p2 = new Promise((resolve) => {
//   resolve(p1)
// })
// p2.then((result) => console.log("result", result)).catch((error) =>
//   console.log(error)
// )

// 2
// 1

//3. promise 状态一旦确resolve 后面抛出的错误将不会捕捉到既  Promise 的状态一旦改变，就永久保持该状态，不会再变了

// const p1 = new Promise((resolve, reject) => {
//   resolve("11111")
//   throw Error("err")
// })

// p1.then(() => {
//   console.log("1111")
// }).catch(() => {
//   console.log(2222)
// })

// 1111

//4. promise 会吃掉错误，内部报错不会影响到外部脚步执行,node运行环境会直接报错，但在浏览器上并不会终止外部脚步运行

// const p1 = new Promise((resolve, reject) => {
//   // x没有定义所以会报错
//   console.log(x + 1)
// })

// console.log(2)

// 5. promise all() 接受一个primise 数组 全部resolve all才会resolve，其中一个reject all都会reject
// 如果数组中的promise定义了自己的cathc方法，那么all的catch不会捕捉到reject，如果没定义则会捕捉到

//6. promise race() 方法接受一个promise数组，其中哪个pomise的状态率先发生改变并把这个状态传个promise race（），则promise race（）的状态发生改变，

// 7.promise allSettled() 方法和promise all（）有很大的区别，allSettled方法是等待所有的pomise执行结束不管是reject还是resolve，都会等待结束，
// 并且会返回一个resule数组,allSettled方法没有reject态，只有resolve态

// const p1 = new Promise((resolve) => {
//   resolve(1)
// })

// const p2 = new Promise((reslove, reject) => {
//   reject("err")
// })

// const p = Promise.allSettled([p1, p2]).then((reslut) => {
//   console.log(reslut)
// })

// [{status:'fulfilled',value:1},{status:'rejected',reason:'err'}]
