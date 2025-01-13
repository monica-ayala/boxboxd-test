## How to run this project

#### 1. Start by clonning the github repository into your local files

Open a Command Prompt (CMD) terminal and cd into the folder you want to clone the project into. Then paste the following command:

```git clone https://github.com/monica-ayala/boxboxd-test.git```

This will create a project folder called boxboxd-test and download the necessary files.

#### 2. Install the necessary dependencies

Copy and paste this into the cmd terminal:

```cd boxboxd-test/restAPi```
```npm install```

This will go into the restAPi folder inside the boxboxd-test folder and install the dependencies with npm install. Note that if you do not have node and npm installed you will have to download it [(start here!)](https://docs.npmjs.com/cli/v9/configuring-npm/install?v=true)

#### 3. Create environment variables file

Go into the restAPi directory and create a file called ".env", then paste the required environment variables provided in the discord.


### Common errors
*Note: here i will add common errors and how to troubleshoot them*

**Your computer must have IPv6 available**
Use this command to check ```ping -6 2001:4860:4860::8888``` in your cmd terminal and see if you recieve a response. 

In case you don't, you must go to "Network and Sharing Center" > "Change adapter settings" > "Properties" > Ensure "Internet Protocol Version 6 (TCP/IPv6)" is checked.