import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { FormHelperText, InputLabel } from '@mui/material';
import { PropsWithChildren } from '@/shared/types';

interface IValidationInputProps extends OutlinedInputProps {
  label: string;
}

export function ValidationInput({
  label,
  children,
  type = 'text',
  required = true,
  ...props
}: PropsWithChildren<IValidationInputProps>): React.ReactNode {
  return (
    <>
      <InputLabel required>{label}</InputLabel>
      <OutlinedInput type={type} required {...props} />
      <FormHelperText error>{children}</FormHelperText>
    </>
  );
}
