'use client';

import { useRef } from 'react';
import { ActionIcon, Box, Button, Group, Paper, Text } from '@mantine/core';
import { IconFile, IconTrash, IconUpload } from '@tabler/icons-react';
import { copy } from '../copy';
import type { DocumentField } from '../copy';
import type { UploadedDoc } from '../types';

interface DocumentUploadFieldProps {
  field: DocumentField;
  value: UploadedDoc | null;
  onChange: (key: string, doc: UploadedDoc | null) => void;
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function DocumentUploadField({
  field,
  value,
  onChange,
}: DocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(field.key, { name: file.name, size: file.size });
    }
    e.target.value = '';
  };

  return (
    <Box>
      <Text size="sm" fw={500} c="mantineDefault.9">
        {field.label}
      </Text>
      <Text size="xs" c="mantineDefault.5" mt={2}>
        {field.note ?? copy.common.fileHint}
      </Text>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleFile}
      />

      {value ? (
        <Paper withBorder radius="md" p="sm" mt="sm" bg="gray.0">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="sm" wrap="nowrap">
              <IconFile size={20} color="var(--mantine-color-mantineDefault-5)" />
              <Box>
                <Text size="sm" fw={500}>
                  {value.name}
                </Text>
                <Text size="xs" c="mantineDefault.5">
                  {formatSize(value.size)}
                </Text>
              </Box>
            </Group>
            <Group gap="xs" wrap="nowrap">
              <Button variant="default" size="xs">
                {copy.common.open}
              </Button>
              <ActionIcon
                variant="subtle"
                color="akuaPurple.6"
                aria-label={copy.common.delete}
                onClick={() => onChange(field.key, null)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>
      ) : (
        <Paper
          withBorder
          radius="md"
          mt="sm"
          py="xl"
          style={{
            borderStyle: 'dashed',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="default"
            size="md"
            radius="sm"
            leftSection={<IconUpload size={16} />}
            onClick={() => inputRef.current?.click()}
          >
            {copy.common.upload}
          </Button>
        </Paper>
      )}
    </Box>
  );
}
