'use client';

import { useState } from 'react';
import { Box, Stack, Text, Title } from '@mantine/core';
import { TopNav } from '@/components/onboardingKybKyc/layout/TopNav';
import { FooterBar } from '@/components/onboardingKybKyc/layout/FooterBar';
import {
  PersonDataFields,
  type PersonDataValue,
} from '@/components/onboardingKybKyc/fields/PersonDataFields';
import { SuccessScreen } from '@/components/onboardingKybKyc/screens/SuccessScreen';
import { copy } from '@/components/onboardingKybKyc/copy';
import { emptyPepDeclaration } from '@/components/onboardingKybKyc/types';

const emptyValue: PersonDataValue = {
  documentType: '',
  documentNumber: '',
  participation: '',
  birthCountry: '',
  birthCity: '',
  nationality: '',
  docFront: null,
  docBack: null,
  isPep: false,
  pep: { ...emptyPepDeclaration },
};

/**
 * Página pública del invitado: la persona abre el enlace recibido y completa
 * sus datos de verificación (mismo formulario para accionistas, beneficiarios
 * y representantes).
 */
export default function InviteePage() {
  const [value, setValue] = useState<PersonDataValue>(emptyValue);
  const [sent, setSent] = useState(false);

  if (sent) {
    return <SuccessScreen />;
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        backgroundColor: 'var(--mantine-color-white)',
      }}
    >
      <TopNav personaType="juridica" />

      <Box
        style={{ flex: 1, overflowY: 'auto' }}
        px={{ base: 16, md: 48 }}
        py={{ base: 24, md: 40 }}
      >
        <Box maw={620} mx="auto">
          <Stack gap={32}>
            <div>
              <Title order={3} c="mantineDefault.9" fz={22}>
                {copy.invitee.greeting}
              </Title>
              <Text c="mantineDefault.7" fz="md" lh={1.5} mt="xs">
                {copy.invitee.intro}
              </Text>
            </div>

            <PersonDataFields
              value={value}
              onChange={(patch) => setValue((v) => ({ ...v, ...patch }))}
            />
          </Stack>
        </Box>
      </Box>

      <FooterBar
        showBack={false}
        onNext={() => setSent(true)}
        nextLabel={copy.common.submit}
      />
    </Box>
  );
}
