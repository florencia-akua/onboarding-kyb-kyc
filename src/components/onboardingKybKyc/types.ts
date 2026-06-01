export type PersonaType = 'fisica' | 'juridica';

export type OnboardingPhase =
  | 'intro'
  | 'select'
  | 'form'
  | 'review'
  | 'success';

export type AccountType = 'ahorros' | 'corriente';
export type YesNo = 'si' | 'no';

export interface UploadedDoc {
  name: string;
  /** Size in bytes; kept for the "2.4 MB" style label. */
  size: number;
}

export interface Shareholder {
  fullName: string;
  documentNumber: string;
  participation: string;
  birthCountry: string;
  birthCity: string;
  nationality: string;
}

export interface OnboardingFormData {
  personaType: PersonaType | null;

  // --- Persona física: datos del titular ---
  holderFullName: string;
  holderDocumentType: string;
  holderDocumentNumber: string;
  holderDocumentIssueDate: string;
  holderBirthDate: string;
  holderNationality: string;
  holderBirthCity: string;
  holderAddress: string;
  holderCity: string;
  holderDepartment: string;
  holderPhone: string;
  holderEmail: string;
  holderIsPep: boolean;

  // --- Persona jurídica: identificación y contacto ---
  companyLegalName: string;
  companyNit: string;
  companyType: string;
  companyContactFullName: string;
  companyAddress: string;
  companyDepartment: string;
  companyCity: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;

  // --- Representante legal ---
  legalRepFullName: string;
  legalRepDocumentNumber: string;
  legalRepBirthDate: string;
  legalRepIssueDate: string;
  legalRepBirthCountry: string;
  legalRepBirthCity: string;
  legalRepNationality: string;
  legalRepAddress: string;
  legalRepPhone: string;
  legalRepEmail: string;
  hasAlternateLegalRep: YesNo | null;

  // --- Estructura societaria ---
  shareholders: Shareholder[];

  // --- Beneficiario final ---
  beneficiaryFullName: string;
  beneficiaryDocumentNumber: string;
  beneficiaryControlPercentage: string;
  beneficiaryBirthCountry: string;
  beneficiaryBirthCity: string;
  beneficiaryAddress: string;
  beneficiaryPhone: string;
  beneficiaryEmail: string;

  // --- Perfil de riesgo ---
  companyHasPep: YesNo | null;

  // --- Datos del negocio (compartido) ---
  economicActivity: string;
  monthlyVolume: string;
  averageTicket: string;
  salesChannels: string[];

  // --- Información comercial (solo física) ---
  commercialName: string;
  commercialAddress: string;
  commercialPhone: string;
  commercialDepartment: string;
  commercialCity: string;

  // --- Datos bancarios (compartido) ---
  payoutBank: string;
  accountNumber: string;
  accountType: AccountType | null;
  receivesTips: YesNo | null;

  // --- Documentos (clave -> archivo subido) ---
  documents: Record<string, UploadedDoc | null>;
}

export const initialOnboardingFormData: OnboardingFormData = {
  personaType: null,

  holderFullName: '',
  holderDocumentType: '',
  holderDocumentNumber: '',
  holderDocumentIssueDate: '',
  holderBirthDate: '',
  holderNationality: '',
  holderBirthCity: '',
  holderAddress: '',
  holderCity: '',
  holderDepartment: '',
  holderPhone: '',
  holderEmail: '',
  holderIsPep: false,

  companyLegalName: '',
  companyNit: '',
  companyType: '',
  companyContactFullName: '',
  companyAddress: '',
  companyDepartment: '',
  companyCity: '',
  companyPhone: '',
  companyEmail: '',
  companyWebsite: '',

  legalRepFullName: '',
  legalRepDocumentNumber: '',
  legalRepBirthDate: '',
  legalRepIssueDate: '',
  legalRepBirthCountry: '',
  legalRepBirthCity: '',
  legalRepNationality: '',
  legalRepAddress: '',
  legalRepPhone: '',
  legalRepEmail: '',
  hasAlternateLegalRep: null,

  shareholders: [],

  beneficiaryFullName: '',
  beneficiaryDocumentNumber: '',
  beneficiaryControlPercentage: '',
  beneficiaryBirthCountry: '',
  beneficiaryBirthCity: '',
  beneficiaryAddress: '',
  beneficiaryPhone: '',
  beneficiaryEmail: '',

  companyHasPep: null,

  economicActivity: '',
  monthlyVolume: '',
  averageTicket: '',
  salesChannels: [],

  commercialName: '',
  commercialAddress: '',
  commercialPhone: '',
  commercialDepartment: '',
  commercialCity: '',

  payoutBank: '',
  accountNumber: '',
  accountType: null,
  receivesTips: null,

  documents: {},
};
