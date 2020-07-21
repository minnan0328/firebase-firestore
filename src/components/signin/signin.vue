<template>
  <div>
    <button type="submit" @click="SignInGoogleAuthProvider()">Google 登入</button>
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
  beforeCreate() {
    if (this.$cookie.getCookie('token') != null && this.$cookie.getCookie('uid') != null) {
      this.$router.push('/home');
    }else{
      this.$initState();
    }
  },
	mounted(){
		this.$store.commit('setNavberStatus',false);
	},
  methods:{
    SignInGoogleAuthProvider(){
      this.$store.dispatch('SignInGoogleAuthProvider',{
        SignInSuccess:(token,uid) => {
          this.$router.push('/home');
          this.$cookie.setCookie('token', token, 8);
          this.$cookie.setCookie('uid', uid, 8);
        },
        SignInFailure: (payload) => {
          console.log(payload);
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
