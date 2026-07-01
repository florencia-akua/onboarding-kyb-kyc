'use client';

import { ActionIcon, Group, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { copy } from '../copy';
import type { Person } from '../types';

const actionIconStyles = {
  root: { borderColor: 'var(--mantine-color-mantineDefault-3)' },
};

interface PersonRowProps {
  person: Person;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export function PersonRow({ person, onRemove, onEdit }: PersonRowProps) {
  return (
    <Group justify="space-between" wrap="nowrap">
      <div>
        <Text fw={600} size="sm" c="mantineDefault.9">
          {person.fullName}
        </Text>
        {person.email && (
          <Text size="sm" c="mantineDefault.5">
            {person.email}
          </Text>
        )}
      </div>
      <Group gap={8} wrap="nowrap">
        <ActionIcon
          variant="default"
          radius="xs"
          size={24}
          onClick={() => onEdit(person.id)}
          aria-label="Editar"
          styles={actionIconStyles}
        >
          <IconPencil size={14} color="var(--mantine-color-mantineDefault-6)" />
        </ActionIcon>
        <ActionIcon
          variant="default"
          radius="xs"
          size={24}
          onClick={() => onRemove(person.id)}
          aria-label={copy.common.delete}
          styles={actionIconStyles}
        >
          <IconTrash size={14} color="var(--mantine-color-mantineDefault-6)" />
        </ActionIcon>
      </Group>
    </Group>
  );
}
