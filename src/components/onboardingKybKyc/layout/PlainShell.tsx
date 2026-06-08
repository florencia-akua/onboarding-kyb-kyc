'use client';

import { Box } from '@mantine/core';
import type { ReactNode } from 'react';
import { TopNav } from './TopNav';
import { FooterBar } from './FooterBar';
import type { PersonaType } from '../types';

interface PlainShellProps {
  personaType?: PersonaType | null;
  children: ReactNode;
  /** Footer config. Omit to hide the footer entirely (e.g. intro screen). */
  footer?: {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    showBack?: boolean;
  };
  /** Center the content vertically and horizontally. */
  centered?: boolean;
}

export function PlainShell({
  personaType,
  children,
  footer,
  centered = true,
}: PlainShellProps) {
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

      <Box
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          alignItems: centered ? 'center' : 'flex-start',
          justifyContent: 'center',
        }}
        p={{ base: 16, md: 48 }}
      >
        {children}
      </Box>

      {footer && (
        <FooterBar
          onBack={footer.onBack}
          onNext={footer.onNext}
          nextLabel={footer.nextLabel}
          showBack={footer.showBack}
        />
      )}
    </Box>
  );
}
