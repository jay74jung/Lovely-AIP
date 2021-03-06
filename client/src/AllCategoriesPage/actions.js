import axios from 'axios';
import { showErrorMsgFromErrorObject } from '../common/utils/sweetAlert';

export const showBooksinCategoryAction = str => ({ type: 'SELECT_CATEGORY', name: str });
export const initialAllCateories = data => ({ type: 'INITIAL_ALL_CATEGORIES', allCategories: data });
export const setBooksInCategories = data => ({ type: 'SET_BOOKS_IN_CATEGORIES', booksInCategories: data });
export const clearBooksinCategoryAction = () => dispatch => dispatch({
	type: 'SELECT_CATEGORY',
	name: { mainCategories: 'All', subCategories: '' }
});

export const getAllCategories = () => (dispatch) => {
	axios.get('/categories')
		.then((response) => {
			dispatch(initialAllCateories(response.data));
		})
		.catch((error) => {
			showErrorMsgFromErrorObject(error);
		});
};

export const getBooksInCategories = (id, name) => (dispatch) => {
	dispatch(setBooksInCategories({ books: [] }));
	let requestURL = `/categories/${id}`;
	if (!id) {
		requestURL = '/books/list?page=1&pageSize=25';
	}
	axios.get(requestURL)
		.then((response) => {
			if (id && name !== response.data.name) {
				dispatch(showBooksinCategoryAction({
					mainCategories: name,
					subCategories: response.data.name,
				}));
			}
			dispatch(setBooksInCategories(response.data));
		}).catch((error) => {
		showErrorMsgFromErrorObject(error);
	});
};
