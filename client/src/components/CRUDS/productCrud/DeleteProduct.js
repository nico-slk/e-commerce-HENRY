import React from 'react'
import { onDeleteProduct } from "../../../Redux/actions/productActions"
import { connect } from "react-redux";

export function DeleteProduct({ id, onDeleteProduct }){

    function handleClick(e){
        const productoId = e.target.getAttribute("producto-id")
        if (window.confirm('Presione Aceptar para eliminar producto')){
             onDeleteProduct(productoId)
            .then(() => alert('El producto fue eliminado Correctamente'))
            .catch(err => alert(`Error: ${err}`))
        }
    }

    return (
        <div className="mx-auto">
            <button className="btn btn-danger" onClick={handleClick} producto-id={id}>Eliminar</button>
        </div>
    )
}


//------------ REDUX --------------------------------

function mapStateToProps(state) {
    return {
        categories: state.categories.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onDeleteProduct: (id) => dispatch(onDeleteProduct(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteProduct);
