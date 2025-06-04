
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  details?: string;
  photos?: string[];
  status: 'Initial lead' | 'Qualified/scheduled' | 'Quote generated';
  [key: string]: any; // Allow for additional fields from the sheet
}

export interface CustomerUpdateRequest {
  customerId: string;
  newStatus: string;
}

export interface CustomStatusLabels {
  initial: string;
  qualified: string;
  quote: string;
}

export interface ServiceLog {
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'warning';
}

export interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface QuoteData {
  customerId: string;
  customerName: string;
  serviceAddress: string;
  email: string;
  phoneNumber: string;
  jobNotes: string;
  items: QuoteItem[];
  taxRate: number;
  discountAmount: number;
  preparedBy: string;
  depositPercentage: number;
  warrantyDuration: number;
  scheduledDate: string;
  scheduledTimeWindow: string;
}

export interface QuoteActions {
  viewQuoteUrl: string;
  sendQuoteUrl: string;
}
