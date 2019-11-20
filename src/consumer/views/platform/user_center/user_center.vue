<template>
  <div class="user_center">
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
            <el-input v-model="data.account" disabled clearable></el-input>
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
          <el-form-item label="头像" prop="portrait">
            <el-upload
              class="avatar-uploader"
              :headers="headers"
              :action="uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="data.portrait"
                :src="data.portraitShow"
                class="avatar"
                alt="头像"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="个人标签" prop="tag">
            <el-input v-model="data.tag" clearable></el-input>
          </el-form-item>
          <el-form-item label="个人说明" prop="synopsis">
            <el-input
              type="textarea"
              v-model="data.synopsis"
              autosize=""
              clearable
            ></el-input>
          </el-form-item>
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
            <el-date-picker
              v-model="data.birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="居住地址" prop="province_and_city">
            <el-cascader
              :options="options"
              v-model="data.province_and_city"
              style="width: 400px;"
            >
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
        <el-button
          type="primary"
          :loading="loading"
          @click="registerUser('ruleForm')"
          >确认修改</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { userLoginPassword } from "@/common/crypto/crypto";
import store from "store";
export default {
  data() {
    let englishOrNumbers = (rule, value, callback) => {
      if (!/^[0-9a-zA-Z]+$/g.test(value)) {
        callback(new Error("只允许输入英文和数字"));
      } else {
        callback();
      }
    };
    let twoPassword = (rule, value, callback) => {
      if (value !== this.data.password) {
        callback(new Error("第二次密码不一致"));
      } else {
        callback();
      }
    };
    const user_info = store.get("user_info");
    return {
      headers: { Authorization: user_info.sign },
      uploadImg: this.$api.static().upload_pictures + "?source=头像",
      options: regionData,
      data: {
        synopsis: "", //简介
        account: "", //账号
        nickname: "", //nickname
        password: "",
        password2: "",
        portrait: "", //用户头像（用于上传）
        portraitShow: "", //用于展示的头像地址
        phone: "", //联系电话
        birthday: "1994-03-29", //生日
        province_and_city: [], //省市区域码
        address: "", //详细住址
        qq: "", //qq或微信信息
        email: "", //邮箱地址
        sex: "男" //
      },
      rules: {
        account: [
          {
            required: true,
            message: "账号6到20位英文或者数字",
            max: 20,
            min: 3,
            trigger: "blur"
          },
          { validator: englishOrNumbers, trigger: "blur" }
        ],
        nickname: [
          {
            required: true,
            message: "用户昵称最大10个字",
            max: 10,
            trigger: "blur"
          }
        ],
        password: [
          {
            message: "请输入密码，最小6位",
            max: 20,
            min: 6,
            trigger: "blur"
          }
        ],
        password2: [
          {
            message: "请确认密码，最小6位",
            max: 20,
            min: 6,
            trigger: "blur"
          },
          {
            validator: twoPassword,
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        synopsis: [
          {
            message: "最大500个字",
            max: 500,
            trigger: "blur"
          }
        ],
        tag: [
          {
            message: "最大100个字",
            max: 100,
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  beforeCreate() {},
  created() {
    // 数据初始化
    const user_info = store.get("user_info");
    user_info.userInfo.province_and_city = user_info.userInfo.province_and_city
      ? user_info.userInfo.province_and_city.split(",")
      : [];
    this.data = Object.assign(this.data, user_info.userInfo);
    // 头像处理
    this.data.portraitShow =
      this.$api.static().visit + user_info.userInfo.portrait;
  },
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.data.portrait = res.data;
        this.data.portraitShow = this.$api.static().visit + res.data;
      } else {
        // 提示信息，需引入Message
        this.$message.error("图片上传失败");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG和PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    registerUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateUserAjax();
        } else {
          return false;
        }
      });
    },
    updateUserAjax() {
      let data = {
        tag: this.data.tag, //个人标签
        synopsis: this.data.synopsis, //个人简介
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
        sex: this.data.sex //
      };
      this.axios
        .ajax({
          url: this.$api.consumer().user.update,
          data: data,
          method: "post",
          loading: true,
          success: "修改成功"
        })
        .then(e => {
          console.log(e);
          const user_info = store.get("user_info");
          user_info.userInfo = Object.assign(user_info.userInfo, data);
          delete user_info.userInfo.password;
          delete user_info.userInfo.password2;
          store.set("user_info", user_info);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style lang="scss">
.el-cascader-menu > .el-cascader-menu__wrap {
  height: 270px;
}
</style>
<style scoped lang="scss">
.user_center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .register {
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
      display: flex;
      justify-content: center;
    }
  }
}
</style>
