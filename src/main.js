import Vue from "vue";
import App from '@/components/App.vue';
import router from '@/routers/index';
import { store } from '@/store/index';
import cookie from '@/utilities/Cookie';
Vue.prototype.$cookie = cookie;

Vue.prototype.$initState = () => {
	store.commit('initUser');

	cookie.deleteCookie('token', '', 1);
	cookie.deleteCookie('uid', '', 1);
}


new Vue({
	render: h => h(App),
	router, store
}).$mount('#app');

