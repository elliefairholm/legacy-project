import gql from 'graphql-tag';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import AuthForm from '../../components/AuthForm/AuthForm';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

interface LoginProps {
  errorMsg: string,
  setErrorMsg: (msg: string) => void,
}

const Login: React.SFC<LoginProps> = ({ errorMsg, setErrorMsg }) => {
  const client = useApolloClient();

  const [loginInputs, setLoginInputs] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN, {
    variables: { email: loginInputs.email, password: loginInputs.password },
    errorPolicy: 'all',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await login();
    if (res.data.login) {
      localStorage.setItem('token', res.data.login);
      const { id, name, email } = res.data.login && jwtDecode(res.data.login);
      client.writeData({ data: { id, name, email } });
      setLoginInputs({ email: '', password: '' });
    } else {
      setErrorMsg('Email or password are wrong!');
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginInputs({ ...loginInputs, [name]: value });
  };

  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;
  return (
    <AuthForm
      inputs={loginInputs}
      handleSubmit={handleLogin}
      handleChange={handleLoginChange}
      errorMsg={errorMsg}
    />
  );
};

Login.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
};

export default Login;
