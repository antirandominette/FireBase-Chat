import React from 'react';
import { renderLogin } from '../utils/helpers';
import { Redirect } from 'react-router-dom';

const flag = renderLogin();

const Message = ({ pseudo, message, isUser }) => {

    if (flag === true) {

        if (isUser(pseudo)) {
            return (
                <p className = "user-message">
                    { message }
                </p>
            )
        }
        else {
            return (
                <p className = "not-user-message">
                    <span id = "username">{ pseudo }: </span> { message }
                </p>
            )
        }

    }

    else {
        return <Redirect push to={`/`}></Redirect>
    }
}

export default Message;
