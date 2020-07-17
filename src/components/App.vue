<template>
	<div @click.stop="close()">
		<div class="nav-bar">
			<div class="nav-title" @click="$router.push('/home')">
				<h3>Firebase</h3>
			</div>
			<div class="nav-user">
				<div class="user-data">
					<img :src="users.photoURL" :alt="users.displayName" @click.stop="openUserData()">
					<div class="user-item" v-if="isOpenUserData">
						<div class="item">
							<p v-text="users.displayName" class="user-name"></p>
							<p v-text="users.email" class="user-email"></p>
						</div>
						<div class="item">
							<button v-if="users.isAdmin" @click="toAdminPage()">管理帳戶</button>
						</div>
						<div class="item">
							<button type="submit" @click="signOut()">登出 google 帳戶</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
  	<footer>
			<p v-text="copyright"></p>
		</footer>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import { fail } from 'assert';
export default {
	name: 'app',
	data(){
		return{
			isOpenUserData: false
		}
	},
	components:{},
	computed: {
		copyright() {return `${moment().year()} © minnanliao`},
		...mapState({
			users: state => state.users
		})
	},
	mounted(){},
	methods:{
		openUserData(){
			this.isOpenUserData = !this.isOpenUserData;
		},
		close(){
			this.isOpenUserData = false;
		},
		toAdminPage(){
			this.$router.push('/admin');
		},
		signOut(){
			this.$store.dispatch('SigOutGoogleAuthProvider',{
				SignOutSuccess:() => {
					this.initStore();
					this.$router.push('/signin');
				},
				SignOutFailure: (payload) => {
					console.log(payload);
				}
			})
		},
		initStore(){
			this.$store.commit('initUsers');
		}
	}
}
</script>
<style lang="scss" src="./App.scss"></style>
