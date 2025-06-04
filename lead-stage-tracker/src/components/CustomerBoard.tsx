
import React, { useState, useEffect } from 'react';
import { Customer } from '@/types/customer';
import { CustomerCard } from './CustomerCard';
import { CustomerModal } from './CustomerModal';
import { Loader2 } from 'lucide-react';

interface CustomerBoardProps {
  customers: Customer[];
  loading: boolean;
  onStatusUpdate: (customerId: string, newStatus: Customer['status']) => void;
  onCustomerUpdate?: () => void;
}

const DEFAULT_STATUSES: Customer['status'][] = ['Initial lead', 'Qualified/scheduled', 'Quote generated'];

export const CustomerBoard: React.FC<CustomerBoardProps> = ({
  customers,
  loading,
  onStatusUpdate,
  onCustomerUpdate,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [draggedCustomer, setDraggedCustomer] = useState<Customer | null>(null);
  const [statusLabels, setStatusLabels] = useState({
    'Initial lead': 'Initial lead',
    'Qualified/scheduled': 'Qualified/scheduled',
    'Quote generated': 'Quote generated'
  });

  useEffect(() => {
    // Load custom labels from localStorage
    const customLabels = JSON.parse(localStorage.getItem('customStatusLabels') || '{}');
    setStatusLabels({
      'Initial lead': customLabels.initial || 'Initial lead',
      'Qualified/scheduled': customLabels.qualified || 'Qualified/scheduled',
      'Quote generated': customLabels.quote || 'Quote generated'
    });
  }, []);

  const handleDragStart = (customer: Customer) => {
    setDraggedCustomer(customer);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: Customer['status']) => {
    e.preventDefault();
    
    if (draggedCustomer && draggedCustomer.status !== newStatus) {
      onStatusUpdate(draggedCustomer.id, newStatus);
    }
    
    setDraggedCustomer(null);
  };

  const getCustomersByStatus = (status: Customer['status']) => {
    return customers.filter(customer => customer.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading customers...</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEFAULT_STATUSES.map((status) => {
          const statusCustomers = getCustomersByStatus(status);
          
          return (
            <div
              key={status}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {statusLabels[status]}
                </h3>
                <p className="text-sm text-gray-500">
                  {statusCustomers.length} customer{statusCustomers.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="p-4 space-y-3 min-h-[400px]">
                {statusCustomers.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onClick={() => setSelectedCustomer(customer)}
                    onDragStart={() => handleDragStart(customer)}
                    isDragging={draggedCustomer?.id === customer.id}
                  />
                ))}
                
                {statusCustomers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No customers in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onUpdate={onCustomerUpdate}
        />
      )}
    </>
  );
};
