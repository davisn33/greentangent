import { combineReducers } from "redux";
import farmReducer from "./farmReducer";
import sensorReducer from "./sensorReducer";

const rootReducer = combineReducers({
    farmReducer,sensorReducer
})
export default rootReducer;
