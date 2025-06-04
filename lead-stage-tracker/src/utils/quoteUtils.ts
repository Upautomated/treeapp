
import { Customer } from '@/types/customer';

export const handleViewQuote = async (customer: Customer, toast: any) => {
  const viewQuoteUrl = localStorage.getItem('viewQuoteUrl');
  
  if (!viewQuoteUrl) {
    toast({
      title: "Configuration Missing",
      description: "View Quote URL not configured. Please check settings.",
      variant: "destructive",
    });
    return;
  }

  try {
    const customerId = customer.id || customer.Customer_id;
    const customerName = customer.name || customer['Customer_Name '];
    const email = customer.email || customer['Email '];

    const response = await fetch(viewQuoteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customerId,
        customerName: customerName,
        email: email,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      
      // Check if the result has a "url" property
      if (result.url) {
        try {
          const quoteUrl = new URL(result.url);
          // Open the returned URL in a new tab
          window.open(quoteUrl.toString(), '_blank');
          
          toast({
            title: "Success",
            description: "Quote opened in new tab",
          });
        } catch (urlError) {
          console.error('Invalid URL returned:', result.url);
          toast({
            title: "Error",
            description: "Invalid URL returned from webhook",
            variant: "destructive",
          });
        }
      } else {
        console.error('No URL property in response:', result);
        toast({
          title: "Error",
          description: "No URL returned from webhook",
          variant: "destructive",
        });
      }
    } else {
      throw new Error('Failed to view quote');
    }
  } catch (error) {
    console.error('Error viewing quote:', error);
    toast({
      title: "Error",
      description: "Failed to view quote",
      variant: "destructive",
    });
  }
};

export const handleSendQuote = async (customer: Customer, toast: any) => {
  const sendQuoteUrl = localStorage.getItem('sendQuoteUrl');
  
  if (!sendQuoteUrl) {
    toast({
      title: "Configuration Missing",
      description: "Send Quote URL not configured. Please check settings.",
      variant: "destructive",
    });
    return;
  }

  try {
    const response = await fetch(sendQuoteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customer.id || customer.Customer_id,
        customerName: customer.name || customer['Customer_Name '],
        email: customer.email || customer['Email '],
      }),
    });

    if (response.ok) {
      toast({
        title: "Success",
        description: "Quote sent successfully",
      });
    } else {
      throw new Error('Failed to send quote');
    }
  } catch (error) {
    console.error('Error sending quote:', error);
    toast({
      title: "Error",
      description: "Failed to send quote",
      variant: "destructive",
    });
  }
};
