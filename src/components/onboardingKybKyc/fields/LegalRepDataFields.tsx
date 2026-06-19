'use client';

import { Select, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { DateField } from './DateField';
import { PhoneField } from './PhoneField';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, DOCUMENT_TYPE_OPTIONS, NATIONALITY_OPTIONS } from '../options';
import type { PersonDraft } from './AddPersonForm';

interface LegalRepDataFieldsProps {
  value: PersonDraft;
  onChange: (patch: Partial<PersonDraft>) => void;
}

export function LegalRepDataFields({ value, onChange }: LegalRepDataFieldsProps) {
  const f = copy.fields;

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
          description={f.documentNumberHint}
          placeholder="Ej: 12.345.678"
          value={value.documentNumber}
          onChange={(e) => onChange({ documentNumber: e.currentTarget.value })}
        />

        {/* Fecha de nacimiento */}
        <DateField
          label={f.birthDate}
          value={value.birthDate}
          onChange={(v) => onChange({ birthDate: v })}
        />

        {/* Fecha de expedición del documento */}
        <DateField
          label={f.issueDate}
          value={value.issueDate}
          onChange={(v) => onChange({ issueDate: v })}
          maxDate={new Date()}
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

        {/* Dirección residencial */}
        <TextInput
          label={f.residentialAddress}
          placeholder="Carrera 15 # 80 - 45"
          value={value.address}
          onChange={(e) => onChange({ address: e.currentTarget.value })}
        />

        {/* Teléfono */}
        <PhoneField
          value={value.phone}
          onChange={(v) => onChange({ phone: v })}
        />
      </SimpleGrid>
    </Stack>
  );
}
