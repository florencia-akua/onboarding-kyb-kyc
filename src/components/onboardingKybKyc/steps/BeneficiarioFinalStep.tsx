'use client';

import { Group, Paper, SimpleGrid, Stack, Select, TextInput, Text } from '@mantine/core';
import { IconUserCheck } from '@tabler/icons-react';
import { StepTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { DocumentNumberLabel } from '../fields/DocumentNumberLabel';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';

export function BeneficiarioFinalStep({ data, update }: StepProps) {
  return (
    <Stack gap="md">
      <StepTitle>{copy.beneficiary.title}</StepTitle>

      <Paper withBorder radius="md" p="md" bg="gray.0">
        <Group gap="sm" wrap="nowrap">
          <IconUserCheck
            size={20}
            color="var(--mantine-color-mantineDefault-7)"
          />
          <div>
            <Text fw={600} size="sm" c="mantineDefault.9">
              {copy.beneficiary.calloutTitle}
            </Text>
            <Text size="sm" c="mantineDefault.6">
              {copy.beneficiary.calloutText}
            </Text>
          </div>
        </Group>
      </Paper>

      <SimpleGrid cols={2} spacing="md">
        <TextInput
          label={copy.fields.fullName}
          placeholder="Ingrese nombre completo"
          value={data.beneficiaryFullName}
          onChange={(e) =>
            update({ beneficiaryFullName: e.currentTarget.value })
          }
        />
        <TextInput
          label={<DocumentNumberLabel />}
          placeholder="Ingrese número de documento"
          value={data.beneficiaryDocumentNumber}
          onChange={(e) =>
            update({ beneficiaryDocumentNumber: e.currentTarget.value })
          }
        />
        <TextInput
          label={copy.beneficiary.controlPercentage}
          placeholder="Ingrese porcentaje de control (%)"
          value={data.beneficiaryControlPercentage}
          onChange={(e) =>
            update({ beneficiaryControlPercentage: e.currentTarget.value })
          }
        />
        <Select
          label={copy.fields.birthCountry}
          placeholder="Ingrese país de nacimiento"
          data={COUNTRY_OPTIONS}
          value={data.beneficiaryBirthCountry || null}
          onChange={(v) => update({ beneficiaryBirthCountry: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <Select
          label={copy.fields.birthCity}
          placeholder="Ingrese ciudad de nacimiento"
          data={CITY_OPTIONS}
          value={data.beneficiaryBirthCity || null}
          onChange={(v) => update({ beneficiaryBirthCity: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <TextInput
          label={copy.fields.address}
          placeholder="Ingrese dirección"
          value={data.beneficiaryAddress}
          onChange={(e) =>
            update({ beneficiaryAddress: e.currentTarget.value })
          }
        />
        <PhoneField
          value={data.beneficiaryPhone}
          onChange={(v) => update({ beneficiaryPhone: v })}
        />
        <TextInput
          label={copy.fields.email}
          placeholder="Ingrese correo electrónico"
          value={data.beneficiaryEmail}
          onChange={(e) =>
            update({ beneficiaryEmail: e.currentTarget.value })
          }
        />
      </SimpleGrid>
    </Stack>
  );
}
