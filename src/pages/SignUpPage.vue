<template>
  <h1>Sign Up</h1>
  <div>
    <label for="username">Username</label>
    <input id="username" />
  </div>
  <div>
    <label for="e-mail">E-Mail</label>
    <input id="e-mail"/>
  </div>
  <div>
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password"/>
  </div>
  <div>
    <label for="password-repeat">Password Repeat</label>
    <input id="password-repeat" type="password" v-model="passwordRepeat"/> <!-- alternative -->
  </div>
  <button :disabled="isDisabled">Sign Up</button>

  {{username}}
</template>
<script>
export default {
  name: "SignUpPage",
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
    }
  },
  methods: {
  },
  computed: {
    isDisabled() {
      return this.password && (this.password !== this.passwordRepeat);
    }
  }
}
</script>
