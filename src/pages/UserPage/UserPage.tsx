import { Title } from '@/components/Title/Title';
import styles from './UserPage.module.scss';

// interface IProps {}

export function UserPage(/* props: IProps */): React.ReactNode {
  return <Title className={styles.user}>User Page</Title>;
}
