import {
    SET_DB,
    SET_PRODUCTS,

} from "./mutation-types";

import DB from "../assets/test.json"
import axios from "axios";

export default {
    setProducts ({ commit }) {
        return axios.get('test.json')
            .then((res) =>{
                commit(SET_PRODUCTS, res.data.products)
            })
    },
    dbInit({ commit }) {
        const res = DB
        const data = res.data.map(d=> ({
            city: d.city,
            country: d.country,
            video_id: d.video_id,
        }))
        commit(SET_DB,data)
    }
}
