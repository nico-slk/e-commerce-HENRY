import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { confirmCart, getCart } from "../../Redux/actions/cartActions"
import { sendEmail } from "../../Redux/actions/cartActions"
import { getLoguedUser } from "../../Redux/actions/sessionActions"

import swal from 'sweetalert';



export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      address: "",
      locality: "",
      state: "",
      typeOfCard: "credit" || "debit",
      cardName: "",
      cardNumber: "",
      cardExpiration: "",
      cardCvv: "",
    }
    this.cart = null
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
  }

  confirm = () => {
    swal({
      title: "¡Compra finalizada!",
      text: "Pago Procesado - ¡Gracias por su compra!",
      icon: "success",
      timer: "4000"
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleButtonChange(e) {
    this.setState({ typeOfCard: e.target.value });
  }
  componentDidMount() {
    console.log('checkout')
    Promise.resolve(this.props.getLoguedUser())
      .then(() => this.props.getCart(this.props.sessionUser.id))
      .then(() => this.cart = this.props.cart)
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)

    this.props.confirmCart(this.props.cart[0] ? this.props.cart.map((e) => e.quantity * e.product.price).reduce((a, b) => a + b) : 0,
      this.props.sessionUser.id, this.props.cart, this.state.locality, this.state.state)
      .then(res => {
        console.info(res)
        console.log('SE CONFIRMÓ LA COMPRA')

        this.confirm()
        console.log(this.state.email)
        console.log(this.cart)
        alert("Pago Procesado - Gracias por su compra!!");
        this.props.sendEmail(this.state.email, "creada", this.cart) //aca le paso la funcion de despachar mail
        window.location = "/Profile";


      }).catch(err => console.error(err))
  }


  render() {
    return (
      <div className="container" >
        <h4 className="text-center">Terminar Compra</h4>
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="container">
            <div className="form-group">
              <label>E-Mail:</label>
              <input type="email" id="email" name="email" onChange={this.handleChange} className="form-control" value={this.state.email} required />
            </div>
            <div className="form-group">
              <label>Dirección:</label>
              <input type="text" id="address" name="address" onChange={this.handleChange} className="form-control" value={this.state.address} required />
            </div>
            <div class="row">
              <div className="col-md-6">
                <label>Localidad:</label>
                <input type="text" id="locality" name="locality" onChange={this.handleChange} className="form-control" value={this.state.locality} required />
              </div>
              <div className="col-md-6">
                <label>Provincia/Estado:</label>
                <input type="text" id="state" name="state" onChange={this.handleChange} className="form-control" value={this.state.state} required />
              </div>
            </div>

            <h4>Total $ {this.props.cart[0] ? this.props.cart.map((e) => e.quantity * e.product.price).reduce((a, b) => a + b) : 0}</h4>


            <h4 class="mb-3">Forma de Pago</h4>
            <div class="d-block my-3">
              <div className="container row">
                <div class="custom-control custom-radio mr-4">
                  <input id="credit" name="paymentMethod" type="radio" checked={this.state.typeOfCard === "credit"} onChange={this.handleButtonChange} value="credit" class="custom-control-input" required />
                  <label class="custom-control-label" name="credit" for="credit">Credito</label>
                </div>
                <div class="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" checked={this.state.typeOfCard === "debit"} onChange={this.handleButtonChange} value="debit" class="custom-control-input" required />
                  <label class="custom-control-label" name="debit" for="debit">Debito</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Nombre completo</label>
                <input type="text" class="form-control" name="cardName" onChange={this.handleChange} id="cc-name" value={this.state.cardName} placeholder="" required />
                <small class="text-muted">Nombre completo como sale en la Tarjeta</small>
                <div class="invalid-feedback">
                  El nombre es Requerido
            </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Numero de Tarjeta</label>
                <input type="number" min="13" class="form-control" name="cardNumber" onChange={this.handleChange} id="cc-number" value={this.state.cardNumber} placeholder="" required />
                <div class="invalid-feedback">
                  El numero de la tarjeta es requerido
            </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Vencimiento</label>
                <input type="date" class="form-control" name="cardExpiration"  min="2020-08-01" onChange={this.handleChange} value={this.state.cardExpiration} id="cc-expiration" placeholder="" required />
                <div class="invalid-feedback">
                  Fecha de vencimiento requerida
            </div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-cvv">CVV</label>
                <input type="number" class="form-control" name="cardCvv" min="3" onChange={this.handleChange} id="cc-cvv" value={this.state.cardCvv} placeholder="" required />
                <div class="invalid-feedback">
                  Codigo de Seguridad Requerido
            </div>
              </div>
            </div>
            <hr class="mb-4" />
            <div className="row">
              <Link to="/Order" className="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                <input type="submit" className="btn btn-danger btn-lg btn-block" value="Cancelar" />
              </Link>
              <div className="col-md-6 col-sm-6 col-xs-6 pad-adjust">
                <button class="btn btn-success btn-lg btn-block" type="submit" >Finalizar Compra</button>
              </div>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    sessionUser: state.session.sessionUser,
    cart: state.cart.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    confirmCart: (total, userId, cart, address, locality) => dispatch(confirmCart(total, userId, cart, address, locality)),
    getCart: (userId) => dispatch(getCart(userId)),
    sendEmail: (email, tipo, cart) => dispatch(sendEmail(email, tipo, cart)),
    getLoguedUser: () => dispatch(getLoguedUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
