import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getOrders } from "../../../Redux/actions/orderActions";


export class PurchaseState extends React.Component {
    
    
	componentDidMount() {
		this.props.getOrders(this.props.sessionUser.id)        
	}

	render() {
			console.log(this.props.orders)
			return (
				<div>
					{!!this.props.orders ? (
						<div>
							<table className="table table-hover table responsive container">
								<thead className="text-center">
									<tr className="font-weight-bold text-info border border-secondary bg-dark">
										<th>Nombre</th>
										<th>Descripción</th>
										<th>Categoria</th>
										<th>Reviews</th>
										<th>Precio</th>
										<th>Cantidad</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody className="text-center mx-auto">
										{!!this.props.orders.orderLines ?
										this.props.orders.orderLines.map((e) => (                                        
											<tr>
												<td className=" justify-content-center border border-info ">{e.product.name}</td>
												<td className=" justify-content-center border border-info ">{e.product.description}</td>
												<td className=" justify-content-center border border-info ">{e.product.categories.map((c) => (<p>{c.name}, </p>))}</td>
												<td className=" justify-content-center border border-info ">{e.product.reviews.map((r) => (
													<div>
														<button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#order${r.id}`} >Detalles</button>
														<div className="modal fade" id={'order' + r.id} role="dialog">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-body">
																		<table>
																			<thead>
																				<tr>
																					<th>Descripción</th>
																				</tr>
																			</thead>
																			<tbody>
																				<td>
																					<h6>{r.description}</h6>
																				</td>
																			</tbody>
																		</table>
																	</div>
																	<div className="modal-footer">
																		<button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}</td>
												<td className=" justify-content-center border border-info ">{e.product.price}</td>
												<td className=" justify-content-center border border-info ">{e.quantity}</td>
												<td className=" justify-content-center border border-info ">{e.quantity * e.product.price}</td>
											</tr>
										)) : false}
								</tbody>
							</table>
						</div>
					) : false}
						<div className="container">
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
		sessionUser: state.session.sessionUser,
		orders: state.orders.orders
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getOrders: id => dispatch(getOrders(id)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PurchaseState);
