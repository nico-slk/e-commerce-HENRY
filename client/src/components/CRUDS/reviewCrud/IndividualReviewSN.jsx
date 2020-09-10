import React from 'react'
import { MDBIcon } from 'mdbreact';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const IndividualReviewSN = ({review}) => {
	let stars = []
	for(let i = 0; i < Math.floor(review.rating); i++){
		stars.push(['thumbs-up', "text-warning mr-1"])
	}
	for(let j = stars.length; j < 5; j++){
		stars.push(["thumbs-up", "text-dark mr-1"])
	}

	console.log(review.productId)

	return (
		<tr className="d-flex justify-content-center "style={{width: "100%"}}>			
			<td className=" justify-content-center border border-info "style={{width: "60%"}}>{review.description}</td>
			<td className=" justify-content-center border border-info "style={{width: "20%"}}>{stars.map(e =>  <span><MDBIcon icon={e[0]} className={e[1]} /></span>)}</td>
			<td className=" justify-content-center border border-info "style={{width: "20%"}}>{moment(review.updatedAt).format('l')} <span>{moment(review.updatedAt).format('LT')}</span></td>
		</tr>
	)
}

export default IndividualReviewSN
