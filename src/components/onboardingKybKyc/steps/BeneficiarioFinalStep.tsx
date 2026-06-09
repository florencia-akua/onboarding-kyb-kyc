'use client';

import { Stack } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { PersonSection } from '../fields/PersonSection';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';

export function BeneficiarioFinalStep({
  data,
  update,
  asSection,
}: StepProps & { asSection?: boolean }) {
  return (
    <Stack gap="md">
      {!asSection && <StepTitle>{copy.beneficiary.title}</StepTitle>}
      <PersonSection
        idPrefix="bf"
        cardLabel={copy.beneficiary.cardLabel}
        tooltip={copy.beneficiary.calloutText}
        newPersonLabel={copy.beneficiary.newPersonLabel}
        people={data.beneficiaries}
        onChange={(people) => update({ beneficiaries: people })}
      />
    </Stack>
  );
}
