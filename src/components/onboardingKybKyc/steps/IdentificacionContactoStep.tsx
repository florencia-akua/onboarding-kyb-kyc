'use client';

import { SimpleGrid, Stack, Select, TextInput, Title } from '@mantine/core';
import { PhoneField } from '../fields/PhoneField';
import { copy } from '../copy';
import { COUNTRIES } from '../countries';
import { COMPANY_TYPE_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';

/** Etiqueta e hint del identificador tributario según el país de la empresa. */
interface TaxIdConfig {
  label: string;
  placeholder: string;
}

const TAX_ID_BY_ISO: Record<string, TaxIdConfig> = {
  CO: { label: 'NIT',  placeholder: '900.123.456-7' },
  AR: { label: 'CUIT', placeholder: '30-12345678-9' },
  BR: { label: 'CNPJ', placeholder: '12.345.678/0001-95' },
  CL: { label: 'RUT',  placeholder: '12.345.678-9' },
  EC: { label: 'RUC',  placeholder: '1790012345001' },
  UY: { label: 'RUT',  placeholder: '123456789012' },
};

const DEFAULT_TAX_ID: TaxIdConfig = {
  label: 'Identificación tributaria',
  placeholder: 'Ingrese número de identificación',
};

const COUNTRY_SELECT_DATA = COUNTRIES.map((c) => ({
  value: c.iso,
  label: c.name,
}));

export function IdentificacionContactoStep({ data, update, showValidation }: StepProps) {
  const taxId = TAX_ID_BY_ISO[data.companyCountry] ?? DEFAULT_TAX_ID;

  const req = (val: string | null | undefined) =>
    showValidation && !val?.trim() ? 'Requerido' : undefined;

  return (
    <Stack gap={32}>
      {/* ─── Identificación de la empresa ─── */}
      <Stack gap={24}>
        <Title order={3} fz={22} c="mantineDefault.9">
          {copy.identification.companyTitle}
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
          <Select
            label="País"
            placeholder="Seleccione país"
            data={COUNTRY_SELECT_DATA}
            value={data.companyCountry || null}
            onChange={(v) => update({ companyCountry: v ?? '' })}
            comboboxProps={{
              withinPortal: true,
              position: 'bottom',
              middlewares: { flip: false, shift: true },
            }}
            searchable
            error={req(data.companyCountry)}
          />
          <TextInput
            label={copy.identification.legalName}
            placeholder={copy.identification.legalNamePlaceholder}
            value={data.companyLegalName}
            onChange={(e) =>
              update({ companyLegalName: e.currentTarget.value })
            }
            error={req(data.companyLegalName)}
          />
          <TextInput
            label={taxId.label}
            placeholder={taxId.placeholder}
            value={data.companyNit}
            onChange={(e) => update({ companyNit: e.currentTarget.value })}
            error={req(data.companyNit)}
          />
          <Select
            label={copy.identification.companyType}
            placeholder={copy.identification.companyTypePlaceholder}
            data={COMPANY_TYPE_OPTIONS}
            value={data.companyType || null}
            onChange={(v) => update({ companyType: v ?? '' })}
            comboboxProps={{
              withinPortal: true,
              position: 'bottom',
              middlewares: { flip: false, shift: true },
            }}
            error={req(data.companyType)}
          />
        </SimpleGrid>
      </Stack>

      {/* ─── Datos de contacto ─── */}
      <Stack gap={24}>
        <Title order={4} fz={18} fw={600} c="mantineDefault.9">
          {copy.identification.contactTitle}
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
          <TextInput
            label="Dirección comercial"
            placeholder="Ingrese dirección comercial"
            value={data.companyAddress}
            onChange={(e) => update({ companyAddress: e.currentTarget.value })}
            error={req(data.companyAddress)}
          />
          <TextInput
            label={copy.fields.department}
            placeholder="Ingrese departamento"
            value={data.companyDepartment}
            onChange={(e) =>
              update({ companyDepartment: e.currentTarget.value })
            }
            error={req(data.companyDepartment)}
          />
          <TextInput
            label={copy.fields.city}
            placeholder="Ingrese ciudad"
            value={data.companyCity}
            onChange={(e) => update({ companyCity: e.currentTarget.value })}
            error={req(data.companyCity)}
          />
          <PhoneField
            value={data.companyPhone}
            onChange={(v) => update({ companyPhone: v })}
            error={req(data.companyPhone)}
          />
          <TextInput
            label={copy.identification.corporateEmail}
            placeholder="Ingrese correo electrónico corporativo"
            value={data.companyEmail}
            onChange={(e) => update({ companyEmail: e.currentTarget.value })}
            error={req(data.companyEmail)}
          />
          <TextInput
            label={copy.fields.website}
            placeholder="Ingrese sitio web"
            value={data.companyWebsite}
            onChange={(e) => update({ companyWebsite: e.currentTarget.value })}
          />
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
