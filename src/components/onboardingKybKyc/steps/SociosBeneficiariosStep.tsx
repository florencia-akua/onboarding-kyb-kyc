'use client';

import { Stack } from '@mantine/core';
import type { StepProps } from '../stepProps';
import { EstructuraSocietariaStep } from './EstructuraSocietariaStep';
import { BeneficiarioFinalStep } from './BeneficiarioFinalStep';
import { PerfilRiesgoStep } from './PerfilRiesgoStep';

export function SociosBeneficiariosStep(props: StepProps) {
  return (
    <Stack gap={32}>
      <EstructuraSocietariaStep {...props} asSection />
      <BeneficiarioFinalStep {...props} asSection />
      <PerfilRiesgoStep {...props} asSection />
    </Stack>
  );
}
