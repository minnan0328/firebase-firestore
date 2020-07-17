<template>
  <div class="container">
    <button type="submit" @click="SignInGoogleAuthProvider()">Google 登入</button>
    <button @click="onSignIn()">sss</button>
  </div>
</template>
<script>
import {Auth, GoogleAuthProvider} from '@/services/firbase.config'
export default {
  name: 'signin',
  data(){
    return {
      emailModel: null,
      passwordModel: null
    }
  },
  methods:{
    SignInGoogleAuthProvider(){
      this.$store.dispatch('SignInGoogleAuthProvider',{
        SignInSuccess:(token,uid) => {
          this.$router.push('/home');
          this.$cookie.setCookie('token', token, 8)
          this.$cookie.setCookie('uid', uid, 8)
        },
        SignInFailure: (payload) => {
          console.log(payload);
        }
      })
      // Auth.signInWithRedirect(GoogleAuthProvider);
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
