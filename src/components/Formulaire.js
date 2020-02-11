import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { renderLogin } from '../utils/helpers';

const flag = renderLogin();

class Formulaire extends Component {
    
    state = {
        message: '',
        length: this.props.length,
        flag: flag
    }

    createMessage = () => {
        const { addMessage, pseudo, length } = this.props;
        const message = {
            pseudo,
            message: this.state.message
        }

        // console.log(this.state.message)
        //si message superieur a 1 char alors on l'affiche
        if (this.state.message.length > 1) {
            if ((this.state.message.replace(/\s/g,"") !== "")) //Check si str ne contient que des whitespaces
                addMessage(message);

            // console.log(`Envoi du message : ${message.message}`)
        }

        //Reset la boite de dialogue
        this.setState({ message: '', length })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.createMessage();
    }

    handleChange = event => {
        const message = event.target.value
        const length = this.props.length - message.length
        this.setState({ message, length })
    }

    handleKeyUp = event => {
        // console.log(event.key)
        if (event.key === 'Enter'){
            this.createMessage()
        }
    }

    render() {

        if (!this.state.flag) {
            return <Redirect push to={`/`} ></Redirect>
        }

        return (
            <form className='form' onSubmit={ this.handleSubmit } >
                <textarea required maxLength={ this.props.length } onChange={ this.handleChange } value={ this.state.message } onKeyUp={ this.handleKeyUp } />
                <div className='info'>
                    { this.state.length }
                </div>
                <div id="savedMessages"></div>
                <button type='submit'>
                    Send
                </button>
            </form>
        );
    }
}

export default Formulaire;
