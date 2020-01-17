import React from 'react';
import PropTypes from 'prop-types';
import { IinputsType } from '../../types/interfaces'; // eslint-disable-line no-unused-vars
import './AuthForm.css';

interface AuthFormProps {
  inputs: IinputsType,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errorMsg: string,
}

const AuthForm: React.SFC<AuthFormProps> = ({
  inputs,
  handleSubmit,
  handleChange,
  errorMsg,
}) => {
  function getType(key: string) {
    if (key === 'password') return 'password';
    if (key === 'email') return 'email';
    return 'text';
  }
  const inputsJSX = Object.keys(inputs).map((key: string) => (
    <input
      type={getType(key)}
      name={key}
      key={key}
      onChange={handleChange}
      value={inputs[key]}
      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
      autoComplete="off"
      required
    />
  ));

  return (
    <div>
      <form
        id="login-form"
        onSubmit={handleSubmit}
      >
        {inputsJSX}
        <button className="submit" type="submit">{inputsJSX.length > 2 ? 'Sign Up' : 'Login'}</button>
      </form>
      <div id="error-container"><p>{errorMsg}</p></div>
    </div>
  );
};

AuthForm.propTypes = {
  inputs: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default AuthForm;
