import React, {useState} from 'react'
import { connect } from 'react-redux';
import { editQuantity, deleteProductFromCart, deleteProductFromGuestCart } from '../../Redux/actions/cartActions';
import swal from 'sweetalert';
// import Order from '../components/Order';

const confirmar = (tim, fun, dat, prodName) => {
	swal({
		title: "Remover producto del carrito",
		text: `¿Desea eliminar el producto ${prodName} del carrito?`,
		icon: "warning",
		buttons: ["No", "Si"],
		dangerMode: true,
	})
		.then((willBuy) => {
			if (willBuy) {
				swal({
					text: `El producto ${prodName} ha sido eliminado del carrito.`,
					icon: "success",
					timer: tim, //"4000"
				});
			}
			if (willBuy) {
				console.log("ACEPTADO")
				fun(dat)
			} else {
				console.log("CANCELADO")
			}
		});
}

export function OrderLine ({ sessionUser, position, dataid, name, price, quantity, deleteProductFromGuestCart, deleteProductFromCart, editQuantity, stock, productId }){
let [counter, setCounter ] = useState(quantity)
const handleChange = (e) => {
	if(e.target.value > stock) alert(`Actualmente solamente poseemos ${stock} unidades de este producto`)
	else {
		setCounter(e.target.value)
		if(sessionUser.id) editQuantity(dataid, e.target.value, sessionUser.id)
		else {
			let cart = (JSON.parse(localStorage.getItem('guestCart')))
			cart[position].quantity = e.target.value
			window.localStorage.setItem('guestCart', JSON.stringify(cart))
		}
}
}
	const handleDelete = (arg) => {

		if(sessionUser.id) return deleteProductFromCart(arg)
		else return deleteProductFromGuestCart(arg)
	}

		return (
		<tr>
			<td role="button" className="border border-info cursor:pointer;" onClick={() => window.location =`/products/${productId}`}>{name}</td>
			<td className="border border-info">$ {price}</td>
			<td className="border border-info"><input className="text-right" style={{width: "80px"}}  type="number" min="1" max={stock} oninput="validity.valid||(value='');" value={counter} onChange={handleChange}/>
			<i data-id={dataid} style={{ fontSize: "1.4em"}} role="button" className="ml-3 far fa-trash-alt text-danger"
			onClick={(e) => { confirmar("4000", handleDelete, e.target.getAttribute('data-id'), name)}}></i></td>
			<td className="border border-info subtotal">{counter * price}</td>
		</tr>
		)

}


function mapStateToProps(state) {
	return {
		productDetails: state.products.productDetails,
		sessionUser: state.session.sessionUser,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		deleteProductFromCart: (id) => dispatch(deleteProductFromCart(id)),
		deleteProductFromGuestCart: (id) => dispatch(deleteProductFromGuestCart(id)),
		editQuantity: (orderLineId, quantity, userId) => dispatch(editQuantity(orderLineId, quantity, userId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderLine);
