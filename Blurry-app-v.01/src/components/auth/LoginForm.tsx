import React, { useState } from 'react';
import { AtSign, Lock, LogIn, Facebook, Mail } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess,
  onRegisterClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  
  const { login, loginWithGoogle, loginWithFacebook, isLoading, error } = useAuthStore();
  
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Google login failed', error);
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Facebook login failed', error);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Sign In
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-error-50 border border-error-200 text-error-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<AtSign size={18} />}
          error={errors.email}
          fullWidth
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock size={18} />}
          error={errors.password}
          fullWidth
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          leftIcon={<LogIn size={18} />}
          isLoading={isLoading}
          fullWidth
        >
          Sign In
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            fullWidth
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
              className="h-5 w-5 mr-2"
            />
            Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            leftIcon={<Facebook size={18} />}
            onClick={handleFacebookLogin}
            fullWidth
          >
            Facebook
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onRegisterClick}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;