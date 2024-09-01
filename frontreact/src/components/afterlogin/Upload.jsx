import React, { useState } from 'react';

const FormComponent = () => {
  // State for form values
  const [values, setValues] = useState({
    name: '',
    address: '',
    age: '',
    phone: '',
    gender: '',
    start: '',
    end: '',
    category: '',
    topic: '',
    description: ''
  });

  // State for file input
  const [file, setFile] = useState(null);

  // Handle changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append text field values
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    // Append the file if selected
    if (file) {
      console.log(file,'file')
      formData.append('image', file);
    }

    // Debug: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(formData,'form')

    // Perform form submission (example using fetch)
    fetch('/api/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Address Field */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={values.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Age Field */}
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={values.age}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Gender Field */}
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Start Date Field */}
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="start"
          value={values.start}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* End Date Field */}
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          id="endDate"
          name="end"
          value={values.end}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Category Field */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Topic Field */}
      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={values.topic}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows="4"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* Image Upload Field */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
