import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllProducts } from '../../../Redux/actions/productActions'
import IndividualReviewSN from "../reviewCrud/IndividualReviewSN"


export class MyReviews extends React.Component {
	componentDidMount() {
		this.props.getAllProducts(this.props.sessionUser.id)
	}
	render() {
			const { products, sessionUser } = this.props;
			return (
				<div>
					<div className="container mt-4">
					<h2 className="text-center">Mis Opiniones</h2>
				
					<table className="table table-hover" >
					<thead className="text-center ">
						<tr>							
							<th className="font-weight-bold text-info border border-secondary bg-dark">Calificacion</th>								
						</tr>
					</thead>
					<tbody className="text-center mx-auto">					
					{products[0] !== "undefined" ? (
							<div>{products.map((e) => (
								<div>{e.reviews.map((g) => {
									if (g.userId === sessionUser.id) {
										return (
											<tr className="d-flex justify-content-center" style={{width: "100%"}}>												
												{!e.reviews ? null : e.reviews.map(e => <IndividualReviewSN review={e} />)}		
											</tr>
										)
									}
								})}
								</div>
								))}
							</div>
								) : console.log("Fin Tabla")}					
					</tbody>
				</table>
						<div>
							<Link to="/Profile">
								<button type="button" className="btn btn-warning">Volver</button>
							</Link>
						</div>
					</div>
				</div>
			)
	}
}


function mapStateToProps(state) {
	return {
			sessionUser: state.session.sessionUser,
			products: state.products.products
	}
}

function mapDispatchToProps(dispatch) {
	return {
			getAllProducts: id => dispatch(getAllProducts(id)),
	};
}

export default connect(mapStateToProps,	mapDispatchToProps)(MyReviews);