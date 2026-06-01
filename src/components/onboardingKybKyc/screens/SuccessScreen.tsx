'use client';

import { Box, Button, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { PlainShell } from '../layout/PlainShell';
import { copy } from '../copy';

interface SuccessScreenProps {
  onRestart: () => void;
}

export function SuccessScreen({ onRestart }: SuccessScreenProps) {
  return (
    <PlainShell>
      <Stack align="center" gap="md" maw={460} ta="center">
        <ThemeIcon
          size={64}
          radius="xl"
          color="akuaGreen.6"
          variant="light"
        >
          <IconCheck size={34} />
        </ThemeIcon>
        <Title order={2} c="mantineDefault.9">
          {copy.success.title}
        </Title>
        <Text c="mantineDefault.7">{copy.success.description}</Text>
        <Box mt="sm">
          <Button color="akuaPurple.6" radius="md" onClick={onRestart}>
            {copy.success.cta}
          </Button>
        </Box>
      </Stack>
    </PlainShell>
  );
}
