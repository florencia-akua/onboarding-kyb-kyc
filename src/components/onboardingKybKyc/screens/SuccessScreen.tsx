'use client';

import { Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { PlainShell } from '../layout/PlainShell';
import { copy } from '../copy';

export function SuccessScreen() {
  return (
    <PlainShell>
      <Stack align="center" gap="md" maw={460} ta="center">
        <ThemeIcon
          size={120}
          radius="xl"
          color="akuaGreen.6"
          variant="light"
        >
          <IconCheck size={60} />
        </ThemeIcon>
        <Title order={2} c="mantineDefault.9" fz={24} mt="xs">
          {copy.success.title}
        </Title>
        <Text c="mantineDefault.7" fz={15}>
          {copy.success.description}
        </Text>
        <Text c="mantineDefault.5" fz={15}>
          {copy.success.close}
        </Text>
      </Stack>
    </PlainShell>
  );
}
