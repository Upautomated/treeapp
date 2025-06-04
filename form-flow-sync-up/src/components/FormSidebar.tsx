
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FormSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Why Choose TreePro */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Why Choose TreePro?</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Licensed & Insured</h4>
              <p className="text-sm text-gray-600">Fully certified arborists</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">24-Hour Response</h4>
              <p className="text-sm text-gray-600">Quick emergency service</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Satisfaction Guarantee</h4>
              <p className="text-sm text-gray-600">Quality work guaranteed</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Need Help */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div>
              <div className="font-medium text-gray-900">(555) 123-TREE</div>
              <div className="text-sm text-gray-600">Mon-Sat 7AM-7PM</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <div className="font-medium text-gray-900">quotes@treepro.com</div>
              <div className="text-sm text-gray-600">24/7 email support</div>
            </div>
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          Live Chat
        </Button>
      </Card>

      {/* Service Areas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Downtown Metro Area</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">North Suburbs (15 mile radius)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">West County</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">East Valley</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormSidebar;
