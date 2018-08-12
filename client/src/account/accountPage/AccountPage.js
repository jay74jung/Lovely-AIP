import React from 'react';
import axios from 'axios';

function ShowAccountInfo(props) {
	if (props.isRetrieved) {
		return (
			<div>
				<div style={{
					display: 'flex', textAlign: 'center', width: '100px', height: '100px', backgroundColor: 'gray', color: 'white', borderRadius: '50px', margin: '70px',
				}}>Avatar</div>
				<p>Username: {props.username}</p>
				<label>Email: {props.email}</label>
				<div>Favourite Books:</div>
				<div>...</div>
			</div>);
	}
	return <div>PLEASE LOG IN</div>;
}

class AccountPage extends React.Component {
  state = {
    username: '',
    email: '',
    isRetrieved: false, // TODO: when it is true at first, the empty state cannot be transfer to the state in render stagef
  };

    componentDidMount() {
		// TODO: GET IT FROM TOKEN!!!
		const URL = 'http://localhost:5000/api/users/current';
		axios.get(URL, {})
			.then(((response) => {
				if (response.status === 200) {
					console.log(response.data);

					const { name: username, email } = response.data;
					this.setState({
						username,
						email,
						isRetrieved: true,
					});
				}
			}))
			.catch((error) => {
			});
	}

	render() {
		// const {} = styles
		const { isRetrieved, username, email } = this.state;

		return <div>
			<h1>ACCOUNT INFO</h1>
			<ShowAccountInfo isRetrieved={isRetrieved} username={username} email={email}/>
		</div>;
	}
}

// const styles = {}

export default AccountPage;
