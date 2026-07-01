'use client';

import { SimpleGrid, Stack, Select, TextInput } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { copy } from '../copy';
import { CITY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';

export function InformacionComercialStep({ data, update, showValidation }: StepProps) {
  const req = (val: string | null | undefined) =>
    showValidation && !val?.trim() ? 'Requerido' : undefined;
  return (
    <Stack gap={32}>
      <StepTitle>{copy.commercial.title}</StepTitle>

      <TextInput
        label={copy.commercial.commercialName}
        placeholder={copy.commercial.commercialNamePlaceholder}
        value={data.commercialName}
        onChange={(e) => update({ commercialName: e.currentTarget.value })}
        error={req(data.commercialName)}
      />

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
        <Select
          label={copy.commercial.commercialCity}
          placeholder={copy.fields.selectCity}
          data={CITY_OPTIONS}
          value={data.commercialCity || null}
          onChange={(v) => update({ commercialCity: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
          error={req(data.commercialCity)}
        />
        <TextInput
          label={copy.commercial.commercialDepartment}
          placeholder={copy.fields.department}
          value={data.commercialDepartment}
          onChange={(e) =>
            update({ commercialDepartment: e.currentTarget.value })
          }
          error={req(data.commercialDepartment)}
        />
        <TextInput
          label={copy.fields.address}
          placeholder={copy.commercial.commercialAddressPlaceholder}
          value={data.commercialAddress}
          onChange={(e) =>
            update({ commercialAddress: e.currentTarget.value })
          }
          error={req(data.commercialAddress)}
        />
        <PhoneField
          label={copy.commercial.commercialPhone}
          value={data.commercialPhone}
          onChange={(v) => update({ commercialPhone: v })}
          placeholder="300 000 0000"
          error={req(data.commercialPhone)}
        />
      </SimpleGrid>
    </Stack>
  );
}
