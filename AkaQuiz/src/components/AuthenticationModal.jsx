import { useState } from 'react';
import { supabase } from "../supabaseClient";
import PropTypes from "prop-types";

const AuthenticationModal = ({ onClose, onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Handle login
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      onAuthenticated(data.user);
      onClose();
    }
  };

  // Handle sign-up
  const handleSignUp = async () => {
    // Step 1: Sign up the user with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else {
      const user = data.user;

      // Step 2: Update the user profile with the username (display name)
      const { error: updateError } = await supabase.auth.updateUser({
        data: { display_name: username },
      });

      if (updateError) {
        setAuthError(updateError.message);
      } else {
        // Step 3: Pass the authenticated user and username to the parent component
        onAuthenticated(user, username);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">
          {isLogin ? 'Se connecter' : 'S\'inscrire'} pour enregistrer votre score
        </h2>

        {authError && <p className="text-red-500">{authError}</p>}

        {/* Only show username field for sign-up */}
        {!isLogin && (
          <input
            type="text"
            className="w-full p-2 mb-4 border"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          className="w-full p-2 mb-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={isLogin ? handleLogin : handleSignUp}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p
          className="mt-4 text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

AuthenticationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuthenticated: PropTypes.func.isRequired,
};

export default AuthenticationModal;
