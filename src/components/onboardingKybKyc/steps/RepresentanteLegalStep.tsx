'use client';

import { Stack, Text } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { PersonSection } from '../fields/PersonSection';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';

export function RepresentanteLegalStep({ data, update }: StepProps) {
  return (
    <Stack gap={32}>
      <StepTitle>{copy.legalRep.title}</StepTitle>

      <PersonSection
        idPrefix="lr"
        cardLabel={copy.legalRep.principalTitle}
        newPersonLabel={copy.legalRep.newPersonLabel}
        people={data.legalRepPeople}
        onChange={(people) => update({ legalRepPeople: people })}
      />

      <PersonSection
        idPrefix="alr"
        cardLabel={
          <>
            {copy.legalRep.alternateTitle}{' '}
            <Text span fw={400} c="mantineDefault.5">
              {copy.legalRep.alternateHint}
            </Text>
          </>
        }
        newPersonLabel={copy.legalRep.newPersonLabel}
        people={data.alternateRepPeople}
        onChange={(people) => update({ alternateRepPeople: people })}
      />
    </Stack>
  );
}
