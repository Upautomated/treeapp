
import React, { useState, useEffect } from 'react';
import { CustomerBoard } from '@/components/CustomerBoard';
import { ConfigPanel } from '@/components/ConfigPanel';
import { Customer } from '@/types/customer';
import { customerService } from '@/services/customerService';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customer data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (customerId: string, newStatus: Customer['status']) => {
    try {
      await customerService.updateCustomerStatus(customerId, newStatus);
      
      // Update local state
      setCustomers(prev => 
        prev.map(customer => 
          customer.id === customerId 
            ? { ...customer, status: newStatus }
            : customer
        )
      );

      toast({
        title: "Success",
        description: "Customer status updated successfully",
      });
    } catch (error) {
      console.error('Error updating customer status:', error);
      toast({
        title: "Error",
        description: "Failed to update customer status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Customer Dashboard
            </h1>
            <p className="text-gray-600">
              Track customer progression through your sales pipeline
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button onClick={loadCustomers} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {showConfig && (
          <div className="mb-6">
            <ConfigPanel />
          </div>
        )}

        <CustomerBoard 
          customers={customers}
          loading={loading}
          onStatusUpdate={handleStatusUpdate}
          onCustomerUpdate={loadCustomers}
        />
      </div>
    </div>
  );
};

export default Index;
