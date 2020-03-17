
## Dev Notes

I noticed that the Google Auth service started acting up in the last few days, did you guys made some changes to the Firebase project?
Other than that, please let me know if there's anything I can explain to you all about my process or decision making.

## Android Test Instructions

This is a RN project only available for Android. It uses Google Sign-In API and Firebase Crashlytics.

The test has 3 parts:

### Part 0 - Create a git project

The project doesn't have version control, yet. Run `git init` when you start and keep commiting and comenting accordingly your changes. 
Send us back the project with version control once you are done.

### Part 1 - Run the app!

The Android Project doesn't run initially. Find and fix what is happening in `android/` folder. Check the TODO comments, they might help.

Once the app runs, you will end up in the initial screen. Where the other parts start.

### Part 2 - Androit Test: Android configuration, together with Google Sign-in and Firebase

This part is about dealing with Android native libraries. We provide you with GoogleAuth and Firebase module which you can find it on `{root}/android/src/../../auth/` and `{root}/android/src/../../firebase/`.
What you need to do is integrate them to become accessible on Javascript. The funcionality in App.js should already be there. But feel free to modify it in case you think it can be improved. We will expect proper explanations about your decisions.
As you will see, for GoogleAuth the functionality is a simple SignIn / SignOut. For Firebase, just a simple crash test.

You are also expected to be able to setup different type signconfigs (example: alpha, beta, prod), and flavours/buildtypes (example: debug, release, releaseAlpha, etc) based on the needs such as enabling debuggable in release mode, or anything you think is important. Don't forget to also make this setup to be synced with react native configuration in package.json. There should be scripts similar to `yarn android` to build different configurations. The goal of this task is to create different apk based on builtypes and flavours.
Get an idea of the types of signingcongigs and flavours you need to create in `android/app/build.gradle`.


### Part 3: RN side

Press the button "DISPLAY CUSTOM COMPONENT". You will end up in a new modal component which you need to modify by implementing one of the three proposed options. 

Take into account that there are no specific rules: you can create the components and tools yourself, use libraries, etc. In other words, do whatever you want.
We expect explanations of the decisions you made for the implementation. 

More information in the `CustomModal.js` file itself.

### Extras

Feel free to add or modify whatever you want in the project. Some examples:
- Use typescript
- Linting?
- Suprise us!


### Doubts?

- Don't hesitate to contact us if you have any question. For Android specific questions: panji@sense-os.nl For RN questions: xavier@sense-os.nl
