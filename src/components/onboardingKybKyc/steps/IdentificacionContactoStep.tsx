'use client';

import { SimpleGrid, Stack, Select, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
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

/** Máximo de dígitos permitidos por país (para limitar el input). */
const MAX_DIGITS: Record<string, number> = {
  CO: 10, AR: 11, BR: 14, CL: 9, EC: 13, UY: 12,
};

/**
 * Extrae solo los caracteres válidos del raw value:
 * dígitos para todos, más 'K' para Chile (dígito verificador).
 */
function stripTaxId(raw: string, iso: string): string {
  const max = MAX_DIGITS[iso] ?? 20;
  if (iso === 'CL') {
    return raw.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, max);
  }
  return raw.replace(/\D/g, '').slice(0, max);
}

/**
 * Aplica el formato visual del identificador tributario según el país.
 * Recibe el valor actual del input (que puede ya tener separadores),
 * strips primero y re-aplica el patrón.
 *
 * Formatos:
 *   AR  CUIT  → XX-XXXXXXXX-X
 *   CO  NIT   → XXX.XXX.XXX-X
 *   BR  CNPJ  → XX.XXX.XXX/XXXX-XX
 *   CL  RUT   → X.XXX.XXX-DV  o  XX.XXX.XXX-DV
 *   EC  RUC   → sin separadores (13 dígitos)
 *   UY  RUT   → sin separadores (12 dígitos)
 */
function formatTaxId(raw: string, iso: string): string {
  const d = stripTaxId(raw, iso);
  if (!d) return '';

  switch (iso) {
    case 'AR': {
      // XX-XXXXXXXX-X
      if (d.length <= 2) return d;
      if (d.length <= 10) return `${d.slice(0, 2)}-${d.slice(2)}`;
      return `${d.slice(0, 2)}-${d.slice(2, 10)}-${d.slice(10)}`;
    }
    case 'CO': {
      // XXX.XXX.XXX-X
      if (d.length <= 3) return d;
      if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
      if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
    }
    case 'BR': {
      // XX.XXX.XXX/XXXX-XX
      if (d.length <= 2) return d;
      if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
      if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
      if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
      return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
    }
    case 'CL': {
      // X.XXX.XXX-DV  (último char = dígito verificador, puede ser K)
      if (d.length <= 1) return d;
      const body = d.slice(0, -1);
      const dv   = d.slice(-1);
      // Puntos cada 3 dígitos desde la derecha del cuerpo
      const bodyFormatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `${bodyFormatted}-${dv}`;
    }
    default:
      // EC, UY y cualquier otro: solo dígitos, sin separadores
      return d;
  }
}

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
            onChange={(v) =>
              // Al cambiar el país limpiamos el NIT para evitar formatos cruzados.
              update({ companyCountry: v ?? '', companyNit: '' })
            }
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
            onChange={(e) =>
              update({
                companyNit: formatTaxId(e.currentTarget.value, data.companyCountry),
              })
            }
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
            label={
              <Text component="span" size="sm" fw={500}>
                {copy.fields.website}
                <Tooltip label="Sitio web o redes sociales son importantes para confirmar presencia online del cliente" withArrow multiline w={260}>
                  <IconInfoCircle size={14} style={{ cursor: 'help', display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }} />
                </Tooltip>
              </Text>
            }
            placeholder="Ingrese sitio web"
            value={data.companyWebsite}
            onChange={(e) => update({ companyWebsite: e.currentTarget.value })}
            error={req(data.companyWebsite)}
          />
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}
