-- References feature: optional link on a note, plus a cached preview image.
-- Both nullable since most notes won't have a url.

alter table public.notes add column if not exists url text;
alter table public.notes add column if not exists preview_image text;
