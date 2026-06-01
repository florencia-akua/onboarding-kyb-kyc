'use client';

import {
  ActionIcon,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Select,
  TextInput,
  Text,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { StepTitle } from '../fields/SectionTitle';
import { DocumentNumberLabel } from '../fields/DocumentNumberLabel';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, NATIONALITY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';
import type { Shareholder } from '../types';

const emptyShareholder: Shareholder = {
  fullName: '',
  documentNumber: '',
  participation: '',
  birthCountry: '',
  birthCity: '',
  nationality: '',
};

export function EstructuraSocietariaStep({ data, update }: StepProps) {
  // Mostramos al menos un accionista vacío.
  const shareholders =
    data.shareholders.length > 0 ? data.shareholders : [emptyShareholder];

  const updateAt = (index: number, patch: Partial<Shareholder>) => {
    const next = shareholders.map((s, i) =>
      i === index ? { ...s, ...patch } : s
    );
    update({ shareholders: next });
  };

  const addShareholder = () => {
    update({ shareholders: [...shareholders, { ...emptyShareholder }] });
  };

  const removeAt = (index: number) => {
    update({ shareholders: shareholders.filter((_, i) => i !== index) });
  };

  return (
    <Stack gap="md">
      <StepTitle>{copy.ownership.title}</StepTitle>
      <Text fw={600} fz="md" c="mantineDefault.9">
        {copy.ownership.subtitle}
      </Text>

      {shareholders.map((shareholder, index) => (
        <Stack key={index} gap="md">
          {index > 0 && (
            <Group justify="space-between" mt="md">
              <Text fw={600} size="sm" c="mantineDefault.7">
                {copy.ownership.shareholderLabel} {index + 1}
              </Text>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => removeAt(index)}
                aria-label={copy.common.delete}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          )}

          <SimpleGrid cols={2} spacing="md">
            <TextInput
              label={copy.fields.fullName}
              placeholder="Ingrese nombre completo"
              value={shareholder.fullName}
              onChange={(e) =>
                updateAt(index, { fullName: e.currentTarget.value })
              }
            />
            <TextInput
              label={<DocumentNumberLabel />}
              placeholder="Ingrese número de documento"
              value={shareholder.documentNumber}
              onChange={(e) =>
                updateAt(index, { documentNumber: e.currentTarget.value })
              }
            />
            <TextInput
              label={copy.ownership.participation}
              placeholder="Ingrese porcentaje de participación (%)"
              value={shareholder.participation}
              onChange={(e) =>
                updateAt(index, { participation: e.currentTarget.value })
              }
            />
            <Select
              label={copy.fields.birthCountry}
              placeholder="Ingrese país de nacimiento"
              data={COUNTRY_OPTIONS}
              value={shareholder.birthCountry || null}
              onChange={(v) => updateAt(index, { birthCountry: v ?? '' })}
              comboboxProps={{ withinPortal: true }}
              searchable
            />
            <Select
              label={copy.fields.birthCity}
              placeholder="Ingrese ciudad de nacimiento"
              data={CITY_OPTIONS}
              value={shareholder.birthCity || null}
              onChange={(v) => updateAt(index, { birthCity: v ?? '' })}
              comboboxProps={{ withinPortal: true }}
              searchable
            />
            <Select
              label={copy.fields.nationality}
              placeholder="Ingrese nacionalidad"
              data={NATIONALITY_OPTIONS}
              value={shareholder.nationality || null}
              onChange={(v) => updateAt(index, { nationality: v ?? '' })}
              comboboxProps={{ withinPortal: true }}
              searchable
            />
          </SimpleGrid>

          {index < shareholders.length - 1 && <Divider mt="md" />}
        </Stack>
      ))}

      <Button
        variant="default"
        leftSection={<IconPlus size={16} />}
        w="fit-content"
        onClick={addShareholder}
      >
        {copy.ownership.addShareholder}
      </Button>
    </Stack>
  );
}
