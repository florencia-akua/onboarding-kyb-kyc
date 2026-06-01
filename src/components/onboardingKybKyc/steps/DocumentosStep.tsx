'use client';

import { Stack } from '@mantine/core';
import { StepTitle } from '../fields/SectionTitle';
import { DocumentUploadField } from '../fields/DocumentUploadField';
import { copy, type DocumentField } from '../copy';
import type { StepProps } from '../stepProps';

interface DocumentosStepProps extends StepProps {
  fields: DocumentField[];
}

export function DocumentosStep({
  data,
  updateDocument,
  fields,
}: DocumentosStepProps) {
  return (
    <Stack gap="xl">
      <StepTitle>{copy.documents.title}</StepTitle>
      {fields.map((field) => (
        <DocumentUploadField
          key={field.key}
          field={field}
          value={data.documents[field.key] ?? null}
          onChange={updateDocument}
        />
      ))}
    </Stack>
  );
}
