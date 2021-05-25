import {
    ADD_FARM,
    SET_CURRENT_FARM,
    SET_FARM_LIST
} from "../actions/actionConstant";

const initilizeState= {
    farms:[],
    current:""

}

export default function farmsReducer(state=initilizeState, action){
    switch(action.type){
        case SET_FARM_LIST:
            return{
                ...state,
                farms: action.farms
            }
        
        case ADD_FARM:
            return{
                ...state,
                farms:[...state.farms,action.farm]
            }

        case SET_CURRENT_FARM:
            return{
                ...state,
                current: action.current
            }
        
        default: return state;
    }
}