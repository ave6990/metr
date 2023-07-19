const tasksQueries = {

    tasks_by_id:
`with temp as (
    select
        #{} as id
    )
select
    *
from
    tasks as t
where
    (
        t.id = (select id from temp)
        or t.master_task = (select id from temp)
    )
    and t.status >= 0
    and t.status < 100
order by
    cast(coalesce(t.master_task, t.id) as integer)
    , t.master_task
    , t.date_to
    , t.priority
    , t.status`,

    active_tasks:
`select
    *
from
    tasks
where
    status >= 0
    and status < 100
    and date_from <= (select date())
order by
    priority,
    category,
    master_task,
    id,
    date_to,
    status`,
}

export { tasksQueries }
