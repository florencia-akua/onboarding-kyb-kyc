'use client';

import { ActionIcon, Group, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { copy } from '../copy';
import type { Person } from '../types';

interface PersonRowProps {
  person: Person;
  onRemove: (id: string) => void;
}

export function PersonRow({ person, onRemove }: PersonRowProps) {
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
      <ActionIcon
        variant="subtle"
        color="red"
        size="sm"
        onClick={() => onRemove(person.id)}
        aria-label={copy.common.delete}
      >
        <IconTrash size={14} />
      </ActionIcon>
    </Group>
  );
}
