import React from 'react'
import { connect } from 'react-redux';
import { addReview, toProductDetails } from "../../../Redux/actions/productActions";
import swal from 'sweetalert';
import RatingThumbs from "./Rating";


//S58
export class Review extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rating: 0,
			description: '',
			userId: this.props.sessionUser.id
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRating = this.handleRating.bind(this);
	}
	complete() {
		swal({
			title: "Enviado", text: "El comentario ha sido enviado con exito", icon: "success", timer: "4000",
		})
	}

    handleChange(e) {
			this.setState({ [e.target.name]: e.target.value })
			
    }
    handleRating(event) {
		console.log(event)
		this.setState({ rating: event })
	}
		
    handleSubmit(e) {
			e.preventDefault();
			if(this.state.rating === 0) return swal({text: "Por favor puntuá el producto", icon: "warning"})			
			this.props.addReview(this.props.productDetails.id, this.state)
				.then(res => {										
					console.info(res)
					this.complete()
					window.location.reload()
				}).catch(err => console.error(err))
    }

	render() {
		let wasBought = false
		if (this.props.productByUser) wasBought = this.props.productByUser.includes(this.props.productDetails.id)
		let indexReview = -1
		if(this.props.productDetails.reviews) indexReview = Number(this.props.productDetails.reviews.findIndex((e)=> Number(e.userId)=== Number(this.props.sessionUser.id)))
		return (
			<div>
				{indexReview === -1 && this.props.sessionUser.id && wasBought ? (<div>
					<form onSubmit={this.handleSubmit} className="form-group">
						<RatingThumbs clickHandler={this.handleRating} />
						<label>Escriba su comentario. </label>
						<input type="textarea" minlength="10" id="state" name="description" onChange={this.handleChange} className="form-control" value={this.state.description} required />
						<div>
							<button type="submit" className="btn btn-warning">Enviar</button>
						</div>
					</form>
				</div>) : false}
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		sessionUser: state.session.sessionUser,
		productByUser: state.session.productsPurchased,
		productDetails: state.products.productDetails		
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addReview: (id, r) => dispatch(addReview(id, r)),
		toProductDetails: prodId => dispatch(toProductDetails(prodId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
