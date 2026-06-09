'use client';

import { Stack } from '@mantine/core';
import { IconUsersGroup } from '@tabler/icons-react';
import { StepTitle } from '../fields/SectionTitle';
import { PersonSection } from '../fields/PersonSection';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';

export function EstructuraSocietariaStep({
  data,
  update,
  showValidation,
  asSection,
}: StepProps & { asSection?: boolean }) {
  return (
    <Stack gap="md">
      {!asSection && <StepTitle>{copy.ownership.title}</StepTitle>}
      <PersonSection
        idPrefix="sh"
        icon={<IconUsersGroup size={20} />}
        cardLabel={copy.ownership.cardLabel}
        subtitle={copy.ownership.subtitle}
        newPersonLabel={copy.ownership.newPersonLabel}
        people={data.shareholders}
        onChange={(people) => update({ shareholders: people })}
        required
        showValidation={showValidation}
      />
    </Stack>
  );
}
