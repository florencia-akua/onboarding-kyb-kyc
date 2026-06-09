import { FISICA_DOCUMENTS, JURIDICA_DOCUMENTS } from './copy';
import type { OnboardingFormData } from './types';

// Valores "vacíos" cuentan como faltantes.
function countMissing(values: Array<string | boolean | null>): number {
  return values.filter(
    (v) =>
      v === false ||
      v === null ||
      (typeof v === 'string' && v.trim() === '')
  ).length;
}

// Marca de "presente" para condiciones (objetos, arrays, etc.).
const ok = (cond: boolean): string => (cond ? 'x' : '');

/** Cantidad de campos requeridos faltantes en un paso (0 = completo). */
export function getStepMissing(
  stepId: string,
  d: OnboardingFormData
): number {
  switch (stepId) {
    case 'holder':
      return countMissing([
        d.holderFullName,
        d.holderDocumentType,
        d.holderDocumentNumber,
        d.holderDocumentIssueDate,
        d.holderBirthDate,
        d.holderNationality,
        d.holderBirthCity,
        d.holderAddress,
        d.holderCity,
        d.holderDepartment,
        d.holderPhone,
        d.holderEmail,
      ]);

    case 'identification':
      return countMissing([
        d.companyCountry,
        d.companyLegalName,
        d.companyNit,
        d.companyType,
        d.companyAddress,
        d.companyDepartment,
        d.companyCity,
        d.companyPhone,
        d.companyEmail,
      ]);

    case 'legalRep':
      return countMissing([ok(d.legalRepPeople.length > 0)]);

    case 'sociosBeneficiarios':
      return countMissing([
        ok(d.shareholders.length > 0),
        ok(d.beneficiaries.length > 0),
      ]);

    case 'business':
      return countMissing([
        d.businessCountry,
        ok(d.economicActivity !== null),
        d.monthlyVolume,
        d.averageTicket,
        ok(d.salesChannels.length > 0),
      ]);

    case 'commercial':
      return countMissing([
        d.commercialName,
        d.commercialAddress,
        d.commercialPhone,
        d.commercialDepartment,
        d.commercialCity,
      ]);

    case 'banking':
    case 'bankingPayouts':
      return countMissing([d.payoutBank, d.accountNumber, d.accountType]);

    case 'documents': {
      const docs =
        d.personaType === 'juridica' ? JURIDICA_DOCUMENTS : FISICA_DOCUMENTS;
      return docs.filter((f) => !f.optional && !d.documents[f.key]).length;
    }

    default:
      return 0;
  }
}
