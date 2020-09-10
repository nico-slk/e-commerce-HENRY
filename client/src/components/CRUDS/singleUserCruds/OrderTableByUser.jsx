import React from 'react';
import { connect } from 'react-redux';
import { getAllOrders, editOrder } from "../../../Redux/actions/orderActions";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

class OrderTableByUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {modal14: false}
		this.handleChange = this.handleChange.bind(this);
	}

	toggle = nr => () => {
		let modalNumber = 'modal' + nr
		this.setState({[modalNumber]: !this.state[modalNumber]});
	}

	componentDidMount() {
		this.props.getAllOrders()        
	}

	handleChange(e) {
		const orderId = Number.parseInt(e.target.getAttribute('data-order-id'))
		const order = this.props.orders.find(o => o.id === orderId)
		order.orderStatus = e.target.value

		this.props.editOrder(order)
			.then(() => alert('El estado de la orden fue modificado.'))
			.catch(err => alert(`Error: ${err}`))
	}

	render() {
		return (
			<div className="container mt-4">
				<h2 className="text-center">Lista de Ordenes</h2>
				<table className="table table-hover" >
					<thead className="text-center ">
						<tr>
							<th className="font-weight-bold text-info border border-secondary bg-dark">#</th>
							<th className="font-weight-bold text-info border border-secondary bg-dark">Status</th>							
							<th className="font-weight-bold text-info border border-secondary bg-dark"> Fecha</th>
							<th className="font-weight-bold text-info border border-secondary bg-dark">Hora</th>							
							<th className="font-weight-bold text-info border border-secondary bg-dark">Total</th>							
							<th className="font-weight-bold text-info border border-secondary bg-dark">Ver</th>
						</tr>
					</thead>
					<tbody className="text-center">					
					{!!this.props.orders ? 
					this.props.orders.filter(e => Number(e.userId) === Number(this.props.sessionUser.id)).map(order => (
							<tr key={order.id}>
									<td className="border border-info">{order.id}</td>
									<td className="border border-info">{order.orderStatus.charAt(0).toUpperCase()+order.orderStatus.slice(1)}</td>
									<td className="text-center border border-info">{order.checkoutDate ? moment(order.checkoutDate).format('l') : "-" }</td>
								<td className="text-center border border-info">{order.checkoutDate ? moment(order.checkoutDate).format('LT') : "-" }</td>
									<td className="border border-info">{order.orderLines.length > 0 ? `${order.orderLines.map(e => e.quantity * e.product.price).reduce((a, b) => a + b)}` : `$ 0`}</td>											
									<td className="border border-info">
										<button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#order${order.id}`} >Detalles</button>
										<div className="modal fade" id={'order' + order.id} role="dialog">
											<div className="modal-dialog modal-lg">
												<div className="modal-content">
													<div className="modal-body">
														<table className="table table-hover">
															<thead className="text-center">
																<tr>
																	<th className="font-weight-bold text-info border border-secondary bg-dark">Nombre del producto</th>
																	<th className="font-weight-bold text-info border border-secondary bg-dark">Cantidad</th>
																	<th className="font-weight-bold text-info border border-secondary bg-dark">Precio</th>
																	<th className="font-weight-bold text-info border border-secondary bg-dark">Total</th>																	
																</tr>
															</thead>
															{order.orderLines.map((g) => (
																<tr>
																	<td className="text-center border border-info"><Link to={`/products/${g.product.id}`}>{g.product.name}</Link></td>
																	<td className="text-center border border-info">{g.quantity}</td>
																	<td className="text-center border border-info">$ {g.product.price}</td>
																	<td className="text-center border border-info">$ {g.product.price * g.quantity}</td>
																</tr>
															))}
														</table>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
													</div>
												</div>
											</div>
										</div>
									</td>
								</tr>
						)):false
						
						}
					</tbody>
				</table>
				<div>
					<Link to="/Profile">
						<button type="button" className="btn btn-warning" >Volver</button>
					</Link>
				</div>
			</div>
		)

	}
}


function mapStateToProps(state) {
	return {
		orders: state.orders.orders,
		sessionUser: state.session.sessionUser
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllOrders: () => dispatch(getAllOrders()),		
		editOrder: (order) => dispatch(editOrder(order)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTableByUser);
