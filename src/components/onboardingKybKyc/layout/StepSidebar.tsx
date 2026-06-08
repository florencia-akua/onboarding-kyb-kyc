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
  /** Breakpoint from which the sidebar is visible (hidden below it). */
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
      w={300}
      p="md"
      visibleFrom={visibleFrom}
      style={{
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
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
              py={9}
              px={12}
              style={{
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: isActive
                  ? 'var(--mantine-color-akuaPurple-6)'
                  : 'transparent',
                cursor: isReachable ? 'pointer' : 'default',
                opacity: isReachable ? 1 : 0.5,
              }}
            >
              <Group justify="space-between" wrap="nowrap" gap="sm">
                <Group gap="sm" wrap="nowrap">
                  <Box
                    c={
                      isActive
                        ? 'white'
                        : isReachable
                          ? 'mantineDefault.8'
                          : 'mantineDefault.4'
                    }
                    style={{ display: 'flex' }}
                  >
                    {step.icon}
                  </Box>
                  <Text
                    size="sm"
                    fw={isActive ? 600 : 500}
                    c={isActive ? 'white' : 'mantineDefault.8'}
                  >
                    {step.label}
                  </Text>
                </Group>
                {isCompleted && !isActive && (
                  <IconCheck size={16} color="var(--mantine-color-akuaGreen-8)" />
                )}
              </Group>
            </UnstyledButton>
          );
        })}
      </Stack>
    </Box>
  );
}
