'use client';

import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { copy } from '../copy';
import type { Person } from '../types';

interface InvitedPersonRowProps {
  person: Person;
}

export function InvitedPersonRow({ person }: InvitedPersonRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (person.link) navigator.clipboard?.writeText(person.link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="nowrap">
        <Group gap="xs" wrap="nowrap">
          <Text fw={600} size="sm" c="mantineDefault.9">
            {person.firstName} {person.lastName}
          </Text>
          <Text size="sm" c="mantineDefault.5">
            ·
          </Text>
          <Text size="sm" c="mantineDefault.6">
            {person.email}
          </Text>
        </Group>

        {person.status === 'in_progress' && (
          <Badge
            variant="light"
            radius="xl"
            style={{ flexShrink: 0 }}
            styles={{
              root: {
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: 'var(--mantine-color-akuaPurple-0)',
                color: 'var(--mantine-color-akuaPurple-5)',
              },
            }}
          >
            {copy.common.inProgress}
          </Badge>
        )}
      </Group>

      <Group gap="sm" wrap="nowrap" align="flex-end">
        <TextInput
          readOnly
          value={person.link ?? ''}
          style={{ flex: 1 }}
          variant="default"
        />
        <Tooltip
          label={copied ? copy.common.linkCopied : copy.common.copyLink}
          withArrow
        >
          <ActionIcon
            variant="default"
            size={36}
            radius="sm"
            onClick={handleCopy}
            aria-label={copy.common.copyLink}
            style={{ flexShrink: 0 }}
            styles={{
              root: { borderColor: 'var(--mantine-color-mantineDefault-3)' },
            }}
          >
            <IconCopy size={18} color="var(--mantine-color-mantineDefault-6)" />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Text size="xs" c="mantineDefault.5">
        {copy.addPersonForm.inviteHelper}
      </Text>
    </Stack>
  );
}
