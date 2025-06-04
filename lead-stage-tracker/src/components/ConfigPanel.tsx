import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, RotateCcw, Settings, FileText } from 'lucide-react';
import { CustomStatusLabels, ServiceLog } from '@/types/customer';

export const ConfigPanel: React.FC = () => {
  const [fetchUrl, setFetchUrl] = useState('');
  const [updateUrl, setUpdateUrl] = useState('');
  const [quoteUrl, setQuoteUrl] = useState('');
  const [editCustomerUrl, setEditCustomerUrl] = useState('');
  const [deleteCustomerUrl, setDeleteCustomerUrl] = useState('');
  const [viewQuoteUrl, setViewQuoteUrl] = useState('');
  const [sendQuoteUrl, setSendQuoteUrl] = useState('');
  const [customLabels, setCustomLabels] = useState<CustomStatusLabels>({
    initial: 'Initial lead',
    qualified: 'Qualified/scheduled',
    quote: 'Quote generated'
  });
  const [logs, setLogs] = useState<ServiceLog[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved URLs from localStorage
    const savedFetchUrl = localStorage.getItem('fetchCustomersUrl') || 'https://upautomated.app.n8n.cloud/webhook-test/24827729-b3e7-4a68-9d17-a572b8f6677b';
    const savedUpdateUrl = localStorage.getItem('updateStatusUrl') || 'https://upautomated.app.n8n.cloud/webhook-test/792fc64f-aea6-4b61-8137-a04f456153e1';
    const savedQuoteUrl = localStorage.getItem('quoteGenerationUrl') || '';
    const savedEditCustomerUrl = localStorage.getItem('editCustomerUrl') || '';
    const savedDeleteCustomerUrl = localStorage.getItem('deleteCustomerUrl') || '';
    const savedViewQuoteUrl = localStorage.getItem('viewQuoteUrl') || '';
    const savedSendQuoteUrl = localStorage.getItem('sendQuoteUrl') || '';
    
    setFetchUrl(savedFetchUrl);
    setUpdateUrl(savedUpdateUrl);
    setQuoteUrl(savedQuoteUrl);
    setEditCustomerUrl(savedEditCustomerUrl);
    setDeleteCustomerUrl(savedDeleteCustomerUrl);
    setViewQuoteUrl(savedViewQuoteUrl);
    setSendQuoteUrl(savedSendQuoteUrl);

    // Load custom labels
    const savedLabels = JSON.parse(localStorage.getItem('customStatusLabels') || '{}');
    setCustomLabels({
      initial: savedLabels.initial || 'Initial lead',
      qualified: savedLabels.qualified || 'Qualified/scheduled',
      quote: savedLabels.quote || 'Quote generated'
    });

    // Load logs
    const savedLogs = JSON.parse(localStorage.getItem('customerServiceLogs') || '[]');
    setLogs(savedLogs);
  }, []);

  const handleSave = () => {
    localStorage.setItem('fetchCustomersUrl', fetchUrl);
    localStorage.setItem('updateStatusUrl', updateUrl);
    localStorage.setItem('quoteGenerationUrl', quoteUrl);
    localStorage.setItem('editCustomerUrl', editCustomerUrl);
    localStorage.setItem('deleteCustomerUrl', deleteCustomerUrl);
    localStorage.setItem('viewQuoteUrl', viewQuoteUrl);
    localStorage.setItem('sendQuoteUrl', sendQuoteUrl);
    localStorage.setItem('customStatusLabels', JSON.stringify(customLabels));
    
    toast({
      title: "Settings Saved",
      description: "All webhook URLs and status labels have been updated successfully",
    });
  };

  const handleReset = () => {
    const defaultFetchUrl = 'https://upautomated.app.n8n.cloud/webhook-test/24827729-b3e7-4a68-9d17-a572b8f6677b';
    const defaultUpdateUrl = 'https://upautomated.app.n8n.cloud/webhook-test/792fc64f-aea6-4b61-8137-a04f456153e1';
    const defaultLabels = {
      initial: 'Initial lead',
      qualified: 'Qualified/scheduled',
      quote: 'Quote generated'
    };
    
    setFetchUrl(defaultFetchUrl);
    setUpdateUrl(defaultUpdateUrl);
    setQuoteUrl('');
    setEditCustomerUrl('');
    setDeleteCustomerUrl('');
    setViewQuoteUrl('');
    setSendQuoteUrl('');
    setCustomLabels(defaultLabels);
    
    localStorage.setItem('fetchCustomersUrl', defaultFetchUrl);
    localStorage.setItem('updateStatusUrl', defaultUpdateUrl);
    localStorage.setItem('quoteGenerationUrl', '');
    localStorage.setItem('editCustomerUrl', '');
    localStorage.setItem('deleteCustomerUrl', '');
    localStorage.setItem('viewQuoteUrl', '');
    localStorage.setItem('sendQuoteUrl', '');
    localStorage.setItem('customStatusLabels', JSON.stringify(defaultLabels));
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults",
    });
  };

  const handleClearLogs = () => {
    localStorage.removeItem('customerServiceLogs');
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All service logs have been cleared",
    });
  };

  const refreshLogs = () => {
    const savedLogs = JSON.parse(localStorage.getItem('customerServiceLogs') || '[]');
    setLogs(savedLogs);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fetchUrl">Fetch Customers URL (GET)</Label>
            <Input
              id="fetchUrl"
              value={fetchUrl}
              onChange={(e) => setFetchUrl(e.target.value)}
              placeholder="Enter the URL to fetch all customers"
              className="font-mono text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="updateUrl">Update Customer Status URL (POST)</Label>
            <Input
              id="updateUrl"
              value={updateUrl}
              onChange={(e) => setUpdateUrl(e.target.value)}
              placeholder="Enter the URL to update customer status"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quoteUrl">Generate Quote URL (POST)</Label>
            <Input
              id="quoteUrl"
              value={quoteUrl}
              onChange={(e) => setQuoteUrl(e.target.value)}
              placeholder="Enter the URL for quote generation"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="viewQuoteUrl">View Quote URL (POST)</Label>
            <Input
              id="viewQuoteUrl"
              value={viewQuoteUrl}
              onChange={(e) => setViewQuoteUrl(e.target.value)}
              placeholder="Enter the URL for viewing quotes"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sendQuoteUrl">Send Quote URL (POST)</Label>
            <Input
              id="sendQuoteUrl"
              value={sendQuoteUrl}
              onChange={(e) => setSendQuoteUrl(e.target.value)}
              placeholder="Enter the URL for sending quotes"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="editCustomerUrl">Edit Customer URL (POST)</Label>
            <Input
              id="editCustomerUrl"
              value={editCustomerUrl}
              onChange={(e) => setEditCustomerUrl(e.target.value)}
              placeholder="Enter the URL for editing customers"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deleteCustomerUrl">Delete Customer URL (POST)</Label>
            <Input
              id="deleteCustomerUrl"
              value={deleteCustomerUrl}
              onChange={(e) => setDeleteCustomerUrl(e.target.value)}
              placeholder="Enter the URL for deleting customers"
              className="font-mono text-sm"
            />
          </div>
          
          <div className="text-sm text-gray-600 pt-2 border-t">
            <p><strong>Current URLs:</strong></p>
            <p className="font-mono text-xs break-all">GET: {fetchUrl}</p>
            <p className="font-mono text-xs break-all">Status Update: {updateUrl}</p>
            <p className="font-mono text-xs break-all">Quote Generation: {quoteUrl}</p>
            <p className="font-mono text-xs break-all">View Quote: {viewQuoteUrl}</p>
            <p className="font-mono text-xs break-all">Send Quote: {sendQuoteUrl}</p>
            <p className="font-mono text-xs break-all">Edit Customer: {editCustomerUrl}</p>
            <p className="font-mono text-xs break-all">Delete Customer: {deleteCustomerUrl}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Status Labels Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialLabel">First Stage Label</Label>
              <Input
                id="initialLabel"
                value={customLabels.initial}
                onChange={(e) => setCustomLabels(prev => ({ ...prev, initial: e.target.value }))}
                placeholder="e.g., Initial lead"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qualifiedLabel">Second Stage Label</Label>
              <Input
                id="qualifiedLabel"
                value={customLabels.qualified}
                onChange={(e) => setCustomLabels(prev => ({ ...prev, qualified: e.target.value }))}
                placeholder="e.g., Qualified/scheduled"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quoteLabel">Third Stage Label</Label>
              <Input
                id="quoteLabel"
                value={customLabels.quote}
                onChange={(e) => setCustomLabels(prev => ({ ...prev, quote: e.target.value }))}
                placeholder="e.g., Quote generated"
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-600 pt-2 border-t">
            <p><strong>Current Board Labels:</strong></p>
            <p>Stage 1: {customLabels.initial}</p>
            <p>Stage 2: {customLabels.qualified}</p>
            <p>Stage 3: {customLabels.quote}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset to Default
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Service Logs
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshLogs}
              className="ml-auto"
            >
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearLogs}
            >
              Clear Logs
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-sm">No logs available</p>
            ) : (
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`text-xs p-2 rounded border-l-4 ${
                      log.type === 'error' 
                        ? 'bg-red-50 border-red-400 text-red-700' 
                        : log.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-400 text-yellow-700'
                        : 'bg-blue-50 border-blue-400 text-blue-700'
                    }`}
                  >
                    <div className="font-mono text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <div>{log.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
