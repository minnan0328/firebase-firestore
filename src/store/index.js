"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import initState from './initState';
import Admin from './admin';
import { DB, Auth, GoogleAuthProvider} from '@/services/firbase.config';
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
		SignInGoogleAuthProvider({ dispatch },payloads){
			const payload = payloads;
			Auth.signInWithPopup(GoogleAuthProvider).then(function (result) {
				let token = result.credential.accessToken;
				let user = result.user;
				let isNewUser = result.additionalUserInfo.isNewUser;
				if (isNewUser){
					dispatch('setUser', user);
				}
				payload.SignInSuccess(token, user.uid);
			}).catch(error => {
				payload.SignInFailure({
					errorCode: error.code,
					errorMessage: error.message,
					email: error.email,
					credential: error.credential
				})
			}).finally(() => {});
		},
		SigOutGoogleAuthProvider({ }, payloads){
			const payload = payloads;
			Auth.signOut().then(function () {
				payload.SignOutSuccess();
			}).catch(function (error) {
				payload.SignOutFailure(error);
			}).finally(() => { });
		},
		setUser({ commit, dispatch }, payloads){
			const payload = payloads;
			console.log('setUser', payload);
			UserDB.doc(payload.uid).set({
				displayName: payload.displayName,
				email: payload.email,
				phoneNumber: payload.phoneNumber,
				photoURL: payload.photoURL,
				providerId: payload.providerId,
				uid: payload.uid,
				permits: true
			}).then(() => {
				dispatch('getUser', {
					uid: payload.uid
				});
			}).catch(error => {
				console.log(error)
			}).finally(() => { });
		},
		getUser({ commit }, payloads){
			const payload = payloads;
			UserDB.doc(payload.uid).get().then(res => {
				let result = res.data();
				payload.getUserSuccess(result.permits);
				commit('setUser', result);
			}).catch(error => {
				payload.getUserFailure(error);
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