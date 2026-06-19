'use client';

import { useState, type ReactNode } from 'react';
import { Box, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconPlus } from '@tabler/icons-react';
import { AddPersonForm, type PersonDraft } from './AddPersonForm';
import { PersonRow } from './PersonRow';
import { copy } from '../copy';
import type { Person } from '../types';

let idSeq = 0;

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
  variant?: 'legalRep' | 'shareholder';
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
  variant,
}: PersonSectionProps) {
  const showError = required && showValidation && people.length === 0;
  const [adding, setAdding] = useState(false);

  const handleSubmit = (d: PersonDraft) => {
    const person: Person = {
      id: `${idPrefix}-${Date.now()}-${idSeq++}`,
      fullName: d.fullName,
      email: d.email,
      documentType: d.documentType,
      documentNumber: d.documentNumber,
      birthDate: d.birthDate,
      issueDate: d.issueDate,
      birthCountry: d.birthCountry,
      birthCity: d.birthCity,
      nationality: d.nationality,
      address: d.address,
      phone: d.phone,
      participation: d.participation,
      docFront: d.docFront,
      docBack: d.docBack,
    };
    onChange([...people, person]);
    setAdding(false);
  };

  const handleRemove = (id: string) => {
    onChange(people.filter((p) => p.id !== id));
  };

  return (
    <Stack gap="md">
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
          disabled={adding}
          style={{ flexShrink: 0 }}
        >
          {copy.common.add}
        </Button>
      </Group>

      {(people.length > 0 || adding) && (
        <Paper radius="md" p="md" bg="gray.0" style={{ border: 'none' }}>
          <Stack gap="md">
            {people.map((person) => (
              <PersonRow key={person.id} person={person} onRemove={handleRemove} />
            ))}
            {adding && (
              <AddPersonForm
                label={newPersonLabel}
                onCancel={() => setAdding(false)}
                onSubmit={handleSubmit}
                variant={variant}
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
