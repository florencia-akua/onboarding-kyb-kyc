'use client';

import { Stack } from '@mantine/core';
import { IconUserCheck } from '@tabler/icons-react';
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
        icon={<IconUserCheck size={20} />}
        cardLabel={copy.beneficiary.cardLabel}
        subtitle={copy.beneficiary.calloutText}
        newPersonLabel={copy.beneficiary.newPersonLabel}
        people={data.beneficiaries}
        onChange={(people) => update({ beneficiaries: people })}
      />
    </Stack>
  );
}
