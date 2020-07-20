<template>
  <footer>
    <p v-text="copyright"></p>
  </footer>
</template>
<script>
import moment from 'moment';
export default {
	name: 'footerbar',
	data(){
		return{}
	},
	computed: {
		copyright() {return `${moment().year()} © minnanliao`},
	}
}
</script>