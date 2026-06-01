'use client';

import { Box, Button, Stack, Text, Title } from '@mantine/core';
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
        {/* Panel de texto */}
        <Box
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
          px={64}
        >
          <Stack gap="md" maw={460}>
            <Text
              fw={700}
              fz={12}
              c="akuaPurple.5"
              style={{ letterSpacing: 1.5 }}
            >
              {copy.intro.eyebrow}
            </Text>
            <Title order={1} c="mantineDefault.9" fz={40} lh={1.1}>
              {copy.intro.title}
            </Title>
            <Text c="mantineDefault.7" fz="md">
              {copy.intro.description}
            </Text>
            <Text c="mantineDefault.7" fz="md">
              {copy.intro.documentsNote}
            </Text>
            <Button
              color="akuaPurple.6"
              size="md"
              radius="md"
              mt="md"
              w="fit-content"
              onClick={onStart}
            >
              {copy.intro.cta}
            </Button>
          </Stack>
        </Box>

        {/* Panel decorativo con degradado y orbes */}
        <Box
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(135deg, #2d0e80 0%, #180047 55%, #100033 100%)',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              width: 360,
              height: 360,
              borderRadius: '50%',
              top: -60,
              left: -40,
              background:
                'radial-gradient(circle at 30% 30%, #b9a3e0, #6440b8 60%, transparent 75%)',
              opacity: 0.85,
            }}
          />
          <Box
            style={{
              position: 'absolute',
              width: 420,
              height: 420,
              borderRadius: '50%',
              bottom: -80,
              right: -60,
              background:
                'radial-gradient(circle at 35% 35%, #51e9b0, #6440b8 55%, transparent 78%)',
              opacity: 0.8,
            }}
          />
          <Box
            style={{
              position: 'absolute',
              width: 220,
              height: 220,
              borderRadius: '50%',
              bottom: 80,
              left: 60,
              background:
                'radial-gradient(circle at 40% 40%, #d1c2eb, #8361c7 60%, transparent 80%)',
              opacity: 0.55,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
