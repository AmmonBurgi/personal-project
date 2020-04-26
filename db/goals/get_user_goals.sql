select username, title from pro_user
join pro_goals on pro_user.user_id = pro_goals.author_id where pro_user.user_id = $1;  