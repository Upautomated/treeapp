
import { Customer, CustomerUpdateRequest } from '@/types/customer';

class CustomerService {
  private getApiUrls() {
    return {
      getAllCustomers: localStorage.getItem('fetchCustomersUrl') || 'https://upautomated.app.n8n.cloud/webhook-test/24827729-b3e7-4a68-9d17-a572b8f6677b',
      updateCustomerStatus: localStorage.getItem('updateStatusUrl') || 'https://upautomated.app.n8n.cloud/webhook-test/792fc64f-aea6-4b61-8137-a04f456153e1'
    };
  }

  private log(message: string, type: 'info' | 'error' | 'warning' = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, type };
    
    // Store in localStorage for the logs feature
    const existingLogs = JSON.parse(localStorage.getItem('customerServiceLogs') || '[]');
    existingLogs.unshift(logEntry); // Add to beginning
    
    // Keep only last 50 logs
    const trimmedLogs = existingLogs.slice(0, 50);
    localStorage.setItem('customerServiceLogs', JSON.stringify(trimmedLogs));
    
    console.log(`[CustomerService] ${message}`);
  }

  async getAllCustomers(): Promise<Customer[]> {
    const urls = this.getApiUrls();
    this.log(`Fetching customers from: ${urls.getAllCustomers}`);
    
    try {
      const response = await fetch(urls.getAllCustomers, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.log(`Received raw API response: ${JSON.stringify(data)}`);
      
      // Transform the data to match our Customer interface
      const customers = this.transformCustomerData(data);
      this.log(`Successfully transformed ${customers.length} customers`);
      return customers;
    } catch (error) {
      const errorMessage = `Error fetching customers: ${error}`;
      this.log(errorMessage, 'error');
      console.error(errorMessage);
      throw error;
    }
  }

  async updateCustomerStatus(customerId: string, newStatus: string): Promise<void> {
    const urls = this.getApiUrls();
    this.log(`Updating customer status: ${customerId} to ${newStatus}`);
    
    try {
      const response = await fetch(urls.updateCustomerStatus, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          newStatus,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.log(`Customer status updated successfully for ${customerId}`);
    } catch (error) {
      const errorMessage = `Error updating customer status: ${error}`;
      this.log(errorMessage, 'error');
      console.error(errorMessage);
      throw error;
    }
  }

  private transformCustomerData(data: any): Customer[] {
    this.log(`Transforming data type: ${typeof data}, isArray: ${Array.isArray(data)}`);
    
    let customers = [];
    
    // Handle single object response (wrap in array) - this is the key fix
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      // Check if it's a direct customer object or wrapped
      if (data.id || data.Customer_Name || data['Customer_Name ']) {
        customers = [data];
        this.log('API returned single customer object, wrapping in array');
      } else if (data.customers && Array.isArray(data.customers)) {
        customers = data.customers;
        this.log(`API returned wrapped array with ${data.customers.length} customers`);
      } else if (data.data && Array.isArray(data.data)) {
        customers = data.data;
        this.log(`API returned data wrapper with ${data.data.length} customers`);
      } else {
        this.log('Unexpected single object structure received from API', 'warning');
        console.warn('Unexpected data structure:', data);
        return [];
      }
    } else if (Array.isArray(data)) {
      customers = data;
      this.log(`API returned array with ${data.length} customers`);
    } else {
      this.log('Unexpected data structure received from API', 'error');
      console.warn('Unexpected data structure:', data);
      return [];
    }

    return customers.map((item: any, index: number) => {
      this.log(`Transforming customer ${index}: ${JSON.stringify(item)}`);
      
      // Handle exact field names with trailing spaces as specified
      const customer: Customer = {
        id: item.id || item.customerId || item.customerID || item.Customer_id || item.recordId || `customer-${Date.now()}-${index}`,
        name: item['Customer_Name '] || item.Customer_Name || item.name || item.customerName || 'Unknown Customer',
        email: item['Email '] || item.Email || item.email || '',
        phone: item.Phone_Number || item.phone || item.phoneNumber || '',
        address: this.buildAddress(item),
        notes: item.notes || item['job notes '] || item.Notes || '',
        details: item.details || item['additional info'] || item.Details || '',
        photos: item.photos || item['photos/videos'] || item.Photos || [],
        status: this.normalizeStatus(item.label || item.status || item.Status || 'Initial lead'),
        ...item // Include any additional fields
      };

      this.log(`Transformed customer: ${customer.name} with status: ${customer.status}`);
      return customer;
    });
  }

  private buildAddress(item: any): string {
    const parts = [];
    if (item['Street address'] || item.address || item.Address) {
      parts.push(item['Street address'] || item.address || item.Address);
    }
    if (item.City || item.city) {
      parts.push(item.City || item.city);
    }
    if (item['Customer_Zip '] || item.Customer_Zip || item.zip || item.Zip) {
      parts.push(item['Customer_Zip '] || item.Customer_Zip || item.zip || item.Zip);
    }
    return parts.join(', ');
  }

  private normalizeStatus(status: string): Customer['status'] {
    const normalizedStatus = status.toLowerCase().trim();
    this.log(`Normalizing status: "${status}" -> "${normalizedStatus}"`);
    
    // Map exact status values to our Customer status type
    if (status === 'Initial lead') {
      return 'Initial lead';
    } else if (status === 'Qualified/scheduled') {
      return 'Qualified/scheduled';
    } else if (status === 'Quote generated') {
      return 'Quote generated';
    } else {
      // Fallback logic for variations
      if (normalizedStatus.includes('qualified') || normalizedStatus.includes('scheduled')) {
        return 'Qualified/scheduled';
      } else if (normalizedStatus.includes('quote') || normalizedStatus.includes('generated') || normalizedStatus.includes('sent')) {
        return 'Quote generated';
      } else {
        this.log(`Unknown status "${status}", defaulting to "Initial lead"`, 'warning');
        return 'Initial lead';
      }
    }
  }
}

export const customerService = new CustomerService();
