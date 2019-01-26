import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import { getStoreAccessors } from "vuex-typescript";


interface RootState { }

// variables
const state: RootState = { };

// stuff that alters the state
const mutations = { 
    mutate(state: RootState, index: number) {
        return;
    }
};

const getters = { 
    get(state: RootState) {

    }
};

// don;t change state, they can be async
const actions = { 
    action(context: ActionContext<RootState, RootState>, params: { thing: number, stuff: string }) {

    }
};

Vue.use(Vuex);
const { commit, read, dispatch } = getStoreAccessors<RootState, RootState>('');
const store = new Vuex.Store({ state, mutations, getters, actions });
export default store;


export const mutate = (index: number) => commit(mutations.mutate)(store, index);

export const get = () => read(getters.get)(store);

export const save = (thing: number, stuff: string) => dispatch(actions.action)(store, { thing, stuff });
