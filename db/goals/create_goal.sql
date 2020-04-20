insert into pro_goals (
    title,
    content,
    completed,
    author_id
) values (
    $1,
    $2,
    'false',
    $3
)