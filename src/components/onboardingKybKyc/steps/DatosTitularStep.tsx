'use client';

import { SimpleGrid, Stack, Select, Switch, TextInput, Group, Text } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { StepTitle, SectionTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { copy } from '../copy';
import {
  CITY_OPTIONS,
  DEPARTMENT_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  NATIONALITY_OPTIONS,
} from '../options';
import type { StepProps } from '../stepProps';

const calendarIcon = (
  <IconCalendar size={16} color="var(--mantine-color-mantineDefault-5)" />
);

export function DatosTitularStep({ data, update }: StepProps) {
  return (
    <Stack gap="md">
      <StepTitle>{copy.holder.title}</StepTitle>

      <SimpleGrid cols={2} spacing="md">
        <TextInput
          label={copy.fields.fullName}
          placeholder={copy.holder.fullNamePlaceholder}
          value={data.holderFullName}
          onChange={(e) => update({ holderFullName: e.currentTarget.value })}
        />
        <Select
          label={copy.fields.documentType}
          placeholder={copy.fields.selectFromList}
          data={DOCUMENT_TYPE_OPTIONS}
          value={data.holderDocumentType || null}
          onChange={(v) => update({ holderDocumentType: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
        />
        <TextInput
          label={copy.fields.documentNumber}
          placeholder={copy.holder.documentNumberPlaceholder}
          value={data.holderDocumentNumber}
          onChange={(e) =>
            update({ holderDocumentNumber: e.currentTarget.value })
          }
        />
        <TextInput
          label={copy.fields.issueDate}
          placeholder="01/02/0000"
          rightSection={calendarIcon}
          value={data.holderDocumentIssueDate}
          onChange={(e) =>
            update({ holderDocumentIssueDate: e.currentTarget.value })
          }
        />
        <TextInput
          label={copy.fields.birthDate}
          placeholder="01/02/0000"
          rightSection={calendarIcon}
          value={data.holderBirthDate}
          onChange={(e) => update({ holderBirthDate: e.currentTarget.value })}
        />
        <Select
          label={copy.fields.nationality}
          placeholder={copy.fields.selectNationality}
          data={NATIONALITY_OPTIONS}
          value={data.holderNationality || null}
          onChange={(v) => update({ holderNationality: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <Select
          label={copy.fields.birthCity}
          placeholder={copy.fields.selectCity}
          data={CITY_OPTIONS}
          value={data.holderBirthCity || null}
          onChange={(v) => update({ holderBirthCity: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
      </SimpleGrid>

      <SectionTitle>{copy.holder.contactTitle}</SectionTitle>

      <SimpleGrid cols={2} spacing="md">
        <TextInput
          label={copy.fields.residentialAddress}
          placeholder="Carrera 15 # 80 - 45"
          value={data.holderAddress}
          onChange={(e) => update({ holderAddress: e.currentTarget.value })}
        />
        <Select
          label={copy.fields.city}
          placeholder={copy.fields.selectCity}
          data={CITY_OPTIONS}
          value={data.holderCity || null}
          onChange={(v) => update({ holderCity: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <Select
          label={copy.fields.department}
          placeholder={copy.fields.selectFromList}
          data={DEPARTMENT_OPTIONS}
          value={data.holderDepartment || null}
          onChange={(v) => update({ holderDepartment: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <PhoneField
          value={data.holderPhone}
          onChange={(v) => update({ holderPhone: v })}
        />
      </SimpleGrid>

      <TextInput
        label={copy.fields.email}
        placeholder={copy.holder.emailPlaceholder}
        value={data.holderEmail}
        onChange={(e) => update({ holderEmail: e.currentTarget.value })}
      />

      <SectionTitle>{copy.holder.pepTitle}</SectionTitle>
      <Group justify="space-between" wrap="nowrap">
        <Text size="sm" c="mantineDefault.8">
          {copy.holder.pepLabel}
        </Text>
        <Switch
          checked={data.holderIsPep}
          onChange={(e) => update({ holderIsPep: e.currentTarget.checked })}
          color="akuaPurple.6"
        />
      </Group>
    </Stack>
  );
}
