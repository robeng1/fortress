import { Section } from 'models/theme/section';

export const getCustomizableSections = (sections: Section[]): Section[] => {
  return sections.filter(
    section =>
      section.content?.includes('{% schema %}') ||
      section.content?.includes('{%schema%}'),
  );
};
