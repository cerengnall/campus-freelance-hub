import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      alert(data.message || 'Registration completed.');
    } catch (error) {
      alert('An error occurred while registering.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="name">Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="password">Password</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;