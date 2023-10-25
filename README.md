#Pitch (Goals & Non Goals)
Site where users can track their typing speed (measured in words per minute) by typing a sequence of characters. 
Users can also play against another user in a head-to-head format.

#Features
P0
Something to type into
Words that generate/bank pulled from
Head-to-head -> type racing against each other
Link-sharing to play (share link with friend)
Basic version: having each person type and then post individually; results shown after.
Basic stats: words-per-minute
Restart option

#P1
Statistics
Time allotted
Number of words correct & wrong -> accuracy
Allows mistakes to be made
Leaderboards (daily/weekly/monthly/yearly/all-time)
Registration/Login
Customize the amount of words to type (max) or time limit (some max limit)
Presets; not full customization

#P2
Head-to-head extra features
Online and accessible through site (not limited to link-sharing)
Real-time update: live UI updates for progress.
Users can see highlights of each other’s progress live.
User Self-goals
Non Goals
No typing lessons or tutorials

#UX 
##CUJs

#P0
Visual area
Textbox to type into
Textbox of passage to be typed
Restart option
Same visual area for head-to-head mode (basic version; non synchronous) 
Basic statistics showing words-per-minute after they finish typing whatever passage is generated

#P1
Leaderboards
Daily, weekly, monthly, yearly, all-time
Addendum to statistics post passage, showing mistakes & accuracy.
Customize type-test settings
Visual settings to adjust time, amount of words to enter.
Preset settings- not full customization
Profile
Able to view their fastest wpm
History of scores
Average wpm (all-time + over specific time-period)

#P2
Change color scheme of the site
In case of P2 head-to-head, adjust visibility of other person
Engineering Requirements
Stack
HTML, CSS, JS, MySQL, PHP, some user auth 
HTTP or WebSocket (see below)
Head-to-Head 
How the multiplayer aspect will be handled.
Option 1 - Each user completes a type-test, submits (post), and then can see their stats against each other at the end.
Pros
Easier to implement
HTTP is easier
Cons
Unintuitive for the user
It will look like they are just doing a type test and seeing extra stuff at the end
Poor UI representation 
Would not really feel like a head-to-head 
Option 2 - Users type in the same box, at the same time, and can see their progress against each other. 
Pros
Intuitive for the user
Looks great
Cons
Harder to implement
Nobody wants to do WebSockets
If something messes up (due to bad implementation) it will be obvious
A lot harder to hide at this point
Delay is the big issue
