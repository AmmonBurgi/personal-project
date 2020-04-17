update pro_entries
set date = $1, title = $2, content = $3
where entry_id = $4;