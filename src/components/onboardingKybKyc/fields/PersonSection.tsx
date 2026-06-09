'use client';

import { useState, type ReactNode } from 'react';
import { Button, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { AddPersonForm, type PersonDraft } from './AddPersonForm';
import { InvitedPersonRow } from './InvitedPersonRow';
import { copy } from '../copy';
import type { Person } from '../types';

let idSeq = 0;
const makeLink = () => {
  const code = Math.random().toString(36).slice(2, 10);
  const origin =
    typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/b/${code}`;
};

interface PersonSectionProps {
  /** Prefijo para los ids generados (ej. "sh", "bf", "lr"). */
  idPrefix: string;
  /** Título del panel (ej. "Accionistas"). */
  cardLabel: ReactNode;
  /** Texto del tooltip ⓘ (opcional). */
  tooltip?: string;
  /** Etiqueta del bloque al agregar (ej. "Nuevo accionista"). */
  newPersonLabel: string;
  people: Person[];
  onChange: (people: Person[]) => void;
}

/**
 * Sección reutilizable de personas (accionistas, beneficiarios, representantes):
 * panel gris + lista de personas invitadas + alta de persona (enlace o carga
 * manual con declaración PEP).
 */
export function PersonSection({
  idPrefix,
  cardLabel,
  tooltip,
  newPersonLabel,
  people,
  onChange,
}: PersonSectionProps) {
  const [adding, setAdding] = useState(false);
  const hasPeople = people.length > 0;

  const addInvite = (d: PersonDraft) => {
    const person: Person = {
      id: `${idPrefix}-${Date.now()}-${idSeq++}`,
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      mode: 'invite',
      status: 'in_progress',
      link: makeLink(),
    };
    onChange([...people, person]);
    setAdding(false);
  };

  return (
    <Stack gap="md">
      <Paper withBorder={false} radius="lg" p="md" bg="gray.0">
        <Group gap={6} wrap="nowrap" mb="md">
          <Text fw={600} fz="md" c="mantineDefault.9">
            {cardLabel}
          </Text>
          {tooltip && (
            <Tooltip label={tooltip} withArrow>
              <IconInfoCircle
                size={16}
                color="var(--mantine-color-mantineDefault-5)"
                style={{ cursor: 'help' }}
              />
            </Tooltip>
          )}
        </Group>

        <Stack gap="md">
          {people.map((person) => (
            <InvitedPersonRow key={person.id} person={person} />
          ))}

          {adding && (
            <AddPersonForm
              label={newPersonLabel}
              onCancel={() => setAdding(false)}
              onSubmitInvite={addInvite}
            />
          )}

          {!adding && !hasPeople && (
            <Paper
              withBorder={false}
              radius="md"
              py="xl"
              bg="white"
              style={{
                border: '1px dashed var(--mantine-color-default-border)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button variant="default" onClick={() => setAdding(true)}>
                {copy.common.addPerson}
              </Button>
            </Paper>
          )}
        </Stack>
      </Paper>

      {!adding && hasPeople && (
        <Button
          variant="default"
          w="fit-content"
          onClick={() => setAdding(true)}
        >
          {copy.common.addPerson}
        </Button>
      )}
    </Stack>
  );
}
