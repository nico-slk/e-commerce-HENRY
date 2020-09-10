import { GET_ALL_CATEGORIES, DELETE_CATEGORY, EDIT_CATEGORY } from './constants';

//------------  CATEGORIAS  -----------------------------------------------------------

export function getAllCategories() {
    return function(dispatch){
        return fetch(`http://localhost:3001/categories`, {
            credentials: 'include'
        })
        .then((r) => r.json())
        .then((data) => {
            dispatch({type: GET_ALL_CATEGORIES, payload: data})
        })
        .catch((error) => {console.log(error)})
    }
}

//------------ ELIMINA UNA CATEGORIA  -----------------------------

export function onDeleteCategory(CategoryId) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/categories/${CategoryId}`, {
        method: 'DELETE',
        body: JSON.stringify({ id : CategoryId }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        console.info("fetch delete category")
        dispatch({type: DELETE_CATEGORY, payload: res})
        window.location = "/Admin/CrudCategory";
    })
    .catch(err => console.error(err))
    }
}

//---------------EDITAR UNA CATEGORIA---------------------------------------------------------
    export function editCategory(category){
        return function(dispatch) {
            return fetch(`http://localhost:3001/categories/${category.id}`, {
                method: 'PUT',
                body: JSON.stringify(category),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(res => {
                dispatch({type: EDIT_CATEGORY, payload: res})
            }).catch(err => console.error(err))
        }
    }

    //----------------- NewCategory ------------------
    export function addCategory(category){
        return function(dispatch) {
            return fetch(`http://localhost:3001/categories/`, {
                method: 'POST',
                body: JSON.stringify(category),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(res => {
                console.info(res)
                dispatch({type: GET_ALL_CATEGORIES, payload: res })

            }).catch(err => console.log(err))
        }
    }
