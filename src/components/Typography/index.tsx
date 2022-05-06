import styled from 'styled-components';
import { colors } from '../../styles/colors';

interface TextProps {
    color?: string;
    breakWords?: boolean;
    align?: 'left' | 'center' | 'right';
    isUnderline?: boolean;
    weight?: string;
    size?: string;
    lineHeight?: string;
    spacing?: string;
}

const Typography = styled.div<TextProps>`
  font-size: ${({ size }) => size || '1.8rem'};
  font-weight: ${({ weight }) => weight || '600'};
  line-height: ${({ lineHeight }) => lineHeight || '2rem'};
  color: ${({ color }) => color || colors.textBody};
  letter-spacing: ${({ spacing }) => spacing || 'inherit'};
  text-align: ${({ align }) => align || 'left'};
`;



export default Typography;