// Registro de taxonomías de actividad económica por país.
// Cada país tiene su dataset propio (JSON) que se carga de forma perezosa
// (dynamic import) para no incluir todos los países en el bundle inicial.
// La capa canónica es ISIC Rev.4 (mapeo en cada entrada).

export interface ActivityEntry {
  localCode: string;
  localLabel: string;
  isicCode: string;
}

export interface Taxonomy {
  /** Sistema local (CIIU, CLAE, CNAE, ISIC…). */
  system: string;
  /** Revisión/edición del sistema. */
  revision: string;
  /** Autoridad emisora. */
  authority: string;
  /** Revisión de ISIC usada como capa canónica. */
  isicRevision: string;
  /** Carga perezosa del dataset del país. */
  load: () => Promise<ActivityEntry[]>;
}

interface ActivityFile {
  _todo?: string;
  entries: ActivityEntry[];
}

const ISIC_REVISION = 'Rev.4';

// Cada `load` usa un import estático-por-ruta para que el bundler pueda
// hacer code-splitting por país.
export const TAXONOMIES: Record<string, Taxonomy> = {
  CO: {
    system: 'CIIU',
    revision: 'Rev.4 A.C.',
    authority: 'DANE',
    isicRevision: ISIC_REVISION,
    load: () =>
      import('./co-ciiu.json').then((m) => (m.default as ActivityFile).entries),
  },
  EC: {
    system: 'CIIU',
    revision: 'Rev.4',
    authority: 'INEC',
    isicRevision: ISIC_REVISION,
    load: () =>
      import('./ec-ciiu.json').then((m) => (m.default as ActivityFile).entries),
  },
  AR: {
    system: 'CLAE',
    revision: '—',
    authority: 'ARCA (ex-AFIP)',
    isicRevision: ISIC_REVISION,
    load: () =>
      import('./ar-clae.json').then((m) => (m.default as ActivityFile).entries),
  },
  BR: {
    system: 'CNAE',
    revision: '—',
    authority: 'IBGE',
    isicRevision: ISIC_REVISION,
    load: () =>
      import('./br-cnae.json').then((m) => (m.default as ActivityFile).entries),
  },
  CL: {
    system: 'CIIU',
    revision: 'Rev.4 CL',
    authority: 'SII',
    isicRevision: ISIC_REVISION,
    load: () =>
      import('./cl-ciiu.json').then((m) => (m.default as ActivityFile).entries),
  },
  UY: {
    system: 'CIIU',
    revision: 'Rev.4',
    authority: 'INE / DGI',
    isicRevision: ISIC_REVISION,
    load: () =>
      import('./uy-ciiu.json').then((m) => (m.default as ActivityFile).entries),
  },
};

// Fallback para cualquier país sin dataset local: ISIC Rev.4.
export const ISIC_FALLBACK: Taxonomy = {
  system: 'ISIC',
  revision: 'Rev.4',
  authority: 'ONU',
  isicRevision: ISIC_REVISION,
  load: () =>
    import('./isic.json').then((m) => (m.default as ActivityFile).entries),
};

/** Devuelve la taxonomía del país (o ISIC como fallback). */
export function getTaxonomy(country: string): Taxonomy {
  return TAXONOMIES[country] ?? ISIC_FALLBACK;
}

/** Carga perezosa de las actividades del país seleccionado. */
export function loadActivities(country: string): Promise<ActivityEntry[]> {
  return getTaxonomy(country).load();
}
