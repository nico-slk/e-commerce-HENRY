import { GET_PRODUCTS, SET_DETAILS, DELETE_PRODUCT, EDIT_PRODUCT, GET_ALL_REVIEWS } from './constants';


//------------  PRODUCTOS BUSCADOS  -----------------------------------------------------------

export function getSearchedProducts(keyword) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/search?query=${keyword}`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => {
                dispatch({ type: GET_PRODUCTS, payload: data })
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

//------------  PRODUCTOS DE X CATEGORIA  -----------------------------------------------------------

export function getCategoryProducts(category) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/categories/${category}`, {
            credentials: 'include'
        })
            .then(r => r.json())
            .then(data => {
                dispatch({ type: GET_PRODUCTS, payload: data.products })
            })
            .catch(error => console.log(error))
    }
}

//------------ PRODUCTO EN DETALLE  -----------------------------------------------------------

export function toProductDetails(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products/${id}`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => {
                // console.log(data)
                dispatch({ type: SET_DETAILS, payload: data })
            })
            .catch((error) => {
                alert(error);
            });
    }
}

//------------ TODOS LOS PRODUCTOS  -----------------------------------------------------------

export function getAllProducts() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => {
                console.log('allProducts:', data);
                dispatch({ type: GET_PRODUCTS, payload: data })
            })
            .catch((error) => { console.log(error) })
    }
}

//------------ ELIMINAR UN PRODUCTO --------------------------------------------------

export function onDeleteProduct(ProductId) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products/${ProductId}`, {
            method: 'DELETE',
            body: JSON.stringify({ id: ProductId }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            dispatch({ type: DELETE_PRODUCT, payload: res })
            alert("El Producto se ha Eliminado correctamente")
            window.location = "/Admin/CrudProduct";
        })
            .catch(err => console.error(err))
    }
}

//---------------EDITAR UN PRODUCTO---------------------------------------------------------
export function editProduct(product) {
    console.info('productActions product:', product)
    return function (dispatch) {
        return fetch(`http://localhost:3001/products/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            if (res.ok) {
                dispatch({ type: EDIT_PRODUCT, payload: res })
                alert("El Producto se Editó correctamente")
                window.location = "/Admin/CrudProduct";
            } else {
                if (res.status === 403) {
                    console.log(res)
                    //window.location = "/login";
                }

            }
        }).catch(err => console.error(err))
    }
}

//----------------------------
export function getProduct(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products/${id}`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => {
                console.log('getProduct:', data);
                dispatch({ type: GET_PRODUCTS, payload: data })
            })
            .catch((error) => {
                alert(error);
            });
    }
}

//------------------Creat Producto
export function addProduct(product) {
    const url = 'http://localhost:3001/products/';
    return function (dispatch) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                console.info("producto creado")
                dispatch({ type: GET_PRODUCTS, payload: res })

            }).catch(err => console.error(err))
    }
}

//---------------------------- Crear una review

export function addReview(prodId, reviewState) {
    const url = `http://localhost:3001/products/${prodId}/review/`;
    console.log("ID DEL PRODUCTO " + prodId)
    console.log("REVIEW DEL PRODUCTO " + reviewState.rating + " " + reviewState.description)
    return function (dispatch) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(reviewState),

            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                console.info("review creada")
                dispatch({ type: GET_ALL_REVIEWS, payload: res })

            }).catch(err => console.error(err))
    }
}

//---------------------------- Obtener todas las Reviews según ID del usuario
export function getUserReviews(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products/${id}/userReview/`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => {
                console.log('get user review:', data);
                dispatch({ type: GET_ALL_REVIEWS, payload: data })
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

//---------------------------- Obtener todas las Reviews según ID del producto
export function getProductReviews(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/products/${id}/review/`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => {
                console.log('get product review:', data);
                dispatch({ type: GET_ALL_REVIEWS, payload: data })
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
