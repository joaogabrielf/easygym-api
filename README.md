# App

EasyGym is an app where the subscriber user can use several registered gyms.

## FRs (Functional Requirements)

- [X] Should be able to register
- [X] Should be able to authenticate
- [X] Should be able to show user's profile from authenticated user
- [X] Should be able to show total number of user's check-ins
- [X] Should be able for the user to show all his past check-ins
- [X] Should be able for the user to search gyms in the proximity
- [X] Should be able for the user to search a gym by the name
- [X] Should be able for the user to check-in in a gym
- [X] Should be able to validate the check-in from the user
- [X] Should be able to register a gym


## BRs (Business Rules)

- [X] User should not be able to register with an email already registered
- [X] User should not be able to check-in twice in the same day
- [X] User should not be able to check-in if he is farther than 100m from the gym
- [X] Check-in can only be validate up to 20 minutes after registration
- [ ] Check-in can only be validate by admin
- [ ] Gym can only be registered by admin

## NFRs (Non Functional Requirements)
- [X] User's password must be cryptographed
- [X] Apps data must be stored in a PostgreSQL database
- [X] All data list must be in a page with 20 max by page
- [ ] User must be identified by a JWT (Json Web Token)