
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GenerateQuoteModal } from './GenerateQuoteModal';
import { EditCustomerModal } from './EditCustomerModal';
import { CustomerHeader } from './CustomerHeader';
import { CustomerInfo } from './CustomerInfo';
import { CustomerActions } from './CustomerActions';

interface CustomerModalProps {
  customer: Customer;
  onClose: () => void;
  onUpdate?: () => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({
  customer,
  onClose,
  onUpdate,
}) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  if (showQuoteModal) {
    return (
      <GenerateQuoteModal
        customer={customer}
        onClose={() => setShowQuoteModal(false)}
      />
    );
  }

  if (showEditModal) {
    return (
      <EditCustomerModal
        customer={customer}
        onClose={() => setShowEditModal(false)}
        onUpdate={() => {
          onUpdate?.();
          setShowEditModal(false);
        }}
      />
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <CustomerHeader
          customer={customer}
          onEdit={() => setShowEditModal(true)}
        />
        
        <CustomerInfo customer={customer} />
        
        <CustomerActions
          customer={customer}
          onGenerateQuote={() => setShowQuoteModal(true)}
        />
      </DialogContent>
    </Dialog>
  );
};
