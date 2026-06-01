'use client';

import { Radio, SimpleGrid, Stack, Select, TextInput, Text } from '@mantine/core';
import { StepTitle, SectionTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { DocumentNumberLabel } from '../fields/DocumentNumberLabel';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, NATIONALITY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';
import type { YesNo } from '../types';

export function RepresentanteLegalStep({ data, update }: StepProps) {
  return (
    <Stack gap="md">
      <StepTitle>{copy.legalRep.title}</StepTitle>
      <SectionTitle>{copy.legalRep.principalTitle}</SectionTitle>

      <SimpleGrid cols={2} spacing="md">
        <TextInput
          label={copy.fields.fullName}
          placeholder="Ingrese nombre completo"
          value={data.legalRepFullName}
          onChange={(e) => update({ legalRepFullName: e.currentTarget.value })}
        />
        <TextInput
          label={<DocumentNumberLabel />}
          placeholder="Ingrese número de documento"
          value={data.legalRepDocumentNumber}
          onChange={(e) =>
            update({ legalRepDocumentNumber: e.currentTarget.value })
          }
        />
        <TextInput
          label={copy.fields.birthDate}
          placeholder="Ingrese fecha de nacimiento"
          value={data.legalRepBirthDate}
          onChange={(e) => update({ legalRepBirthDate: e.currentTarget.value })}
        />
        <TextInput
          label={copy.fields.issueDate}
          placeholder="Ingrese fecha de expedición"
          value={data.legalRepIssueDate}
          onChange={(e) => update({ legalRepIssueDate: e.currentTarget.value })}
        />
        <Select
          label={copy.fields.birthCountry}
          placeholder={copy.fields.selectCountry}
          data={COUNTRY_OPTIONS}
          value={data.legalRepBirthCountry || null}
          onChange={(v) => update({ legalRepBirthCountry: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <Select
          label={copy.fields.birthCity}
          placeholder={copy.fields.selectCity}
          data={CITY_OPTIONS}
          value={data.legalRepBirthCity || null}
          onChange={(v) => update({ legalRepBirthCity: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <Select
          label={copy.fields.nationality}
          placeholder={copy.fields.selectNationality}
          data={NATIONALITY_OPTIONS}
          value={data.legalRepNationality || null}
          onChange={(v) => update({ legalRepNationality: v ?? '' })}
          comboboxProps={{ withinPortal: true }}
          searchable
        />
        <TextInput
          label={copy.fields.residentialAddress}
          placeholder="Ingrese dirección residencial"
          value={data.legalRepAddress}
          onChange={(e) => update({ legalRepAddress: e.currentTarget.value })}
        />
        <PhoneField
          value={data.legalRepPhone}
          onChange={(v) => update({ legalRepPhone: v })}
        />
        <TextInput
          label={copy.fields.email}
          placeholder="Ingrese correo electrónico"
          value={data.legalRepEmail}
          onChange={(e) => update({ legalRepEmail: e.currentTarget.value })}
        />
      </SimpleGrid>

      <div>
        <Text fw={600} size="sm" c="mantineDefault.9" mb="xs">
          {copy.legalRep.alternateQuestion}
        </Text>
        <Radio.Group
          value={data.hasAlternateLegalRep}
          onChange={(v) => update({ hasAlternateLegalRep: v as YesNo })}
        >
          <Stack gap="xs">
            <Radio value="si" label={copy.common.yes} color="akuaPurple.6" />
            <Radio value="no" label={copy.common.no} color="akuaPurple.6" />
          </Stack>
        </Radio.Group>
      </div>
    </Stack>
  );
}
