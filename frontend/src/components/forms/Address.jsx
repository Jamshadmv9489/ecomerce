import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

import { validateShippingAddress } from '../../utils/Validation';

import Input from '../common/Input';
import Button from '../common/Button';

const Address = () => {
  const navigate = useNavigate();

  const { values, errors, setErrors, handleChange } = useForm({
    street: "", city: "", state: "", postalCode: "", country: "", phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateShippingAddress(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      localStorage.setItem('shippingAddress', JSON.stringify(values));
      navigate('/checkout');
      console.log("Submitting:", values);

    } catch (error) {

      console.error("Error saving address:", error);
      alert("Something went wrong. Please try again.");
    }

  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>

      <Input label="Street Address" name="street" value={values.street} onChange={handleChange} error={errors.street} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="City" name="city" value={values.city} onChange={handleChange} error={errors.city} />
        <Input label="State" name="state" value={values.state} onChange={handleChange} error={errors.state} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Postal Code" name="postalCode" value={values.postalCode} onChange={handleChange} error={errors.postalCode} />
        <Input label="Country" name="country" value={values.country} onChange={handleChange} error={errors.country} />
      </div>

      <Input label="Phone Number" name="phone" value={values.phone} onChange={handleChange} error={errors.phone} />

      <Button type="submit" className="md:w-auto px-10">OK</Button>
    </form>
  )
}

export default Address;