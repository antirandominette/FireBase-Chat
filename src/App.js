import React, { Component, createRef } from 'react';
import './App.css';
import Formulaire from './components/Formulaire';
import Message from './components/Message';
import base from './base';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css';
import { Redirect } from 'react-router-dom';
import { renderLogin } from './utils/helpers';

const flag = renderLogin();
const limitMessages = `-100`;

class App extends Component {
  
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo,
  }

  messagesRef = createRef()

  componentDidMount() {
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  //garder le scroll sur le dernier message
  componentDidUpdate() {
    const ref = this.messagesRef.current;
    ref.scrollTop = ref.scrollHeight;
  }

  addMessage = message => {
    const messages = { ...this.state.messages }

    messages[`message-${Date.now()}`] = message
    Object
      .keys(messages)
      .slice(0, limitMessages)
      .forEach(key => {
        messages[key] = null
      })

      this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo


  render () {

    if (flag === false) {
      console.log(`PAGE NOT ACCESSIBLE`);
      return <Redirect push to={`/`}></Redirect>
    }

    else if (flag === true) {

      setTimeout(function() {
        const warningMess = document.querySelector(`#savedMessages`);

        warningMess.textContent =   `Max number of messages stored in the DB :  ${limitMessages.substr(1)}`;
      }, 150);

      const messages = Object
        .keys(this.state.messages)
        .map(key => (

        <CSSTransition key = { key } timeout={ 200 } classNames='fade' >
          <Message isUser = { this.isUser }
                   pseudo = { this.state.messages[key].pseudo }
                   message = { this.state.messages[key].message } />
        </CSSTransition>
      ))

      return (
        <div className='box' >
          <div>
            <div className="messages" ref = { this.messagesRef }>
              <TransitionGroup className="message">
                { messages }
              </TransitionGroup>
            </div>
          </div>
          <Formulaire length={ 1000 } pseudo={ this.state.pseudo } addMessage={ this.addMessage } />
        </div>
      )
    }
  }
}

export default App