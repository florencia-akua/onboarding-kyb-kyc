'use client';

import { Stack } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';
import { EstructuraSocietariaStep } from './EstructuraSocietariaStep';
import { BeneficiarioFinalStep } from './BeneficiarioFinalStep';
import { PerfilRiesgoStep } from './PerfilRiesgoStep';

export function SociosBeneficiariosStep(props: StepProps) {
  return (
    <Stack gap="md">
      <StepTitle>{copy.steps.sociosBeneficiarios}</StepTitle>
      <EstructuraSocietariaStep {...props} asSection />
      <BeneficiarioFinalStep {...props} asSection />
      <PerfilRiesgoStep {...props} asSection />
    </Stack>
  );
}
