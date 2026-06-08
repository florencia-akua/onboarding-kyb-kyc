'use client';

import { Badge, Box, Button, Stack, Text, Title } from '@mantine/core';
import { TopNav } from '../layout/TopNav';
import { copy } from '../copy';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        backgroundColor: 'var(--mantine-color-white)',
      }}
    >
      <TopNav />

      <Box style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Columna izquierda: contenido sobre fondo punteado */}
        <Box
          px={{ base: 24, md: 64 }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--mantine-color-white)',
            backgroundImage:
              'radial-gradient(var(--mantine-color-gray-2) 1.3px, transparent 1.3px)',
            backgroundSize: '21px 21px',
            backgroundPosition: '-3px -3px',
          }}
        >
          <Stack gap="lg" maw={380}>
            <Badge
              variant="default"
              radius="xl"
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
                  color: 'var(--mantine-color-mantineDefault-9)',
                },
              }}
            >
              {copy.intro.eyebrow}
            </Badge>

            <Stack gap="xs">
              <Title order={1} c="mantineDefault.9" fz={32} fw={700} lh={1.2}>
                {copy.intro.title}
              </Title>
              <Text c="mantineDefault.7" fz="md" lh={1.5}>
                {copy.intro.description}
              </Text>
            </Stack>

            <Text c="mantineDefault.7" fz="md" lh={1.5}>
              {copy.intro.documentsNote}
            </Text>

            <Button
              color="akuaPurple.6"
              size="md"
              fullWidth
              mt="md"
              onClick={onStart}
            >
              {copy.intro.cta}
            </Button>
          </Stack>
        </Box>

        {/* Columna derecha: preview del dashboard sobre fondo lavanda */}
        <Box
          visibleFrom="md"
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f5f6fc',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/intro-dashboard.svg"
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%',
              right: -40,
              transform: 'translateY(-50%)',
              height: '104%',
              width: 'auto',
              maxWidth: 'none',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
