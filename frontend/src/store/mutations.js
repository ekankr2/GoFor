import {
    SET_PRODUCTS,
    SET_DB
} from "./mutation-types";

export default {
    [SET_PRODUCTS](state, products){
        state.products = products;
    },
    [SET_DB](state, data) {
        state.db = data;
    }
}
