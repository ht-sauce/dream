<template>
  <div class="create-user">
    <el-form
      class="register"
      :model="data"
      :rules="rules"
      ref="ruleForm"
      :inline="false"
      label-width="100px"
    >
      <div class="dingwei">
        <!--必填信息-->
        <div class="left">
          <el-form-item label="账号" prop="account">
            <el-input v-model="data.account" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="data.nickname" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="data.password"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              autocomplete="off"
              v-model="data.password2"
              clearable
            ></el-input>
          </el-form-item>
        </div>
        <!--非必填-->
        <div class="right">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="data.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="data.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker v-model="data.birthday" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="居住地址" prop="province_and_city">
            <el-cascader :options="options" v-model="data.province_and_city" style="width: 400px;">
            </el-cascader>
            <el-input v-model="data.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="网络联系" prop="qq">
            <el-input v-model="data.qq" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="data.email" clearable></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="checkButton">
        <el-button type="primary" :loading="loading" @click="registerUser('ruleForm')"
          >确认注册</el-button
        >
        <el-button><router-link to="/">返回登录</router-link></el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { userLoginPassword } from '@/common/crypto/crypto'
export default {
  data() {
    let englishOrNumbers = (rule, value, callback) => {
      if (!/^[0-9a-zA-Z]+$/g.test(value)) {
        callback(new Error('只允许输入英文和数字'))
      } else {
        callback()
      }
    }
    let twoPassword = (rule, value, callback) => {
      if (value !== this.data.password) {
        callback(new Error('第二次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      options: regionData,
      data: {
        account: '', //账号
        nickname: '', //nickname
        password: '',
        password2: '',
        portrait: '', //用户头像（用于上传）
        portraitShow: '', //用于展示的头像地址
        phone: '', //联系电话
        birthday: '1994-03-29', //生日
        province_and_city: [], //省市区域码
        address: '', //详细住址
        qq: '', //qq或微信信息
        email: '', //邮箱地址
        sex: '男', //
      },
      rules: {
        account: [
          {
            required: true,
            message: '账号6到20位英文或者数字',
            max: 20,
            min: 3,
            trigger: 'blur',
          },
          { validator: englishOrNumbers, trigger: 'blur' },
        ],
        nickname: [
          {
            required: true,
            message: '用户昵称最大10个字',
            max: 10,
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码，最小6位',
            max: 20,
            min: 6,
            trigger: 'blur',
          },
        ],
        password2: [
          {
            required: true,
            message: '请确认密码，最小6位',
            max: 20,
            min: 6,
            trigger: 'blur',
          },
          {
            validator: twoPassword,
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
      },
      loading: false,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    registerUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createUserAjax()
        } else {
          return false
        }
      })
    },
    createUserAjax() {
      let data = {
        account: this.data.account, //账号
        nickname: this.data.nickname, //nickname
        password: userLoginPassword(this.data.password), //对密码进行加密传输
        portrait: this.data.portrait, //用户头像（用于上传）
        phone: this.data.phone, //联系电话
        birthday: this.data.birthday, //生日
        province_and_city: this.data.province_and_city.toString(), //省市区域码
        address: this.data.address, //详细住址
        qq: this.data.qq, //qq或微信信息
        email: this.data.email, //邮箱地址
        sex: this.data.sex, //
      }
      this.axios
        .ajax({
          url: this.$api.consumer().user.create,
          data: data,
          method: 'post',
          loading: true,
          success: '用户创建成功',
        })
        .then(e => {
          console.log(e)
          this.$router.push({ path: '/' })
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>
<style lang="scss">
.el-cascader-menu > .el-cascader-menu__wrap {
  height: 270px;
}
</style>
<style scoped lang="scss">
.create-user {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .register {
    width: 70vw;
    min-width: 960px;
    margin: 10px 0;
    height: 650px;
    min-height: 85vh;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: #ffffff 0 0 3px;
    padding: 40px 20px;
    display: flex;
    flex-flow: column;
    align-items: center;
    .dingwei {
      display: flex;
      .left,
      .right {
        margin: 0 35px;
      }
      .left {
        width: 300px;
      }
      .right {
        width: 500px;
        /deep/.avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        /deep/.avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 120px;
          height: 120px;
          line-height: 120px;
          text-align: center;
        }
        .avatar {
          width: 120px;
          height: 120px;
          display: block;
        }
      }
    }
    .checkButton {
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
