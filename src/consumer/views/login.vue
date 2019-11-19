<template>
  <div id="login">
    <el-form class="loginFrom" :model="logindata" :rules="rules" ref="ruleForm">
      <el-form-item class="login-item">
        <h1 class="login-title">海天酱油登录中心</h1>
        <a class="blog" href="/blog">直接进博客</a>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-user"
          placeholder="登录名"
          v-model="logindata.userName"
          @keyup.enter.native="loginButton"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          type="password"
          v-model="logindata.password"
          @keyup.enter.native="loginButton"
        ></el-input>
      </el-form-item>
      <el-form-item class="login-item">
        <el-button
          class="login-inputorbuttom login-bottom"
          type="primary"
          :loading="logining"
          v-popover:popover
          @click="loginButton"
          >登 录</el-button
        >
        <div class="joint-logon">
          <span class="login-tips">联合登录</span>
          <template v-for="(item, index) in jointLogon">
            <span :key="index" class="logon-icon">
              <img :src="item.icon" :alt="item.name" />
            </span>
          </template>
        </div>
        <div class="memo">
          <span style="cursor: pointer;">忘记密码</span>
          <span style="cursor: pointer;" @click="jumpPage('/create-user')"
            >注册账号</span
          >
        </div>
      </el-form-item>
    </el-form>
    <!--验证码弹窗-->
    <el-popover
      popper-class="slidingPictures"
      ref="popover"
      trigger="manual"
      v-model="visible"
    >
      <div class="sliding-pictures">
        <div class="vimg">
          <canvas id="sliderBlock"></canvas>
          <canvas id="codeImg"></canvas>
        </div>
        <div class="slider">
          <div class="track" :class="{ pintuTrue: puzzle }">
            {{ tips }}
          </div>
          <div class="button el-icon-s-grid" @mousedown.prevent="drag"></div>
        </div>
        <div class="operation">
          <span
            title="关闭验证码"
            @click="visible = false"
            class="el-icon-circle-close"
          ></span>
          <span
            title="刷新验证码"
            @click="canvasInit"
            class="el-icon-refresh-left"
          ></span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
const store = require("store");
import { userLoginPassword } from "@/common/crypto/crypto";
export default {
  name: "login",
  data() {
    return {
      logining: false, // 登录加载提示
      tips: "拖动左边滑块完成上方拼图",
      logindata: {
        userName: "",
        password: "",
        verificationCode: ""
      },
      rules: {
        userName: [{ required: true, message: "请填写密码" }],
        password: [{ required: true, message: "请填写密码" }]
      },
      visible: false, //弹窗开启关闭
      //滑块x轴数据
      slider: {
        mx: 0,
        bx: 0
      },
      //拼图是否正确
      puzzle: false,
      jointLogon: [
        {
          url: "",
          event: "",
          icon: require("../../assets/img/icon/qq.png"),
          name: "qq登录"
        },
        {
          url: "",
          event: "",
          icon: require("../../assets/img/icon/wx.png"),
          name: "微信登录"
        }
      ]
    };
  },
  watch: {
    visible(e) {
      if (e === true) {
        this.canvasInit();
        this.puzzle = false;
      }
    }
  },
  beforeCreate() {
    // 已登录用户进入用户中心
    const user_info = store.get("user_info");
    if (user_info) this.$router.push({ path: "/user_center" });
  },
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    // 登录按钮
    loginButton() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.visible = true;
          this.puzzle = false;
          this.tips = "拖动左边滑块完成上方拼图";
        }
      });
    },
    //拼图验证码初始化
    canvasInit() {
      //生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      //x: 254, y: 109
      let mx = random(127, 234),
        bx = random(10, 97),
        y = random(10, 99);

      this.slider = { mx, bx };

      this.draw(mx, bx, y);
    },
    //鼠标按下
    drag(e) {
      //console.log("鼠标按下", e);
      let dom = e.target; //dom元素
      let slider = document.querySelector("#sliderBlock"); //滑块dom
      const downCoordinate = { x: e.x, y: e.y };

      //正确的滑块数据
      let checkx = Number(this.slider.mx) - Number(this.slider.bx);
      //x轴数据
      let x = 0;
      const move = moveEV => {
        x = moveEV.x - downCoordinate.x;
        //y = moveEV.y - downCoordinate.y;
        if (x >= 251 || x <= 0) return false;
        dom.style.left = x + "px";
        //dom.style.top = y + "px";
        slider.style.left = x + "px";
      };

      const up = e => {
        console.log(e.x - downCoordinate.x, checkx);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        dom.style.left = "";
        // 实际滑动会偏小，进行偏移
        let max = checkx - 5;
        let min = checkx - 10;
        // 采用点击距离和最终离开距离计算滑动距离
        let movex = e.x - downCoordinate.x;
        console.log(max, movex, min);
        //允许正负误差1
        if ((max >= movex && movex >= min) || movex === checkx) {
          console.log("滑动解锁成功");
          this.puzzle = true;
          this.tips = "验证成功";
          setTimeout(() => {
            this.visible = false;
          }, 300);
          this.login(); // 登录函数
        } else {
          console.log("拼图位置不正确");
          this.tips = "验证失败，请重试";
          this.puzzle = false;
          this.canvasInit();
        }
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    draw(mx = 200, bx = 20, y = 50) {
      let mainDom = document.querySelector("#codeImg");
      let bg = mainDom.getContext("2d");
      let width = mainDom.width;
      let height = mainDom.height;

      let blockDom = document.querySelector("#sliderBlock");
      let block = blockDom.getContext("2d");
      //重新赋值，让canvas进行重新绘制
      blockDom.height = height;
      mainDom.height = height;

      let imgsrc = require("../assets/images/back.jpg");
      let img = document.createElement("img");
      img.style.objectFit = "scale-down";
      img.src = imgsrc;
      img.onload = function() {
        bg.drawImage(img, 0, 0, width, height);
        block.drawImage(img, 0, 0, width, height);
      };

      let mainxy = { x: mx, y: y, r: 9 };
      let blockxy = { x: bx, y: y, r: 9 };
      this.drawBlock(bg, mainxy, "fill");
      this.drawBlock(block, blockxy, "clip");
    },
    //绘制拼图
    drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
      let x = xy.x,
        y = xy.y,
        r = xy.r,
        w = 40;
      let PI = Math.PI;
      //绘制
      ctx.beginPath();
      //left
      ctx.moveTo(x, y);
      //top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
      ctx.lineTo(x + w + 5, y);
      //right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
      ctx.lineTo(x + w + 5, y + w);
      //bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
      ctx.lineTo(x, y + w);
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
      ctx.lineTo(x, y);
      //修饰，没有会看不出效果
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
      ctx[type]();
      ctx.globalCompositeOperation = "xor";
    },
    // 跳转页面
    jumpPage(url) {
      this.$router.push({ path: url });
    },
    // 登录
    login() {
      let data = {
        account: this.logindata.userName,
        password: userLoginPassword(this.logindata.password)
      };
      this.logining = true;
      this.axios
        .ajax({
          url: this.$api.consumer().user.login,
          data: data,
          method: "post"
        })
        .then(e => {
          this.logining = false;
          // 存储用户数据到缓存
          store.clearAll();
          store.set("user_info", e.data);
          this.$router.push({ path: "/user_center" });
          console.log(e.data);
        })
        .catch(e => {
          this.logining = false;
          console.log(e);
        });
    }
  }
};
</script>
<style>
.slidingPictures {
  padding: 0;
  width: 300px;
  border-radius: 2px;
}
</style>
<style scoped lang="scss">
#login {
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  .loginFrom {
    width: 300px;
    margin-top: -10vw;
    margin-right: 10vw;
    /deep/.el-form-item__error {
      padding-left: 10px;
    }
    .login-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .memo,
      .joint-logon {
        color: #f9f9f9;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        height: 20px;
      }
      .joint-logon {
        margin-top: 3px;
        justify-content: flex-start;
        align-items: center;
        height: 25px;
        .login-tips {
          margin-right: 7px;
        }
        .logon-icon {
          width: 25px;
          height: 25px;
          margin-right: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          &:hover {
            background: rgba(28, 136, 188, 0.5);
          }
          > img {
            width: 85%;
            height: 85%;
          }
        }
      }
    }
    .login-title {
      color: #ffffff;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .login-bottom {
      margin-top: 15px;
    }
    .login-bottom:hover {
      background: rgba(28, 136, 188, 0.5);
    }
    .login-bottom:active {
      background: rgba(228, 199, 200, 0.5);
    }
    /deep/.login-inputorbuttom {
      height: 40px;
      width: 300px;
      background: rgba(57, 108, 158, 0.5);
      border-radius: 20px;
      border: #396c9e 1px solid;
      font-size: 14px;
      color: #ffffff;
      .el-input--small,
      .el-input__inner {
        line-height: 43px;
        border: none;
        color: #ffffff;
        font-size: 14px;
        height: 40px;
        border-radius: 20px;
        background: transparent;
        text-align: center;
      }
      .el-input__icon {
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
}
.blog {
  font-size: 14px;
  width: 100%;
  text-align: center;
  display: inline-block;
  color: #ffffff;
  &:hover {
    color: #ff4758;
  }
}
/*该样式最终是以弹窗插入*/
.sliding-pictures {
  width: 100%;
  .vimg {
    width: 100%;
    height: 170px;
    #codeImg,
    #sliderBlock {
      padding: 7px 7px 0 7px;
      width: inherit;
      height: inherit;
    }
    #codeImg {
      //display: none;
    }
    #sliderBlock {
      position: absolute;
      z-index: 4000;
    }
  }
  .slider {
    width: 100%;
    height: 65px;
    border-bottom: #c7c9d0 1px solid;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .track {
      margin-left: 7px;
      width: 286px;
      height: 38px;
      background: rgba(28, 136, 188, 0.5);
      border-radius: 25px;
      font-size: 14px;
      line-height: 38px;
      padding-right: 15px;
      padding-left: 70px;
    }
    .pintuTrue {
      background: #67c23a;
      color: #ffffff;
    }
    .button {
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 48px;
      background: #ffffff;
      box-shadow: #b9bdc8 0 0 3px;
      border-radius: 50%;
      left: 7px;
      text-align: center;
      font-size: 28px;
      color: #3e5d8b;
      &:hover {
        color: #2181bd;
      }
    }
  }
  .operation {
    width: 100%;
    height: 40px;
    > span {
      color: #9fa3ac;
      display: inline-block;
      width: 40px;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
      &:hover {
        background: #e2e8f5;
      }
    }
  }
}
</style>
