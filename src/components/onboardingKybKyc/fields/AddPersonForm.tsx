'use client';

import { useState, type ReactNode } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS, DEPARTMENT_OPTIONS } from '../options';
import { PersonDataFields } from './PersonDataFields';
import { LegalRepDataFields } from './LegalRepDataFields';
import { PhoneField } from './PhoneField';
import { emptyPepDeclaration, type PepDeclaration, type UploadedDoc } from '../types';

export interface PersonDraft {
  fullName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  issueDate: string;
  birthCountry: string;
  birthCity: string;
  nationality: string;
  address: string;
  phone: string;
  addressCountry: string;
  addressState: string;
  addressCity: string;
  addressStreet: string;
  addressNumber: string;
  addressZip: string;
  participation: string;
  docFront: UploadedDoc | null;
  docBack: UploadedDoc | null;
  isPep: boolean;
  pep: PepDeclaration;
}

const emptyDraft: PersonDraft = {
  fullName: '',
  email: '',
  documentType: '',
  documentNumber: '',
  birthDate: '',
  issueDate: '',
  birthCountry: '',
  birthCity: '',
  nationality: '',
  address: '',
  phone: '',
  addressCountry: '',
  addressState: '',
  addressCity: '',
  addressStreet: '',
  addressNumber: '',
  addressZip: '',
  participation: '',
  docFront: null,
  docBack: null,
  isPep: false,
  pep: { ...emptyPepDeclaration },
};

interface AddPersonFormProps {
  label: ReactNode;
  onCancel: () => void;
  onSubmit: (draft: PersonDraft) => void;
  variant?: 'legalRep' | 'shareholder' | 'beneficiary';
}

export function AddPersonForm({ label, onCancel, onSubmit, variant }: AddPersonFormProps) {
  const [draft, setDraft] = useState<PersonDraft>(emptyDraft);
  const f = copy.addPersonForm;
  const set = (patch: Partial<PersonDraft>) =>
    setDraft((d) => ({ ...d, ...patch }));

  const canSave = draft.fullName.trim() !== '';

  return (
    <Stack gap={24}>
      <Group justify="space-between" wrap="nowrap">
        <Text fw={600} fz="md" c="mantineDefault.9">
          {label}
        </Text>
        <ActionIcon
          variant="default"
          radius="xs"
          size={24}
          onClick={onCancel}
          aria-label={copy.common.delete}
          styles={{
            root: { borderColor: 'var(--mantine-color-mantineDefault-3)' },
          }}
        >
          <IconTrash size={14} color="var(--mantine-color-mantineDefault-6)" />
        </ActionIcon>
      </Group>

      <TextInput
        label={f.fullName}
        placeholder={f.fullNamePlaceholder}
        value={draft.fullName}
        onChange={(e) => set({ fullName: e.currentTarget.value })}
      />

      {variant !== 'shareholder' && (
        variant === 'beneficiary' ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
            <TextInput
              label={f.email}
              placeholder={f.emailPlaceholder}
              value={draft.email}
              onChange={(e) => set({ email: e.currentTarget.value })}
            />
            <PhoneField
              value={draft.phone}
              onChange={(v) => set({ phone: v })}
            />
          </SimpleGrid>
        ) : (
          <TextInput
            label={f.email}
            placeholder={f.emailPlaceholder}
            value={draft.email}
            onChange={(e) => set({ email: e.currentTarget.value })}
          />
        )
      )}

      {variant === 'legalRep' ? (
        <LegalRepDataFields value={draft} onChange={set} />
      ) : (
        <PersonDataFields
          value={draft}
          onChange={set}
          participationLabel={variant === 'beneficiary' ? copy.beneficiary.controlPercentage : undefined}
        />
      )}

      {variant === 'beneficiary' && (
        <Stack gap={16}>
          <Text fw={600} fz="sm" c="mantineDefault.9">{copy.fields.addressSectionTitle}</Text>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
            <Select
              label={copy.fields.addressCountry}
              placeholder={copy.fields.selectCountry}
              data={COUNTRY_OPTIONS}
              value={draft.addressCountry || null}
              onChange={(v) => set({ addressCountry: v ?? '' })}
              comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
              searchable
            />
            <Select
              label={copy.fields.addressState}
              placeholder={copy.fields.selectState}
              data={DEPARTMENT_OPTIONS}
              value={draft.addressState || null}
              onChange={(v) => set({ addressState: v ?? '' })}
              comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
              searchable
            />
            <Select
              label={copy.fields.addressCity}
              placeholder={copy.fields.selectCity}
              data={CITY_OPTIONS}
              value={draft.addressCity || null}
              onChange={(v) => set({ addressCity: v ?? '' })}
              comboboxProps={{ withinPortal: true, position: 'bottom', middlewares: { flip: false, shift: true } }}
              searchable
            />
            <TextInput
              label={copy.fields.addressStreet}
              placeholder="Ej: Carrera 15"
              value={draft.addressStreet}
              onChange={(e) => set({ addressStreet: e.currentTarget.value })}
            />
            <TextInput
              label={copy.fields.addressNumber}
              placeholder="Ej: # 80 - 45"
              value={draft.addressNumber}
              onChange={(e) => set({ addressNumber: e.currentTarget.value })}
            />
            <TextInput
              label={copy.fields.addressZip}
              placeholder="Ej: 110111"
              value={draft.addressZip}
              onChange={(e) => set({ addressZip: e.currentTarget.value.replace(/\D/g, '') })}
              inputMode="numeric"
            />
          </SimpleGrid>
        </Stack>
      )}

      <Group justify="flex-end">
        <Button
          variant="default"
          radius="sm"
          onClick={onCancel}
        >
          {copy.common.cancel}
        </Button>
        <Button
          color="akuaPurple.6"
          radius="sm"
          disabled={!canSave}
          onClick={() => onSubmit(draft)}
        >
          {copy.common.add}
        </Button>
      </Group>
    </Stack>
  );
}
