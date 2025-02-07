// src/components/Step/Step.js
import { useState } from "react";


const useMultiStepForm = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  
  const nextStep = () => {
	if (currentStepIndex < steps.length - 1) {
	  setCurrentStepIndex((prev) => prev + 1);
	}
  };
  
  const prevStep = () => {
	if (currentStepIndex < steps.length - 1) {
	  setCurrentStepIndex((prev) => prev - 1);
	}
  };
  
  const goToStep = (index) => {
	if (index >= 0 && index < steps.length) {
	  setCurrentStepIndex(index);
	}
  };
  
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };
  
  return {
	currentStepIndex,
	currentStep: steps[currentStepIndex],
	nextStep,
	prevStep,
	goToStep,
	updateFormData,
	formData,
	isLastStep: currentStepIndex === steps.length - 1,
  };
};

export default useMultiStepForm;