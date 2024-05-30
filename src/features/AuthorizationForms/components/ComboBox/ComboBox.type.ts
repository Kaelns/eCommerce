import { IOptions } from '@/features/AuthorizationForms/components/ComboBox/ComboBox.interface';

type OnChangeComboBox = (event: React.SyntheticEvent<Element, Event>, value: IOptions | null) => void;

export type { OnChangeComboBox };
