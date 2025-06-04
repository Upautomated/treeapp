
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ServiceDetailsStep from './form-steps/ServiceDetailsStep';
import PropertyInfoStep from './form-steps/PropertyInfoStep';
import ProjectDetailsStep from './form-steps/ProjectDetailsStep';
import ContactInfoStep from './form-steps/ContactInfoStep';
import FormSidebar from './FormSidebar';

export interface FormData {
  // Page 1 - Service Details
  zipCode: string;
  servicesNeeded: string[];
  urgencyLevel: string;
  briefDescription: string;
  
  // Page 2 - Property Info
  streetAddress: string;
  city: string;
  zipCodeProperty: string;
  propertyType: string;
  accessToWorkArea: string[];
  knownObstacles: string[];
  
  // Page 3 - Project Details
  numberOfTrees: string;
  treeSize: string;
  treeLocation: string[];
  photos: File[];
  additionalDetails: string;
  
  // Page 4 - Contact Info
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredContact: string;
  howDidYouHear: string;
}

const QuoteForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    servicesNeeded: [],
    urgencyLevel: '',
    briefDescription: '',
    streetAddress: '',
    city: '',
    zipCodeProperty: '',
    propertyType: '',
    accessToWorkArea: [],
    knownObstacles: [],
    numberOfTrees: '',
    treeSize: '',
    treeLocation: [],
    photos: [],
    additionalDetails: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredContact: '',
    howDidYouHear: ''
  });

  const steps = [
    { number: 1, title: "Service Details", description: "What do you need?" },
    { number: 2, title: "Property Info", description: "Where is the work?" },
    { number: 3, title: "Project Details", description: "Specifics of the job" },
    { number: 4, title: "Contact", description: "How to reach you" }
  ];

  const progress = (currentStep / 4) * 100;

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.zipCode || formData.servicesNeeded.length === 0 || !formData.urgencyLevel) {
          toast({
            title: "Please complete all required fields",
            description: "Zip code, services needed, and urgency level are required.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2:
        if (!formData.streetAddress || !formData.city || !formData.zipCodeProperty || formData.accessToWorkArea.length === 0) {
          toast({
            title: "Please complete all required fields",
            description: "Full address and access information are required.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3:
        if (!formData.numberOfTrees) {
          toast({
            title: "Please complete required fields",
            description: "Number of trees/stumps is required.",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 4:
        if (!formData.fullName || !formData.email || !formData.phoneNumber) {
          toast({
            title: "Please complete all required fields",
            description: "Name, email, and phone number are required.",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photos') {
          // Handle file uploads
          formData.photos.forEach((file, index) => {
            formDataToSend.append(`photo_${index}`, file);
          });
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, value.join(', '));
        } else {
          formDataToSend.append(key, value.toString());
        }
      });
      
      // Add timestamp
      formDataToSend.append('timestamp', new Date().toISOString());
      formDataToSend.append('source', 'TreePro Quote Form');

      const response = await fetch('https://upautomated.app.n8n.cloud/webhook-test/5919b80f-c06d-4da7-b19b-aa9bdbe97477', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast({
          title: "Quote Request Submitted!",
          description: "We'll review your request and get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          zipCode: '',
          servicesNeeded: [],
          urgencyLevel: '',
          briefDescription: '',
          streetAddress: '',
          city: '',
          zipCodeProperty: '',
          propertyType: '',
          accessToWorkArea: [],
          knownObstacles: [],
          numberOfTrees: '',
          treeSize: '',
          treeLocation: [],
          photos: [],
          additionalDetails: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          preferredContact: '',
          howDidYouHear: ''
        });
        setCurrentStep(1);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PropertyInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <ProjectDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <ContactInfoStep formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const completedFields = () => {
    let total = 0;
    let completed = 0;
    
    // Count required fields
    const requiredFields = {
      zipCode: formData.zipCode,
      servicesNeeded: formData.servicesNeeded.length > 0,
      urgencyLevel: formData.urgencyLevel,
      streetAddress: formData.streetAddress,
      city: formData.city,
      zipCodeProperty: formData.zipCodeProperty,
      accessToWorkArea: formData.accessToWorkArea.length > 0,
      numberOfTrees: formData.numberOfTrees,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber
    };
    
    total = Object.keys(requiredFields).length;
    completed = Object.values(requiredFields).filter(Boolean).length;
    
    return { completed, total };
  };

  const { completed, total } = completedFields();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Tree Services Quote Request
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get an accurate estimate for your tree service needs. Our intelligent form helps us 
            provide you with the most precise quote possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              {/* Progress Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Step {currentStep} of 4</h2>
                  <Badge variant="outline">
                    {completed}/{total} fields completed
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${currentStep >= step.number 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                        }`}>
                        {step.number}
                      </div>
                      <div className="ml-2 hidden sm:block">
                        <div className={`text-sm font-medium ${
                          currentStep >= step.number ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500">{step.description}</div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                          currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                
                <Progress value={progress} className="w-full" />
              </div>

              {/* Form Content */}
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FormSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
