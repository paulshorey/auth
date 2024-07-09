# Hello 👋

This is an example React app with authentication and state management - showing how easy it can be to maintain a React NextJS app.

<br />

## Goals

1. Keep it simple! Minimize dependencies. Add a local function instead of installing a 3rd party module.
2. Everything explicitly organized. An intern or AI should be able to understand where everything belongs.
3. Separation of client/server (React state / API calls), styling/logic (CSS vs HTML), public/private (NEXT_PUBLIC vs API KEYS).
4. Extensible structure that will not need to change for future features. Refactoring is very expensive (must rewrite many unit tests).

<br />

## NextJS

- `app` - NextJS app directory (server only).
  Only `error.tsx` page is "use client", all others should "use server" whenever possible.
  Best to keep server/client separate by importing client components with `dynamic()` + `ssr: false`.

  ```
  const Home = dynamic(() => import("@/client/pages/Home"), { ssr: false });
  ```

  App directory should not have any reusable code/logic/data/styles. Import only from `src`.

<br />

## Library

- `src/server` - logic/state/views that should run in the server only (static read-only Components).
- `src/client` - logic/state/views that should run in the browser only (interactive or stateful Components).
- `src/common` - universal/fullstack - logic/data/helpers that will function equally well in both browser and server.

When importing, use `@` to refer to `src`

<br />

## Session state/data

Session is created and expired in [Stytch.com](https://stytch.com). They provide a client-side login form and event callbacks, and server-side API endpoints to authenticate and verify the current session. Stytch returns user data and session. This makes login/signup very easy.

Stytch session only contains the email/phone/social-provider-id/password of the most recent login. No other user data. No preferences. No application data. So, this is only useful for login/signup. It is not used for application state.

### Account state/data

User's address, payment, preferences, and alternative/preferred contact info, tokens remaining, and application data relevant to the user is all stored in [Xata.io](https://xata.io) `users` database.

When someone logs in with Stytch, the app saves their user data to our Xata database. User is then also able to add/edit additional data.

### Sync credentials

Stytch returns the `email` and `phone` from whatever verification method was used (email confirmation, phone OTP, or social provider). This data is saved to `account` database and can NOT be edited by the user.

Stytch is **"sometimes"** able to sync email/phone credentials. See ["Note:" in their update-user docs](https://stytch.com/docs/api/update-user). Unfortunately, if someone logs in with the new credentials, they will have 2 different Stytch accounts, one for each credential. These Stytch accounts will NOT be able to be merged. So, this method should not be relied on.

Instead, we must ignore Stytch's update functionality, and simply use Stytch as a way to validate email/phone. Because of this limitation, their $250/month fee is not worth it. So, we'll need a better process to validate email/phone. The goal is to transition away from Stytch ASAP.

However, for now, Stytch's system of redirects is valuable and saves a lot of time.

### Edit phone/email

1. User enters a new phone/email
2. UI is updated to show a confirmation "Enter OTP code" to validate phone/email
3. App generates a random 6-digit number. Send it to the API that sends an OTP code to the phone/email
4. User types OTP code into the confirmation form. If successful, account is updated.

<br />
