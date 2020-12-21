import React from "react";
import EmailContentManager from "./EmailContentManager.js";

export default class AppManager extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error:null,
			loggedIn: false,
			attemptDenied: false,
			attemptingLogin: false,
			user: {username: "", password:""}
		}
	}
	onChange(e) {
		const target = e.target;
		const value = target.value;
		const user = this.state.user;
		user[target.name] = value;
		this.setState({user:user});
	}

	logout(){
		fetch("https://www.emailenzo.com/customer/infinance/backend/custom.php?api=logout", 
			{ method: 'POST', credentials: "include" })
		.then(result => result.json())
		.then(result => { 
			console.log(result);
		});
		this.setState({loggedIn:false});
	}

	attemptLogin(e) {
		e.preventDefault();
		this.setState({attemptingLogin:true});
		fetch("https://www.emailenzo.com/customer/infinance/backend/custom.php?api=login", 
			{ method: 'POST', credentials: "include", body: JSON.stringify(this.state.user) })
		.then(result => result.json())
		.then(result => { 
			console.log(result);
			if (result.status === "success") { this.setState({ loggedIn: true, attemptingLogin: false, user: result.data}); }
			else { this.setState({ attemptDenied: true, user: {username:this.state.user.username,password:""}, attemptingLogin: false});}
		},
		error  => { this.setState({ isLoaded: true, error }); })

	}


	render() {



		if (this.state.loggedIn) {
			return (
				<div className="page content">
				<div className="page_container">
				<div>
				{this.state.user.username !== null && <div>Hi {this.state.user.username}!</div> }

				<div>
				<input type="button" className="button_logout" onClick={this.logout.bind(this)} value="Uitloggen"/>
				</div>

				</div>
					{/* MEMBER PAGE CONTENT GOES HERE  */}
					<EmailContentManager /> 
				</div>
			</div>);


		} else if (!this.state.loggedIn) {
			return (
				<div className="page login">
				<div className="page_container">
				{this.state.attemptDenied &&	!this.state.attemptingLogin && <div className="dashboard-message danger">Oeps, verkeerde gebruikersnaam en/of wachtwoord. Probeer het opnieuw.</div> }
				{!this.state.attemptDenied &&	!this.state.attemptingLogin &&  <div className="dashboard-message neutral">Welkom. Meld je hieronder aan.</div> }
				{this.state.attemptingLogin && <div className="dashboard-message loading">Verifiëren</div> }
				<form className={"login-form " + (this.state.attemptingLogin ? "blur":"") } onSubmit={(e) => this.attemptLogin(e)}>

				<div className="login-fields">

					<div className="login-field">
						Gebruikersnaam <input type="text" value={this.state.user.username} name="username" onChange={(e) => this.onChange(e)} required={true}/>
					</div>

					<div className="login-field">
						Wachtwoord <input type="password" value={this.state.user.password} name="password" onChange={(e) => this.onChange(e)} required={true}/>
					</div>

				</div>

				<input type="submit" value="Inloggen"  disabled={this.state.attemptingLogin}/>
				</form>
				</div>
				</div>);
		}

	}
}