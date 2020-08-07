<template>
	<router-view id="app" @click.native="close()" v-cloak></router-view>
</template>
<script>
export default {
	name: 'app',
	data(){
		return{}
	},
	computed: {},
	created(){
		// if ('serviceWorker' in navigator) {
		// 	window.addEventListener('load', () => {
		// 		navigator.serviceWorker.register('./service-worker.js').then(registration => {
		// 			console.log('SW registered: ', registration);
		// 			registration.pushManager.subscribe({userVisibleOnly: true});
		// 		}).catch(registrationError => {
		// 			console.log('SW registration failed: ', registrationError);
		// 		});
		// 	});
		// }
	},
	methods:{
		close(){
			this.$store.commit('setNavberStatus',false);
		},
	}
}
</script>
<style lang="scss" src="./App.scss"></style>
<style>
</style>
