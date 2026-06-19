'use client';

import { Box, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';

export interface StepDef {
  id: string;
  label: string;
  icon: ReactNode;
}

interface StepSidebarProps {
  steps: StepDef[];
  activeIndex: number;
  maxReachedIndex: number;
  onStepClick: (index: number) => void;
  visibleFrom?: string;
}

export function StepSidebar({
  steps,
  activeIndex,
  maxReachedIndex,
  onStepClick,
  visibleFrom,
}: StepSidebarProps) {
  return (
    <Box
      component="nav"
      w={280}
      visibleFrom={visibleFrom}
      style={{
        flexShrink: 0,
        overflowY: 'auto',
        backgroundColor: '#FAFAFA',
        borderRight: '1px solid var(--mantine-color-gray-2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box p="md" style={{ flex: 1 }}>
        <Text
          size="xs"
          fw={700}
          c="mantineDefault.4"
          mb="sm"
          style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          Pasos
        </Text>

        <Stack gap={2}>
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < maxReachedIndex;
            const isReachable = index <= maxReachedIndex;

            return (
              <UnstyledButton
                key={step.id}
                onClick={() => isReachable && onStepClick(index)}
                disabled={!isReachable}
                py={10}
                px={12}
                style={{
                  borderRadius: 8,
                  backgroundColor: isActive ? '#180047' : 'transparent',
                  cursor: isReachable ? 'pointer' : 'default',
                  opacity: isReachable ? 1 : 0.45,
                }}
              >
                <Group justify="space-between" wrap="nowrap" gap="sm">
                  <Group gap={10} wrap="nowrap" align="center">
                    {/* Ícono: con círculo de fondo cuando está activo */}
                    <Box
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                        color: isActive ? 'white' : isReachable ? 'var(--mantine-color-mantineDefault-5)' : 'var(--mantine-color-mantineDefault-4)',
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Box>
                      <Text
                        size="xs"
                        fw={500}
                        c={isActive ? 'rgba(255,255,255,0.6)' : 'mantineDefault.4'}
                        lh={1.3}
                      >
                        Paso {index + 1}
                      </Text>
                      <Text
                        size="sm"
                        fw={600}
                        c={isActive ? 'white' : isReachable ? 'mantineDefault.8' : 'mantineDefault.5'}
                        lh={1.3}
                      >
                        {step.label}
                      </Text>
                    </Box>
                  </Group>
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
