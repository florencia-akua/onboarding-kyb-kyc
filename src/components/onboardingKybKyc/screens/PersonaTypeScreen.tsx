'use client';

import { Box, Group, Paper, Stack, Text } from '@mantine/core';
import { IconBuilding, IconUsers } from '@tabler/icons-react';
import { PlainShell } from '../layout/PlainShell';
import { copy } from '../copy';
import type { PersonaType } from '../types';

interface PersonaTypeScreenProps {
  selected: PersonaType | null;
  onSelect: (type: PersonaType) => void;
  onBack: () => void;
  onNext: () => void;
}

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <Paper
      withBorder
      radius="lg"
      p="xl"
      w={280}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderColor: selected
          ? 'var(--mantine-color-akuaPurple-6)'
          : undefined,
        borderWidth: selected ? 2 : 1,
        backgroundColor: selected
          ? 'var(--mantine-color-akuaPurple-0)'
          : 'var(--mantine-color-white)',
      }}
    >
      <Stack gap="sm">
        <Box
          w={44}
          h={44}
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: 'var(--mantine-color-gray-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--mantine-color-mantineDefault-7)',
          }}
        >
          {icon}
        </Box>
        <Text fw={600} fz="lg" c="mantineDefault.9">
          {title}
        </Text>
        <Text fz="sm" c="mantineDefault.6">
          {description}
        </Text>
      </Stack>
    </Paper>
  );
}

export function PersonaTypeScreen({
  selected,
  onSelect,
  onBack,
  onNext,
}: PersonaTypeScreenProps) {
  return (
    <PlainShell
      footer={{
        onBack,
        onNext: selected ? onNext : undefined,
      }}
    >
      <Stack align="center" gap="xl">
        <Text fz="md" c="mantineDefault.7">
          {copy.select.title}
        </Text>
        <Group gap="lg" align="stretch">
          <OptionCard
            icon={<IconUsers size={22} />}
            title={copy.select.fisica.title}
            description={copy.select.fisica.description}
            selected={selected === 'fisica'}
            onClick={() => onSelect('fisica')}
          />
          <OptionCard
            icon={<IconBuilding size={22} />}
            title={copy.select.juridica.title}
            description={copy.select.juridica.description}
            selected={selected === 'juridica'}
            onClick={() => onSelect('juridica')}
          />
        </Group>
      </Stack>
    </PlainShell>
  );
}
