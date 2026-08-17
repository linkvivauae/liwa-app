import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, FontFamily, ThemeColor, Type } from '@/constants/theme';
import { useLanguage } from '@/context/language-context';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'display'
    | 'heading'
    | 'subheading'
    | 'body'
    | 'bodyBold'
    | 'caption'
    | 'eyebrow'
    | 'link'
    | 'code';
  themeColor?: ThemeColor;
};

const DISPLAY_TYPES = new Set(['display', 'heading', 'subheading']);
const SEMIBOLD_TYPES = new Set(['bodyBold', 'eyebrow']);

export function ThemedText({ style, type = 'body', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const { language } = useLanguage();
  const family = FontFamily[language];

  const fontFamily = DISPLAY_TYPES.has(type)
    ? family.display
    : SEMIBOLD_TYPES.has(type)
      ? family.bodySemiBold
      : family.body;

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'], fontFamily },
        type !== 'link' && type !== 'code' && Type[type as keyof typeof Type],
        type === 'link' && styles.link,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  link: {
    lineHeight: 22,
    fontSize: 16,
    color: '#9C1730',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
