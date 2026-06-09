import type { ReactNode } from 'react';
import {
  IconBuilding,
  IconBuildingBank,
  IconBuildingStore,
  IconBriefcase,
  IconCircleCheck,
  IconFileText,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { copy, FISICA_DOCUMENTS, JURIDICA_DOCUMENTS } from '../copy';
import type { PersonaType } from '../types';
import type { StepProps } from '../stepProps';
import { DatosTitularStep } from './DatosTitularStep';
import { DatosNegocioStep } from './DatosNegocioStep';
import { InformacionComercialStep } from './InformacionComercialStep';
import { DatosBancariosStep } from './DatosBancariosStep';
import { DocumentosStep } from './DocumentosStep';
import { IdentificacionContactoStep } from './IdentificacionContactoStep';
import { RepresentanteLegalStep } from './RepresentanteLegalStep';
import { SociosBeneficiariosStep } from './SociosBeneficiariosStep';

const ICON_SIZE = 18;

export interface StepConfig {
  id: string;
  label: string;
  icon: ReactNode;
  render: (props: StepProps) => ReactNode;
}

const FISICA_STEPS: StepConfig[] = [
  {
    id: 'holder',
    label: copy.steps.holder,
    icon: <IconUser size={ICON_SIZE} />,
    render: (p) => <DatosTitularStep {...p} />,
  },
  {
    id: 'business',
    label: copy.steps.business,
    icon: <IconBriefcase size={ICON_SIZE} />,
    render: (p) => <DatosNegocioStep {...p} />,
  },
  {
    id: 'commercial',
    label: copy.steps.commercial,
    icon: <IconBuildingStore size={ICON_SIZE} />,
    render: (p) => <InformacionComercialStep {...p} />,
  },
  {
    id: 'banking',
    label: copy.steps.banking,
    icon: <IconBuildingBank size={ICON_SIZE} />,
    render: (p) => <DatosBancariosStep {...p} />,
  },
  {
    id: 'documents',
    label: copy.steps.documents,
    icon: <IconFileText size={ICON_SIZE} />,
    render: (p) => <DocumentosStep {...p} fields={FISICA_DOCUMENTS} />,
  },
];

const JURIDICA_STEPS: StepConfig[] = [
  {
    id: 'identification',
    label: copy.steps.identification,
    icon: <IconBuilding size={ICON_SIZE} />,
    render: (p) => <IdentificacionContactoStep {...p} />,
  },
  {
    id: 'legalRep',
    label: copy.steps.legalRep,
    icon: <IconUser size={ICON_SIZE} />,
    render: (p) => <RepresentanteLegalStep {...p} />,
  },
  {
    id: 'sociosBeneficiarios',
    label: copy.steps.sociosBeneficiarios,
    icon: <IconUsersGroup size={ICON_SIZE} />,
    render: (p) => <SociosBeneficiariosStep {...p} />,
  },
  {
    id: 'business',
    label: copy.steps.business,
    icon: <IconBriefcase size={ICON_SIZE} />,
    render: (p) => <DatosNegocioStep {...p} />,
  },
  {
    id: 'bankingPayouts',
    label: copy.steps.bankingPayouts,
    icon: <IconBuildingBank size={ICON_SIZE} />,
    render: (p) => <DatosBancariosStep {...p} />,
  },
  {
    id: 'documents',
    label: copy.steps.documents,
    icon: <IconFileText size={ICON_SIZE} />,
    render: (p) => <DocumentosStep {...p} fields={JURIDICA_DOCUMENTS} />,
  },
];

// Paso final de revisión y envío (su contenido se renderiza aparte).
const REVIEW_STEP: StepConfig = {
  id: 'review',
  label: copy.steps.reviewStep,
  icon: <IconCircleCheck size={ICON_SIZE} />,
  render: () => null,
};

export function getSteps(personaType: PersonaType): StepConfig[] {
  const base = personaType === 'fisica' ? FISICA_STEPS : JURIDICA_STEPS;
  return [...base, REVIEW_STEP];
}
