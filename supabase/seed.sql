-- Seed Default Four-Track High-Frequency Reading Plan

insert into public.reading_plans (id, slug, name, description, is_system_plan)
values (
  '11111111-1111-1111-1111-111111111111',
  'four-track-high-frequency',
  'Four-Track High-Frequency Plan',
  'High-frequency daily Scripture reading system: NT (4x/year), OT excl. Psalms/Proverbs (1x/year), Psalms (2x/year), Proverbs (4x/year).',
  true
) on conflict (slug) do nothing;

insert into public.reading_plan_tracks (id, reading_plan_id, slug, name, display_order, rotation_target, sequence_type, accent_color)
values
  ('22222222-2222-2222-2222-222222222201', '11111111-1111-1111-1111-111111111111', 'new_testament', 'New Testament', 1, 4, 'canonical', '#536B92'),
  ('22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111111', 'old_testament', 'Old Testament', 2, 1, 'canonical_excl_psa_pro', '#A57846'),
  ('22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111111', 'psalms', 'Psalms', 3, 2, 'canonical', '#67806D'),
  ('22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111111', 'proverbs', 'Proverbs', 4, 4, 'canonical', '#A56359')
on conflict (reading_plan_id, slug) do nothing;
