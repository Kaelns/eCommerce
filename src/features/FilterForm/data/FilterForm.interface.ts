import { ITreeNode } from '@/data/interface/ITreeNode';

export interface IFilterFormProps {
  className: string;
  categoryTree: ITreeNode[];
  categoryKey: string;
  setCategoryKey: React.Dispatch<React.SetStateAction<string>>;
}
