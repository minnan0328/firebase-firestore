<template>
  <div class="nav-bar" v-if="$router.currentRoute.name != 'SignIn'">
    <div class="nav-title" @click.stop="gohome()">
      <h3>Firebase</h3>
    </div>
    <div class="nav-user">
      <div class="user-data">
        <img :src="users.photoURL" :alt="users.displayName" @click.stop="openUserData()">
        <div class="user-item" v-if="navberStatus">
          <div class="item">
            <p v-text="users.displayName" class="user-name"></p>
            <p v-text="users.email" class="user-email"></p>
          </div>
          <div class="item">
            <button v-if="users.permits" @click.stop="toAdminPage()">管理帳戶</button>
          </div>
          <div class="item">
            <button type="submit" @click.stop="signOut()">登出 google 帳戶</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
export default {
	name: 'navber',
	data(){
		return{
			isOpenUserData: false
		}
	},
	components:{},
	computed: {
		copyright() {return `${moment().year()} © minnanliao`},
		...mapState({
      users: state => state.users,
      navberStatus: state => state.navberStatus

		})
	},
	mounted(){},
	methods:{
		gohome(){
			if(this.$router.currentRoute.name != 'Home'){
				this.$router.push('/home');
			}
		},
		openUserData(){
      this.isOpenUserData = !this.navberStatus;
      this.$store.commit('setNavberStatus',this.isOpenUserData);
		},
		toAdminPage(){
			this.$router.push('/admin');
		},
		signOut(){
			this.$store.dispatch('SigOutGoogleAuthProvider',{
				SignOutSuccess:() => {
					this.$cookie.deleteCookie('token', -1);
					this.$cookie.deleteCookie('uid', -1);
					this.initStore();
					this.$router.push('/signin');
				},
				SignOutFailure: (payload) => {console.log(payload);}
			})
		},
		initStore(){
			this.$store.commit('initUser');
		}
	}
}
</script>