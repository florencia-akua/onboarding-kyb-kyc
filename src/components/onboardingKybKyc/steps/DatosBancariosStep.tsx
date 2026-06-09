'use client';

import { Radio, SimpleGrid, Stack, Select, TextInput, Text } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { copy } from '../copy';
import { BANK_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';
import type { AccountType, YesNo } from '../types';

export function DatosBancariosStep({ data, update }: StepProps) {
  return (
    <Stack gap={32}>
      <StepTitle>{copy.banking.title}</StepTitle>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
        <Select
          label={copy.banking.payoutBank}
          placeholder={BANK_OPTIONS[0]}
          data={BANK_OPTIONS}
          value={data.payoutBank || null}
          onChange={(v) => update({ payoutBank: v ?? '' })}
          comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
          searchable
        />
        <TextInput
          label={copy.banking.accountNumber}
          placeholder={copy.banking.accountNumber}
          value={data.accountNumber}
          onChange={(e) => update({ accountNumber: e.currentTarget.value })}
        />
      </SimpleGrid>

      <div>
        <Text fw={600} size="sm" c="mantineDefault.9" mb="xs">
          {copy.banking.accountTypeTitle}
        </Text>
        <Radio.Group
          value={data.accountType}
          onChange={(v) => update({ accountType: v as AccountType })}
        >
          <Stack gap="xs">
            <Radio
              value="ahorros"
              label={copy.banking.accountType.ahorros}
              color="akuaPurple.6"
            />
            <Radio
              value="corriente"
              label={copy.banking.accountType.corriente}
              color="akuaPurple.6"
            />
          </Stack>
        </Radio.Group>
      </div>

      <div>
        <Text fw={600} size="sm" c="mantineDefault.9" mb="xs">
          {copy.banking.tipsQuestion}
        </Text>
        <Radio.Group
          value={data.receivesTips}
          onChange={(v) => update({ receivesTips: v as YesNo })}
        >
          <Stack gap="xs">
            <Radio value="si" label={copy.common.yes} color="akuaPurple.6" />
            <Radio value="no" label={copy.common.no} color="akuaPurple.6" />
          </Stack>
        </Radio.Group>
      </div>
    </Stack>
  );
}
