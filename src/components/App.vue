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
	methods:{
		close(){
			this.$store.commit('setNavberStatus',false);
		},
	}
}
</script>
<style lang="scss" src="./App.scss"></style>
