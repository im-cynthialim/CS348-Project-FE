<template>
  <div class="login">
    <p class="text-h3 font-weight-bold text-center mt-16 pt-16 mb-16">Welcome.</p>

    <v-card class="card-margin pa-16 pb-8" variant="text">
      <div class="text-subtitle-1 text-medium-emphasis d-flex">Email</div>

      <v-text-field
        class="pt-2 mb-8"
        v-model="email"
        placeholder="Email"
        variant="outlined"
        hide-details
        required
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        v-model="password"
        class="pt-2 mb-8"
        :append-inner-icon="show1 ? 'fa-eye' : 'fa-eye-slash'"
        :rules="[rules.required]"
        :type="show1 ? 'text' : 'password'"
        variant="outlined"
        placeholder="Password"
        @click:append-inner="show1 = !show1"
      ></v-text-field>

      <v-btn class="mb-8 black-button" size="large" variant="tonal" block @click="load">
        Log In
      </v-btn>

      <v-card-text class="text-blue text-center" @click="navUserCreation()">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: true,
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        emailMatch: () => `The email and password you entered don't match`
      }
    }
  },
  methods: {
    load() {
      this.$router.push('/home')
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
