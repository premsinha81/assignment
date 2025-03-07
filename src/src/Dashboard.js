import React, { useEffect, useState } from 'react';
import { useStore } from './store.ts';
import ComplianceChart from './ComplianceChart';
import { components } from 'daisyui/imports';

const Dashboard = () => {
  const { setMergedData, mergedData } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/merged');
            const result = await response.json();
            // console.log(result)
            if (result.components) {
              // Merge bom and complianceData into a single array
              const merged = result.components.map((component) => ({
                id: component.id,
                substance: component.substance,
                mass: component.mass,
                threshold_ppm: component.threshold_ppm,
                compliant: component.status === 'Compliant'
              }));
              setMergedData(merged);
            }else {
              console.error('Invalid data structure:', result);
            }
          } catch (error) {
            console.error('Error fetching merged data:', error);
          }
        };


    fetchData();
  }, [setMergedData]);

  const compliantCount = mergedData.filter(item => item.compliant).length;
  const nonCompliantCount = mergedData.length - compliantCount;
  

  const filteredData = mergedData.filter(item => 
                (item.id || '').toLowerCase().includes(searchTerm.toLowerCase())

  );
  return (
    
    <div className='w-full bg-white p-8'>
      <h1 className='text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white'>BOM and Compliance Dashboard</h1>
      
      <div>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder="Search by part number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div style={{backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px'}}>Compliance Status Overview</h2>
          <ComplianceChart compliant={compliantCount} nonCompliant={nonCompliantCount} />
        </div>
        <div style={{backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px'}}>Bill of Materials (BOM) Details</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead style={{backgroundColor: '#f9fafb'}}>
              <tr>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Part Number</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Material</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Weight</th>
                <th style={{padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={`${item.id}-${item.partNumber}`} style={{borderBottom: '1px solid #e5e7eb'}}>
                  <td style={{padding: '16px', whiteSpace: 'nowrap', fontSize: '14px', color: '#111827'}}>{item.id}</td>
                  <td style={{padding: '16px', whiteSpace: 'nowrap', fontSize: '14px', color: '#111827'}}>{item.substance}</td>
                  <td style={{padding: '16px', whiteSpace: 'nowrap', fontSize: '14px', color: '#111827'}}>{item.mass}</td>
                  <td style={{padding: '16px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500', color: item.compliant ? '#16a34a' : '#dc2626'}}>
                    {item.compliant ? '✅ Compliant' : '❌ Non-compliant'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
