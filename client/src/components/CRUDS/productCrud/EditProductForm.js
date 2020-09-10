import React from 'react';
import { withRouter } from "react-router"
import { connect } from "react-redux";
import { getAllCategories } from '../../../Redux/actions/categoriesActions'
import { editProduct } from '../../../Redux/actions/productActions'
import Checkbox from './Checkbox';


class EditProduct extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
            id: props.product.id,
            name: props.product.name,
            description: props.product.description,
            price: props.product.price,
            stock: props.product.stock,
            image1:props.product.images[2].url,
            image2:props.product.images[1].url,
            image3:props.product.images[0].url,
            category: props.product.categories
        }
        this.categories = props.categories

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCheckboxClicked= this.onCheckboxClicked.bind(this);
    }

    handleChange(e) {
       this.setState({[e.target.name]: e.target.value})

    }

    onCheckboxClicked(category, isChecked) {
        if(isChecked){
            this.setState({category: [...this.state.category, category]})
        } else {
            this.setState({
                category: this.state.category.filter(c => c.id !== category.id)
            })
        }

    }

    comparaSiHay(arreglo, obj){
        for (let i = 0; i < arreglo.length; i++) {
            if(obj.name.toUpperCase() === arreglo[i].name.toUpperCase() || obj.description.toUpperCase() === arreglo[i].description.toUpperCase()){
                return true
            }
        }
        return false
    }

    handleSubmit(e){
        e.preventDefault();
        const product = this.state;
        this.props.editProduct(product)
   }

  render() {
    // const imgOptions = ["billetera", "boom", "botas", "buda", "cohetemenem",
    // "conejo", "croma","escaleraalcielo","excalibur","horrocrux", "lorem", "manodedios",
    //  "mesa","momia", "necronomicon", "santogrial"]
    return (
    <div>
        <div className="container-fluid abs-center">
          <form onSubmit={this.handleSubmit} >
              <div className="form-group">
                  <label>Nombre:</label>
                  <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" required/>
              </div>
              <div className="form-group">
                  <label>Descripcion:</label>
                  <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                  <label>Precio:</label>
                  <input id="price" name="price" onChange={this.handleChange} value={this.state.price} className="form-control" required />
              </div>
              <div className="form-group">
                  <label>Stock:</label>
                  <input id="stock" name="stock" onChange={this.handleChange} value={this.state.stock} className="form-control" required />
              </div>

              <div className="form-group d-flex flex-column">
                <label>Imagen:</label>
                <input type="url" id="image1" name="image1" value={this.state.image1} onChange={this.handleChange} required/>
                <input type="url" id="image2" name="image2" value={this.state.image2} onChange={this.handleChange} required/>
                <input type="url" id="image3" name="image3" value={this.state.image3} onChange={this.handleChange} required/>
                </div>

              <label>Categoria:</label>
            <div className="form-check form-check-inline">
                {this.props.categories.map( category => {
                    const marcado = this.state.category.filter(c => c.id === category.id).length > 0
                    return (
                        <Checkbox key = {category.id} initialState={marcado} category={category} onChange={this.onCheckboxClicked} required />
                    )}
                )}
            </div>
            <div>
            <button type="submit" className="btn btn-warning">Editar</button>
            </div>
          </form>
          </div>
    </div>);
    }

}

function mapStateToProps(state) {
    return {
        categories: state.categories.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        editProduct: product => dispatch(editProduct(product)),
    };
}


export default connect (
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EditProduct))
