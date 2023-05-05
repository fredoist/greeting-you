# Greeting you!

A CLI tool to send greetings to your friends.

## Get started

Install the package from npm

```sh
npm install -g greeting-you
# get started runnign
greet --help

# or sign up with
greet login
```

## Local setup

1. Create a supabase project and replace your **Project URL** and **API Key** on `.env`

    ```sh
    cp .env.sample .env
    ```

2. Run the following SQL query to create your table greetings

    ```sql
    create table public.greetings (
      id bigint generated by default as identity primary key,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      "to" varchar not null,
      "from" varchar not null,
      message varchar null,
      read boolean default false
    );

    create policy "Enable insert for authenticated users only" ON "public"."greetings" FOR insert WITH CHECK (true);

    create policy "Enable select for authenticated users using email" ON "public"."greetings" FOR select USING (((auth.jwt() ->> 'email'::text) = 'to'::text));

    create policy "Enable delet for authenticated users using email" ON "public"."greetings" FOR delete USING (((auth.jwt() ->> 'email'::text) = 'to'::text));

    create policy "Enable update for authenticated users using email" ON "public"."greetings" FOR update USING (((auth.jwt() ->> 'email'::text) = 'to'::text)) WITH CHECK(((auth.jwt() ->> 'email'::text) = 'to'::text));
    ```

3. Update you **authentication email templates**, the app works with OTP sent through emails, remove the `{{ .ConfirmationURL }}` variable and place something like:

    ```html
    <p>Enter this code to complete your signup: {{ .Token }}</p>
    ```
    ***Do this for all templates**

## Bundle

Bundle the application by running `npm run build`; you can then test it by executing the following:
```sh
# test without installing
node bin/index.js

# install globally and test
npm install -g .
# then run
greet
```
