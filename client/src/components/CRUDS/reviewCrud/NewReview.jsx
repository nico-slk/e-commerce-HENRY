import React from 'react';

// S59

export default class NewReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: "",
            description: ""
        }
        this.listUsers = props.listUsers
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.rating]: e.target.value,
            [e.target.description]: e.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost:3001/products/:id/review';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            this.setState({
                rating: "",
                description: ""
            });
        }).catch(err => console.log(err));
    };


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="form-group">
                    <div>
                        <label>Escribir review:</label>
                        <textarea className="review" name="review" value={this.state.description} onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                        {/* AGREGAR PARA RANKEAR EL PRODUCTO/REVIEW */}
                    </div>
                </form>
            </div>
        );
    };
};