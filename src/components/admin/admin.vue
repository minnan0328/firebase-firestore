<template>
	<div class="container">
			<div :id="users.uid" :key="users.uid" class="card-item">
				<div>
					<img :src="users.photoURL" :alt="users.displayName">
				</div>
				<div>
					<p v-text="users.displayName"></p>
					<p v-text="users.phoneNumber"></p>
				</div>
				<div>
					<button @click="delData(users.uid)">移除帳戶</button>
				</div>
			</div>
	</div>
</template>
<style lang="scss" scoped src="./admin.scss"></style>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'home',
	data(){
		return{}
	},
	computed:{
		...mapState({
			users: state => state.users,
			allUsers: state => state.allUsers
		})
	},
  beforeCreate() {
    if (this.$cookie.getCookie('token') == null && this.$cookie.getCookie('uid') === null) {
			this.$router.push('/signin');
			this.initStore();
    } else {
			console.log(this.users);
      this.$store.dispatch('getUsers', {
				uid: this.$cookie.getCookie('uid'),
				// permits:(isAdmin) => {
				// 	if(!isAdmin){
				// 		this.$router.push('/home');
				// 	}else{
				// 		this.$store.dispatch('gitAllUsers', {
				// 			// uid: this.$cookie.getCookie('uid')
				// 		})
				// 	}
				// }
      })
    }
  },
	mounted(){
		// if(this.users.isAdmin){
		// 	this.$store.dispatch('getUsers',{uid:this.$cookie.getCookie('uid')});
		// }else{
		// 	this.$router.push('/home');
		// }
	},
	components: {},
	methods:{}
}
</script>