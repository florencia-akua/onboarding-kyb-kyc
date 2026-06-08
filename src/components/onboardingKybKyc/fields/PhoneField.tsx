'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Group,
  Select,
  Text,
  TextInput,
  type ComboboxItem,
} from '@mantine/core';
import { copy } from '../copy';
import { COUNTRIES, DEFAULT_COUNTRY_ISO, isoToFlag } from '../countries';

interface PhoneFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SELECT_DATA: ComboboxItem[] = COUNTRIES.map((c) => ({
  value: c.iso,
  label: `${isoToFlag(c.iso)} ${c.dial}`,
}));

const NAME_BY_ISO: Record<string, string> = Object.fromEntries(
  COUNTRIES.map((c) => [c.iso, c.name])
);
const DIAL_BY_ISO: Record<string, string> = Object.fromEntries(
  COUNTRIES.map((c) => [c.iso, c.dial])
);

export function PhoneField({
  label = copy.fields.phone,
  value,
  onChange,
  placeholder = 'XXXXXXX',
}: PhoneFieldProps) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY_ISO);

  const filter = useMemo(
    () =>
      ({ options, search }: { options: ComboboxItem[]; search: string }) => {
        const q = search.trim().toLowerCase();
        if (!q) return options;
        return (options as ComboboxItem[]).filter((o) => {
          const name = NAME_BY_ISO[o.value]?.toLowerCase() ?? '';
          const dial = DIAL_BY_ISO[o.value] ?? '';
          return name.includes(q) || dial.includes(q);
        });
      },
    []
  );

  return (
    <Box>
      <Group gap="xs" align="flex-end" wrap="nowrap">
        <Select
          label={label}
          data={SELECT_DATA}
          value={country}
          onChange={(v) => v && setCountry(v)}
          searchable
          allowDeselect={false}
          nothingFoundMessage="Sin resultados"
          w={130}
          comboboxProps={{ withinPortal: true, width: 280, position: 'bottom-start' }}
          // @ts-expect-error filter recibe ComboboxItem[]; el typing de Mantine incluye grupos.
          filter={filter}
          renderOption={({ option }) => (
            <Group gap="sm" wrap="nowrap" w="100%">
              <Text component="span" fz="lg" lh={1}>
                {isoToFlag(option.value)}
              </Text>
              <Text component="span" size="sm" style={{ flex: 1 }} lineClamp={1}>
                {NAME_BY_ISO[option.value]}
              </Text>
              <Text component="span" size="sm" c="mantineDefault.5">
                {DIAL_BY_ISO[option.value]}
              </Text>
            </Group>
          )}
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
