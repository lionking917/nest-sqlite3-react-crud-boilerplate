import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addMessage } from '../actions/index'

export const AddMessagePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [message, SetMessage] = useState({
      subject: '',
      detail: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addMessage({
      subject: message.subject,
      detail: message.detail,
      timestamp: new Date().getTime()
    }));
    history.push("/");
  };

  const handleOnChange = (userKey, newValue) =>{
    SetMessage({ ...message, [userKey]: newValue });
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="subject"
            >
              Subject of message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={message.subject}
              onChange={(e) => handleOnChange("subject", e.target.value)}
              type="text"
              placeholder="Enter subject"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="subject"
            >
              Detail of message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={message.detail}
              onChange={(e) => handleOnChange("detail", e.target.value)}
              type="text"
              placeholder="Enter detail"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Add Message
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};