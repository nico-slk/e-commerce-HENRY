import React from 'react'
import IndividualReview from "./IndividualReview"
import { connect } from 'react-redux'
import Review from "./Review";

export const ProductReview = ({reviews, id}) => {
	
	return (
		<div className= {!reviews ? null : "border border-secondary m-auto m-0 shadow p-3 mb-5 bg-white rounded mt-4"} style={{width: "900px"}}>
			<h3>Opiniones sobre el producto</h3>                    
			<Review product={id} />
			{!reviews ? null : reviews.map(e => <IndividualReview review={e} />)}
		</div>
	)
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview)
