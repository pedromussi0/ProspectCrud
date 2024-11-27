import { useEffect, useState } from 'react';
import Table from './ui/Table';
import { Lead, leadsApi } from '../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import UpdateLeadForm from './UpdateLeadForm';
import CreateLeadForm from './CreateLeadForm';

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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
    setSelectedLead(lead);
  };

  const handleUpdateSuccess = () => {
    setSelectedLead(null);
    fetchLeads();
  };

  const handleCreateSuccess = () => {
    setIsCreating(false);
    fetchLeads();
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
      <div className="mb-4 flex justify-between items-center">
        <p>Total leads loaded: {leads.length}</p>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          New Lead
        </button>
      </div>
      
      <Table 
        data={leads} 
        columns={columns} 
        actions={renderActions}
      />

      {/* Update Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Lead</h2>
            <UpdateLeadForm
              lead={selectedLead}
              onSuccess={handleUpdateSuccess}
              onCancel={() => setSelectedLead(null)}
            />
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create New Lead</h2>
            <CreateLeadForm
              onSuccess={handleCreateSuccess}
              onCancel={() => setIsCreating(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

