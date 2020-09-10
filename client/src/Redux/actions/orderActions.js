import { GET_ALL_ORDERS_USERS, GET_ORDERS } from './constants';

export function getAllOrders() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/order/all/users`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => dispatch({ type: GET_ALL_ORDERS_USERS, payload: data }))
            .catch((error) => { console.log(error) })
    }
}


//-----------------------Editar Estado de Order------------------------
export function editOrder(order) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/order/${order.id}`, {
            method: 'PUT',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => dispatch(getAllOrders()))
    }
}

//----------------------- Obtener order por ID ------------------------

export function getOrders(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/order/${id}`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => dispatch({ type: GET_ORDERS, payload: data }))
            .catch((error) => { console.log(error) })
    }
}

//----------------------- Obtener órdenes por orderStatus------------------------

export function getOrdersByStatus(orderStatus){
    return function (dispatch) {
        return fetch(`http://localhost:3001/order/?orderStatus=${orderStatus}`, {
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((data) => dispatch({ type: GET_ALL_ORDERS_USERS, payload: data }))
            .catch((error) => { console.log(error) })
    }
}