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
      h={56}
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
            hiddenFrom="md"
            styles={{
              root: {
                height: 'auto',
                padding: '2px 8px',
                backgroundColor: 'var(--mantine-color-mantineDefault-1)',
                border: '1px solid var(--mantine-color-mantineDefault-3)',
              },
              label: {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: 10,
                lineHeight: 1.4,
                color: 'var(--mantine-color-mantineDefault-9)',
              },
            }}
          >
            {copy.personaBadge[personaType]}
          </Badge>
        )}
        {personaType && (
          <Badge
            radius="xl"
            visibleFrom="md"
            styles={{
              root: {
                height: 'auto',
                padding: '4px 12px',
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

      {/* Mobile: botón xs compacto */}
      <Button variant="default" size="xs" radius="sm" hiddenFrom="md">
        {copy.common.needHelp}
      </Button>
      {/* Desktop: botón sm */}
      <Button variant="default" size="sm" radius="sm" visibleFrom="md">
        {copy.common.needHelp}
      </Button>
    </Group>
  );
}
