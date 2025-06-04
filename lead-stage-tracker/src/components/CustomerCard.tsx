
import React from 'react';
import { Customer } from '@/types/customer';
import { Mail, Phone, FileText } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  onDragStart: () => void;
  isDragging: boolean;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  onClick,
  onDragStart,
  isDragging,
}) => {
  const getPreviewInfo = () => {
    if (customer.email) return customer.email;
    if (customer.phone) return customer.phone;
    if (customer.notes) {
      const words = customer.notes.split(' ').slice(0, 15);
      return words.join(' ') + (customer.notes.split(' ').length > 15 ? '...' : '');
    }
    return 'No additional info';
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-lg p-4 cursor-move 
        hover:shadow-md transition-all duration-200 hover:border-blue-300
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
      `}
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 truncate">
          {customer.name || customer['Customer_Name ']}
        </h4>
        
        <div className="text-sm text-gray-600 flex items-start gap-2">
          {(customer.email || customer['Email ']) && <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />}
          {(customer.phone || customer.Phone_Number) && !(customer.email || customer['Email ']) && <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />}
          {!(customer.email || customer['Email ']) && !(customer.phone || customer.Phone_Number) && customer.notes && <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />}
          <span className="truncate">{getPreviewInfo()}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Click for details</span>
          <span>Drag to move</span>
        </div>
      </div>
    </div>
  );
};
