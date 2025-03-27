// src/pages/Buyer/Home.jsx

import React, { useState, useEffect } from "react";
import PropertyCard from "../../components/buyer/PropertyCard";
import SearchBar from "../../components/buyer/SearchBar";
import FilterForm from "../../components/buyer/FilterForm";
import {
  getAllProperties,
  searchProperties,
  filterProperties,
} from "../../utils/buyerApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProperties();
      setProperties(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchProperties(keyword);
      setProperties(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await filterProperties(filters);
      setProperties(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Properties</h1>
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mb-4">
        <FilterForm onFilter={handleFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;
