'use client';

import { Divider, Stack } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';
import { EstructuraSocietariaStep } from './EstructuraSocietariaStep';
import { BeneficiarioFinalStep } from './BeneficiarioFinalStep';

export function SociosBeneficiariosStep(props: StepProps) {
  return (
    <Stack gap={32}>
      <StepTitle>{copy.steps.sociosBeneficiarios}</StepTitle>
      <Stack gap={24}>
        <EstructuraSocietariaStep {...props} asSection />
        <Divider />
        <BeneficiarioFinalStep {...props} asSection />
      </Stack>
    </Stack>
  );
}
