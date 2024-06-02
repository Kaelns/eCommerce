import { ITreeNode } from '@/data/interface/ITreeNode';

export const convertToBreadcrumb = (categoryKey: string, categories: ITreeNode[]): string => {
  let breadcrumbsFinal = '';
  let breadcrumbs = '';
  let i = 0;

  const recursiveBreadcrumbBuilder = (categoriesRecursive: ITreeNode[]): void => {
    for (const { key, children } of categoriesRecursive) {
      if (key === categoryKey) {
        breadcrumbs += ` ${categoryKey}`;
        breadcrumbsFinal = breadcrumbs;
      }

      if (!breadcrumbsFinal && children.length) {
        breadcrumbs += ` ${key}`;
        recursiveBreadcrumbBuilder(children);
      }

      if (!breadcrumbsFinal && i >= categoriesRecursive.length) {
        breadcrumbs = breadcrumbs.slice(0, breadcrumbs.lastIndexOf(' '));
        i = 0;
        return;
      }

      i += 1;
    }
  };

  recursiveBreadcrumbBuilder(categories);

  return breadcrumbsFinal;
};
