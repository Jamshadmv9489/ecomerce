import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { validateRegister } from '../../utils/Validation';

import { register } from '../../services/authService';

import AuthLayout from '../../components/common/AuthLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, setErrors, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateRegister(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Call the API function
      await register(values);

      navigate('/login');

    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us and get started today">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="John Doe"
          required
        />
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

        <Button type="submit" loading={isLoading}>
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Register;