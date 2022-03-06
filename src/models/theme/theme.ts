import { Config } from './config';
import { Layout } from './layout';
import { Locale } from './locale';
import { Section } from './section';
import { Snippet } from './snippet';
import { Template } from './template';

export interface Theme {
  id?: string;
  version_name?: string;
  version_number?: string;
  is_system?: boolean;
  created_by?: string;
  dialect?: string;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
  published?: boolean;
  is_copy?: boolean;
  base_uuid?: string;
  config?: Config | null;
  sections?: Section[];
  layouts?: Layout[];
  snippets?: Snippet[];
  templates?: Template[];
  locales?: Locale[];
}
