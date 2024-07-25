<template>
  <div class="login">
    <p class="text-h3 font-weight-bold text-center mt-16 pt-16">Welcome to <span class="text-h3 font-weight-bold text-blue mt-16 pt-16 mb-16">KW</span>IK Park</p>
    <p class="font-italic text-center mb-16 mt-4"> Quickly find and reserve parking spots within the Kitchener-Waterloo region </p>

    <v-card class="card-margin pa-16 pb-8" variant="text">
      <div class="text-subtitle-1 text-medium-emphasis d-flex">Username</div>

      <v-text-field
        class="pt-2 mb-8"
        v-model="username"
        placeholder="Username"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <!-- <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        > -->
      </div>

      <v-text-field
        v-model="password"
        class="pt-2"
        :append-inner-icon="show1 ? 'fa-eye' : 'fa-eye-slash'"
        :type="show1 ? 'text' : 'password'"
        variant="outlined"
        placeholder="Password"
        @click:append-inner="show1 = !show1"
      ></v-text-field>
      <div class="mb-6 text-center text-red" :style="{visibility: this.errorMsg ? 'visible' : 'hidden' }"> Incorrect username or password </div>
      <v-btn class="mb-8 black-button" size="large" variant="tonal" block @click="checkLogin()">
        Log In
      </v-btn>

      <v-card-text class="text-blue text-center" @click="navUserCreation()">
        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import api from '../../axiosconfig'

export default {
  data() {
    return {
      show1: false,
      show2: true,
      username: "",
      password: "",
      errorMsg: false,
      rules: {
        required: (value) => !!value || 'Required.',
      }
    }
  },
  methods: {
    checkLogin() {
      api.get(`login?username=${this.username}&password=${this.password}`).then((res) => {
        sessionStorage.setItem('uid', JSON.stringify(res.data.uid)); // create user session
        this.$router.push('/home')
      }).catch(() => {
        this.errorMsg = true;
      })
    },
    navUserCreation() {
      this.$router.push('/new-user')
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-margin {
  margin: 0 250px 0 250px;
}

.black-button {
  background-color: black;
  color: white;
}
</style>
