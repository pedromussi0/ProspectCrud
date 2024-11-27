import { useEffect, useState } from 'react';
import Table from './ui/Table';
import { Lead, leadsApi } from '../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const fetchedLeads = await leadsApi.getLeads();
      setLeads(fetchedLeads);
      setError(null);
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error fetching leads:', error);
      setError('Failed to fetch leads. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (lead: Lead) => {
    console.log('Update lead:', lead);
  };

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Lead },
    { header: 'Email', accessor: 'email' as keyof Lead },
    { header: 'Phone', accessor: 'phone' as keyof Lead },
    { header: 'WhatsApp', accessor: 'whatsapp' as keyof Lead },
    { header: 'Facebook', accessor: 'facebook' as keyof Lead },
  ];

  const renderActions = (row: Lead) => (
    <button
      onClick={() => handleUpdate(row)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Update
    </button>
  );

  if (isLoading) {
    return <div>Loading leads...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <p>Total leads loaded: {leads.length}</p>
      </div>
      <Table 
        data={leads} 
        columns={columns} 
        actions={renderActions}
      />
    </div>
  );
}

