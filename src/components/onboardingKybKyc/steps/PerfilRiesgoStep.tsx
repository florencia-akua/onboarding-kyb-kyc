'use client';

import { Group, Paper, Radio, Stack, Text } from '@mantine/core';
import { IconShieldHalf } from '@tabler/icons-react';
import { StepTitle } from '../fields/SectionTitle';
import { PepDeclarationFields } from '../fields/PepDeclarationFields';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';
import type { YesNo } from '../types';

export function PerfilRiesgoStep({ data, update }: StepProps) {
  return (
    <Stack gap="md">
      <StepTitle>{copy.riskProfile.title}</StepTitle>

      <Text size="sm" c="mantineDefault.8">
        {copy.riskProfile.question}
      </Text>
      <Radio.Group
        value={data.companyHasPep}
        onChange={(v) => update({ companyHasPep: v as YesNo })}
      >
        <Group gap="lg">
          <Radio value="si" label={copy.common.yes} color="akuaPurple.6" />
          <Radio value="no" label={copy.common.no} color="akuaPurple.6" />
        </Group>
      </Radio.Group>

      <Paper withBorder radius="md" p="md" bg="gray.0" mt="sm">
        <Group gap="sm" wrap="nowrap" align="flex-start">
          <IconShieldHalf
            size={20}
            color="var(--mantine-color-mantineDefault-7)"
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

      {data.companyHasPep === 'si' && (
        <PepDeclarationFields
          value={data.companyPep}
          onChange={(patch) =>
            update({ companyPep: { ...data.companyPep, ...patch } })
          }
        />
      )}
    </Stack>
  );
}
