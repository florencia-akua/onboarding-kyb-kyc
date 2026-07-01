'use client';

import { useEffect, useRef } from 'react';
import { Group, Paper, Select, SimpleGrid, Stack, Switch, Text, TextInput } from '@mantine/core';
import { IconShieldHalf } from '@tabler/icons-react';
import { DateField } from './DateField';
import { DocumentUploadField } from './DocumentUploadField';
import { PhoneField } from './PhoneField';
import { PepDeclarationFields } from './PepDeclarationFields';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, DEPARTMENT_OPTIONS, DOCUMENT_TYPE_OPTIONS, NATIONALITY_OPTIONS } from '../options';
import type { PersonDraft } from './AddPersonForm';

interface LegalRepDataFieldsProps {
  value: PersonDraft;
  onChange: (patch: Partial<PersonDraft>) => void;
}

export function LegalRepDataFields({ value, onChange }: LegalRepDataFieldsProps) {
  const f = copy.fields;
  const pepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.isPep) {
      const id = window.setTimeout(() => {
        pepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
      return () => window.clearTimeout(id);
    }
  }, [value.isPep]);

  return (
    <Stack gap={24}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
        {/* Tipo de documento */}
        <Select
          label={f.documentType}
          placeholder="Seleccionar tipo de documento"
          data={DOCUMENT_TYPE_OPTIONS}
          value={value.documentType || null}
          onChange={(v) => onChange({ documentType: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
        />

        {/* Número de documento */}
        <TextInput
          label={f.documentNumber}
          placeholder="Ej: 12345678"
          value={value.documentNumber}
          onChange={(e) => onChange({ documentNumber: e.currentTarget.value.replace(/\D/g, '') })}
          inputMode="numeric"
        />

        {/* Fecha de expedición del documento */}
        <DateField
          label={f.issueDate}
          value={value.issueDate}
          onChange={(v) => onChange({ issueDate: v })}
          maxDate={new Date()}
        />

        {/* Fecha de nacimiento */}
        <DateField
          label={f.birthDate}
          value={value.birthDate}
          onChange={(v) => onChange({ birthDate: v })}
        />

        {/* País de nacimiento */}
        <Select
          label={f.birthCountry}
          placeholder={f.selectCountry}
          data={COUNTRY_OPTIONS}
          value={value.birthCountry || null}
          onChange={(v) => onChange({ birthCountry: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
        />

        {/* Ciudad de nacimiento */}
        <Select
          label={f.birthCity}
          placeholder={f.selectCity}
          data={CITY_OPTIONS}
          value={value.birthCity || null}
          onChange={(v) => onChange({ birthCity: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
        />

        {/* Nacionalidad */}
        <Select
          label={f.nationality}
          placeholder={f.selectNationality}
          data={NATIONALITY_OPTIONS}
          value={value.nationality || null}
          onChange={(v) => onChange({ nationality: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
        />

        {/* Teléfono */}
        <PhoneField
          value={value.phone}
          onChange={(v) => onChange({ phone: v })}
        />
      </SimpleGrid>

      {/* Dirección residencial */}
      <Stack gap={12}>
        <Text fw={600} fz="sm" c="mantineDefault.9">{f.addressSectionTitle}</Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
          <Select
            label={f.addressCountry}
            placeholder={f.selectCountry}
            data={COUNTRY_OPTIONS}
            value={value.addressCountry || null}
            onChange={(v) => onChange({ addressCountry: v ?? '' })}
            comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
            searchable
          />
          <Select
            label={f.addressState}
            placeholder={f.selectState}
            data={DEPARTMENT_OPTIONS}
            value={value.addressState || null}
            onChange={(v) => onChange({ addressState: v ?? '' })}
            comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
            searchable
          />
          <Select
            label={f.addressCity}
            placeholder={f.selectCity}
            data={CITY_OPTIONS}
            value={value.addressCity || null}
            onChange={(v) => onChange({ addressCity: v ?? '' })}
            comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
            searchable
          />
          <TextInput
            label={f.addressStreet}
            placeholder="Ej: Carrera 15"
            value={value.addressStreet}
            onChange={(e) => onChange({ addressStreet: e.currentTarget.value })}
          />
          <TextInput
            label={f.addressNumber}
            placeholder="Ej: # 80 - 45"
            value={value.addressNumber}
            onChange={(e) => onChange({ addressNumber: e.currentTarget.value })}
          />
          <TextInput
            label={f.addressZip}
            placeholder="Ej: 110111"
            value={value.addressZip}
            onChange={(e) => onChange({ addressZip: e.currentTarget.value.replace(/\D/g, '') })}
            inputMode="numeric"
          />
        </SimpleGrid>
      </Stack>

      <DocumentUploadField
        field={{ key: 'docFront', label: copy.addPersonForm.docFront }}
        value={value.docFront}
        onChange={(_k, doc) => onChange({ docFront: doc })}
      />
      <DocumentUploadField
        field={{ key: 'docBack', label: copy.addPersonForm.docBack }}
        value={value.docBack}
        onChange={(_k, doc) => onChange({ docBack: doc })}
      />

      {/* PEP */}
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap" gap="xl" align="flex-start">
          <Text size="sm" c="mantineDefault.8">
            {copy.addPersonForm.pepQuestion}
          </Text>
          <Switch
            checked={value.isPep}
            onChange={(e) => onChange({ isPep: e.currentTarget.checked })}
            color="akuaPurple.6"
            style={{ flexShrink: 0 }}
          />
        </Group>

        <Paper withBorder radius="md" p="md" bg="gray.0">
          <Group gap="sm" wrap="nowrap" align="flex-start">
            <IconShieldHalf size={20} color="var(--mantine-color-mantineDefault-7)" style={{ flexShrink: 0 }} />
            <div>
              <Text fw={600} size="sm" c="mantineDefault.9">{copy.riskProfile.calloutTitle}</Text>
              <Text size="sm" c="mantineDefault.6">{copy.riskProfile.calloutText}</Text>
            </div>
          </Group>
        </Paper>

        {value.isPep && (
          <div ref={pepRef} style={{ scrollMarginBottom: 24 }}>
            <PepDeclarationFields
              value={value.pep}
              onChange={(patch) => onChange({ pep: { ...value.pep, ...patch } })}
            />
          </div>
        )}
      </Stack>
    </Stack>
  );
}
