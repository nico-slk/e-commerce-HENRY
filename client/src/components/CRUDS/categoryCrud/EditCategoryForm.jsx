import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router"
import { editCategory } from '../../../Redux/actions/categoriesActions';

class EditCategoryForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.category.id,
            name: props.category.name,
            description: props.category.description
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    comparaSiHay(arregloCategorias, obj){
        for (let i = 0; i < arregloCategorias.length; i++) {
            if(obj.name.toUpperCase() === arregloCategorias[i].name.toUpperCase() || obj.description.toUpperCase() === arregloCategorias[i].description.toUpperCase()){
                return true
            }
        }
        return false
    }

    handleSubmit(e){
        e.preventDefault();
        const category = this.state;
        this.props.editCategory(category).then(() => {
            alert("La Categoria se Editó correctamente")
            window.location = "/Admin/CrudCategory";
        }).catch(() => alert("Se produjo un error al editar"))
    }

    render() {
        return (

        <div className="container-fluid abs-center">
            <form onSubmit={this.handleSubmit} className="form-group">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" id="name" name="name" onChange={this.handleChange} className="form-control" value={this.state.name} required/>
                </div>
                <div className="form-group">
                    <label>Descripcion:</label>
                    <input type="text" id="description" name="description" onChange={this.handleChange} className="form-control" value={this.state.description} required/>
                </div>
                <div>
                <button type="submit" className="btn btn-warning">Editar</button>
                </div>
            </form>
        </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editCategory: category => dispatch(editCategory(category)),
    };
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(EditCategoryForm))
