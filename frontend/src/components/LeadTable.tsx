import React, { useEffect, useState } from 'react';
import  Table  from './ui/Table';
import  {Lead, leadsApi}  from '../services/api';

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const fetchedLeads = await leadsApi.getLeads();
        setLeads(fetchedLeads);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name' as keyof Lead },
    { header: 'Email', accessor: 'email' as keyof Lead },
    { header: 'Phone', accessor: 'phone' as keyof Lead },
    { header: 'WhatsApp', accessor: 'whatsapp' as keyof Lead },
    { header: 'Facebook', accessor: 'facebook' as keyof Lead },
  ];

  return (
    <div className="overflow-x-auto">
      <Table data={leads} columns={columns} />
    </div>
  );
};

