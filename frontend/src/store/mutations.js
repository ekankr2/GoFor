import {
    SET_PRODUCTS
} from "./mutation-types";

export default {
    [SET_PRODUCTS](state, products){
        state.products = products;
    }
}
