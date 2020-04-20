update pro_goals
set completed = $1
where goal_id = $2;