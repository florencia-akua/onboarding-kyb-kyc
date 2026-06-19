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
    addPerson: 'Agregar persona',
    add: 'Agregar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    inProgress: 'En progreso',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado',
  },

  addPersonForm: {
    fullName: 'Nombre completo',
    fullNamePlaceholder: 'Juan Pérez',
    email: 'Email',
    emailPlaceholder: 'Ingrese email',
    completionQuestion: '¿Cómo quieres completar sus datos?',
    selfTitle: 'Lo completo yo',
    selfDesc: 'Tengo a mano sus datos y su documento.',
    inviteTitle: 'Se lo pido a la persona',
    inviteDesc: 'Le enviaremos un enlace para que lo complete.',
    participation: 'Porcentaje de participación (%)',
    participationPlaceholder: 'Ingrese porcentaje',
    birthCountry: 'País de nacimiento',
    birthCountryPlaceholder: 'Ingrese país de nacimiento',
    nationality: 'Nacionalidad',
    nationalityPlaceholder: 'Ingrese nacionalidad',
    documentType: 'Tipo de documento',
    documentTypePlaceholder: 'Seleccionar',
    documentTypeTooltip: 'Cédula de ciudadanía, cédula de extranjería o pasaporte',
    documentNumber: 'Número',
    documentNumberPlaceholder: 'Ingresar número',
    docFront: 'Documento de identidad (frente)',
    docBack: 'Documento de identidad (dorso)',
    pepQuestion: '¿Es Persona Políticamente Expuesta (PEP)?',
    inviteText:
      'Le enviaremos un enlace seguro para que complete sus datos. Su avance queda visible en el formulario.',
    sendLink: 'Enviar enlace',
    linkSent: 'Enlace enviado',
    inviteHelper:
      'Puedes continuar aunque alguien siga "En progreso": completará sus datos en paralelo.',
  },

  personaBadge: {
    fisica: 'Persona Física',
    juridica: 'Persona Jurídica',
  },

  intro: {
    eyebrow: 'Onboarding',
    title: 'Nuevo comercio',
    description: 'Le damos la bienvenida al registro de Merchants.',
    documentsNote:
      'Complete la información requerida en los siguientes pasos para activar su cuenta y comenzar a operar.',
    cta: 'Comenzar',
  },

  select: {
    title: 'Selecciona el tipo de negocio',
    fisica: {
      title: 'Persona Natural',
      description: 'Individuo que vende en nombre propio',
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
    sociosBeneficiarios: 'Socios y Beneficiarios',
    ownership: 'Estructura societaria',
    beneficiary: 'Beneficiario final',
    riskProfile: 'Perfil de riesgo',
    bankingPayouts: 'Datos bancarios para payouts',
    review: 'Revisión',
    reviewStep: 'Revisión y envío',
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
    pepLabel: '¿Eres una Persona Expuesta Políticamente (PEP)?',
    fullNamePlaceholder: 'Juan Pérez',
    documentNumberPlaceholder: 'Ej: 12.345.678',
    emailPlaceholder: 'Escribe aquí el correo electrónico',
  },

  pepDeclaration: {
    positionLabel: '¿Cuál es o fue el cargo público que ocupaste?',
    positionPlaceholder: 'Ej: Ministro, Congresista, Juez…',
    positionHint:
      '(Ej: Concejal, Alcalde, Ministro, Congresista, Juez, Gobernador, etc.)',
    institutionLabel: '¿En qué institución o entidad pública ejerciste el cargo?',
    institutionPlaceholder: 'Institución o entidad pública',
    periodQuestion: '¿En qué período ejerciste el cargo?',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de finalización',
    startPlaceholder: 'DD / MM / AAAA',
    endPlaceholder: 'Dejar vacío si continúa (Actual)',
    levelQuestion: '¿El cargo es o fue a nivel nacional, regional o municipal?',
    levelNacional: 'Nacional',
    levelRegional: 'Regional (Departamento)',
    levelMunicipal: 'Municipal (Municipio)',
    relativeQuestion:
      '¿Eres familiar cercano de una persona que ocupa o ocupó un cargo público importante?',
    relativeDetailLabel: 'Especificar relación y nombre del cargo',
    relativeDetailPlaceholder: 'Relación y cargo',
    associateQuestion:
      '¿Eres conocido/asociado cercano de una persona políticamente expuesta?',
    associateDetailLabel: 'Explicar la relación',
    associateDetailPlaceholder: 'Explicación de la relación',
    publicFundsQuestion:
      '¿Has recibido o recibes fondos públicos relacionados con tu cargo?',
    decisionPowerQuestion:
      '¿Tienes o tuviste poder de decisión sobre contratación pública, presupuesto o recursos del Estado?',
    fundsOriginTitle: 'Declaración de origen de fondos',
    fundsOriginLabel:
      'Describe brevemente el origen de los fondos que procesarás a través de la plataforma:',
    fundsOriginPlaceholder: 'Describe el origen de los fondos…',
    approvalQuestion:
      '¿Necesitas aprobación especial de cumplimiento para operar como PEP?',
    approvalHint:
      '(Esta pregunta es para activar revisión manual del equipo de compliance)',
    approvalRequires: 'Sí, requiero aprobación',
    approvalHas: 'No, ya tengo aprobación previa (adjuntar documento)',
    approvalDocLabel: 'Documento de aprobación previa',
  },

  business: {
    title: 'Datos del negocio',
    country: 'País de operación',
    countryPlaceholder: 'Seleccione el país',
    economicActivity: 'Actividad económica principal',
    economicActivityPlaceholder: 'Busque por código o descripción',
    economicActivityCountryFirst: 'Seleccione primero el país de operación',
    economicActivityLoading: 'Cargando actividades…',
    monthlyVolume: '¿Cuánto procesas en el mes?',
    monthlyVolumeTooltip: 'Monto estimado en COP',
    averageTicket: 'Ticket promedio por transacción',
    averageTicketTooltip: 'En COP',
    channelsQuestion: '¿Por qué medios vendes?',
    channels: {
      ecommerce: 'Ecommerce (tienda en línea)',
      inPerson: 'Venta presencial (punto físico)',
      both: 'Ambos',
    },
    website: 'Sitio web',
    websitePlaceholder: 'http://... o usuario',
    websiteDescription: 'Si vende por redes sociales, puede ingresar el enlace a su perfil (Instagram, Facebook, etc.).',
  },

  commercial: {
    title: 'Información comercial',
    commercialName: 'Nombre comercial (si es diferente al nombre del titular)',
    commercialNamePlaceholder: 'Nombre del comercio',
    commercialAddressPlaceholder: 'Av. Lope de Vega 123',
    commercialPhone: 'Teléfono',
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
    alternateTitle: 'Representante legal suplente',
    alternateHint: '(si aplica)',
    mandatory: 'Obligatorio',
    optional: 'Opcional',
    unassigned: 'sin asignar',
    newPersonLabel: 'Nuevo representante legal',
  },

  ownership: {
    title: 'Estructura societaria',
    cardLabel: 'Accionistas',
    newPersonLabel: 'Nuevo accionista',
    subtitle: 'Accionistas con participación mayor al 5%',
    participation: 'Porcentaje de participación (%)',
    addShareholder: 'Agregar',
    shareholderLabel: 'Accionista',
  },

  beneficiary: {
    title: 'Beneficiario final (Controlador)',
    cardLabel: 'Beneficiario final',
    newPersonLabel: 'Beneficiario final',
    calloutTitle: 'Beneficiario final',
    calloutText: 'Persona natural que controla/beneficia de la empresa',
    controlPercentage: 'Porcentaje de control (%)',
    addBeneficiary: 'Agregar',
    beneficiaryLabel: 'Beneficiario',
  },

  riskProfile: {
    title: 'Perfil de riesgo',
    declarationTitle: 'Declaración PEP',
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
    completed: 'Completed',
    missingOne: 'Faltante',
    missingMany: 'Faltantes',
  },

  invitee: {
    greeting: 'Juan Martínez,',
    intro:
      'Usted figura como beneficiario final de [Empresa] en akua. Le pedimos completar los siguientes datos para finalizar su verificación de forma segura.',
  },

  success: {
    title: '¡Registro enviado!',
    description:
      'Hemos recibido la información. Nuestro equipo revisará el registro y nos contactaremos a la brevedad.',
    close: 'Ya puedes cerrar esta ventana.',
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
