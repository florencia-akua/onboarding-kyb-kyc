'use client';

import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Select,
  TextInput,
  Text,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { StepTitle, SectionTitle } from '../fields/SectionTitle';
import { PhoneField } from '../fields/PhoneField';
import { DocumentNumberLabel } from '../fields/DocumentNumberLabel';
import { copy } from '../copy';
import { CITY_OPTIONS, COUNTRY_OPTIONS } from '../options';
import type { StepProps } from '../stepProps';
import { emptyBeneficiary, type Beneficiary } from '../types';

export function BeneficiarioFinalStep({
  data,
  update,
  asSection,
}: StepProps & { asSection?: boolean }) {
  const beneficiaries = data.beneficiaries;

  const updateAt = (index: number, patch: Partial<Beneficiary>) => {
    const next = beneficiaries.map((b, i) =>
      i === index ? { ...b, ...patch } : b
    );
    update({ beneficiaries: next });
  };

  const addBeneficiary = () => {
    update({ beneficiaries: [...beneficiaries, { ...emptyBeneficiary }] });
  };

  const removeAt = (index: number) => {
    update({ beneficiaries: beneficiaries.filter((_, i) => i !== index) });
  };

  return (
    <Stack gap={32}>
      {asSection ? (
        <SectionTitle>{copy.beneficiary.title}</SectionTitle>
      ) : (
        <StepTitle>{copy.beneficiary.title}</StepTitle>
      )}

      {beneficiaries.length === 0 ? (
        <Paper withBorder radius="md" p="md" bg="gray.0">
          <Group justify="space-between" wrap="nowrap" gap={32}>
            <Text size="sm" c="mantineDefault.6">
              {copy.beneficiary.calloutText}
            </Text>
            <Button
              variant="default"
              rightSection={<IconPlus size={16} />}
              onClick={addBeneficiary}
              style={{ flexShrink: 0 }}
            >
              {copy.beneficiary.addBeneficiary}
            </Button>
          </Group>
        </Paper>
      ) : (
        <>
          {beneficiaries.map((beneficiary, index) => (
            <Stack key={index} gap={32}>
              <Group justify="space-between" mt={index > 0 ? 'md' : undefined}>
                <Text fw={600} size="sm" c="mantineDefault.7">
                  {copy.beneficiary.beneficiaryLabel} {index + 1}
                </Text>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => removeAt(index)}
                  aria-label={copy.common.delete}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={32}>
                <TextInput
                  label={copy.fields.fullName}
                  placeholder="Ingrese nombre completo"
                  value={beneficiary.fullName}
                  onChange={(e) =>
                    updateAt(index, { fullName: e.currentTarget.value })
                  }
                />
                <TextInput
                  label={<DocumentNumberLabel />}
                  placeholder="Ingrese número de documento"
                  value={beneficiary.documentNumber}
                  onChange={(e) =>
                    updateAt(index, { documentNumber: e.currentTarget.value })
                  }
                />
                <TextInput
                  label={copy.beneficiary.controlPercentage}
                  placeholder="Ingrese porcentaje de control (%)"
                  value={beneficiary.controlPercentage}
                  onChange={(e) =>
                    updateAt(index, {
                      controlPercentage: e.currentTarget.value,
                    })
                  }
                />
                <Select
                  label={copy.fields.birthCountry}
                  placeholder="Ingrese país de nacimiento"
                  data={COUNTRY_OPTIONS}
                  value={beneficiary.birthCountry || null}
                  onChange={(v) => updateAt(index, { birthCountry: v ?? '' })}
                  comboboxProps={{ withinPortal: true }}
                  searchable
                />
                <Select
                  label={copy.fields.birthCity}
                  placeholder="Ingrese ciudad de nacimiento"
                  data={CITY_OPTIONS}
                  value={beneficiary.birthCity || null}
                  onChange={(v) => updateAt(index, { birthCity: v ?? '' })}
                  comboboxProps={{ withinPortal: true }}
                  searchable
                />
                <TextInput
                  label={copy.fields.address}
                  placeholder="Ingrese dirección"
                  value={beneficiary.address}
                  onChange={(e) =>
                    updateAt(index, { address: e.currentTarget.value })
                  }
                />
                <PhoneField
                  value={beneficiary.phone}
                  onChange={(v) => updateAt(index, { phone: v })}
                />
                <TextInput
                  label={copy.fields.email}
                  placeholder="Ingrese correo electrónico"
                  value={beneficiary.email}
                  onChange={(e) =>
                    updateAt(index, { email: e.currentTarget.value })
                  }
                />
              </SimpleGrid>

              {index < beneficiaries.length - 1 && <Divider mt="md" />}
            </Stack>
          ))}

          <Button
            variant="default"
            rightSection={<IconPlus size={16} />}
            w="fit-content"
            onClick={addBeneficiary}
          >
            {copy.beneficiary.addBeneficiary}
          </Button>
        </>
      )}
    </Stack>
  );
}
