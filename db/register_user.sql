insert into pro_user (
    email,
    username,
    password
) values (
    $1,
    $2,
    $3
) returning user_id, email, username