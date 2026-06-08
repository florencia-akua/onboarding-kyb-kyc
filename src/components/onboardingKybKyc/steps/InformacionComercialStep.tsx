'use client';

import { SimpleGrid, Stack, Select, TextInput } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { copy } from '../copy';
import { CITY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';

export function InformacionComercialStep({ data, update }: StepProps) {
  return (
    <Stack gap={24}>
      <StepTitle>{copy.commercial.title}</StepTitle>

      <TextInput
        label={copy.commercial.commercialName}
        placeholder={copy.commercial.commercialNamePlaceholder}
        value={data.commercialName}
        onChange={(e) => update({ commercialName: e.currentTarget.value })}
      />

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
        <TextInput
          label={copy.fields.address}
          placeholder={copy.commercial.commercialAddressPlaceholder}
          value={data.commercialAddress}
          onChange={(e) =>
            update({ commercialAddress: e.currentTarget.value })
          }
        />
        <PhoneField
          label={copy.commercial.commercialPhone}
          value={data.commercialPhone}
          onChange={(v) => update({ commercialPhone: v })}
          placeholder="300 000 0000"
        />
        <TextInput
          label={copy.commercial.commercialDepartment}
          placeholder={copy.fields.department}
          value={data.commercialDepartment}
          onChange={(e) =>
            update({ commercialDepartment: e.currentTarget.value })
          }
        />
        <Select
          label={copy.commercial.commercialCity}
          placeholder={copy.fields.selectCity}
          data={CITY_OPTIONS}
          value={data.commercialCity || null}
          onChange={(v) => update({ commercialCity: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
      </SimpleGrid>
    </Stack>
  );
}
