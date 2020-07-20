<template>
	<div>
		<Navber></Navber>
		<div class="container">
			<div :id="users.uid" :key="users.uid" class="card-item">
				<p v-text="users.uid"></p>
				<p v-text="users.displayName"></p>
				<p v-text="users.phoneNumber"></p>
				<p v-text="users.photoURL"></p>
				<p v-text="users.providerId"></p>
			</div>
			<button @click="get()">GET</button>
		</div>
		<Footer></Footer>
	</div>
</template>
<style lang="scss" scoped src="./home.scss"></style>
<script>
import { mapState, mapActions } from 'vuex';
import Navber from '@/components/common/navbar/navber';
import Footer from '@/components/common/footer/footer';
export default {
	name: 'home',
	data(){
		return{}
	},
	components: {Navber,Footer},
	computed:{
		...mapState({
			users: state => state.users,
		})
	},
  beforeCreate() {
    if (this.$cookie.getCookie('token') == null && this.$cookie.getCookie('uid') == null) {
			this.$store.commit('initUser');
			this.$router.push('/signin');
    } else {
      this.$store.dispatch('getUser', {
				uid: this.$cookie.getCookie('uid'),
				getUserSuccess:(permits) => {},
        getUserFailure: (payload) => {console.log(payload);}
      })
    }
  },
	mounted(){},
	methods:{
		initStore(){
			this.$store.commit('initUser');
		}
	}
}
</script>