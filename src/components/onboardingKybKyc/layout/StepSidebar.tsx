'use client';

import { Box, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
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
                py={8}
                px={10}
                style={{
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: isActive
                    ? '#180047'
                    : 'transparent',
                  cursor: isReachable ? 'pointer' : 'default',
                  opacity: isReachable ? 1 : 0.45,
                }}
              >
                <Group justify="space-between" wrap="nowrap" gap="sm">
                  <Group gap="sm" wrap="nowrap" align="center">
                    <Box
                      c={isActive ? 'white' : isReachable ? 'mantineDefault.5' : 'mantineDefault.4'}
                      style={{ display: 'flex', flexShrink: 0 }}
                    >
                      {step.icon}
                    </Box>
                    <Box>
                      <Text
                        size="xs"
                        c={isActive ? 'rgba(255,255,255,0.65)' : 'mantineDefault.4'}
                        lh={1.2}
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
                  {isCompleted && !isActive && (
                    <IconCheck size={15} color="var(--mantine-color-akuaGreen-7)" style={{ flexShrink: 0 }} />
                  )}
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
