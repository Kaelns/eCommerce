import { OnChangeComboBox } from '@/features/AuthorizationForms/components/ComboBox/ComboBox.type';

export interface IOptions {
  label: string;
  code: string;
  postalCodePattern: RegExp;
}

export interface IComboBoxProps {
  id: string;
  label: string;
  name: string;
  defaultValue: string;
  options: Array<IOptions>;
  onChangeComboBox: OnChangeComboBox;
}
