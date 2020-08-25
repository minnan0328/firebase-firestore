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
		copyright() {return `Copyright © ${moment().year()} Min. All rights reserved`},
	}
}
</script>