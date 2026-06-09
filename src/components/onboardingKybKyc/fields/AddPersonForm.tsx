'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import {
  IconCheck,
  IconTrash,
  IconUser,
  IconUserShare,
} from '@tabler/icons-react';
import { copy } from '../copy';
import { PersonDataFields } from './PersonDataFields';
import { emptyPepDeclaration, type PepDeclaration, type UploadedDoc } from '../types';

export type CompletionMode = 'self' | 'invite';

export interface PersonDraft {
  firstName: string;
  lastName: string;
  email: string;
  mode: CompletionMode | null;
  documentNumber: string;
  participation: string;
  birthCountry: string;
  nationality: string;
  docFront: UploadedDoc | null;
  docBack: UploadedDoc | null;
  isPep: boolean;
  pep: PepDeclaration;
}

const emptyDraft: PersonDraft = {
  firstName: '',
  lastName: '',
  email: '',
  mode: null,
  documentNumber: '',
  participation: '',
  birthCountry: '',
  nationality: '',
  docFront: null,
  docBack: null,
  isPep: false,
  pep: { ...emptyPepDeclaration },
};

interface AddPersonFormProps {
  /** Título del bloque (ej. "Representante legal principal"). */
  label: ReactNode;
  onCancel: () => void;
  /** Se llama al enviar el enlace ("Se lo pido a la persona"). */
  onSubmitInvite: (draft: PersonDraft) => void;
}

function ChoiceCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderColor: selected
          ? 'var(--mantine-color-akuaPurple-6)'
          : undefined,
        borderWidth: selected ? 2 : 1,
        backgroundColor: selected
          ? 'var(--mantine-color-akuaPurple-0)'
          : 'var(--mantine-color-white)',
      }}
    >
      <Group gap="sm" wrap="nowrap" align="flex-start">
        <Text c="mantineDefault.7" style={{ display: 'flex' }}>
          {icon}
        </Text>
        <div>
          <Text fw={600} size="sm" c="mantineDefault.9">
            {title}
          </Text>
          <Text size="sm" c="mantineDefault.6">
            {description}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}

export function AddPersonForm({
  label,
  onCancel,
  onSubmitInvite,
}: AddPersonFormProps) {
  const [draft, setDraft] = useState<PersonDraft>(emptyDraft);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const f = copy.addPersonForm;
  const set = (patch: Partial<PersonDraft>) =>
    setDraft((d) => ({ ...d, ...patch }));

  const inviteDisabled =
    draft.firstName.trim() === '' ||
    draft.lastName.trim() === '' ||
    draft.email.trim() === '';

  const contentRef = useRef<HTMLDivElement>(null);

  // Al elegir una opción, revela un poco del contenido de esa sección.
  useEffect(() => {
    if (draft.mode) {
      const id = window.setTimeout(() => {
        contentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 80);
      return () => window.clearTimeout(id);
    }
  }, [draft.mode]);

  const handleSendLink = () => {
    if (sending || sent) return;
    setSending(true);
    // Simula el envío del enlace (unos segundos de loading).
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
      // Deja "Enlace enviado" visible un momento antes de consolidar la fila.
      window.setTimeout(() => onSubmitInvite(draft), 1800);
    }, 2000);
  };

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

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
        <TextInput
          label={f.firstName}
          placeholder={f.namePlaceholder}
          value={draft.firstName}
          onChange={(e) => set({ firstName: e.currentTarget.value })}
        />
        <TextInput
          label={f.lastName}
          placeholder={f.namePlaceholder}
          value={draft.lastName}
          onChange={(e) => set({ lastName: e.currentTarget.value })}
        />
      </SimpleGrid>

      <TextInput
        label={f.email}
        placeholder={f.emailPlaceholder}
        value={draft.email}
        onChange={(e) => set({ email: e.currentTarget.value })}
      />

      <Stack gap="xs">
        <Text fw={600} size="sm" c="mantineDefault.9">
          {f.completionQuestion}
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <ChoiceCard
            icon={<IconUser size={18} />}
            title={f.selfTitle}
            description={f.selfDesc}
            selected={draft.mode === 'self'}
            onClick={() => set({ mode: 'self' })}
          />
          <ChoiceCard
            icon={<IconUserShare size={18} />}
            title={f.inviteTitle}
            description={f.inviteDesc}
            selected={draft.mode === 'invite'}
            onClick={() => set({ mode: 'invite' })}
          />
        </SimpleGrid>
      </Stack>

      <div ref={contentRef} style={{ scrollMarginBottom: 24 }}>
      {/* "Lo completo yo": carga manual de datos y documentos. */}
      {draft.mode === 'self' && (
        <PersonDataFields value={draft} onChange={set} />
      )}

      {/* "Se lo pido a la persona": envío de enlace. */}
      {draft.mode === 'invite' && (
        <Paper withBorder radius="md" p="md" bg="white">
          <Group justify="space-between" wrap="nowrap" gap="md">
            <Text size="sm" c="mantineDefault.6" style={{ maxWidth: 420 }}>
              {f.inviteText}
            </Text>
            {sent ? (
              <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
                <IconCheck
                  size={16}
                  color="var(--mantine-color-akuaGreen-8)"
                />
                <Text size="sm" fw={500} c="mantineDefault.7">
                  {f.linkSent}
                </Text>
              </Group>
            ) : (
              <Button
                color="akuaPurple.6"
                size="md"
                radius="sm"
                style={{ flexShrink: 0 }}
                loading={sending}
                disabled={inviteDisabled}
                onClick={handleSendLink}
              >
                {f.sendLink}
              </Button>
            )}
          </Group>
        </Paper>
      )}
      </div>
    </Stack>
  );
}
