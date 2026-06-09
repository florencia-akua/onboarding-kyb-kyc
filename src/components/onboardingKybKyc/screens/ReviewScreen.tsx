'use client';

import { ActionIcon, Badge, Paper, Stack, Group, Text, Title } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { PlainShell } from '../layout/PlainShell';
import { copy } from '../copy';
import { getStepMissing } from '../stepStatus';
import type { OnboardingFormData, PersonaType } from '../types';

interface ReviewStep {
  id: string;
  label: string;
}

interface ReviewScreenProps {
  personaType: PersonaType;
  steps: ReviewStep[];
  data: OnboardingFormData;
  onEdit: (index: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

function StatusPill({ missing }: { missing: number }) {
  if (missing === 0) {
    return (
      <Badge
        variant="outline"
        radius="xl"
        styles={{
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderColor: 'var(--mantine-color-akuaGreen-8)',
            color: 'var(--mantine-color-akuaGreen-8)',
          },
        }}
      >
        {copy.review.completed}
      </Badge>
    );
  }

  return (
    <Badge
      variant="light"
      color="red"
      radius="xl"
      styles={{ root: { textTransform: 'none', fontWeight: 500 } }}
    >
      {missing}{' '}
      {missing === 1 ? copy.review.missingOne : copy.review.missingMany}
    </Badge>
  );
}

export function ReviewScreen({
  personaType,
  steps,
  data,
  onEdit,
  onBack,
  onSubmit,
}: ReviewScreenProps) {
  return (
    <PlainShell
      personaType={personaType}
      centered={false}
      footer={{ onBack, onNext: onSubmit, nextLabel: copy.common.submit }}
    >
      <Stack gap="md" w="100%" maw={620} mx="auto">
        <Title order={3} c="mantineDefault.9" fz={22}>
          {copy.review.title}
        </Title>

        {steps.map((step, index) => (
          <Paper key={step.id} withBorder radius="md" p="md" bg="white">
            <Group justify="space-between" wrap="nowrap">
              <Text size="sm" c="mantineDefault.9">
                {step.label}
              </Text>
              <Group gap="sm" wrap="nowrap">
                <StatusPill missing={getStepMissing(step.id, data)} />
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  aria-label={`${copy.review.edit} ${step.label}`}
                  onClick={() => onEdit(index)}
                >
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>
    </PlainShell>
  );
}
