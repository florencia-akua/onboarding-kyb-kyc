import type { OnboardingFormData, UploadedDoc } from './types';

export interface StepProps {
  data: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
  updateDocument: (key: string, doc: UploadedDoc | null) => void;
  /** Cuando true, los campos requeridos vacíos muestran error rojo. */
  showValidation: boolean;
}
