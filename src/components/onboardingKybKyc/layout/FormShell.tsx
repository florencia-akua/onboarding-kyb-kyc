'use client';

import { Box, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { TopNav } from './TopNav';
import { FooterBar } from './FooterBar';
import { StepSidebar, type StepDef } from './StepSidebar';
import type { PersonaType } from '../types';

interface FormShellProps {
  personaType: PersonaType;
  steps: StepDef[];
  activeIndex: number;
  maxReachedIndex: number;
  onStepClick: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  children: ReactNode;
}

export function FormShell({
  personaType,
  steps,
  activeIndex,
  maxReachedIndex,
  onStepClick,
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  children,
}: FormShellProps) {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        backgroundColor: 'var(--mantine-color-white)',
      }}
    >
      <TopNav personaType={personaType} />

      <Box style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <StepSidebar
          steps={steps}
          activeIndex={activeIndex}
          maxReachedIndex={maxReachedIndex}
          onStepClick={onStepClick}
          visibleFrom="md"
        />

        <Box
          style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}
          px={{ base: 16, md: 48 }}
          py={{ base: 24, md: 40 }}
        >
          <Box maw={620} mx="auto">
            {/* Indicador de paso solo en mobile (el sidebar se oculta). */}
            <Text hiddenFrom="md" size="xs" c="mantineDefault.5" fw={600} mb="md">
              Paso {activeIndex + 1} de {steps.length} ·{' '}
              {steps[activeIndex]?.label}
            </Text>
            {children}
          </Box>
        </Box>
      </Box>

      <FooterBar
        onBack={onBack}
        onNext={onNext}
        nextLabel={nextLabel}
        nextDisabled={nextDisabled}
      />
    </Box>
  );
}
