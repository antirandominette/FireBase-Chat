import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CHAT_APP_LOGGEDIN } from '../utils/helpers';

class Connexion extends Component {

    state = {
        pseudo: '',
        password: '',
        goToChat: false,
    }

    handleChange = event => {
        const pseudo = event.target.value;
        this.setState({ pseudo });
    } 

    handlePass = event => {
        const password = event.target.value;
        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ goToChat: true });
    }

    render () {

        if (this.state.goToChat && this.state.password === '555' && this.state.pseudo.replace(/\s/g,"") !== "") {
            localStorage.setItem(CHAT_APP_LOGGEDIN, true);            
            return <Redirect push to={`/pseudo/${this.state.pseudo}`} ></Redirect>
        }

        else if ((this.state.goToChat && this.state.password !== '555' && this.state.pseudo.replace(/\s/g,"") === "") || ( this.state.goToChat && this.state.password !== '555')) {
            document.location.reload(true);
        }

        return (
            <div className='connexionBox'>
                <form className='connexion' onSubmit={this.handleSubmit}>
                    <input autoFocus type="text" placeholder='Username' required value={ this.state.pseudo } onChange={ this.handleChange } />
                    <input type="password" placeholder='Password' required value={ this.state.password } onChange={ this.handlePass }/>
                    <button type='submit'>GO</button>
                </form>
            </div>
        )
    }
}


export default Connexion;