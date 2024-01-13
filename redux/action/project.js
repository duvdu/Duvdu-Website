// import fetch from 'isomorphic-unfetch'
import filterprojectList from '../../util/filterproject'
import searchItemsByText from '../../util/searchItemsByText'
import * as Types from '../constants/actionTypes'

// Fetch project fetchProjects
export const fetchProjects = (searchTerm, url, filters) => async dispatch => {
    try {

        const sendRequest = await fetch(url)
        const data = await sendRequest.json()

        window.projects = data

        const searchedItems = searchItemsByText(searchTerm, data)
        const filteredList = filterprojectList(searchedItems, filters)

        dispatch({
            type: Types.FETCHED_PROJECT,
            payload: { projects: filteredList }
        })

    } catch (error) {
        console.log(error)
    }

}


// Fetch More project 
export const fetchMoreproject = (url, total) => async dispatch => {
    try {

        const sendRequest = await fetch(url)
        const data = await sendRequest.json()

        // const searchedItems = searchItemsByText(searchTerm,data)
        // const filteredList  = filterprojectList(searchedItems,filters)

        dispatch({
            type: Types.FETCHED_MORE_PROJECT,
            payload: { projects: data, total }
        })

    } catch (error) {
        console.log(error)
    }

}


// Fetch project By Catagory

export const fetchByCatagory = async (url, filters) => {
    try {

        const sendRequest = await fetch(url)
        const data = await sendRequest.json()
        const filteredList = filterprojectList(data, filters)

        return filteredList

    } catch (error) {
        console.log(error)
    }
}