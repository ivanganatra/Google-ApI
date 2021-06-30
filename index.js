// https://console.cloud.google.com/
// Create project
//OAuth external enabled
//Create Credentials
//Save Outh Client Id and password
//Add url https://developers.google.com/oauthplayground
// upload auth credentials there
//Scope is what our project has access to
//select auth/calendar
//select auth/calendar.events
//Add yourself as the test user
//Click on Exchange Authorization code for tokens
const { google }=require('googleapis');
const { OAuth2 }=google.auth
const oAuth2Client=new OAuth2(
    '786719243514-jcb8u0crhou9use1nslnatuhpj7vt9hj.apps.googleusercontent.com',
    'EzIgfQy8qV8slbgia_xozHsR'
);
oAuth2Client.setCredentials({refresh_token:'1//04DJJmJUub_I2CgYIARAAGAQSNwF-L9IrreLVUaPMiMEQMsEtTl6lfR_9SRzNSY_DwGhUf_0ZZw2tczwdTuZvLqNhcWOYaCS3z6E'})
//All authorisation completed above
//Create a calendar instance
const calendar=google.calendar({version:'v3',auth:oAuth2Client})
//Start Time
const eventStartTime=new Date(2021,5,30,15,15,0);
const eventEndTime=new Date(2021,5,30,15,30,0);
console.log(Date(2021,5,30,15,15,0));
console.log(eventEndTime);
//Create Event
const event={
    summary:"Saumya, meeting with saumya",
    location:'23, Sir M. Visvesvaraya Marg, Vallabh Nagar, Indore, Madhya Pradesh 452003',
    description:"Discussing about, linking Google calendar Api with our todolist project.",
    start:{
        dateTime:eventStartTime,
        timeZone:"Asia/Kolkata"
    },
    end:{
        dateTime:eventEndTime,
        timeZone:"Asia/Kolkata"
    },
    colorId:1,
}
//Checking if any other task was alloted this time before
calendar.freebusy.query({
    resource:{
        timeMin:eventStartTime,
        timeMax:eventEndTime,
        timeZone:"Asia/Kolkata",
        //array of all calendars
        //we are just checking the primary calendar
        items:[{id:'primary'}],
    }
},(err,res)=>{
    if(err){
        //Error found in free busy Query
        return console.error('Free Busy Query Error', err);
    }
    //If there are no errors
    //Check if busy
    const eventsArray=res.data.calendars.primary.busy;
    console.log(eventsArray);
    //If not busy
    if(eventsArray.length==0)
    {
        return calendar.events.insert({calendarId:'primary', resource:event},(err)=>{
            if(err)
            {
                return console.error("calendar event creation error ",err);
            }
            return console.log("calendar event Created");
        }
        );
    }
    //If Busy
    return console.log("Sorry I am Busy.");
}
);