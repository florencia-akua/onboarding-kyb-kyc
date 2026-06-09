'use client';

import { Stack } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { PersonSection } from '../fields/PersonSection';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';

export function EstructuraSocietariaStep({
  data,
  update,
  asSection,
}: StepProps & { asSection?: boolean }) {
  return (
    <Stack gap="md">
      {!asSection && <StepTitle>{copy.ownership.title}</StepTitle>}
      <PersonSection
        idPrefix="sh"
        cardLabel={copy.ownership.cardLabel}
        tooltip={copy.ownership.subtitle}
        newPersonLabel={copy.ownership.newPersonLabel}
        people={data.shareholders}
        onChange={(people) => update({ shareholders: people })}
      />
    </Stack>
  );
}
