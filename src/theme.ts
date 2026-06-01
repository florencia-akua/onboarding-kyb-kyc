import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Paleta de marca Akua (índice 6 = #180047, púrpura principal).
const akuaPurple: MantineColorsTuple = [
  '#E8E0F5',
  '#D1C2EB',
  '#B9A3E0',
  '#9F82D4',
  '#8361C7',
  '#6440B8',
  '#180047',
  '#2d0e80',
  '#100033',
  '#0C0029',
];

const akuaGreen: MantineColorsTuple = [
  '#e4fff5',
  '#d2fbeb',
  '#a6f5d8',
  '#77efc2',
  '#51e9b0',
  '#39e7a5',
  '#29e59e',
  '#18cb89',
  '#01b479',
  '#009c66',
];

const mantineDefault: MantineColorsTuple = [
  '#F9FAFB',
  '#F3F4F6',
  '#E5E7EB',
  '#D1D5DB',
  '#9CA3AF',
  '#6B7280',
  '#4B5563',
  '#374151',
  '#1F2937',
  '#0A0B0D',
];

export const theme = createTheme({
  colors: {
    akuaPurple,
    akuaGreen,
    mantineDefault,
  },
  primaryColor: 'akuaPurple',
  defaultRadius: 'lg',
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  white: '#FFFFFF',
  black: '#0A0B0D',
  fontSizes: {
    xs: '11px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '20px',
  },
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '32px', fontWeight: '700' },
      h2: { fontSize: '20px', fontWeight: '600' },
      h3: { fontSize: '16px', fontWeight: '600' },
      h4: { fontSize: '14px', fontWeight: '600' },
    },
  },
  components: {
    Paper: { defaultProps: { withBorder: true } },
    Card: { defaultProps: { withBorder: true, radius: 'lg' } },
    Badge: { defaultProps: { variant: 'light', size: 'sm', radius: 'sm' } },
    Button: { defaultProps: { radius: 'md' } },
    Modal: { defaultProps: { centered: true, radius: 'md' } },
  },
});
