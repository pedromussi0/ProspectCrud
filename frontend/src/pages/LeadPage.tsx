import React from 'react';
import { Navbar } from '../components/Navbar';
import { LeadTable } from '../components/LeadTable';

export const LeadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Leads</h1>
        <LeadTable />
      </div>
    </div>
  );
};

