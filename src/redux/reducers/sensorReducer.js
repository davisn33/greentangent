import {
    SET_SENSOR_DATA,
    SET_CURRENT_SENSOR,
    ADD_SENSOR_DATA
} from "../actions/actionConstant";

const initilizeState= {
    sensordata:[],
    current:""

}

export default function sensorReducer(state=initilizeState, action){
    switch(action.type){
        case SET_CURRENT_SENSOR:
            return{
                ...state,
                current: action.current
            }
        
        case SET_SENSOR_DATA:
            return{
                ...state,
                sensordata:action.data
            }

        case ADD_SENSOR_DATA:
            return{
                ...state,
                sensordata:[...state.sensordata.slice(1),action.data]
            }
        default: return state;
    }
}