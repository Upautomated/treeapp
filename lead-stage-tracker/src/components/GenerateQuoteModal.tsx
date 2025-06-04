
import React, { useState } from 'react';
import { Customer, QuoteData, QuoteItem } from '@/types/customer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

interface GenerateQuoteModalProps {
  customer: Customer;
  onClose: () => void;
}

export const GenerateQuoteModal: React.FC<GenerateQuoteModalProps> = ({
  customer,
  onClose,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: customer.name || '',
    serviceAddress: customer.address || '',
    email: customer.email || '',
    phoneNumber: customer.phone || '',
    jobNotes: customer['job notes '] || customer.notes || '',
    taxRate: 0,
    discountAmount: 0,
    preparedBy: '',
    depositPercentage: 0,
    warrantyDuration: 12,
    scheduledDate: '',
    scheduledTimeWindow: '',
  });

  const [items, setItems] = useState<QuoteItem[]>([
    { description: '', quantity: 1, unitPrice: 0 }
  ]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof QuoteItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    const quoteUrl = localStorage.getItem('quoteGenerationUrl');
    
    if (!quoteUrl) {
      toast({
        title: "Error",
        description: "Quote generation URL not configured. Please check settings.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const quoteData: QuoteData = {
      customerId: customer.id,
      ...formData,
      items,
    };

    try {
      const response = await fetch(quoteUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({
        title: "Success",
        description: "Quote generated successfully",
      });
      
      onClose();
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: "Error",
        description: "Failed to generate quote",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Generate Quote for {customer.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceAddress">Service Address</Label>
              <Input
                id="serviceAddress"
                value={formData.serviceAddress}
                onChange={(e) => handleInputChange('serviceAddress', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobNotes">Job Notes</Label>
            <Textarea
              id="jobNotes"
              value={formData.jobNotes}
              onChange={(e) => handleInputChange('jobNotes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Itemized Estimate</h3>
              <Button onClick={addItem} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                value={formData.taxRate}
                onChange={(e) => handleInputChange('taxRate', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discountAmount">Discount Amount</Label>
              <Input
                id="discountAmount"
                type="number"
                step="0.01"
                value={formData.discountAmount}
                onChange={(e) => handleInputChange('discountAmount', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preparedBy">Prepared By</Label>
              <Input
                id="preparedBy"
                value={formData.preparedBy}
                onChange={(e) => handleInputChange('preparedBy', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="depositPercentage">Deposit Percentage (%)</Label>
              <Input
                id="depositPercentage"
                type="number"
                step="0.01"
                value={formData.depositPercentage}
                onChange={(e) => handleInputChange('depositPercentage', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="warrantyDuration">Warranty Duration (months)</Label>
              <Input
                id="warrantyDuration"
                type="number"
                value={formData.warrantyDuration}
                onChange={(e) => handleInputChange('warrantyDuration', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Scheduled Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scheduledTimeWindow">Scheduled Time Window</Label>
              <Input
                id="scheduledTimeWindow"
                value={formData.scheduledTimeWindow}
                onChange={(e) => handleInputChange('scheduledTimeWindow', e.target.value)}
                placeholder="e.g., 9:00 AM - 12:00 PM"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Quote'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
