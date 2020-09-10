import React from "react";
import { Link } from "react-router-dom";


export function Admin({ categories, getCategoryProducts, getAllProducts }) {

  return (
      <div className="container mt-4">
             <div className="btn-group" role="group" aria-label="Grupo de Botones">
                 <Link to="/Admin/CrudProduct"className="btn btn-sm btn-warning mx-2">Editar Productos</Link>
                 <Link to="/Admin/CrudCategory" className="btn btn-sm btn-warning mx-2">Editar Categorias</Link>
                 <Link to="/Admin/CrudUser" className="btn btn-sm btn-warning mx-2">Editar Usuarios</Link>
                 <Link to="/Admin/OrderTable" className="btn btn-sm btn-warning mx-2">Editar Ordenes</Link>
             </div>
         </div>
  );
}
