<template>
  <div>
    <div id="firebaseui-auth-container"></div>
    <!-- <button type="submit" @click="SignInGoogleAuthProvider()">Google 登入</button> -->
    <button @click="init()">init</button>
  </div>

</template>
<script>
import {AuthProviderBtn} from '@/services/firbase.config';

import * as firebaseui from 'firebaseui';

export default {
  name: 'signin',
  data(){
    return {
      emailModel: null
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
    AuthProviderBtn({
      setData: (data) => {
        this.$store.dispatch('setUser',{
          data: data,
          callback: () => this.$router.push('/home')
        });
      }
    });
    this.$store.commit('setNavberStatus',false);
	},
  methods: {
    init(){
      this.$initState();
    }
  }
}
</script>
<style lang="scss" scoped></style>
