'use client';

import { useEffect, useRef } from 'react';
import {
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconInfoCircle, IconShieldHalf } from '@tabler/icons-react';
import { copy } from '../copy';
import { COUNTRY_OPTIONS, DOCUMENT_TYPE_OPTIONS, NATIONALITY_OPTIONS } from '../options';
import { DocumentUploadField } from './DocumentUploadField';
import { PepDeclarationFields } from './PepDeclarationFields';
import type { PepDeclaration, UploadedDoc } from '../types';

export interface PersonDataValue {
  documentType: string;
  documentNumber: string;
  participation: string;
  birthCountry: string;
  nationality: string;
  docFront: UploadedDoc | null;
  docBack: UploadedDoc | null;
  isPep: boolean;
  pep: PepDeclaration;
}

interface PersonDataFieldsProps {
  value: PersonDataValue;
  onChange: (patch: Partial<PersonDataValue>) => void;
}

/**
 * Campos de datos de una persona (documento, participación, origen, documentos
 * y declaración PEP). Compartido entre el alta "Lo completo yo" y la página
 * pública del invitado.
 */
export function PersonDataFields({ value, onChange }: PersonDataFieldsProps) {
  const f = copy.addPersonForm;
  const pepRef = useRef<HTMLDivElement>(null);

  // Al activar PEP, revela un poco de la declaración.
  useEffect(() => {
    if (value.isPep) {
      const id = window.setTimeout(() => {
        pepRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 80);
      return () => window.clearTimeout(id);
    }
  }, [value.isPep]);

  return (
    <Stack gap={32}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
        <Select
          label={
            <Text component="span" size="sm" fw={500}>
              {f.documentType}
              <Tooltip label={f.documentTypeTooltip} withArrow>
                <IconInfoCircle size={14} style={{ cursor: 'help', display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }} />
              </Tooltip>
            </Text>
          }
          placeholder={f.documentTypePlaceholder}
          data={DOCUMENT_TYPE_OPTIONS}
          value={value.documentType || null}
          onChange={(v) => onChange({ documentType: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
        />
        <TextInput
          label={f.documentNumber}
          placeholder={f.documentNumberPlaceholder}
          value={value.documentNumber}
          onChange={(e) => onChange({ documentNumber: e.currentTarget.value })}
        />
        <TextInput
          label={f.participation}
          placeholder={f.participationPlaceholder}
          value={value.participation}
          onChange={(e) => onChange({ participation: e.currentTarget.value })}
          rightSection={<Text size="sm" c="mantineDefault.5">%</Text>}
        />
        <Select
          label={f.birthCountry}
          placeholder={f.birthCountryPlaceholder}
          data={COUNTRY_OPTIONS}
          value={value.birthCountry || null}
          onChange={(v) => onChange({ birthCountry: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
        />
        <Select
          label={f.nationality}
          placeholder={f.nationalityPlaceholder}
          data={NATIONALITY_OPTIONS}
          value={value.nationality || null}
          onChange={(v) => onChange({ nationality: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
        />
      </SimpleGrid>

      <DocumentUploadField
        field={{ key: 'docFront', label: f.docFront }}
        value={value.docFront}
        onChange={(_k, doc) => onChange({ docFront: doc })}
      />
      <DocumentUploadField
        field={{ key: 'docBack', label: f.docBack }}
        value={value.docBack}
        onChange={(_k, doc) => onChange({ docBack: doc })}
      />

      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap" gap="xl" align="flex-start">
          <Text size="sm" c="mantineDefault.8">
            {f.pepQuestion}
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
            <IconShieldHalf
              size={20}
              color="var(--mantine-color-mantineDefault-7)"
              style={{ flexShrink: 0 }}
            />
            <div>
              <Text fw={600} size="sm" c="mantineDefault.9">
                {copy.riskProfile.calloutTitle}
              </Text>
              <Text size="sm" c="mantineDefault.6">
                {copy.riskProfile.calloutText}
              </Text>
            </div>
          </Group>
        </Paper>

        {value.isPep && (
          <div ref={pepRef} style={{ scrollMarginBottom: 24 }}>
            <PepDeclarationFields
              value={value.pep}
              onChange={(patch) =>
                onChange({ pep: { ...value.pep, ...patch } })
              }
            />
          </div>
        )}
      </Stack>
    </Stack>
  );
}
