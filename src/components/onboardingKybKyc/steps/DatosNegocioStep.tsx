'use client';

import {
  Box,
  Checkbox,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { copy } from '../copy';
import { ECONOMIC_ACTIVITY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';

export function DatosNegocioStep({ data, update }: StepProps) {
  const showWebsite =
    data.salesChannels.includes('ecommerce') ||
    data.salesChannels.includes('both');

  return (
    <Stack gap="md">
      <StepTitle>{copy.business.title}</StepTitle>

      <Select
        label={copy.business.economicActivity}
        placeholder={copy.fields.selectFromList}
        data={ECONOMIC_ACTIVITY_OPTIONS}
        value={data.economicActivity || null}
        onChange={(v) => update({ economicActivity: v ?? '' })}
        comboboxProps={{ withinPortal: true }}
        searchable
      />

      <SimpleGrid cols={2} spacing="md">
        <NumberInput
          label={copy.business.monthlyVolume}
          placeholder="0"
          thousandSeparator="."
          decimalSeparator=","
          hideControls
          value={data.monthlyVolume === '' ? '' : Number(data.monthlyVolume)}
          onChange={(v) => update({ monthlyVolume: String(v ?? '') })}
        />
        <NumberInput
          label={copy.business.averageTicket}
          placeholder="0"
          thousandSeparator="."
          decimalSeparator=","
          hideControls
          value={data.averageTicket === '' ? '' : Number(data.averageTicket)}
          onChange={(v) => update({ averageTicket: String(v ?? '') })}
        />
      </SimpleGrid>

      <div>
        <Group gap={6} mb="xs">
          <Text fw={600} size="sm" c="mantineDefault.9">
            {copy.business.channelsQuestion}
          </Text>
          <Text size="sm" c="mantineDefault.5">
            {copy.common.multipleSelection}
          </Text>
        </Group>
        <Checkbox.Group
          value={data.salesChannels}
          onChange={(v) => update({ salesChannels: v })}
        >
          <Stack gap="xs">
            <Checkbox
              value="ecommerce"
              label={copy.business.channels.ecommerce}
              color="akuaPurple.6"
              radius="xs"
            />
            {showWebsite && (
              <Box ml={32}>
                <TextInput
                  label={copy.business.website}
                  placeholder={copy.business.websitePlaceholder}
                  value={data.businessWebsite}
                  onChange={(e) =>
                    update({ businessWebsite: e.currentTarget.value })
                  }
                />
              </Box>
            )}
            <Checkbox
              value="inPerson"
              label={copy.business.channels.inPerson}
              color="akuaPurple.6"
              radius="xs"
            />
            <Checkbox
              value="both"
              label={copy.business.channels.both}
              color="akuaPurple.6"
              radius="xs"
            />
          </Stack>
        </Checkbox.Group>
      </div>
    </Stack>
  );
}
