'use client';

import { ActionIcon, Paper, Stack, Group, Text, Title } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { PlainShell } from '../layout/PlainShell';
import { copy } from '../copy';
import type { PersonaType } from '../types';

interface ReviewScreenProps {
  personaType: PersonaType;
  stepLabels: string[];
  onEdit: (index: number) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function ReviewScreen({
  personaType,
  stepLabels,
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

        {stepLabels.map((label, index) => (
          <Paper
            key={label}
            withBorder
            radius="md"
            p="md"
            bg="white"
          >
            <Group justify="space-between" wrap="nowrap">
              <Text size="sm" c="mantineDefault.9">
                {label}
              </Text>
              <ActionIcon
                variant="subtle"
                color="akuaPurple.6"
                aria-label={`${copy.review.edit} ${label}`}
                onClick={() => onEdit(index)}
              >
                <IconPencil size={16} />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
      </Stack>
    </PlainShell>
  );
}
