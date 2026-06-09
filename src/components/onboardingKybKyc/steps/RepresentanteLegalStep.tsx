'use client';

import { Divider, Stack } from '@mantine/core';
import { IconId, IconUsers } from '@tabler/icons-react';
import { StepTitle } from '../fields/SectionTitle';
import { PersonSection } from '../fields/PersonSection';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';
import type { Person } from '../types';

function status(required: boolean, people: Person[]): string {
  const base = required ? copy.legalRep.mandatory : copy.legalRep.optional;
  const n = people.length;
  const assigned =
    n === 0 ? copy.legalRep.unassigned : `${n} asignado${n > 1 ? 's' : ''}`;
  return `${base} · ${assigned}`;
}

export function RepresentanteLegalStep({ data, update }: StepProps) {
  return (
    <Stack gap={32}>
      <StepTitle>{copy.legalRep.title}</StepTitle>

      <Stack gap={24}>
        <PersonSection
          idPrefix="lr"
          icon={<IconId size={20} />}
          cardLabel={copy.legalRep.principalTitle}
          subtitle={status(true, data.legalRepPeople)}
          newPersonLabel={copy.legalRep.newPersonLabel}
          people={data.legalRepPeople}
          onChange={(people) => update({ legalRepPeople: people })}
        />

        <Divider />

        <PersonSection
          idPrefix="alr"
          icon={<IconUsers size={20} />}
          cardLabel={copy.legalRep.alternateTitle}
          subtitle={status(false, data.alternateRepPeople)}
          newPersonLabel={copy.legalRep.newPersonLabel}
          people={data.alternateRepPeople}
          onChange={(people) => update({ alternateRepPeople: people })}
        />
      </Stack>
    </Stack>
  );
}
