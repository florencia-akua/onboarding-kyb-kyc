'use client';

import { useState, type ReactNode } from 'react';
import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';
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
  idPrefix: string;
  icon: ReactNode;
  cardLabel: ReactNode;
  subtitle?: string;
  newPersonLabel: string;
  people: Person[];
  onChange: (people: Person[]) => void;
  required?: boolean;
  showValidation?: boolean;
}

export function PersonSection({
  idPrefix,
  icon,
  cardLabel,
  subtitle,
  newPersonLabel,
  people,
  onChange,
  required = false,
  showValidation = false,
}: PersonSectionProps) {
  const showError = required && showValidation && people.length === 0;
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
    <Stack gap="md">
      {/* ── Encabezado: ícono + título + subtítulo ── */}
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

        {/* "Agregar +" siempre visible en el header mientras no esté abierto el form */}
        {!adding && (
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
        )}
      </Group>

      {/* ── Form sin personas previas ── */}
      {adding && people.length === 0 && (
        <Paper radius="md" p="md" bg="gray.0" style={{ border: 'none' }}>
          <AddPersonForm
            label={newPersonLabel}
            onCancel={() => setAdding(false)}
            onSubmitInvite={addInvite}
          />
        </Paper>
      )}

      {/* ── Contenedor gris cuando hay personas ── */}
      {people.length > 0 && (
        <Paper radius="md" p="md" bg="gray.0" style={{ border: 'none' }}>
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
          </Stack>
        </Paper>
      )}

      {showError && (
        <Group gap={6} align="center">
          <IconAlertCircle
            size={14}
            color="var(--mantine-color-red-6)"
            style={{ flexShrink: 0 }}
          />
          <Text size="xs" c="red.6">
            Debés agregar al menos una persona para continuar
          </Text>
        </Group>
      )}
    </Stack>
  );
}
