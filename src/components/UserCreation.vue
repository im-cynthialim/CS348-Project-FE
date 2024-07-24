<template>
<div>

    <v-btn
      class="position-absolute pr-1"
      style="left: 75px"
      size="x-large"
      color="black"
      icon="fa: fas fa-arrow-right fa-rotate-180"
      @click="this.$router.push('/')"
    ></v-btn>
   <v-card
    variant="default"
    class="mx-auto"
    max-width="500"
  >
  <p class="text-h3 mt-16 text-center font-weight-bold mb-16"> User Registration </p>
      <v-text-field
        v-model="username"
        
        color="primary"
        label="Username"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>

    <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>

        <v-text-field
        v-model="phone"
        color="primary"
        label="Phone Number"
        variant="underlined"
        :rules="[rules.required, rules.phone]"
      ></v-text-field>


      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
        :rules="[rules.required]"
      ></v-text-field>

      <v-select
        class="mx-auto"
        max-width="500"
        label="Role within UW"
        :items="['Student', 'Visitor', 'Staff']"
        :rules="[rules.required]"
        variant="underlined"
        v-model="role"
        ></v-select>
 
    <div class="d-flex flex-row"> 
      <v-checkbox
        v-model="hasPermit"
        color="secondary"
        label="I own a parking permit"
      ></v-checkbox>

      <v-spacer></v-spacer>
      <v-checkbox
        v-model="isAccessible"
        color="secondary"
        label="I require accessibility parking"
      ></v-checkbox>
      </div>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" variant="tonal" @click="createUser()">
        Complete Registration
      </v-btn>
    </v-card-actions>
   </v-card>
    <div v-show="registered" class="text-center mt-4 text-green"> Registration Successful! </div>
   </div>
</template>

<script>

import api from '../../axiosconfig'

export default {
  setup() {
   
  },
  data: () => ({
    rules: {
        required: value => !!value || 'Field is required',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail'
          },
        phone: value => {
            const pattern = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
            return pattern.test(value) || 'Invalid phone number'

        }
      },
      username: null,
      password: null,
      email: null,
      phone: null,
      role: null,
      hasPermit: false,
      isAccessible: false,
      registered: false
  }),
  
  mounted() {
   
  },
  methods: {
    createUser() {
        api.post('/createAccount', {
            username: this.username,
            password: this.password,
            email: this.email,
            phone: this.phone,
            identity: this.role.charAt(0).toLowerCase() + this.role.slice(1),
            is_accessible: this.isAccessible
        }).then (() => {
            this.registered = true;
        })
    }
   
  }
}
</script>

<style>

</style>
