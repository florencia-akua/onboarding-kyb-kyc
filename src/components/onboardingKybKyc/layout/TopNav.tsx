'use client';

import { Badge, Button, Group, Text } from '@mantine/core';
import { copy } from '../copy';
import type { PersonaType } from '../types';

interface TopNavProps {
  personaType?: PersonaType | null;
}

export function TopNav({ personaType }: TopNavProps) {
  return (
    <Group
      justify="space-between"
      align="center"
      h={64}
      px="xl"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        flexShrink: 0,
        backgroundColor: 'var(--mantine-color-white)',
      }}
    >
      <Group gap="sm">
        <Text fw={700} fz={20} c="akuaPurple.6">
          akua
        </Text>
        {personaType && (
          <Badge
            variant="outline"
            color="mantineDefault.8"
            radius="xl"
            size="lg"
            styles={{ label: { textTransform: 'none', fontWeight: 500 } }}
          >
            {copy.personaBadge[personaType]}
          </Badge>
        )}
      </Group>

      <Button variant="default" size="sm" radius="md">
        {copy.common.needHelp}
      </Button>
    </Group>
  );
}
