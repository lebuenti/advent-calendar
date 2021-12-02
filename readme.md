
# Picture advents calendar :-)
A advent calendar with pictures using nodeJS. Us it on mobile devices.


![advent calendar](calendar_cats.png)

  
## Preferences
node version 16.3.0

## How to run (example cat calendar)
Clone repository and run
```
npm install
```
Create env:
Create a jwt_key and password hashes. Data for example Cat-Calendar:

- JWT_KEY=CREATE_UR_JWT_KEY
- CATS=$2a$12$AjkwlToIWBdKhF1xabl1COFKFlNPFfsWF5R6SyR8jWZt000uvaJti

Run ``` npm run start ``` to start your server on port 9000.
Open localhost:9000 and login with username: cats, password: cats


## How to use (with custom calendar)
You can create n advents calendar for n users. You have to create a username and a password for each calendar.

Clone repository and run
```
npm install
```
Change usernames array in server.js with your usernames.
```
const  usernames = ["<USERNAME1>", "<USERNAME2>", "USERNAME_N"];
```
Do this for all your calendar:
- Put your 24 images into directory 'your_images_here'
- run ``` node setUpCalendar.js --username <yourUsername> ```. This command will rename your images and put them into a new directory: ``` calendar_images/username1 ```.

Create env:
Create a jwt_key and password hashes for each of your calendar.

- JWT_KEY=HASHEDKEY
- USERNAME1=HASHEDPASSWORD
- USERNAMEN=HASHEDPASSWORDN