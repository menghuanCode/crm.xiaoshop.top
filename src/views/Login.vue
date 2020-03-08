<template>
  <div class="login-box">
    <div class="logo">Admin</div>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form">
      <el-form-item class="field" prop="username">
        <el-input
          ref="username"
          placeholder="请输入用户名"
          v-model="loginForm.username"
          clearable
          tabindex="1"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item class="field" prop="password">
        <el-input
          ref="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          clearable
          type="password"
          tabindex="2"
          autocomplete="new-password"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        :disabled="disabled"
        type="primary"
        class="login-button"
        @click="handleLogin"
      >登录</el-button>
      <div class="agreement">
        <label class="agreement-text">已阅读并同意</label>
        <a href="javascript:void(0);" class="agreement-link">《用户服务协议》</a>
        <a href="javascript:void(0);" class="agreement-link">《隐私权政策》</a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { debounce, omit } from "lodash";
export default {
  data() {
    return {
      redirect: "",
      otherQuery: {},
      show: false,
      loading: false,
      disabled: false,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        if (!route.query) {
          return;
        }

        const { redirect } = route.query;
        this.redirect = redirect;
        this.otherQuery = omit(route.query, "redirect");
      },
      immediate: true
    },
    loginForm: {
      handler: function() {
        this.changeDisabled();
      },
      deep: true,
      immediate: true
    }
  },
  components: {},
  created() {
    this.changeDisabled = debounce(this.changeDisabled, 200, {
      leading: true
    });
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    /**
     * 改变按钮的 disable 状态
     */
    changeDisabled() {
      let { username, password } = this.loginForm;
      if (username === "" || password == "") {
        return (this.disabled = true);
      } else {
        return (this.disabled = false);
      }
    },
    /**
     * 处理登录操作
     */
    async handleLogin() {
      const validate = await this.$refs.loginForm.validate();

      if (!validate) {
        return;
      }

      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          this.loading = false;
          return this.$router.replace({
            path: this.redirect || "/",
            query: this.otherQuery
          });
        })
        .catch(error => {
          this.loading = false;
          let message = error.message || "系統错误，请稍后再试或联系我们";
          return this.$msg(message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  padding-top: 100px;
}

.logo {
  width: 120px;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin: 20px auto;
}

.login-form {
  margin: 30px auto 20px;
  width: 300px;
  min-height: 300px;
}

.field {
  &::v-deep .el-input__inner {
    height: 44px;
    line-height: 44px;
    border-width: 0 0 1px 0;
    border-radius: 0;
    font-size: 16px;
    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
  }
}

.login-button {
  width: 100%;
  height: 44px;
  margin-top: 10px;
}

.agreement {
  font-size: 12px;
  margin: 24px 0;
  text-align: left;
  zoom: 1;
  &-text {
    color: #b2b2b2;
  }
  &-link {
    color: #00a6ff;
  }
}
</style>