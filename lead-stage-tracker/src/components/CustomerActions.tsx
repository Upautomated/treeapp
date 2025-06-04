
import React from 'react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { FileText as Quote, Eye, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleViewQuote, handleSendQuote } from '@/utils/quoteUtils';

interface CustomerActionsProps {
  customer: Customer;
  onGenerateQuote: () => void;
}

export const CustomerActions: React.FC<CustomerActionsProps> = ({
  customer,
  onGenerateQuote,
}) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
      <Button
        onClick={onGenerateQuote}
        className="flex items-center gap-2"
        size="lg"
      >
        <Quote className="h-4 w-4" />
        Generate Quote
      </Button>
      
      <div className="flex gap-2">
        <Button
          onClick={() => handleViewQuote(customer, toast)}
          variant="outline"
          className="flex items-center gap-2 flex-1"
        >
          <Eye className="h-4 w-4" />
          View Quote
        </Button>
        <Button
          onClick={() => handleSendQuote(customer, toast)}
          variant="outline"
          className="flex items-center gap-2 flex-1"
        >
          <Send className="h-4 w-4" />
          Send Quote
        </Button>
      </div>
    </div>
  );
};
