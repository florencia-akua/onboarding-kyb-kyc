'use client';

import { Box, Group, Select, TextInput } from '@mantine/core';
import { copy } from '../copy';
import { PHONE_PREFIX } from '../options';

interface PhoneFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PhoneField({
  label = copy.fields.phone,
  value,
  onChange,
  placeholder = 'XXXXXXX',
}: PhoneFieldProps) {
  return (
    <Box>
      <Group gap="xs" align="flex-end" wrap="nowrap">
        <Select
          label={label}
          data={[PHONE_PREFIX]}
          defaultValue={PHONE_PREFIX}
          w={90}
          allowDeselect={false}
          comboboxProps={{ withinPortal: true }}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
      </Group>
    </Box>
  );
}
