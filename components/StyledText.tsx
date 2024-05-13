import { Text, TextProps } from './Themed';

export function CustomText(props: TextProps) {
  return <Text {...props} style={{ fontFamily: 'SpaceMono' }} />;
}
