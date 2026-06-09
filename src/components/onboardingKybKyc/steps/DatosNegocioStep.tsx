'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { COUNTRIES, isoToFlag } from '../countries';
import {
  getTaxonomy,
  loadActivities,
  type ActivityEntry,
} from '@/data/activities/taxonomies';
import type { StepProps } from '../stepProps';

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  value: c.iso,
  label: `${isoToFlag(c.iso)}  ${c.name}`,
}));

export function DatosNegocioStep({ data, update }: StepProps) {
  const showWebsite =
    data.salesChannels.includes('ecommerce') ||
    data.salesChannels.includes('both');

  const country = data.businessCountry;
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(false);

  // Carga perezosa del dataset del país seleccionado.
  useEffect(() => {
    if (!country) {
      setActivities([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    loadActivities(country)
      .then((list) => {
        if (!cancelled) setActivities(list);
      })
      .catch(() => {
        if (!cancelled) setActivities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [country]);

  const taxonomy = country ? getTaxonomy(country) : null;

  const activityOptions = useMemo(
    () =>
      activities.map((a) => ({
        value: a.localCode,
        label: `${a.localCode} — ${a.localLabel}`,
      })),
    [activities]
  );

  const handleSelectActivity = (code: string | null) => {
    if (!code || !taxonomy) {
      update({ economicActivity: null });
      return;
    }
    const entry = activities.find((a) => a.localCode === code);
    if (!entry) {
      update({ economicActivity: null });
      return;
    }
    update({
      economicActivity: {
        country,
        system: taxonomy.system,
        localCode: entry.localCode,
        localLabel: entry.localLabel,
        isicCode: entry.isicCode,
        isicRevision: taxonomy.isicRevision,
      },
    });
  };

  const activityPlaceholder = !country
    ? copy.business.economicActivityCountryFirst
    : loading
      ? copy.business.economicActivityLoading
      : copy.business.economicActivityPlaceholder;

  return (
    <Stack gap={32}>
      <StepTitle>{copy.business.title}</StepTitle>

      <Select
        label={copy.business.country}
        placeholder={copy.business.countryPlaceholder}
        data={COUNTRY_OPTIONS}
        value={country || null}
        onChange={(v) =>
          update({ businessCountry: v ?? '', economicActivity: null })
        }
        comboboxProps={{ withinPortal: true }}
        searchable
        withAsterisk
        limit={50}
        nothingFoundMessage="Sin resultados"
      />

      <Select
        label={copy.business.economicActivity}
        placeholder={activityPlaceholder}
        description={
          taxonomy
            ? `${taxonomy.system} ${taxonomy.revision} · ${taxonomy.authority}`
            : undefined
        }
        data={activityOptions}
        value={data.economicActivity?.localCode ?? null}
        onChange={handleSelectActivity}
        comboboxProps={{ withinPortal: true }}
        searchable
        withAsterisk
        disabled={!country || loading}
        limit={100}
        nothingFoundMessage="Sin resultados"
      />

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
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
