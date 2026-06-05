'use client';

import type { ReactNode } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';

dayjs.extend(customParseFormat);

const FORMAT = 'DD/MM/YYYY';

interface DateFieldProps {
  label: ReactNode;
  placeholder?: string;
  /** Stored value as a "DD/MM/YYYY" string. */
  value: string;
  onChange: (value: string) => void;
  /** Allow clearing the date (e.g. periods still in course). */
  clearable?: boolean;
  /** Latest selectable date. */
  maxDate?: Date;
}

function parse(value: string): Date | null {
  if (!value) return null;
  const d = dayjs(value, FORMAT, true);
  return d.isValid() ? d.toDate() : null;
}

export function DateField({
  label,
  placeholder = 'Seleccione una fecha',
  value,
  onChange,
  clearable = true,
  maxDate,
}: DateFieldProps) {
  return (
    <DatePickerInput
      label={label}
      placeholder={placeholder}
      value={parse(value)}
      onChange={(d) => onChange(d ? dayjs(d).format(FORMAT) : '')}
      valueFormat={FORMAT}
      locale="es"
      clearable={clearable}
      maxDate={maxDate}
      leftSection={
        <IconCalendar size={16} color="var(--mantine-color-mantineDefault-5)" />
      }
      popoverProps={{ withinPortal: true }}
      styles={{
        // Encabezado del mes/año (Inter semibold, fg-default).
        calendarHeaderLevel: {
          fontWeight: 600,
          color: 'var(--mantine-color-mantineDefault-9)',
        },
        // Etiquetas de día de la semana en gris (fg-muted).
        weekday: {
          color: 'var(--mantine-color-mantineDefault-5)',
          fontWeight: 500,
        },
        // Celdas de día: circulares como en el design system.
        day: {
          borderRadius: '9999px',
        },
      }}
    />
  );
}
