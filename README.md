# Warranty Tracker

A React Native - Expo app

To run the app locally in development mode,

- install Expo Go
- run `expo start --tunnel`
- scan QR code from terminal

There are 3 types of builds you can create:

- development
- staging
- production

To create a build, run `npx eas build --profile [build type]`

To install a build on your device, select it from the list here: https://expo.dev/accounts/warranty/projects/warranty-tracker/builds

Development builds create a custom expo dev-client to allow you to develop in an environment similar to Expo Go, but with additional native dependencies installed.

Staging builds are "production" builds for internal distribution. To utilize a staging build on iOS, you need to register each device prior to creating the build. Instructions here: https://docs.expo.dev/build/internal-distribution/

Production builds can be submitted to the app stores, and to TestFlight. At the time of writing, app submission is not configured. Instructions here: https://docs.expo.dev/submit/introduction/
