select * from pro_goals
where (author_id = $1) and (completed = $2);