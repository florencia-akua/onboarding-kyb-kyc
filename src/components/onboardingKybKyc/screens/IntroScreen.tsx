'use client';

import { Badge, Box, Button, Stack, Text, Title } from '@mantine/core';
import { TopNav } from '../layout/TopNav';
import { copy } from '../copy';

interface IntroScreenProps {
  onStart: () => void;
}

function EyebrowBadge() {
  return (
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
  );
}

function IntroText() {
  return (
    <>
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
    </>
  );
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

      {/* Desktop (>= md): dos columnas, contenido a la izquierda. */}
      <Box visibleFrom="md" style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Box
          px={64}
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
            <EyebrowBadge />
            <IntroText />
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

        <Box
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

      {/* Mobile (< md): apilado — preview arriba, contenido, botón abajo. */}
      <Box
        hiddenFrom="md"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
      >
        <Box style={{ flex: 1, overflowY: 'auto' }}>
          {/* Preview del dashboard (versión mobile, recortada/zoom). */}
          <Box
            style={{
              backgroundColor: '#f5f6fc',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/intro-dashboard-mobile.svg"
              alt=""
              aria-hidden
              style={{
                display: 'block',
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '40vh',
              }}
            />
          </Box>

          {/* Contenido */}
          <Box px={24} py={32}>
            <Stack gap="lg">
              <EyebrowBadge />
              <IntroText />
            </Stack>
          </Box>
        </Box>

        {/* Botón fijo abajo */}
        <Box
          px={16}
          py={16}
          style={{
            borderTop: '1px solid var(--mantine-color-gray-2)',
            backgroundColor: 'var(--mantine-color-white)',
            paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
          }}
        >
          <Button color="akuaPurple.6" size="md" fullWidth onClick={onStart}>
            {copy.intro.cta}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
