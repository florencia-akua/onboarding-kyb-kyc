'use client';

import { Title } from '@mantine/core';

export function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <Title order={3} mb="lg" c="mantineDefault.9" fz={22}>
      {children}
    </Title>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Title order={4} mt="xl" mb="md" c="mantineDefault.9" fz={18}>
      {children}
    </Title>
  );
}
