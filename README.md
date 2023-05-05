# 461Final
to serve the build folder as well as run the backend:

First you need to install Node.js, do so from this link: 
https://nodejs.org/en/download

Then, open the 461 final project folder via a command terminal or via VSCode and then the terminal within VSCode.

Within the command terminal, navigate to the imdb-app folder using this command:
cd ./imdb-app

Once in the 461Final/imdb-app folder, run "npm install"
npm install

Then, navigate to the backend folder from there using the below command:
cd ../backend

Once in the 461Final/backend folder, run "npm install" again:
npm install

then, to finally serve the frontend, run this:
node app.js

and in your browser, go to http://localhost:3001 and you will be served the frontend of the site. 

additional testing instructions for the backend can be found at the bottom of backend/app.js


##SQLITE3 SETUP FOR DATABASE TESTING

We did not use a GUI for SQL database setup and entries.
To run full SQLite commands in the terminal, download SQLite3 "Precompiled Binaries for Windows" - "sqlite-tools-win32-x86-3410200.zip" from this link:
https://www.sqlite.org/download.html

extract the files to wherever you want, but after clicking through the contents you will see 3 files:
sqldiff.exe
sqlite3.exe
sqlite3_analyzer.exe

go to your C drive in file explorer, and make a new folder called "sqlite", the file address should be:
C:\sqlite

Place the 3 files (sqldiff.exe, sqlite3.exe, sqlite3_analyzer.exe) in this C:\sqlite folder

Navigate to the C:\sqlite folder using this command in a command prompt terminal:
cd c:\sqlite

Then, run this command to ensure the sqlite3 tools were installed:
sqlite3

it should return something like this:

SQLite version 3.41.2 2023-03-22 11:56:21
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.

if so, sqlite3 was installed properly. If this does not appear, try using windows command prompt rather than something like gitbash

After installing sqlite3, open a new command prompt terminal into the 461Final folder, and navigate back into the 461Final/backend folder with this command
cd ./backend

Then run this command:
sqlite3 imdb.db

This will enter you into the sqlite3 command terminal tools, and from here you can run any regular SQLite compatible code and it will execute in the terminal window and show you results.
If you accidentally delete entries, redownload the files from gitHub and replace the imdb.db file with the newly downloaded one.