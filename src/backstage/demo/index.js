// 可复用逻辑，轮询接口，得到人脸数据
const api_one = () => {
  console.log(1)
}

const api_two = () => {
  console.log(2)
}

const polling = fn => {
  setInterval(() => fn(), 500)
}

polling(api_one)
polling(api_two)
