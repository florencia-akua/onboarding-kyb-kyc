# PROGRESO — onboarding-kyb-kyc

## 1. Objetivo
Prototipo standalone de onboarding KYB/KYC para Akua.
- Repo: `florencia-akua/onboarding-kyb-kyc` (main → auto-deploy)
- URL prod: https://onboarding-kyb-kyc.vercel.app/
- Local: `cd /Users/florenciavitacarino/Workspace/onboarding-kyb-kyc && npm run dev`
- Figma principal: `QY9mD4HJ4piQStcjZ2a5Mw` (onboarding KYB/KYC)

---

## 2. Hecho (ya commiteado)

Último commit: `4714d7a`

### Flujo general
- `src/components/onboardingKybKyc/OnboardingKybKyc.tsx` — orquestador wizard, fases: intro/select/form/success. "Revisión y envío" es el último step (no una fase separada).
- `src/components/onboardingKybKyc/steps/stepsConfig.tsx` — FISICA_STEPS (5) + JURIDICA_STEPS (6) + REVIEW_STEP al final de ambos.
- `src/components/onboardingKybKyc/types.ts` — Person, Beneficiary, PepDeclaration, BusinessActivity, etc.
- `src/components/onboardingKybKyc/stepStatus.ts` — `getStepMissing(stepId, data)`: cuenta campos faltantes por step (usado para pills en Revisión).
- `src/components/onboardingKybKyc/copy.ts` — todos los textos.
- `src/components/onboardingKybKyc/options.ts` — opciones de selects (países, nacionalidades, tipos sociedad, etc.).

### Layout
- `src/components/onboardingKybKyc/layout/FormShell.tsx` — shell del formulario (sidebar + content). Renderiza ReviewList cuando step es 'review'.
- `src/components/onboardingKybKyc/layout/StepSidebar.tsx` — sidebar con pasos.
- `src/components/onboardingKybKyc/layout/FooterBar.tsx` — botones Atrás/Siguiente. Props: `nextDisabled`.
- `src/components/onboardingKybKyc/layout/TopNav.tsx` — logo + chip "Persona Jurídica/Física" + botón ayuda.

### Pantallas
- `src/components/onboardingKybKyc/screens/IntroScreen.tsx` — desktop (2 col: dot bg + svg) / mobile (svg arriba, CTA abajo fijo con safe-area).
- `src/components/onboardingKybKyc/screens/PersonaTypeScreen.tsx` — selector física/jurídica.
- `src/components/onboardingKybKyc/screens/SuccessScreen.tsx` — pantalla de éxito al final.

### Pasos del formulario
- `src/components/onboardingKybKyc/steps/DatosTitularStep.tsx` — datos del titular (persona física). Incluye PEP toggle + declaración.
- `src/components/onboardingKybKyc/steps/IdentificacionContactoStep.tsx` — identificación empresa (jurídica).
- `src/components/onboardingKybKyc/steps/RepresentanteLegalStep.tsx` — dos PersonSection: principal (obligatorio) + suplente (si aplica).
- `src/components/onboardingKybKyc/steps/SociosBeneficiariosStep.tsx` — contiene EstructuraSocietariaStep + BeneficiarioFinalStep con Divider.
- `src/components/onboardingKybKyc/steps/EstructuraSocietariaStep.tsx` — accionistas con PersonSection.
- `src/components/onboardingKybKyc/steps/BeneficiarioFinalStep.tsx` — beneficiarios finales con PersonSection.
- `src/components/onboardingKybKyc/steps/DatosNegocioStep.tsx` — datos del negocio + actividad económica por país.
- `src/components/onboardingKybKyc/steps/InformacionComercialStep.tsx` — info comercial.
- `src/components/onboardingKybKyc/steps/DatosBancariosStep.tsx` — datos bancarios.
- `src/components/onboardingKybKyc/steps/DocumentosStep.tsx` — carga de documentos.

### Campos / componentes reutilizables
- `src/components/onboardingKybKyc/fields/PersonSection.tsx` — fila con icono/título/subtítulo + botón "Agregar +"; expande AddPersonForm al clickear; muestra InvitedPersonRow por persona agregada.
- `src/components/onboardingKybKyc/fields/AddPersonForm.tsx` — formulario de alta de persona: nombre/apellido/email + elección "Lo completo yo" / "Se lo pido a la persona".
- `src/components/onboardingKybKyc/fields/PersonDataFields.tsx` — campos de datos de persona: documento, participación, país nacimiento, nacionalidad, doc frente/dorso, PEP toggle + callout + declaración.
- `src/components/onboardingKybKyc/fields/InvitedPersonRow.tsx` — fila de persona invitada: nombre, pill "En progreso" (lavanda), link de invitación + botón copiar con tooltip.
- `src/components/onboardingKybKyc/fields/PepDeclarationFields.tsx` — campos de declaración PEP (nivel, cargo, institución, etc.).
- `src/components/onboardingKybKyc/fields/ReviewList.tsx` — lista de pasos con pill "Completado" (verde) o "N Faltantes" (rojo) + lápiz para ir a editar.
- `src/components/onboardingKybKyc/fields/PhoneField.tsx` — campo teléfono con selector de prefijo (todos los países, searchable).
- `src/components/onboardingKybKyc/fields/DocumentUploadField.tsx` — campo de carga de documento.
- `src/components/onboardingKybKyc/fields/DateField.tsx` — campo de fecha con @mantine/dates.

### Página pública invitado
- `src/app/b/[code]/page.tsx` — ruta pública para que la persona invitada complete sus datos. Usa PersonDataFields. Al enviar → SuccessScreen.

### Datos
- `src/data/activities/taxonomies.ts` — `loadActivities(country)` con dynamic imports por país.
- `src/data/activities/*.json` — catálogos CIIU/CNAE por país (CO, EC, AR, BR, CL, UY + fallback ISIC). Tienen `_todo` marker con pocos ejemplos.

### Tema / estilos
- `src/theme.ts` — tema Mantine personalizado: primary `#180047`, radius `sm`=8px, Inter font.
- `src/app/globals.css` (en commit anterior) — DS tokens: `--mantine-color-default-border: #dee2e6`, `--mantine-color-text: #0a0b0d`.
- `public/logo-akua.svg` — logo Akua.
- `public/intro-dashboard.svg` — preview dashboard desktop.
- `public/intro-dashboard-mobile.svg` — preview dashboard mobile.

---

## 3. En progreso (cambios locales SIN commitear)

**8 archivos modificados, NO pusheados a Vercel:**

### Fix 1 — iOS zoom + inputs pequeños en mobile
**Archivo:** `src/app/globals.css`  
Agregado al final:
```css
@media (max-width: 61.99em) {
  .mantine-Input-input,
  .mantine-InputBase-input {
    min-height: 2.75rem;
    font-size: 1rem;  /* evita zoom automático iOS */
  }
}
```

### Fix 2 — Dropdowns abriendo hacia arriba en mobile
**Archivos modificados:** todos los `Select` en:
- `src/components/onboardingKybKyc/steps/DatosTitularStep.tsx` (5 selects)
- `src/components/onboardingKybKyc/steps/DatosNegocioStep.tsx`
- `src/components/onboardingKybKyc/steps/DatosBancariosStep.tsx`
- `src/components/onboardingKybKyc/steps/IdentificacionContactoStep.tsx`
- `src/components/onboardingKybKyc/steps/InformacionComercialStep.tsx`
- `src/components/onboardingKybKyc/fields/PersonDataFields.tsx` (birthCountry, nationality)
- `src/components/onboardingKybKyc/fields/PhoneField.tsx`

Cambio aplicado en cada `<Select>`:
```tsx
comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
```
(PhoneField usa `position: 'bottom-start'` para que el panel ancho quede alineado a la izquierda)

**Estado:** `tsc` pasa (typecheck OK), dev server corriendo en localhost:3000. **Falta buildear, commitear y pushear.**

---

## 4. Pendiente (por prioridad)

1. **Commitear y pushear los fixes mobile** (dropdown direction + iOS zoom) para que Florencia lo verifique en Vercel.
2. **Continuar ajustes mobile** — Florencia está enviando screenshots desde el celular con cambios a ajustar.
3. **Completar catálogos de actividad económica** — los JSON en `src/data/activities/` tienen `_todo` marker con pocos ejemplos (fuentes oficiales en `src/data/activities/README.md`).
4. **Revisión y envío — validaciones reales** — `stepStatus.ts` tiene lógica básica; puede necesitar refinamiento cuando se agreguen más campos.

---

## 5. Próximos pasos concretos

```bash
# 1. Desde el proyecto
cd /Users/florenciavitacarino/Workspace/onboarding-kyb-kyc

# 2. Verificar typecheck
npx tsc --noEmit

# 3. Commitear los fixes mobile pendientes
git add src/app/globals.css \
  src/components/onboardingKybKyc/fields/PersonDataFields.tsx \
  src/components/onboardingKybKyc/fields/PhoneField.tsx \
  src/components/onboardingKybKyc/steps/DatosBancariosStep.tsx \
  src/components/onboardingKybKyc/steps/DatosNegocioStep.tsx \
  src/components/onboardingKybKyc/steps/DatosTitularStep.tsx \
  src/components/onboardingKybKyc/steps/IdentificacionContactoStep.tsx \
  src/components/onboardingKybKyc/steps/InformacionComercialStep.tsx

git commit -m "fix(mobile): dropdown siempre hacia abajo + inputs más altos y sin zoom iOS"

# 4. Pushear a Vercel
git push origin main
```

---

## 6. Notas / decisiones técnicas

- **DS tokens clave:** `brand/primary #180047`, `fg/placeholder #adb5bd`, `border/default #dee2e6`, `border/strong #d1d5db`, radius `sm`=8px, Inter font.
- **Botones:** `size="md"`, `radius="sm"` (FooterBar). `size="xs"` para "Agregar +" en PersonSection. Sin `minHeight` override.
- **ActionIcon trash:** `variant="default"`, `radius="xs"`, `size=24`, border `#d1d5db`. Subtle = solo hover muestra el borde.
- **Pill "En progreso":** color lavanda/purple (NO verde).
- **Invite link:** `${window.location.origin}/b/${randomCode}` — funciona en localhost y Vercel.
- **PEP:** se declara POR persona (en AddPersonForm "Lo completo yo" y en DatosTitularStep). No hay sección global de PEP.
- **Revisión y envío:** es el último step en `getSteps()`, renderizado inline en FormShell. `nextDisabled=true` mientras `totalMissing > 0`.
- **Dev server en worktree:** usar `APFS cp -cR` clone de node_modules si hay problemas con Turbopack y symlinks (ver memory file).
- **Cache corruption fix:** `rm -rf .next` si el servidor crashea con "Cannot read properties of undefined (reading 'call')".
- **Figma KYB/KYC:** file key `QY9mD4HJ4piQStcjZ2a5Mw`, page "Onboarding KYB/KYC".
- **Node IDs útiles en Figma:** 
  - AddPersonForm: `538-18788`
  - Lo completo yo: `538-22127`
  - Se lo pide a la persona: `539-29250`  
  - InvitedPersonRow: `535-12264`
  - RepresentanteLegal: `544-12475`
  - Socios/BeneficiariosStep: `535-8570`
  - Invitee page: `545-10792`
  - DS ActionIcon trash: `1149-218`
