'use client';

import { useEffect, useRef } from 'react';
import { Box, SimpleGrid, Stack, Select, Switch, TextInput, Group, Text } from '@mantine/core';
import { StepTitle, SectionTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { DateField } from '../fields/DateField';
import { PepDeclarationFields } from '../fields/PepDeclarationFields';
import { copy } from '../copy';
import {
  CITY_OPTIONS,
  DEPARTMENT_OPTIONS,
  DOCUMENT_TYPE_OPTIONS,
  NATIONALITY_OPTIONS,
} from '../options';
import type { StepProps } from '../stepProps';

export function DatosTitularStep({ data, update }: StepProps) {
  const pepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.holderIsPep) {
      const id = window.setTimeout(() => {
        pepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => window.clearTimeout(id);
    }
  }, [data.holderIsPep]);

  return (
    <Stack gap={24}>
      <StepTitle>{copy.holder.title}</StepTitle>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
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
        <DateField
          label={copy.fields.issueDate}
          value={data.holderDocumentIssueDate}
          onChange={(v) => update({ holderDocumentIssueDate: v })}
          maxDate={new Date()}
        />
        <DateField
          label={copy.fields.birthDate}
          value={data.holderBirthDate}
          onChange={(v) => update({ holderBirthDate: v })}
          maxDate={new Date()}
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

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
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

      {data.holderIsPep && (
        <Box ref={pepRef} style={{ scrollMarginTop: 24 }}>
          <PepDeclarationFields
            value={data.holderPep}
            onChange={(patch) =>
              update({ holderPep: { ...data.holderPep, ...patch } })
            }
          />
        </Box>
      )}
    </Stack>
  );
}
