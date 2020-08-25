"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import initState from './initState';
import Admin from './admin';
import { DB, Auth} from '@/services/firbase.config';
const UserDB = DB.collection('users');
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {
		admin: Admin
	},
	state:{
		users: {},
		navberStatus: false
	},
	actions:{
		SigOutGoogleAuthProvider({ }, payloads) {
			const payload = payloads;
			Auth.signOut().then(function () {
				payload.SignOutSuccess();
			}).catch(function (error) {
				payload.SignOutFailure(error);
			}).finally(() => { });
		},
		setUser({ commit, dispatch }, payloads) {
			const payload = payloads;
			UserDB.doc(payload.data.uid).set({
				displayName: payload.data.displayName,
				email: payload.data.email,
				phoneNumber: payload.data.phoneNumber,
				photoURL: payload.data.photoURL,
				providerId: payload.data.providerId,
				uid: payload.data.uid,
				permits: true
			}).then((res) => {
				dispatch('getUser', payload.data);
				payload.callback();
			}).catch(error => {
				console.log(error)
			}).finally(() => { });
		},
		getUser({ commit }, payloads){
			const payload = payloads;
			UserDB.doc(payload.uid).get().then(res => {
				let result = res.data();
				commit('setUser', result);
			}).catch(error => {
				console.log(error);
			}).finally(() => { })
		},
		updateUser({commit},payloads){
			const payload = payloads;
			UserDB.doc(payload.uid).update({
				displayName: payload.displayName,
				email: payload.email,
				phoneNumber: payload.phoneNumber,
				photoURL: payload.photoURL,
				providerId: payload.providerId,
				uid: payload.uid,
				permits: payload.permits
			}).then(() => {
				payload.updateSuccess({
					show: true,
					message: '更新成功！'
				})
			}).catch(error => {
				console.log(error);
			}).finally(() => { })
		}
	},
	mutations:{
		setUser(state, payload){
			state.users = payload;
		},
		setNavberStatus(state, payload){
			state.navberStatus = payload;
		},
		initUser(state){
			state.users = initState.users;
			// Object.keys(initState).forEach(key => {
			// 	state[key] = initState[key];
			// });
		}
	}
})