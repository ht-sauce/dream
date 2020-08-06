'use strict'
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
/*
状态值
Pending(进行中)
Fulfilled(已成功)
Rejected(已失败)
resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)
resolve 和 reject 都可以传入任意类型的值作为实参，表示 Promise 对象成功（Fulfilled）和失败（Rejected）的值
*/
// 定义Promise的三种状态常量
const PENDING = 'PENDING' //进行中
const FULFILLED = 'FULFILLED' //已成功
const REJECTED = 'REJECTED' //已失败
class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('传入的不是一个函数')
    }
    // 添加状态
    this._status = PENDING
    // 返回值
    this._value = undefined
    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }
  // 添加resovle时执行的函数，Pending——Fulfilled，成功
  _resolve(val) {
    if (this._status !== PENDING) return
    this._status = FULFILLED
    this._value = val
  }
  // 添加reject时执行的函数 Pending——Rejected，失败
  _reject(err) {
    if (this._status !== PENDING) return
    this._status = REJECTED
    this._value = err
  }
}

export default MyPromise
