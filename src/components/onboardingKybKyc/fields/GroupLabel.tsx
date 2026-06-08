'use client';

import { Group, Text } from '@mantine/core';
import type { ReactNode } from 'react';

interface GroupLabelProps {
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * Subtítulo de grupo de campos: texto en gris `fg/placeholder` (#adb5bd) con
 * un ícono opcional a la izquierda. Coincide con el estilo del design system.
 */
export function GroupLabel({ icon, children }: GroupLabelProps) {
  return (
    <Group gap={6} wrap="nowrap" c="gray.5">
      {icon}
      <Text size="sm" c="gray.5">
        {children}
      </Text>
    </Group>
  );
}
