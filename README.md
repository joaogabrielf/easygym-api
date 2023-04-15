# App

EasyGym is an app where the subscriber user can use several registered gyms.

## FRs (Functional Requirements)

- [ ] Should be able to register
- [ ] Should be able to authenticate
- [ ] Should be able to show user's profile from authenticated user
- [ ] Should be able to show total number of user's check-ins
- [ ] Should be able for the user to show all his past check-ins
- [ ] Should be able for the user to search gyms in the proximity
- [ ] Should be able for the user to search a gym by the name
- [ ] Should be able for the user to check-in in a gym
- [ ] Should be able to validate the check-in from the user
- [ ] Should be able to register a gym


## BRs (Business Rules)

- [ ] User should not be able to register with an email already registered
- [ ] User should not be able to check-in twice in the same day
- [ ] User should not be able to check-in if he is farther than 100m from the gym
- [ ] Check-in can only be validate up to 20 minutes after registration
- [ ] Check-in can only be validate by admin
- [ ] Gym can only be registered by admin

## NFRs (Non Functional Requirements)
- [ ] User's password must be cryptographed
- [ ] Apps data must be stored in a PostgreSQL database
- [ ] All data list must be in a page with 20 max by page
- [ ] User must be identified by a JWT (Json Web Token)