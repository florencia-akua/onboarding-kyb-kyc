# Onboarding KYB/KYC · Akua

Flujo de onboarding (KYB/KYC) para proveedores de Akua, en español. Proyecto
Next.js autocontenido, independiente del dashboard.

Incluye dos caminos:

- **Persona Física** (5 pasos): datos del titular, datos de negocio, información
  comercial, datos bancarios y documentos requeridos.
- **Persona Jurídica** (8 pasos): identificación y contacto, representante legal,
  estructura societaria, beneficiario final, perfil de riesgo, datos de negocio,
  datos bancarios y documentos, con pantalla de revisión final.

Toda la data es de front (estado local) — no hay backend conectado.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Mantine v7 (`@mantine/core`) con el tema de marca de Akua
- `@tabler/icons-react`

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Estructura

```
src/
  app/                      # App Router (layout + page)
  theme.ts                  # Tema Mantine con la paleta de Akua
  components/onboardingKybKyc/
    OnboardingKybKyc.tsx     # Orquestador del flujo (fases + estado)
    copy.ts                  # Todos los textos (español) y documentos
    options.ts               # Opciones de los selects (contexto Colombia)
    types.ts                 # Tipos del formulario
    stepProps.ts             # Props compartidos de los pasos
    layout/                  # TopNav, FooterBar, sidebar y shells
    fields/                  # Campos reutilizables (teléfono, upload, etc.)
    screens/                 # Intro, selección de tipo, revisión, éxito
    steps/                   # Pasos de cada flujo + configuración
```
