'use client';

import { Button, Group } from '@mantine/core';
import { copy } from '../copy';

interface FooterBarProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  backDisabled?: boolean;
  nextDisabled?: boolean;
}

export function FooterBar({
  onBack,
  onNext,
  nextLabel = copy.common.next,
  showBack = true,
  backDisabled = false,
  nextDisabled = false,
}: FooterBarProps) {
  return (
    <Group
      justify="space-between"
      align="center"
      mih={72}
      px={{ base: 16, md: 32 }}
      style={{
        borderTop: '1px solid var(--mantine-color-gray-2)',
        flexShrink: 0,
        backgroundColor: 'var(--mantine-color-white)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {showBack ? (
        <Button
          variant="subtle"
          color="akuaPurple.6"
          size="md"
          radius="sm"
          onClick={onBack}
          disabled={backDisabled}
        >
          {copy.common.back}
        </Button>
      ) : (
        <span />
      )}

      {onNext && (
        <Button
          color="akuaPurple.6"
          size="md"
          radius="sm"
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </Button>
      )}
    </Group>
  );
}
