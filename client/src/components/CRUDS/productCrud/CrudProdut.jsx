import React from 'react'
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import { onDeleteProduct, getProduct } from "../../../Redux/actions/productActions"
import { connect } from "react-redux";

const Crud = (props) => {
    const products = props.products
    return (
        <div className="container mt-4">
        <Link to="products/form/new" className="btn btn-success">Nuevo</Link>
        <h2 className="col-11 text-center">Edición de productos</h2>
          <table className="table table-hover">
            <thead className="text-center font-weight-bold text-info border border-secondary bg-dark">
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>

                {products.map((e, i) => (
                    <tr key={e.id}>
                            <td className="border border-info">{e.name}</td>
                            <td className="border border-info">{e.description}</td>
                            <td className="border border-info"> <Link
                                to={{
                                  pathname: `/Admin/products/${e.id}/edit`,
                                   state: { product : e }
                                }}
                                className= "btn btn-success"
                              >Editar</Link>
                              </td>
                              <td className="border border-info">
                              <DeleteProduct id={e.id} /></td>
                    </tr>
                ))}

            </tbody>
  </table>
</div>
    )
}

function mapStateToProps(state) {
  return {
      categories: state.categories.categories,
      products: state.products.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteProduct: (id) => dispatch(onDeleteProduct(id)),
    getProduct: (id) => dispatch(getProduct(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crud);
