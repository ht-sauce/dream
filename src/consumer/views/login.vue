<template>
  <div id="login">
    <el-form class="loginFrom" :model="logindata" :rules="rules" ref="ruleForm">
      <el-form-item class="login-item">
        <h1 class="login-title">海天酱油登录中心</h1>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-user"
          placeholder="登录名"
          v-model="logindata.userName"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="login-inputorbuttom"
          prefix-icon="el-icon-lock"
          placeholder="密码"
          v-model="logindata.password"
        ></el-input>
      </el-form-item>
      <!--<el-form-item prop="verificationCode">
        <el-input
          class="login-inputorbuttom"
          v-model="logindata.verificationCode"
        ></el-input>
      </el-form-item>-->
      <el-form-item class="login-item">
        <el-button
          class="login-inputorbuttom login-bottom"
          type="primary"
          v-popover:popover
          @click="visible = !visible"
          >登 录</el-button
        >
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
          <img src="../assets/images/back.jpg" alt="" />
        </div>
        <div class="slider">
          <div class="track">拖动左边滑块完成上方拼图</div>
          <div class="button el-icon-s-grid" @mousedown="drag"></div>
        </div>
        <div class="operation">
          <span
            title="关闭验证码"
            @click="visible = false"
            class="el-icon-circle-close"
          ></span>
          <span title="刷新验证码" class="el-icon-refresh-left"></span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      logindata: {
        userName: "",
        password: "",
        verificationCode: ""
      },
      rules: {},
      visible: false
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    //鼠标按下
    drag(e) {
      console.log("鼠标按下", e);
      let dom = e.target; //dom元素
      const downCoordinate = { x: e.x, y: e.y };

      const move = moveEV => {
        let x = moveEV.x - downCoordinate.x;
        //let y = moveEV.y - downCoordinate.y;
        dom.style.left = x + "px";
        //dom.style.top = y + "px";
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        dom.style.left = "";
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
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
  background-image: url("../assets/images/back.jpg");
  background-size: 100% 100%;
  .loginFrom {
    width: 300px;
    margin-top: -10vw;
    margin-right: 10vw;
    .login-item {
      display: flex;
      justify-content: center;
      align-items: center;
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
/*该样式最终是以弹窗插入*/
.sliding-pictures {
  width: 100%;
  .vimg {
    width: 100%;
    height: 170px;
    padding: 7px 7px 0 7px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: fill;
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
