import React, { Component } from 'react';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState( { loading: true } );
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
	}

	render () {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="your name" />
				<input className={classes.Input} type="text" name="email" placeholder="your email" />
				<input className={classes.Input} type="text" name="street" placeholder="street" />
				<input className={classes.Input} type="text" name="postalCode" placeholder="postal code" />
				<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
		 	</form>
		);
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
			 	<h4>Enter Your Contact Data</h4>
			 	{form}
			</div>
		);
	}
}


export default ContactData;