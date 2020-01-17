import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import SIGN_UP from './Signup.Queries';

import AuthForm from '../../components/AuthForm/AuthForm';

interface SignupProps {
  errorMsg: string,
  setErrorMsg: (msg: string) => void,
}

const Signup: React.SFC<SignupProps> = ({ errorMsg, setErrorMsg }) => {
  const client = useApolloClient();

  const [signUpInputs, setSignUpInputs] = useState({ name: '', email: '', password: '' });
  const [signup] = useMutation(SIGN_UP, {
    variables: {
      name: signUpInputs.name,
      email: signUpInputs.email,
      password: signUpInputs.password,
    },
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await signup();
    if (res.data.signup) {
      localStorage.setItem('token', res.data.signup);
      const { id, name, email } = jwtDecode(res.data.signup);
      client.writeData({ data: { id, name, email } });
      setSignUpInputs({ name: '', email: '', password: '' });
    } else {
      setErrorMsg('This email already exists!');
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignUpInputs({ ...signUpInputs, [name]: value });
  };

  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;
  return (
    <AuthForm
      inputs={signUpInputs}
      handleSubmit={handleSignUp}
      handleChange={handleSignUpChange}
      errorMsg={errorMsg}
    />
  );
};

Signup.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
};

export default Signup;
