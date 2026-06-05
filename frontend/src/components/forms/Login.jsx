import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { validateLogin } from '../../utils/Validation';

import { login } from '../../services/authService';

import { useAuth } from '../../context/authContext';

import AuthLayout from '../../components/common/AuthLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const { values, errors, setErrors, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateLogin(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Call the API function
      await login(values);
      
      const user = await checkAuth();
  
      // Redirect based on role
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      console.log("Login Successfull");

    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="name@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-end text-sm">
          <Link to="/forgot-password" className="font-medium text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={isLoading}>
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login;