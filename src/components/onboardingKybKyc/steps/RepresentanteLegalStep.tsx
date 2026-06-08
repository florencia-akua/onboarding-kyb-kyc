'use client';

import { useEffect, useRef } from 'react';
import { Box, Divider, Radio, SimpleGrid, Stack, Select, TextInput, Text, Title } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { GroupLabel } from '../fields/GroupLabel';
import { PhoneField } from '../fields/PhoneField';
import { DateField } from '../fields/DateField';
import { DocumentNumberLabel } from '../fields/DocumentNumberLabel';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, NATIONALITY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';
import type { YesNo } from '../types';

export function RepresentanteLegalStep({ data, update }: StepProps) {
  const alternateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.hasAlternateLegalRep === 'si') {
      // Pequeño delay para que la sección ya esté montada antes de scrollear.
      const id = window.setTimeout(() => {
        alternateRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
      return () => window.clearTimeout(id);
    }
  }, [data.hasAlternateLegalRep]);

  return (
    <Stack gap={32}>
      <Stack gap={6}>
        <Title order={3} c="mantineDefault.9" fz={22}>
          {copy.legalRep.title}
        </Title>
        <GroupLabel icon={<IconUser size={15} />}>
          {copy.legalRep.principalTitle}
        </GroupLabel>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
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
        <DateField
          label={copy.fields.birthDate}
          value={data.legalRepBirthDate}
          onChange={(v) => update({ legalRepBirthDate: v })}
          maxDate={new Date()}
        />
        <DateField
          label={copy.fields.issueDate}
          value={data.legalRepIssueDate}
          onChange={(v) => update({ legalRepIssueDate: v })}
          maxDate={new Date()}
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

      {data.hasAlternateLegalRep === 'si' && (
        <Box ref={alternateRef} style={{ scrollMarginTop: 24 }}>
          <Divider mb={24} />
          <Stack gap="sm">
            <GroupLabel icon={<IconUser size={15} />}>
              {copy.legalRep.alternateTitle}
            </GroupLabel>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
            <TextInput
              label={copy.fields.fullName}
              placeholder="Ingrese nombre completo"
              value={data.alternateRepFullName}
              onChange={(e) =>
                update({ alternateRepFullName: e.currentTarget.value })
              }
            />
            <TextInput
              label={<DocumentNumberLabel />}
              placeholder="Ingrese número de documento"
              value={data.alternateRepDocumentNumber}
              onChange={(e) =>
                update({ alternateRepDocumentNumber: e.currentTarget.value })
              }
            />
            <DateField
              label={copy.fields.birthDate}
              value={data.alternateRepBirthDate}
              onChange={(v) => update({ alternateRepBirthDate: v })}
              maxDate={new Date()}
            />
            <DateField
              label={copy.fields.issueDate}
              value={data.alternateRepIssueDate}
              onChange={(v) => update({ alternateRepIssueDate: v })}
              maxDate={new Date()}
            />
            <Select
              label={copy.fields.birthCountry}
              placeholder={copy.fields.selectCountry}
              data={COUNTRY_OPTIONS}
              value={data.alternateRepBirthCountry || null}
              onChange={(v) => update({ alternateRepBirthCountry: v ?? '' })}
              comboboxProps={{ withinPortal: true }}
              searchable
            />
            <Select
              label={copy.fields.birthCity}
              placeholder={copy.fields.selectCity}
              data={CITY_OPTIONS}
              value={data.alternateRepBirthCity || null}
              onChange={(v) => update({ alternateRepBirthCity: v ?? '' })}
              comboboxProps={{ withinPortal: true }}
              searchable
            />
            <Select
              label={copy.fields.nationality}
              placeholder={copy.fields.selectNationality}
              data={NATIONALITY_OPTIONS}
              value={data.alternateRepNationality || null}
              onChange={(v) => update({ alternateRepNationality: v ?? '' })}
              comboboxProps={{ withinPortal: true }}
              searchable
            />
            <TextInput
              label={copy.fields.residentialAddress}
              placeholder="Ingrese dirección residencial"
              value={data.alternateRepAddress}
              onChange={(e) =>
                update({ alternateRepAddress: e.currentTarget.value })
              }
            />
            <PhoneField
              value={data.alternateRepPhone}
              onChange={(v) => update({ alternateRepPhone: v })}
            />
            <TextInput
              label={copy.fields.email}
              placeholder="Ingrese correo electrónico"
              value={data.alternateRepEmail}
              onChange={(e) =>
                update({ alternateRepEmail: e.currentTarget.value })
              }
            />
            </SimpleGrid>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
