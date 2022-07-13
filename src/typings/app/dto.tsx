export interface ProtocolHandler{
  'protocol': (string);
  'url': (string);
}

export interface Shortcut {
  'name': (string);
  'short_name': (string);
  'url': (string);
  'description': (string);
  'icons': (Icon)[];
}

export interface Icon {
  'src': (string);
  'type': (string);
  'sizes': (string);
}

export interface RelatedApplication {
  'platform': (string);
  'url': (string);
  'id': (string);
}

export interface ManifestOptions {
  'name'?: (string);
  'short_name'?: (string);
  'description'?: (string);
  'icons'?: (Icon)[];
  'start_url'?: (string);
  'scope'?: (string);
  'id'?: (string);
  'orientation'?: (string);
  'display'?: (string);
  'display_override'?: (string);
  'background_color'?: (string);
  'theme_color'?: (string);
  'dir'?: (string);
  'lang'?: (string);
  'public_path'?: (string);
  'related_applications'?: (RelatedApplication)[];
  'prefer_related_applications'?: (boolean);
  'protocol_handlers'?: (ProtocolHandler)[];
  'shortcuts'?: (Shortcut)[];
  'categories'?: (string)[];
  'iac_rating_id'?: (string);
}

export interface WebApp {
  'id': (string);
  'shop_id': (string);
  'manifest': (ManifestOptions| null);
  'tag_line': (string);
  'favicon': (string);
  'template': (string);
  'template_id': (string);
  'twitter_link': (string);
  'instagram_link': (string);
  'tik_tok_link': (string);
  'youtube_link': (string);
  'facebook_link': (string);
  'telegram_link': (string);
  'metadata': ({ [key: string]: string });
  created_at?: string | null
  updated_at?: string | null
  'published': (boolean);
}