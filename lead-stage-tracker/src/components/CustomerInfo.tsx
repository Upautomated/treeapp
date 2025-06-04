
import React from 'react';
import { Customer } from '@/types/customer';
import { Mail, Phone, MapPin, FileText, Camera } from 'lucide-react';

interface CustomerInfoProps {
  customer: Customer;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  const renderField = (label: string, value: any, icon?: React.ReactNode) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {icon}
          {label}
        </div>
        <div className="text-gray-900 ml-6">
          {Array.isArray(value) ? value.join(', ') : String(value)}
        </div>
      </div>
    );
  };

  // Get all additional fields that aren't part of the standard interface
  const additionalFields = Object.entries(customer).filter(([key, value]) => 
    !['id', 'name', 'email', 'phone', 'address', 'notes', 'details', 'photos', 'status'].includes(key) &&
    value !== null && value !== undefined && value !== ''
  );

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderField('Email', customer.email, <Mail className="h-4 w-4" />)}
        {renderField('Phone', customer.phone, <Phone className="h-4 w-4" />)}
        {renderField('Address', customer.address, <MapPin className="h-4 w-4" />)}
        {renderField('Photos', customer.photos, <Camera className="h-4 w-4" />)}
      </div>
      
      {renderField('Notes', customer.notes, <FileText className="h-4 w-4" />)}
      {renderField('Details', customer.details, <FileText className="h-4 w-4" />)}
      
      {additionalFields.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Additional Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalFields.map(([key, value]) => 
              renderField(key.charAt(0).toUpperCase() + key.slice(1), value)
            )}
          </div>
        </div>
      )}
    </div>
  );
};
