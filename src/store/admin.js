import initState from './initState';
import { DB, Auth } from '@/services/firbase.config';
const UserDB = DB.collection('users');

export default {
  state: {
    allUser: []
  },
  actions:{
    getAllUser({ commit }) {
      UserDB.get().then(res => {
        let result = [];
        res.docs.forEach(list => {
          result.push({
            displayName: list.data().displayName,
            email: list.data().email,
            phoneNumber: list.data().phoneNumber,
            photoURL: list.data().photoURL,
            providerId: list.data().providerId,
            uid: list.data().uid,
            permits: list.data().permits
          })
        })
        commit('setAllUsers', result);
      }).catch(error => {
        console.log(error);
      }).finally(() => { });
    }
  },
  mutations:{
    setAllUsers(state, payload) {
      state.allUser = payload;
    },
    initAllUsers(state) {
      state.allUsers = initState.allUsers;
    }
  }
}