/*
  # Create owner account

  1. Creates the initial owner account with specified credentials
  2. Sets up admin role and permissions
*/

-- Create owner account
DO $$
BEGIN
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'Duckizard@duckizard.com',
    crypt('Mingyiisthebest61', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"username":"Duckizard"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );
END $$;