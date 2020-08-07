<template>
	<div>
		<Navber></Navber>
		<div class="container" v-if="Object.keys(users).length">
			<div :id="users.uid" :key="users.uid" class="card-item">
				<p v-text="users.uid"></p>
				<p v-text="users.displayName"></p>
				<p v-text="users.phoneNumber"></p>
				<p v-text="users.photoURL"></p>
				<p v-text="users.providerId"></p>
			</div>
		</div>
		<img src="http://placehold.it/1024X1024.png" style="width=100%" >
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
			this.$initState();
			this.$router.push('/signin');
    } else {
      this.$store.dispatch('getUser', {
				uid: this.$cookie.getCookie('uid')
      })
    }
  },
	mounted(){
		this.$store.commit('setNavberStatus',false);
	},
	methods:{}
}
</script>