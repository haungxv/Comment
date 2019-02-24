const state = () => ({
    userLists: []
});
const mutations = {
    setAllUsers(state, val) {
        state.userLists = val;
    },
    setTotal(state, val) {
        state.articles.total = val;
    },
    subArticle(state, val) {
        state.articles.allArticle = state.articles.allArticle.filter(t => t.id != val)
        state.articles.total--;
    }
};

export default {namespaced: true, state, mutations}