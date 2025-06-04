
import React from 'react';
import { Customer } from '@/types/customer';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface CustomerHeaderProps {
  customer: Customer;
  onEdit: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  customer,
  onEdit,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Initial lead':
        return 'bg-yellow-100 text-yellow-800';
      case 'Qualified/scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Quote generated':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DialogHeader>
      <div className="flex items-center justify-between">
        <DialogTitle className="text-2xl font-bold">
          {customer.name}
        </DialogTitle>
        <Badge className={getStatusColor(customer.status)}>
          {customer.status}
        </Badge>
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          onClick={onEdit}
          className="flex items-center gap-2"
          variant="outline"
        >
          <Edit className="h-4 w-4" />
          Edit Customer
        </Button>
      </div>
    </DialogHeader>
  );
};
