/**
 * 本篇为async的实现原理,
 * async 本质上是gennerator函数的语法糖
 */

async function fn(a) {
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("1133333")
        resolve()
      }, 1000)
    })
  } catch (error) {
    console.log(error)
  }
  console.log(a)
}

// async 的实现 等同于上面

function myFn(a) {
  return myAsnyc(function* () {
    yield new Promise((resolve) => {
      setTimeout(() => {
        console.log("1133333")
        resolve()
      }, 1000)
    })
    yield console.log("a", a)
  })
}

function myAsnyc(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF()
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (error) {
        console.log(error)
        return reject(error)
      }
      console.log("next.done", next.done)
      // 判断gennerator函数是否执行完成
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(
        (v) => {
          step(function () {
            return gen.next(v)
          })
        },
        (e) => {
          step(function () {
            return gen.throw(e)
          })
        }
      )
    }
    step(function () {
      return gen.next(undefined)
    })
  })
}

// fn(5555)

myFn(555)
