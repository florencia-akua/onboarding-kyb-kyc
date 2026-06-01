'use client';

import { Group, Text, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { copy } from '../copy';

export function DocumentNumberLabel() {
  return (
    <Group gap={4} component="span">
      <Text component="span" size="sm" fw={500}>
        {copy.fields.documentNumber}
      </Text>
      <Tooltip label={copy.fields.documentNumberHint} withArrow>
        <IconInfoCircle size={14} style={{ cursor: 'help' }} />
      </Tooltip>
    </Group>
  );
}
