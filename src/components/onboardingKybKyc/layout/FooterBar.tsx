'use client';

import { Button, Group } from '@mantine/core';
import { copy } from '../copy';

interface FooterBarProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  backDisabled?: boolean;
}

export function FooterBar({
  onBack,
  onNext,
  nextLabel = copy.common.next,
  showBack = true,
  backDisabled = false,
}: FooterBarProps) {
  return (
    <Group
      justify="space-between"
      align="center"
      h={72}
      px="xl"
      style={{
        borderTop: '1px solid var(--mantine-color-gray-2)',
        flexShrink: 0,
        backgroundColor: 'var(--mantine-color-white)',
      }}
    >
      {showBack ? (
        <Button
          variant="subtle"
          color="akuaPurple.6"
          onClick={onBack}
          disabled={backDisabled}
        >
          {copy.common.back}
        </Button>
      ) : (
        <span />
      )}

      {onNext && (
        <Button color="akuaPurple.6" onClick={onNext}>
          {nextLabel}
        </Button>
      )}
    </Group>
  );
}
