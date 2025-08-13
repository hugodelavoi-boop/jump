import React from 'react';
import { AlertTriangle, FileText } from 'lucide-react';

const ConsentWaiver: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-navy" />
        <h3 className="font-fredoka font-bold text-xl text-navy">
          Jump Start Sports – Consent & Waiver
        </h3>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="font-nunito text-sm text-yellow-800">
          <strong>Important:</strong> By enrolling your child in Jump Start Sports programs, you acknowledge and agree to the following:
        </p>
      </div>

      <div className="space-y-6 font-nunito text-gray-700">
        <div>
          <h4 className="font-fredoka font-semibold text-lg text-navy mb-2">
            1. Acknowledgement of Risk
          </h4>
          <p className="text-sm leading-relaxed">
            I acknowledge that participation in Jump Start Sports activities involves physical activity, and while all reasonable precautions are taken, there are inherent risks of injury. I accept full responsibility for my child's participation.
          </p>
        </div>

        <div>
          <h4 className="font-fredoka font-semibold text-lg text-navy mb-2">
            2. Medical Consent
          </h4>
          <p className="text-sm leading-relaxed">
            In the event of illness or injury, I authorise Jump Start Sports staff to administer first aid and, if necessary, seek emergency medical treatment for my child. I confirm that I have provided accurate and up-to-date medical information.
          </p>
        </div>

        <div>
          <h4 className="font-fredoka font-semibold text-lg text-navy mb-2">
            3. Photography & Media
          </h4>
          <p className="text-sm leading-relaxed">
            I understand that Jump Start Sports may take photographs or videos of children during sessions for promotional purposes (social media, website, brochures). No child will be identified by name in public-facing materials without explicit written consent. Parents may contact Jump Start Sports if they wish to opt their child out of photography/media use.
          </p>
        </div>

        <div>
          <h4 className="font-fredoka font-semibold text-lg text-navy mb-2">
            4. Liability Waiver
          </h4>
          <p className="text-sm leading-relaxed">
            I release and indemnify Jump Start Sports from any claims or liability arising from my child's participation, except in cases of proven negligence by Jump Start Sports staff.
          </p>
        </div>

        <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-4">
          <p className="text-sm font-medium text-electric-blue">
            By proceeding with enrolment, I confirm that I have read and understood this Consent & Waiver.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsentWaiver;