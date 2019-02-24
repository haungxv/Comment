const state = () => ({
    userLists: []
});
const mutations = {
    setAllUsers(state, val) {
        state.userLists = val;
    },
    deleteUser(state,id){
        state.userLists = state.userLists.filter(t => t.id != id)
    }
};

export default {namespaced: true, state, mutations}