import {getApi} from '../api';

const SET_USERS = 'SET_USERS'
const SET_TODOS = 'SET_TODOS'
const IS_LOADING = 'IS_LOADING'

let initialState = {
    users: [],
    todos: [],
    loading: false
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:{
            return {
                ...state,
                users: action.users
            }
        }
        case SET_TODOS:{
            return {
                ...state,
                todos: action.todos
            }
        }
        case IS_LOADING:{
            return {
                ...state,
                loading: action.loading
            }
        }
        default:
        return state
    }
}

export const setUsers = users => ({type: SET_USERS,users})
export const setTodos = (todos,selectedId) => ({type: SET_TODOS,todos,selectedId})
export const isLoading = loading => ({type: IS_LOADING, loading})

export const getUsers = url => dispatch =>{
    dispatch(isLoading(true))
    getApi(url)
        .then(response =>{
            dispatch(setUsers(response))
            dispatch(isLoading(false))
        })
}
export const getTodos = id => dispatch =>{
    dispatch(isLoading(true))
    getApi(`todos?userId=${id}`)
        .then(response =>{
            dispatch(setTodos(response,id))
            dispatch(isLoading(false))
        })
}

export default mainReducer;