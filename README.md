# swen325-a1-new

### Assignment Manager App

This is an Assignment Manager mobile app for the first assignment of SWEN325 [Software Development for Mobile Platforms]
My name is Kun Huang (300291127), and I accomplished this assignment by myslef.

### How to run my app

This app uses the ionic 4 framework.

<pre>
Ionic:

   Ionic CLI                     : 5.4.16 (/usr/local/lib/node_modules/ionic)
   Ionic Framework               : @ionic/angular 5.3.1
   @angular-devkit/build-angular : 0.1000.8
   @angular-devkit/schematics    : 10.0.8
   @angular/cli                  : 10.0.8
   @ionic/angular-toolkit        : 2.3.3

Capacitor:

   Capacitor CLI   : 2.4.0
   @capacitor/core : 2.4.0

Cordova:

   Cordova CLI       : 10.0.0
   Cordova Platforms : 6.0.0, browser
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.2.1, (and 6 other plugins)

Utility:

   cordova-res : not installed
   native-run  : 1.0.0

System:

   NodeJS : v14.7.0 (/usr/local/bin/node)
   npm    : 6.14.8
   OS     : macOS Catalina
</pre>

1. Clone the git repository
<pre>
git clone https://github.com/huangkun101230/swen325-a1-new.git
</pre>

2. Navigate into the folder
<pre>
cd swen325-a1-new
</pre>

3. Install dependencies
<pre>
npm install
</pre>

4. Run the application in your browser
<pre>
ionic serve
</pre>

5. Explore the application at http://localhost:8100/

### External components
<pre>
The firebase is used for user authentication and cloud storage. https://firebase.google.com/
The ionic2-calendar is used for the calendar function.  https://github.com/twinssbc/Ionic2-Calendar
The NgCircleProgress is used for counting down the remainning time for each event. https://www.npmjs.com/package/ng-circle-progress
</pre>

### Screens and functions
* tab1 (calendar page)
  * ionic2-calendar package implementation
  * Switching monthly/weekly/dayily view function
  * Swiping and buttons for changing month/week/day function
  * Firestore access: Realtime update for getting the new event list
  * Firesotre access: Prevent unauthentication user to use (jump to the login page)
  * Styling
  
* tab2 (event list page)
  * NgCircleProgress package implementation
  * Firestore access: Realtime update for getting the new event list && details
  * Firesotre access: Prevent unauthentication user to use (jump to the login page)
  * Send notifications to the main screen
  * Add event function 
  * Styling
  
* tab3 (account page)
  * Firestore access: Realtime update for getting the new event list && details
  * Firesotre access: Prevent unauthentication user to use (jump to the login page)
  * Firesotre access: Logout function
  * Styling
  
* login
  * Firestore access: Login function
  * Jump link: Signup option
  * Jump link: Forgot password option
  * Styling
  
* signup
  * Firestore access: Signup function
  * Providing a email keyboard for user
  * Providing a password keybaord for user
  * Auto capitalize the first letter for the name input
  * Styling
  
* reset-password
  * Firestore access: Reset password function
  * Providing a email keyboard for user
  * Styling
  
* profile
  * Firestore access: Realtime update for getting the new user's details
  * Firesotre access: Prevent unauthentication user to use (jump to the login page)
  * Update display name function
  * Update email function
  * Update password function
  * Styling
  
* event-detail
  * Firestore access: Realtime update for getting the event details
  * Firesotre access: Prevent unauthentication user to use (jump to the login page)
  * Update event detail function
  * Styling
  
  
### Components used
1. ion-header
2. ion-title
3. ion-content
4. ion-row
5. ion-col
6. ion-button
7. calendar
8. ion-icon
9. ion-toolbar
10. ion-card
11. ion-card-header
12. ion-card-title
13. ion-card-content
14. ion-item
15. ion-input
16. ion-label
17. ion-datetime
18. ion-checkbox
19. circle-progress
20. ion-grid
21. ion-back-button
22. form


### Future works
* Applying this mobile app on IOS
* Optimizing the sytle of the profile page
* Adding a past event list
* Allow users to set the event rememder by themselves
* Allow users to change the order of the events
* Allow user to view most of pages without authentication
* Adding auto-complete function
