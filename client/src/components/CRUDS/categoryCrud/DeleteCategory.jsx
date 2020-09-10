import React from 'react'
import { onDeleteCategory } from "../../../Redux/actions/categoriesActions"
import { connect } from "react-redux";

export function DeleteCategory({ id, onDeleteCategory }){

    function handleClick(e){
        const categoriaId = e.target.getAttribute("categoria-id")
        if (window.confirm('Presione Aceptar para eliminar categoría')){
             onDeleteCategory(categoriaId)
            .then(() => alert('La categoría fue eliminada Correctamente'))
            .catch(err => alert(`Error: ${err}`))
        }
    }

    return (
        <div className="mx-auto">
            <button className="btn btn-danger" categoria-id={id} onClick={handleClick}>Eliminar</button>
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
        onDeleteCategory: (id) => dispatch(onDeleteCategory(id)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteCategory);
