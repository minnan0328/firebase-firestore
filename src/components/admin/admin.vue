<template>
<div>
	<Navber></Navber>
	<div class="container" v-if="allUser.length">
		<div v-for="(users,index) in allUser" :id="users.uid" :key="users.uid" class="card-item">
			<div>
				<img :src="users.photoURL" :alt="users.displayName">
			</div>
			<div>
				<p v-text="users.displayName"></p>
				<p v-text="users.phoneNumber"></p>
			</div>
			<div>
				<input type="checkbox" :checked="users.permits" v-model="users.permits" id="permits">
				<label for="permits">管理者</label>
			</div>
			<div>
				<button @click="update(users.uid,index)">儲存資料</button>
			</div>
		</div>
		<div class="message" v-if="showUpdateMessage">
			<p v-text="updateMessage"></p>
		</div>
	</div>
	<Footer></Footer>
</div>
</template>
<style lang="scss" scoped src="./admin.scss"></style>
<script>
import Navber from '@/components/common/navbar/navber';
import Footer from '@/components/common/footer/footer';
import { mapState, mapActions } from 'vuex';
import { timeout } from 'q';
import { setTimeout } from 'timers';

export default {
	name: 'home',
	data(){
		return{
			updateMessage: null,
			showUpdateMessage: false
		}
	},
	components: {Navber,Footer},
	computed:{
		...mapState({
			allUser: state => state.admin.allUser
		})
	},
  beforeCreate() {
    if (this.$cookie.getCookie('token') == null && this.$cookie.getCookie('uid') == null) {
			this.$router.push('/signin');
			this.$initState();
    } else {
      this.$store.dispatch('getUser', {
				uid: this.$cookie.getCookie('uid'),
				getUserSuccess:(permits) => {
          if(!permits) this.$router.push('/home');
        },
        getUserFailure: (payload) => {console.log(payload);}
			})
			this.$store.dispatch('getAllUser');
    }
	},
	mounted(){
		this.$store.commit('setNavberStatus',false);
	},
	methods:{
		update(uid,index){
			this.$store.dispatch('updateUser',{
				displayName: this.allUser[index].displayName,
				email: this.allUser[index].email,
				phoneNumber: this.allUser[index].phoneNumber,
				photoURL: this.allUser[index].photoURL,
				providerId: this.allUser[index].providerId,
				uid: this.allUser[index].uid,
				permits: this.allUser[index].permits,
				updateSuccess:(res) => {
					this.showUpdateMessage = res.show;
					this.updateMessage = res.message;
					setTimeout(() => {
						this.showUpdateMessage = false
					},3000)
				},
				updateFailure:(error) => {
					console.log(error);
				}
			})
		}
	}
}
</script>