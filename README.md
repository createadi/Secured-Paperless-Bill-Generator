
# Secured-Paperless-Bill-Generator

A Python Flask project implementing secured billing interface with SMS functionality.


## Setup

To run this project, you will need to setup the following:

### Vitual Environment Setup
Run the commands in your editor terminal

#### Install virtual environment files to the project folder
`pip install virtualenv`

#### Create the virtual environment with a particular name
let particular_name=env

`virtualenv env`

#### Activate the environment
`.\env\Scripts\activate.ps1`

### Install the dependencies
Run the following command:

`pip install -r requirements.txt`

### Creating Database
app.py is the starting file of the application.

Import the database instance

`from app import db`

Create the database

`db.create_all()`

`db.exit()`

### Environment Variables
[VONAGE](https://developer.nexmo.com/) SMS API

`vonageKey=sampleKey`

`vonageSecret=sampleSecret`

`proKey=projectSecretKey`

`number=testingMobileNumber`

### Database structure view
Refer to [SQLite](https://inloop.github.io/sqlite-viewer/).

### Run the application

`python app.py`

## License & Copyright
© Aditya Verma
Licensed under [MIT License](LICENSE).
