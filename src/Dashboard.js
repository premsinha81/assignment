import React, { useEffect, useState } from 'react';
import { useStore } from './store.ts';
import ComplianceChart from './ComplianceChart';
import { components } from 'daisyui/imports';
import Navbar from './Components/Navbar.js';

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
    
    <div className='container p-8'>
      <Navbar></Navbar>
      <div className='grid-cols-8'>
        <h1 className='mt-2 mb-4 text-3xl tracking-tight sm:text-3xl text-pretty'>BOM and Compliance Dashboard</h1>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" placeholder="Search by part number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 md:gap-4'>
        <div className='mt-4'>
          <h2 className='mt-2 mb-4 text-2xl tracking-tight sm:text-2xl text-pretty'>Compliance Status Overview</h2>
          <div className='bg-white p-8 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5'>
            <ComplianceChart compliant={compliantCount} nonCompliant={nonCompliantCount} />
          </div>
        </div>
        <div className='mt-4'>
        <h2 className='mt-2 mb-4 text-2xl tracking-tight sm:text-2xl text-pretty'>Bill of Materials (BOM) Details</h2>
        <div className='bg-white p-8 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5'>
        <div className='relative overflow-x-auto'>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>  
                <th className='px-6 py-3' scope='col'>Part Number</th>
                <th className='px-6 py-3' scope='col'>Material</th>
                <th className='px-6 py-3' scope='col'>Weight</th>
                <th className='px-6 py-3' scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={`${item.id}-${item.partNumber}`} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                  <td scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.id}</td>
                  <td  scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.substance}</td>
                  <td  scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.mass}</td>
                  <td  style={{color: item.compliant ? '#16a34a' : '#dc2626'}}>
                    {item.compliant ? '✅ Compliant' : '❌ Non-compliant'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
          
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Dashboard;
