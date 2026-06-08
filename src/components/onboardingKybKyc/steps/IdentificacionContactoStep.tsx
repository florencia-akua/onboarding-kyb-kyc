'use client';

import { SimpleGrid, Stack, Select, TextInput } from '@mantine/core';
import { StepTitle, SectionTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { copy } from '../copy';
import { COMPANY_TYPE_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';

export function IdentificacionContactoStep({ data, update }: StepProps) {
  return (
    <Stack gap={32}>
      <StepTitle>{copy.identification.companyTitle}</StepTitle>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
        <TextInput
          label={copy.identification.legalName}
          placeholder={copy.identification.legalNamePlaceholder}
          value={data.companyLegalName}
          onChange={(e) => update({ companyLegalName: e.currentTarget.value })}
        />
        <TextInput
          label={copy.identification.nit}
          placeholder={copy.identification.nitPlaceholder}
          value={data.companyNit}
          onChange={(e) => update({ companyNit: e.currentTarget.value })}
        />
        <Select
          label={copy.identification.companyType}
          placeholder={copy.identification.companyTypePlaceholder}
          data={COMPANY_TYPE_OPTIONS}
          value={data.companyType || null}
          onChange={(v) => update({ companyType: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
        />
        <TextInput
          label={copy.fields.fullName}
          placeholder={copy.holder.fullNamePlaceholder}
          value={data.companyContactFullName}
          onChange={(e) =>
            update({ companyContactFullName: e.currentTarget.value })
          }
        />
      </SimpleGrid>

      <SectionTitle>{copy.identification.contactTitle}</SectionTitle>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
        <TextInput
          label="Dirección comercial"
          placeholder="Ingrese dirección comercial"
          value={data.companyAddress}
          onChange={(e) => update({ companyAddress: e.currentTarget.value })}
        />
        <TextInput
          label={copy.fields.department}
          placeholder="Ingrese departamento"
          value={data.companyDepartment}
          onChange={(e) =>
            update({ companyDepartment: e.currentTarget.value })
          }
        />
        <TextInput
          label={copy.fields.city}
          placeholder="Ingrese ciudad"
          value={data.companyCity}
          onChange={(e) => update({ companyCity: e.currentTarget.value })}
        />
        <PhoneField
          value={data.companyPhone}
          onChange={(v) => update({ companyPhone: v })}
        />
        <TextInput
          label={copy.identification.corporateEmail}
          placeholder="Ingrese correo electrónico corporativo"
          value={data.companyEmail}
          onChange={(e) => update({ companyEmail: e.currentTarget.value })}
        />
        <TextInput
          label={copy.fields.website}
          placeholder="Ingrese sitio web"
          value={data.companyWebsite}
          onChange={(e) => update({ companyWebsite: e.currentTarget.value })}
        />
      </SimpleGrid>
    </Stack>
  );
}
