import {
    ADD_FARM,
    SET_CURRENT_FARM,
    SET_FARM_LIST,
    SET_CURRENT_SENSOR,
    SET_SENSOR_DATA,
    ADD_SENSOR_DATA
} from "./actionConstant";



export const setFarmList = (farms) => {
    return {
        type: SET_FARM_LIST,
        farms,
    }
}

export const addFarm = (farm) => {
    return {
        type: ADD_FARM,
        farm,
    }
}

export const currentFarm = (current) => {
    return {
        type: SET_CURRENT_FARM,
        current,
    }
}

export const currentSensor = (current) => {
    return {
        type: SET_CURRENT_SENSOR,
        current,
    }
}

export const sensorData = (data) => {
    return {
        type: SET_SENSOR_DATA,
        data,
    }
}

export const addSensorData = (data) => {
    return {
        type: ADD_SENSOR_DATA,
        data,
    }
}









