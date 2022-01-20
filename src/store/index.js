import Vue from 'vue'
import Vuex from 'vuex';
import {getItem,setItem} from '@/utils/storage'
Vue.use(Vuex)
// 响应动作的actions
const USER_KEY="adk-user"

const actions={
    setUser({commit},user){
        commit('SETUSER',user);
    }
}

//操作数据的mutations
const mutations={
    SETUSER(state,user){
        state.user=user;
        // 需要进行持久化
        setItem(USER_KEY,state.user)
    },
    ADDCACHEPAGE(state,pageName){
        if(!state.cachePages.includes(pageName)){
            state.cachePages.push(pageName);
        }
    },
    REMOVECACHEPAGE(state,pageName){
        const index= state.cachePages.indexOf(pageName);
        if(index!==-1){
            state.cachePages.splice(index,1);
        }
    }
}

// 准备state
const state={
    user:getItem(USER_KEY),
    cachePages:['layout']
}

const getters={

}
//创建store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})