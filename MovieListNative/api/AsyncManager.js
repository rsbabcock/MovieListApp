import React from 'react';
import {
    AsyncStorage,
} from 'react-native';

export async function saveUserId(userId){ 
    try{
        await AsyncStorage.setItem('userId', userId)
    } catch (error) {
        // Error retrieving Data
        console.log(error.message)
    }
}

export async function getUserId(){
    let userId = ''
    try{
        userId = await AsyncStorage.getItem('userId') || null
    } catch (error) {
        // error retreiving data
        console.log(error.message)
    }
    return userId
}

export async function removeUserId(){
    try {
        await AsyncStorage.removeItem('userId')
    } catch (error){
        // Error retrieving data
        console.log(error.message)
    }
}