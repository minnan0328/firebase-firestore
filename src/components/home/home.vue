<template>
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
</template>
<style lang="scss" scoped src="./home.scss"></style>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'home',
	data(){
		return{}
	},
	computed:{
		...mapState({
			users: state => state.users
		})
	},
  beforeCreate() {
    if (this.$cookie.getCookie('token') == null && this.$cookie.getCookie('uid') === null) {
			this.$router.push('/signin');
			this.initStore();
    } else {
      this.$store.dispatch('getUsers', {
				uid: this.$cookie.getCookie('uid'),
				// permits:(isAdmin) => {

				// }
      })
    }
  },
	mounted(){},
	components: {},
	methods:{
		initStore(){
			this.$store.commit('initUsers');
		}
	}
}
</script>