select * from pro_entries
where (author_id = $1) and (title ilike '%' || $2 || '%') or (date ilike '%' || $2 || '%');