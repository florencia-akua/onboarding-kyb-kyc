'use client';

import { Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { DateField } from './DateField';
import { PhoneField } from './PhoneField';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, DEPARTMENT_OPTIONS, DOCUMENT_TYPE_OPTIONS, NATIONALITY_OPTIONS } from '../options';
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
          placeholder="Ej: 12345678"
          value={value.documentNumber}
          onChange={(e) => onChange({ documentNumber: e.currentTarget.value.replace(/\D/g, '') })}
          inputMode="numeric"
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
    </Stack>
  );
}
