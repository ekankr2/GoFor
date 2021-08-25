import {
    SET_PRODUCTS,

} from "./mutation-types";

import axios from "axios";

export default {
    setProducts ({ commit }) {
        return axios.get('walk.json')
            .then((res) =>{
                commit(SET_PRODUCTS, res.data)
            })
}
}
