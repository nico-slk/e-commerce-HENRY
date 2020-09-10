import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart, emptyCart, deleteProductFromCart, confirmCart } from '../../Redux/actions/cartActions';
import { getLoguedUser } from '../../Redux/actions/sessionActions';

import OrderLine from './OrderLine';
import swal from 'sweetalert';
//import GuestCart from './GuestCart'
import { Redirect } from "react-router-dom";


const confirmar = (tit, tex, tim, suc, func, total, userId, cart) => {
	swal({
		title: tit, //"¿Finalizar compra?",
		text: tex, //"¿Desea completar la compra de los productos del carrito?",
		icon: "warning",
		buttons: ["No", "Si"],
		dangerMode: true,
	})
		.then((willBuy) => {
			if (willBuy) {
				swal({
					text: suc,
					icon: "success",
					timer: tim, //"4000"
				});
			}
			if (func && willBuy) {
				//func(total, userId, cart)
				console.log("ACEPTADO")
				window.location = ('/Checkout')
			} else {
				console.log("CANCELADO")
			}
		});
}

class Order extends Component {

	componentDidMount() {
		Promise.resolve(this.props.getLoguedUser())
		.then((res) => this.props.getCart(res.id))

	}


	render() {
		const { cart, sessionUser } = this.props;
		if (!sessionUser.id) return (<Redirect to='/GuestCart' />)

		return (
			<div>
				<h1 className="d-flex justify-content-center m-3">Carrito</h1>
				<div className="">
					<table className="table table-hover">
						<thead className="text-center">
							<tr>
								<td className="font-weight-bold text-info border border-secondary bg-dark">Producto</td>
								<td className="font-weight-bold text-info border border-secondary bg-dark">Precio por unidad</td>
								<td className="font-weight-bold text-info border border-secondary bg-dark">Cantidad</td>
								<td className="font-weight-bold text-info border border-secondary bg-dark">Subtotal</td>
							</tr>
						</thead>
						<tbody className="text-center border bg-light">
							{cart.map((e) => (
								<OrderLine
									dataid={e.id}
									key={e.product.name}
									name={e.product.name}
									price={e.product.price}
									quantity={e.quantity}
									stock={e.product.stock}
									deleteProductFromCart={deleteProductFromCart}
									productId={e.product.id}
								/>
							))}
						</tbody>
					</table>
					<div className="mt-4 d-flex float-right mr-5">

						<div className="row align-items-start">
							<button className="btn btn-success" onClick={() => {

								confirmar("¿Finalizar compra?", "¿Desea completar la compra de los productos del carrito?", "4000", "Buena suerte", this.props.confirmCart, document.getElementById("total").innerHTML.slice(8), sessionUser.id, cart)
							}
							}>Confirmar compra</button>
							<button className="btn btn-danger" onClick={() => {
								confirmar("¿Vaciar carrito?", "¿Desea eliminar todos productos del carrito?", "4000", "Su compra ha sido vaciado", this.props.emptyCart, this.props.sessionUser.id)
							}}>
								Vaciar carrito
							</button>
							<h5 id="total" className="border border-success p-3 ml-auto float-right" onClick={() => console.log(document.getElementById("total").innerHTML.slice(8))}>
								Total: $
							{cart[0] ? cart.map((e) => e.quantity * e.product.price).reduce((a, b) => a + b) : 0}
							</h5>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart.cart,
		sessionUser: state.session.sessionUser,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getCart: (userId) => dispatch(getCart(userId)),
		getLoguedUser: () => dispatch(getLoguedUser()),
		emptyCart: (userId) => dispatch(emptyCart(userId)),
		deleteProductFromCart: (id) => dispatch(deleteProductFromCart(id)),
		confirmCart: (total, userId, cart) => dispatch(confirmCart(total, userId, cart))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
