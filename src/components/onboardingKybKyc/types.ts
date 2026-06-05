export type PersonaType = 'fisica' | 'juridica';

export type OnboardingPhase =
  | 'intro'
  | 'select'
  | 'form'
  | 'review'
  | 'success';

export type AccountType = 'ahorros' | 'corriente';
export type YesNo = 'si' | 'no';
export type PepLevel = 'nacional' | 'regional' | 'municipal';
export type PepApproval = 'requiere' | 'tiene';

export interface PepDeclaration {
  position: string;
  institution: string;
  startDate: string;
  endDate: string;
  level: PepLevel | null;
  isRelative: YesNo | null;
  relativeDetail: string;
  isAssociate: YesNo | null;
  associateDetail: string;
  receivedPublicFunds: YesNo | null;
  decisionPower: YesNo | null;
  fundsOrigin: string;
  approval: PepApproval | null;
  approvalDoc: UploadedDoc | null;
}

export const emptyPepDeclaration: PepDeclaration = {
  position: '',
  institution: '',
  startDate: '',
  endDate: '',
  level: null,
  isRelative: null,
  relativeDetail: '',
  isAssociate: null,
  associateDetail: '',
  receivedPublicFunds: null,
  decisionPower: null,
  fundsOrigin: '',
  approval: null,
  approvalDoc: null,
};

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

export const emptyShareholder: Shareholder = {
  fullName: '',
  documentNumber: '',
  participation: '',
  birthCountry: '',
  birthCity: '',
  nationality: '',
};

export interface Beneficiary {
  fullName: string;
  documentNumber: string;
  controlPercentage: string;
  birthCountry: string;
  birthCity: string;
  address: string;
  phone: string;
  email: string;
}

export const emptyBeneficiary: Beneficiary = {
  fullName: '',
  documentNumber: '',
  controlPercentage: '',
  birthCountry: '',
  birthCity: '',
  address: '',
  phone: '',
  email: '',
};

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
  holderPep: PepDeclaration;

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

  // --- Representante legal suplente (solo si aplica) ---
  alternateRepFullName: string;
  alternateRepDocumentNumber: string;
  alternateRepBirthDate: string;
  alternateRepIssueDate: string;
  alternateRepBirthCountry: string;
  alternateRepBirthCity: string;
  alternateRepNationality: string;
  alternateRepAddress: string;
  alternateRepPhone: string;
  alternateRepEmail: string;

  // --- Estructura societaria ---
  shareholders: Shareholder[];

  // --- Beneficiario final ---
  beneficiaries: Beneficiary[];

  // --- Perfil de riesgo ---
  companyHasPep: YesNo | null;
  companyPep: PepDeclaration;

  // --- Datos del negocio (compartido) ---
  economicActivity: string;
  monthlyVolume: string;
  averageTicket: string;
  salesChannels: string[];
  businessWebsite: string;

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
  holderPep: { ...emptyPepDeclaration },

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

  alternateRepFullName: '',
  alternateRepDocumentNumber: '',
  alternateRepBirthDate: '',
  alternateRepIssueDate: '',
  alternateRepBirthCountry: '',
  alternateRepBirthCity: '',
  alternateRepNationality: '',
  alternateRepAddress: '',
  alternateRepPhone: '',
  alternateRepEmail: '',

  shareholders: [],

  beneficiaries: [],

  companyHasPep: null,
  companyPep: { ...emptyPepDeclaration },

  economicActivity: '',
  monthlyVolume: '',
  averageTicket: '',
  salesChannels: [],
  businessWebsite: '',

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
