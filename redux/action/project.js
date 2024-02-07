// import fetch from 'isomorphic-unfetch'
import filterProductList from '../../util/filterProject'
import searchItemsByText from '../../util/searchItemsByText'
import * as Types from '../constants/actionTypes'

// Fetch Product fetchProjects
export const fetchProjects = (searchTerm, url, filters) => async dispatch => {
    try {

        const sendRequest = await fetch(url)
        const data = await sendRequest.json()

        window.projects = data

        const searchedItems = searchItemsByText(searchTerm, data)
        const filteredList = filterProductList(searchedItems, filters)

        dispatch({
            type: Types.FETCHED_PROJECT,
            payload: { projects: filteredList }
        })

    } catch (error) {
        console.log(error)
    }

}


// Fetch More Product 
export const fetchMoreProduct = (url, total) => async dispatch => {
    try {

        const sendRequest = await fetch(url)
        const data = await sendRequest.json()

        // const searchedItems = searchItemsByText(searchTerm,data)
        // const filteredList  = filterProductList(searchedItems,filters)

        dispatch({
            type: Types.FETCHED_MORE_PROJECT,
            payload: { projects: data, total }
        })

    } catch (error) {
        console.log(error)
    }

}


// Fetch Product By Catagory

export const fetchByCatagory = async (url, filters) => {
    try {

        const sendRequest = await fetch(url)
        const data = await sendRequest.json()
        const filteredList = filterProductList(data, filters)

        return filteredList

    } catch (error) {
        console.log(error)
    }
}