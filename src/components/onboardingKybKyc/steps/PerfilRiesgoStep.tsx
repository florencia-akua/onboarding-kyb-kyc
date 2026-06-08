'use client';

import { useEffect, useRef } from 'react';
import { Box, Group, Paper, Stack, Switch, Text } from '@mantine/core';
import { IconShieldHalf } from '@tabler/icons-react';
import { StepTitle, SectionTitle } from '../fields/SectionTitle';
import { PepDeclarationFields } from '../fields/PepDeclarationFields';
import { copy } from '../copy';
import type { StepProps } from '../stepProps';

export function PerfilRiesgoStep({
  data,
  update,
  asSection,
}: StepProps & { asSection?: boolean }) {
  const isPep = data.companyHasPep === 'si';
  const pepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPep) {
      const id = window.setTimeout(() => {
        pepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => window.clearTimeout(id);
    }
  }, [isPep]);

  return (
    <Stack gap={24}>
      {asSection ? (
        <SectionTitle>{copy.riskProfile.declarationTitle}</SectionTitle>
      ) : (
        <StepTitle>{copy.riskProfile.declarationTitle}</StepTitle>
      )}

      <Group justify="space-between" wrap="nowrap" gap="xl" align="flex-start">
        <Text size="sm" c="mantineDefault.8">
          {copy.riskProfile.question}
        </Text>
        <Switch
          checked={isPep}
          onChange={(e) =>
            update({ companyHasPep: e.currentTarget.checked ? 'si' : 'no' })
          }
          color="akuaPurple.6"
          style={{ flexShrink: 0 }}
        />
      </Group>

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

      {isPep && (
        <Box ref={pepRef} style={{ scrollMarginTop: 24 }}>
          <PepDeclarationFields
            value={data.companyPep}
            onChange={(patch) =>
              update({ companyPep: { ...data.companyPep, ...patch } })
            }
          />
        </Box>
      )}
    </Stack>
  );
}
