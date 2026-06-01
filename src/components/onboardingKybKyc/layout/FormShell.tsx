'use client';

import { Box } from '@mantine/core';
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
        />

        <Box style={{ flex: 1, overflowY: 'auto' }} px={48} py={40}>
          <Box maw={620}>{children}</Box>
        </Box>
      </Box>

      <FooterBar onBack={onBack} onNext={onNext} nextLabel={nextLabel} />
    </Box>
  );
}
