export const API_KEY = 'AIzaSyDLh9DCM1SFODRCbwIDL11f4_ZmZqfBAHE';

export const value_counter = (value) =>{
    if(value>=1000000){
        return Math.floor(value/1000000) + "M"
    }else if(value>=1000){
        return Math.floor(value/1000) + "K"
    }else{
        return value
    }
}