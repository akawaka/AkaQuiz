// src/components/AuthenticationModal.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from "../supabaseClient";
import Modal from './foundations/Modal';
import Input from './foundations/Input';
import Button from './foundations/Button';
import Alert from './foundations/Alert';

const AuthenticationModal = ({ onClose, onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      setSuccessMessage('Connexion réussie!');
      setTimeout(() => {
        onAuthenticated(data.user);
        onClose();
      }, 1000);
    }
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      const user = data.user;
      const { error: updateError } = await supabase.auth.updateUser({
        data: { display_name: username },
      });

      if (updateError) {
        setAuthError(updateError.message);
      } else {
        setSuccessMessage('Inscription réussie!');
        setTimeout(() => {
          onAuthenticated(user, username);
          onClose();
        }, 1000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <>
      {authError && (
        <Alert
          type="error"
          title="Erreur"
          description={authError}
          autoDismissTime={3000}
        />
      )}
      {successMessage && (
        <Alert
          type="success"
          title="Succès"
          description={successMessage}
          autoDismissTime={1000}
        />
      )}
      <Modal
        title={`${isLogin ? 'Se connecter' : 'S\'inscrire'} pour enregistrer votre score`}
        content=""
        onClose={onClose}
      >
        <form className="flex flex-col items-center w-full pt-4 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              label={isLogin ? 'Login' : 'Sign Up'}
              variant="primary"
              onClick={handleSubmit}
            />
          </div>
        </form>
        <p
          className="mt-8 text-red-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </p>
      </Modal>
    </>
  );
};

AuthenticationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuthenticated: PropTypes.func.isRequired,
};

export default AuthenticationModal;
