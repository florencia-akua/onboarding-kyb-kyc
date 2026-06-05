'use client';

import {
  Radio,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { copy } from '../copy';
import { DateField } from './DateField';
import { DocumentUploadField } from './DocumentUploadField';
import type {
  PepApproval,
  PepDeclaration,
  PepLevel,
  YesNo,
} from '../types';

const c = copy.pepDeclaration;

interface PepDeclarationFieldsProps {
  value: PepDeclaration;
  onChange: (patch: Partial<PepDeclaration>) => void;
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <Text fw={600} size="sm" c="mantineDefault.9">
      {children}
    </Text>
  );
}

function YesNoGroup({
  question,
  value,
  onChange,
}: {
  question: React.ReactNode;
  value: YesNo | null;
  onChange: (v: YesNo) => void;
}) {
  return (
    <Stack gap="xs">
      <Question>{question}</Question>
      <Radio.Group value={value} onChange={(v) => onChange(v as YesNo)}>
        <Stack gap="xs">
          <Radio value="si" label={copy.common.yes} color="akuaPurple.6" />
          <Radio value="no" label={copy.common.no} color="akuaPurple.6" />
        </Stack>
      </Radio.Group>
    </Stack>
  );
}

export function PepDeclarationFields({
  value,
  onChange,
}: PepDeclarationFieldsProps) {
  return (
    <Stack gap="lg" mt="md">
      <TextInput
        label={c.positionLabel}
        placeholder={c.positionPlaceholder}
        description={c.positionHint}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        value={value.position}
        onChange={(e) => onChange({ position: e.currentTarget.value })}
      />

      <TextInput
        label={c.institutionLabel}
        placeholder={c.institutionPlaceholder}
        value={value.institution}
        onChange={(e) => onChange({ institution: e.currentTarget.value })}
      />

      <Stack gap="xs">
        <Question>{c.periodQuestion}</Question>
        <SimpleGrid cols={2} spacing="md">
          <DateField
            label={c.startDate}
            value={value.startDate}
            onChange={(v) => onChange({ startDate: v })}
            maxDate={new Date()}
          />
          <DateField
            label={c.endDate}
            placeholder={c.endPlaceholder}
            value={value.endDate}
            onChange={(v) => onChange({ endDate: v })}
          />
        </SimpleGrid>
      </Stack>

      <Stack gap="xs">
        <Question>{c.levelQuestion}</Question>
        <Radio.Group
          value={value.level}
          onChange={(v) => onChange({ level: v as PepLevel })}
        >
          <Stack gap="xs">
            <Radio
              value="nacional"
              label={c.levelNacional}
              color="akuaPurple.6"
            />
            <Radio
              value="regional"
              label={c.levelRegional}
              color="akuaPurple.6"
            />
            <Radio
              value="municipal"
              label={c.levelMunicipal}
              color="akuaPurple.6"
            />
          </Stack>
        </Radio.Group>
      </Stack>

      <Stack gap="xs">
        <YesNoGroup
          question={c.relativeQuestion}
          value={value.isRelative}
          onChange={(v) => onChange({ isRelative: v })}
        />
        <TextInput
          label={c.relativeDetailLabel}
          placeholder={c.relativeDetailPlaceholder}
          value={value.relativeDetail}
          onChange={(e) => onChange({ relativeDetail: e.currentTarget.value })}
        />
      </Stack>

      <Stack gap="xs">
        <YesNoGroup
          question={c.associateQuestion}
          value={value.isAssociate}
          onChange={(v) => onChange({ isAssociate: v })}
        />
        <TextInput
          label={c.associateDetailLabel}
          placeholder={c.associateDetailPlaceholder}
          value={value.associateDetail}
          onChange={(e) => onChange({ associateDetail: e.currentTarget.value })}
        />
      </Stack>

      <YesNoGroup
        question={c.publicFundsQuestion}
        value={value.receivedPublicFunds}
        onChange={(v) => onChange({ receivedPublicFunds: v })}
      />

      <YesNoGroup
        question={c.decisionPowerQuestion}
        value={value.decisionPower}
        onChange={(v) => onChange({ decisionPower: v })}
      />

      <Stack gap={4}>
        <Question>{c.fundsOriginTitle}</Question>
        <Text size="sm" c="mantineDefault.6">
          {c.fundsOriginLabel}
        </Text>
        <Textarea
          placeholder={c.fundsOriginPlaceholder}
          minRows={3}
          autosize
          value={value.fundsOrigin}
          onChange={(e) => onChange({ fundsOrigin: e.currentTarget.value })}
          mt="xs"
        />
      </Stack>

      <Stack gap="xs">
        <Question>{c.approvalQuestion}</Question>
        <Text size="sm" c="mantineDefault.6">
          {c.approvalHint}
        </Text>
        <Radio.Group
          value={value.approval}
          onChange={(v) => onChange({ approval: v as PepApproval })}
        >
          <Stack gap="xs">
            <Radio
              value="requiere"
              label={c.approvalRequires}
              color="akuaPurple.6"
            />
            <Radio value="tiene" label={c.approvalHas} color="akuaPurple.6" />
          </Stack>
        </Radio.Group>

        {value.approval === 'tiene' && (
          <DocumentUploadField
            field={{ key: 'pepApprovalDoc', label: c.approvalDocLabel }}
            value={value.approvalDoc}
            onChange={(_key, doc) => onChange({ approvalDoc: doc })}
          />
        )}
      </Stack>
    </Stack>
  );
}
