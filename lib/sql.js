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
    and cast(status as integer) < 10
order by
    cast(coalesce(t.master_task, t.id) as integer)
    , t.master_task
    , t.date_to
    , t.priority
    , t.status
    , t.category`,

    active_tasks:
`select
    *
from
    tasks
where
    cast(status as integer) < 10
order by
    priority,
    category,
    master_task,
    id,
    date_to,
    status`,

    categories:
`select
    *
from
    categories
`,
}

export { tasksQueries }
