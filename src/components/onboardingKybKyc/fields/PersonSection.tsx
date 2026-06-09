'use client';

import { useState, type ReactNode } from 'react';
import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { AddPersonForm, type PersonDraft } from './AddPersonForm';
import { InvitedPersonRow } from './InvitedPersonRow';
import { copy } from '../copy';
import type { Person } from '../types';

let idSeq = 0;
const makeLink = () => {
  const code = Math.random().toString(36).slice(2, 10);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/b/${code}`;
};

interface PersonSectionProps {
  /** Prefijo para los ids generados (ej. "sh", "bf", "lr"). */
  idPrefix: string;
  /** Ícono de la sección. */
  icon: ReactNode;
  /** Título de la sección (ej. "Accionistas"). */
  cardLabel: ReactNode;
  /** Subtítulo descriptivo (opcional). */
  subtitle?: string;
  /** Etiqueta del bloque al agregar (ej. "Nuevo accionista"). */
  newPersonLabel: string;
  people: Person[];
  onChange: (people: Person[]) => void;
}

/**
 * Sección reutilizable de personas (accionistas, beneficiarios, representantes):
 * encabezado con ícono + título + subtítulo + botón "Agregar", lista de personas
 * invitadas y alta de persona (enlace o carga manual con declaración PEP).
 */
export function PersonSection({
  idPrefix,
  icon,
  cardLabel,
  subtitle,
  newPersonLabel,
  people,
  onChange,
}: PersonSectionProps) {
  const [adding, setAdding] = useState(false);

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
    <Stack gap="md" mb={adding ? 8 : 0}>
      {!adding && (
        <Group justify="space-between" wrap="nowrap" align="flex-start" gap="md">
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <Box
              w={36}
              h={36}
              style={{
                flexShrink: 0,
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: 'var(--mantine-color-gray-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mantine-color-mantineDefault-7)',
              }}
            >
              {icon}
            </Box>
            <div>
              <Text fw={600} fz="md" c="mantineDefault.9">
                {cardLabel}
              </Text>
              {subtitle && (
                <Text size="sm" c="mantineDefault.5" mt={2}>
                  {subtitle}
                </Text>
              )}
            </div>
          </Group>

          <Button
            variant="default"
            size="xs"
            radius="sm"
            rightSection={<IconPlus size={14} />}
            onClick={() => setAdding(true)}
            style={{ flexShrink: 0 }}
          >
            {copy.common.add}
          </Button>
        </Group>
      )}

      {people.map((person) => (
        <InvitedPersonRow key={person.id} person={person} />
      ))}

      {adding && (
        <Paper withBorder={false} radius="lg" p="md" bg="gray.0">
          <AddPersonForm
            label={cardLabel}
            onCancel={() => setAdding(false)}
            onSubmitInvite={addInvite}
          />
        </Paper>
      )}
    </Stack>
  );
}
