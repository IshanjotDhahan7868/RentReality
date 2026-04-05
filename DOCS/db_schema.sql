-- Core tables
create table if not exists regions (
  id serial primary key,
  name text not null,
  province text,
  country text default 'Canada'
);

create table if not exists time_periods (
  id serial primary key,
  year int not null,
  month int,
  period_type text not null default 'annual'
);

create table if not exists metrics (
  id serial primary key,
  name text not null unique,
  label text not null,
  unit text,
  description text,
  is_derived boolean default false
);

create table if not exists metric_values (
  id serial primary key,
  region_id int references regions(id) on delete cascade,
  time_period_id int references time_periods(id) on delete cascade,
  metric_id int references metrics(id) on delete cascade,
  value numeric,
  metadata jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_metric_values_region_time_metric
  on metric_values(region_id, time_period_id, metric_id);

-- Seed data
insert into regions (name, province)
values ('Toronto', 'Ontario'),
       ('Calgary', 'Alberta')
on conflict do nothing;

insert into time_periods (year, period_type)
values (2024, 'annual')
on conflict do nothing;

insert into metrics (name, label, unit, description)
values
  ('rent_overall', 'Median overall rent', 'CAD/month', 'Median asking rent across all unit sizes'),
  ('median_aftertax_income', 'Median after-tax income', 'CAD/year', 'Median annual after-tax household income')
on conflict (name) do nothing;

insert into metric_values (region_id, time_period_id, metric_id, value)
select r.id, t.id, m.id, v.val
from (values
    ('Toronto', 'rent_overall', 2300),
    ('Toronto', 'median_aftertax_income', 65000),
    ('Calgary', 'rent_overall', 1700),
    ('Calgary', 'median_aftertax_income', 60000)
) as v(city, metric_name, val)
join regions r on r.name = v.city
join metrics m on m.name = v.metric_name
join time_periods t on t.year = 2024 and t.period_type = 'annual';
