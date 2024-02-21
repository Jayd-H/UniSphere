import React from 'react';
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface ValidationCheckProps {
  isValid: boolean;
  message: string;
}

const ValidationCheck: React.FC<ValidationCheckProps> = ({ isValid, message }) => {
  return (
    <li className={`flex items-center mb-2 font-semibold ${isValid ? "text-green-700" : "text-red-700"}`}>
      <div className="flex-shrink-0">
        {isValid ? (
          <CheckCircleIcon className="h-6 w-6 mr-3" />
        ) : (
          <XCircleIcon className="h-6 w-6 mr-3" />
        )}
      </div>
      <span>{message}</span>
    </li>
  );
};

interface ValidationChecklistProps {
  checks: ValidationCheckProps[];
}

const ValidationChecklist: React.FC<ValidationChecklistProps> = ({ checks }) => {
  return (
    <div className="p-2 -m-2 mt-6 mb-6">
      <ul>
        {checks.map((check, index) => (
          <ValidationCheck key={index} {...check} />
        ))}
      </ul>
    </div>
  );
};

export default ValidationChecklist;
