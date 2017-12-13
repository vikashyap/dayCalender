# dayCalender
A one day Calender Event
## OVERVIEW
Given a set of events, each with a start time and end time, render the events on a single day
calendar (similar to Outlook, Calendar.app, and Google Calendar). There are several properties
of the layout:
- No events may visually overlap.
- If two events collide in time, they MUST have the same width. This is an invariant. Call
this width W.
- Each event is represented by a JavaScript object with a start and end attribute.
- The value of these attributes is the number of minutes since 9am. So {start:30, end:90)
represents an event from 9:30am to 10:30am.
### Description
The global namespace function takes in an array of events and will lay out the events
according to the above description.
function layOutDay (events) { }
This function will be invoked from the console for testing purposes.
To Execute function from console Use following Sample inputs.
function layOutDay([ {start: 30, end: 150}, {start: 540, end: 600} ])

# Happy Coding !!!!!!
