// Todos los textos del flujo, en español.
// Los textos que en el diseño estaban en inglés se tradujeron al castellano.

export const copy = {
  common: {
    needHelp: '¿Necesitas ayuda?', // "Need help?"
    back: 'Atrás', // "Back"
    next: 'Siguiente', // "Next"
    finish: 'Finalizar registro',
    submit: 'Enviar',
    upload: 'Subir archivo', // "Upload"
    open: 'Abrir', // "Open"
    delete: 'Eliminar',
    fileHint: 'PDF · máx. 10 MB por archivo', // "PDF · max 10 MB per file"
    optional: '(opcional)',
    multipleSelection: '(selección múltiple)',
    yes: 'Sí',
    no: 'No',
  },

  personaBadge: {
    fisica: 'Persona Física',
    juridica: 'Persona Jurídica',
  },

  intro: {
    eyebrow: 'PROCESO DE ONBOARDING', // "ONBOARDING PROCESS"
    title: 'Conozca a su proveedor', // "Know Your Supplier"
    description:
      'Un proceso de cumplimiento único requerido para registrarte como proveedor de servicios de Akua.', // "A one-time compliance process required to register as an Akua service provider."
    documentsNote:
      'Ten a mano los documentos de tu empresa, toma alrededor de 20 minutos.', // "Have your company documents ready, it takes around 20 minutes."
    cta: 'Comenzar', // "Get Started"
  },

  select: {
    title: 'Selecciona el tipo de negocio',
    fisica: {
      title: 'Persona Natural',
      description: 'Individuo que actúa en nombre propio',
    },
    juridica: {
      title: 'Persona Jurídica',
      description: 'Empresa, sociedad u organización legal',
    },
  },

  steps: {
    // Persona física
    holder: 'Datos del titular',
    business: 'Datos de negocio',
    commercial: 'Información comercial',
    banking: 'Datos bancarios',
    documents: 'Documentos requeridos',
    // Persona jurídica
    identification: 'Identificación y contacto',
    legalRep: 'Representante legal',
    ownership: 'Estructura societaria',
    beneficiary: 'Beneficiario final',
    riskProfile: 'Perfil de riesgo',
    bankingPayouts: 'Datos bancarios para payouts',
    review: 'Revisión',
  },

  fields: {
    fullName: 'Nombre completo',
    documentType: 'Tipo de documento',
    documentNumber: 'Número de documento',
    documentNumberHint: 'Cédula de ciudadanía / extranjería / pasaporte',
    issueDate: 'Fecha de expedición del documento',
    birthDate: 'Fecha de nacimiento',
    nationality: 'Nacionalidad',
    birthCity: 'Ciudad de nacimiento',
    birthCountry: 'País de nacimiento',
    address: 'Dirección',
    residentialAddress: 'Dirección residencial',
    city: 'Ciudad',
    department: 'Departamento',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    website: 'Sitio web',
    selectFromList: 'Seleccionar de lista',
    selectCountry: 'Seleccione país',
    selectCity: 'Seleccione ciudad',
    selectNationality: 'Seleccione nacionalidad',
  },

  holder: {
    title: 'Identificación del titular',
    contactTitle: 'Datos de contacto',
    pepTitle: 'Declaración PEP',
    pepLabel: 'Declaro que el titular es una Persona Políticamente Expuesta',
    fullNamePlaceholder: 'Juan Pérez',
    documentNumberPlaceholder: 'Ej: 12.345.678',
    emailPlaceholder: 'Escribe aquí el correo electrónico',
  },

  business: {
    title: 'Datos del negocio',
    economicActivity: 'Actividad económica principal',
    monthlyVolume: '¿Cuánto procesas en el mes? (monto estimado en COP)',
    averageTicket: '¿Cuál es tu ticket promedio por transacción? (en COP)',
    channelsQuestion: '¿Por qué medios vendes?',
    channels: {
      ecommerce: 'Ecommerce (tienda en línea)',
      inPerson: 'Venta presencial (punto físico)',
      both: 'Ambos',
    },
    website: 'Sitio web',
    websitePlaceholder: 'http://...',
  },

  commercial: {
    title: 'Información comercial',
    commercialName: 'Nombre comercial (si es diferente al nombre del titular)',
    commercialNamePlaceholder: 'Nombre del comercio',
    commercialAddressPlaceholder: 'Av. Lope de Vega 123',
    commercialPhone: 'Teléfono de contacto comercial',
    commercialDepartment: 'Departamento comercial',
    commercialCity: 'Ciudad comercial',
  },

  banking: {
    title: 'Datos bancarios',
    payoutBank: 'Banco para payouts',
    accountNumber: 'Número de cuenta',
    accountTypeTitle: 'Tipo de cuenta',
    accountType: {
      ahorros: 'Ahorros',
      corriente: 'Corriente',
    },
    tipsQuestion: '¿Recibes propinas a través de tu punto de venta?',
  },

  identification: {
    companyTitle: 'Identificación de la empresa',
    contactTitle: 'Datos de contacto',
    legalName: 'Razón social completa',
    legalNamePlaceholder: 'Ingrese razón social',
    nit: 'NIT',
    nitPlaceholder: 'Ingrese NIT',
    companyType: 'Tipo de sociedad',
    companyTypePlaceholder: 'Seleccionar tipo de sociedad',
    corporateEmail: 'Correo electrónico corporativo',
  },

  legalRep: {
    title: 'Representante legal',
    principalTitle: 'Representante legal principal',
    alternateQuestion: '¿Existe representante legal suplente?',
  },

  ownership: {
    title: 'Estructura societaria',
    subtitle: 'Accionistas con participación mayor al 5%',
    participation: 'Porcentaje de participación (%)',
    addShareholder: 'Agregar accionista',
    shareholderLabel: 'Accionista',
  },

  beneficiary: {
    title: 'Beneficiario final (Controlador)',
    calloutTitle: 'Beneficiario final',
    calloutText: 'Persona natural que controla o beneficia de la empresa',
    controlPercentage: 'Porcentaje de control (%)',
  },

  riskProfile: {
    title: 'Perfil de riesgo',
    question:
      '¿El representante legal, suplente o algún accionista >5% es Persona Políticamente Expuesta (PEP)?',
    calloutTitle: 'Persona Políticamente Expuesta (PEP)',
    calloutText:
      'Una PEP es alguien que ocupa o ha ocupado un cargo público importante, o sus familiares cercanos/asociados.',
  },

  documents: {
    title: 'Documentos requeridos',
    onlyIfApplies: '*Sólo si aplica',
  },

  review: {
    title: 'Revisión',
    edit: 'Editar',
  },

  success: {
    title: '¡Registro enviado!',
    description:
      'Hemos recibido tu información. Nuestro equipo de cumplimiento revisará tu registro y te contactaremos a la brevedad.',
    cta: 'Volver al inicio',
  },
};

// Documentos requeridos por tipo de persona.
export interface DocumentField {
  key: string;
  label: string;
  optional?: boolean;
  note?: string;
}

export const FISICA_DOCUMENTS: DocumentField[] = [
  { key: 'storePhoto', label: 'Foto del comercio (fachada o punto de venta)' },
  { key: 'rut', label: 'RUT (Registro Único Tributario) actualizado' },
  {
    key: 'holderId',
    label: 'Cédula del titular (frente y detrás) / pasaporte',
  },
  {
    key: 'bankCertificate',
    label: 'Certificado bancario (opcional, para validar cuenta)',
    optional: true,
  },
];

export const JURIDICA_DOCUMENTS: DocumentField[] = [
  { key: 'companyRut', label: 'RUT de la empresa (actualizado)' },
  {
    key: 'chamberOfCommerce',
    label: 'Cámara de Comercio (no mayor a 3 meses)',
  },
  {
    key: 'legalRepId',
    label:
      'Documento de identidad / Cédula de ciudadanía / extranjería / pasaporte del representante legal (frente y dorso)',
  },
  {
    key: 'alternateRepId',
    label:
      'Documento de identidad del suplente (cédula de ciudadanía / extranjería / pasaporte)',
    note: '*Sólo si aplica',
  },
  {
    key: 'bankCertificate',
    label: 'Certificado bancario (opcional)',
    optional: true,
  },
  {
    key: 'incomeStatement',
    label: 'Declaración de renta de la empresa (deseable, no obligatorio)',
    optional: true,
  },
  { key: 'storePhoto', label: 'Foto del comercio (fachada o punto de venta)' },
];
