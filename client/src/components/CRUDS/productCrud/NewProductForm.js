import React from "react";
import Checkbox from "./Checkbox";
import { addProduct } from "../../../Redux/actions/productActions"
import { getAllCategories } from "../../../Redux/actions/categoriesActions";
import { connect } from "react-redux";
//import { get } from "../../../../../api/src/routes/product";

export class NewProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            price: "",
            stock: "",
            image1: "https://i.picsum.photos/id/293/200/200.jpg?hmac=6YL5khsW332VGbJLkqIfYLzyXyT1kj358PA64TJtKuw",
            image2: "https://i.picsum.photos/id/848/200/200.jpg?hmac=9pGbbeC1Q-zsi7TeMrGb93-TjKBmqPVY-tYuubIIqyw",
            image3: "https://i.picsum.photos/id/468/200/200.jpg?hmac=ebOvOZemklGsjJmYIRJ4_YWUDCNNpt5bE0B7EjYJfEA",
            category: []
        }
        this.products = props.products
        this.categories = props.categories
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCheckboxClicked = this.onCheckboxClicked.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    comparaSiHay(arregloProductos, obj){
        for (let i = 0; i < arregloProductos.length; i++) {
            if(obj.name.toUpperCase() === arregloProductos[i].name.toUpperCase()) {
                return true
            }
        }
        return false
    }

    handleSubmit(e){
        e.preventDefault();
        const product = this.state;

        if(!this.comparaSiHay(this.products, product)){
            this.props.addProduct(product)
            .then(() => {
                this.setState({
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    image1: "",
                    image2: "",
                    image3: "",
                    category: []
                })
            console.log(product)    
            alert("El producto se creó correctamente")
            window.location = '/Admin/CrudProduct'
        }).catch(() => alert("Se produjo un Error al crear el Producto"))
        }else{
            alert("El producto que intentas crear ya existe")
        }
    }

    onCheckboxClicked(category, isChecked) {
        if(isChecked){
            this.setState({
                category: [...this.state.category, category.id]
            })
        } else {
            this.setState({
                category: this.state.category.filter(c => c !== category.id)
            })
        }
    }
    componentDidMount() {
        this.props.getAllCategories();
    }
    
    render() {
    //   const imgOptions = ["billetera", "boom", "botas", "buda", "cohetemenem",
    //   "conejo", "croma","escaleraalcielo","excalibur","horrocrux", "lorem", "manodedios",
    //    "mesa","momia", "necronomicon", "santogrial"]
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
                <div className="form-group">
                    <label>Precio:</label>
                    <input id="price" name="price" onChange={this.handleChange} className="form-control" value={this.state.price } required/>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input id="stock" name="stock" onChange={this.handleChange} className="form-control" value={this.state.stock} required/>
                </div>
                <div className="form-group d-flex flex-column">
                <label>Imagen:</label>
                <input type="url" id="image1" name="image1" value={this.state.image1} onChange={this.handleChange} required/>
                <input type="url" id="image2" name="image2" value={this.state.image2} onChange={this.handleChange} required/>
                <input type="url" id="image3" name="image3" value={this.state.image3} onChange={this.handleChange} required/>
                </div>
                    <label className="mr-2">Categoria:</label>
                <div className="form-check form-check-inline">
                    {this.props.categories.map( category => {
                        return (
                        <Checkbox key = {category.id} initialState={false} category={category} onChange={this.onCheckboxClicked} required/>
                        )}
                    )}
                </div>
                <button type="submit" className="btn btn-dark">Enviar</button>
            </form>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories.categories,
        products: state.products.products
    }
}

function mapDispatchToProps(dispatch) {
  return {
    addProduct: product => dispatch(addProduct(product)),
    getAllCategories: () => dispatch(getAllCategories()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProduct);
