'use client';

import { Badge, Button, Group } from '@mantine/core';
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
      px={{ base: 16, md: 32 }}
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-2)',
        flexShrink: 0,
        backgroundColor: 'var(--mantine-color-white)',
      }}
    >
      <Group gap="sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-akua.svg"
          alt="Akua"
          style={{ height: 18, width: 'auto', display: 'block' }}
        />
        {personaType && (
          <Badge
            radius="xl"
            styles={{
              root: {
                height: 'auto',
                padding: '4px 12px',
                // DS: bg/muted, border/strong, fg/default.
                backgroundColor: 'var(--mantine-color-mantineDefault-1)',
                border: '1px solid var(--mantine-color-mantineDefault-3)',
              },
              label: {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 11,
                lineHeight: 1.4,
                color: 'var(--mantine-color-mantineDefault-9)',
              },
            }}
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
