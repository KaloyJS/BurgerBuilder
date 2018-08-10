import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
	 
	 try {
	 	const response = yield axios.get( 'https://react-my-burger-83912.firebaseio.com/ingredients.json' );
	 	yield put(actions.setIngredients(response.data));
	 } catch (error) {
	 	yield put(actions.fetchIngredientsFailed());
	 }
	    
}