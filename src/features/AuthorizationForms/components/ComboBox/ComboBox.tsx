import { InputLabel } from '@mui/material';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IProps } from '@/features/AuthorizationForms/components/ComboBox/ComboBox.interface';

export default function ComboBox({ label, name, id, options, onChangeComboBox }: IProps): React.ReactNode {
  return (
    <>
      <InputLabel>{label}: </InputLabel>
      <Autocomplete
        id={id}
        onChange={onChangeComboBox}
        options={options}
        renderInput={(params) => <TextField {...params} name={name} />}
      />
    </>
  );
}
