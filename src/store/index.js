"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import initState from './initState'
import moment from 'moment';
import { DB, Auth, GoogleAuthProvider} from '@/services/firbase.config';
const UserDB = DB.collection('users');
Vue.use(Vuex)
export const store = new Vuex.Store({
	modules: {},
	state:{
		users: {},
		allUsers:[]
	},
	actions:{
		SignInGoogleAuthProvider({ dispatch },payloads){
			const payload = payloads;
			Auth.signInWithPopup(GoogleAuthProvider).then(function (result) {
				var token = result.credential.accessToken;
				var user = result.user;
				console.log(result)
				console.log(result.getAuthResponse())
				dispatch('setUser', user);
				payload.SignInSuccess(token, user.uid);
			}).catch(error => {
				payload.SignInFailure({
					errorCode: error.code,
					errorMessage: error.message,
					email: error.email,
					credential: error.credential
				})
			});
		},
		SigOutGoogleAuthProvider({ }, payloads){
			const payload = payloads;
			Auth.signOut().then(function () {
				payload.SignOutSuccess();
			}).catch(function (error) {
				payload.SignOutFailure();
			});
		},
		setUser({ commit, dispatch }, payloads){
			const payload = payloads;
			UserDB.doc(payload.uid).set({
				displayName: payload.displayName,
				email: payload.email,
				phoneNumber: payload.phoneNumber,
				photoURL: payload.photoURL,
				providerId: payload.providerId,
				uid: payload.uid,
				isAdmin: false
			}).then(() => {
				dispatch('getUsers', {
					uid: payload.uid
				});
				console.log(`add:${payload.uid}`);
				// commit('setUsers', payload);
			}).catch(error => {
				console.log(error)
			});
		},
		getUsers({ commit }, payloads){
			const payload = payloads;
			UserDB.doc(payload.uid).get().then(res => {
				let result = res.data();
				// payload.permits(result.isAdmin);
				commit('setUsers', result);
			}).catch(error => {
				console.log(error);
			});
		},
		gitAllUsers({ commit }){
			UserDB.get().then(res => {
				let result = [];
				res.docs.forEach(list => {
					result.push({
						displayName: list.displayName,
						email: list.email,
						phoneNumber: list.phoneNumber,
						photoURL: list.photoURL,
						providerId: list.providerId,
						uid: list.uid,
						isAdmin: list.isAdmin
					})
				})
				commit('setAllUsers', result);
			}).catch(error => {
				console.log(error);
			});
		},
		// delUser({ dispatch }, payload){
		// 	console.log(payload);
		// 	UserDB.doc(payload.docId).delete().then(Response => {
		// 		dispatch('getUsers');
		// 	}).catch(function(error) {
		// 		console.error("Error removing document: ", error);
		// 	});
		// }
	},
	mutations:{
		setUsers(state, payload){
			state.users = payload;
		},
		setAllUsers(state, payload){
			state.allUsers = payload;
		},
		initUsers(state){
			state.users = initState.users;
			// Object.keys(initState).forEach(key => {
			// 	state[key] = initState[key];
			// });
		},
		initAllUsers(state){
			state.allUsers = initState.allUsers;
		}
	}
})