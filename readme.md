# Tyny Debug
[ ![Codeship Status for DPCobb/TynyDebug](https://app.codeship.com/projects/9bbb6140-d912-0134-9120-061a5f46ec84/status?branch=master)](https://app.codeship.com/projects/203287)
## A node.js debugging tool
- [Install](#install)
- [Usage](#using-the-debugger)
- [Style Guide](#style-guide)
- [Contributing](#contributing)
- [GitHub](https://github.com/DPCobb/TynyDebug)

## Install
The easiest way to install this tool is using NPM:
```
npm install tynydebug
```
To install this tool download or clone the repository and install the required
packages for the project.

```
dotenv: ^4.0.0
```
As well as the following Dev dependencies, if you wish to edit the package:
```
eslint: ^3.15.0,
eslint-config-airbnb: ^14.1.0,
eslint-plugin-import: ^2.2.0,
eslint-plugin-jsx-a11y: ^4.0.0,
eslint-plugin-react: ^6.9.0,
istanbul: ^0.4.5,
mocha: ^3.2.0
```
Or install required packages at once using

```
$ npm install

```


## Using the Debugger
The DEBUG environment variable controls whether messages are output to the console. You can add this to a .env file like the following.
```
DEBUG = true
```


### Available Debug Methods
#### .debug(data)
This method accepts a JSON object that should be structured the following way:
```
log.debug({
    type: 'success',
    msg: 'Returned URL based on ID',
    location: 'app.js line 48 GET:/urls/:id',
    data: {
        data,
    },
    request: {
        body,
    },
});
```
The type, msg, and location, fields are REQUIRED, data and request are optional. The types that should be used are: success, error, or warning. The msg can be any message you wish to send, the location
should be information relevant to where this is occurring like file, line, and route information. The data field can also be
an object, in this example data is the response from the web server or the URL information for a specific ID. The request field can
also be an object and in this example it is the request for a URL with a specific ID. The following are examples of success, error, and warning messages from the debugger, the first success message contains only the required fields.
```
**********
Event at 12:48:14 @ server.js line 34
SUCCESS
Listening to Server on Port 3000

**********
Event at 17:41:53 @ app.js line 48 GET:/urls/:id
SUCCESS
Returned URL based on ID
Returned Data:
--   data :  url : https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
     id :9
     tynyUrl : tyny.io/a829a00
     shortUrl : a829a00
     key : 43a995d29e
     createdAt : 2017-02-08T18:40:36.000Z
     updatedAt : 2017-02-08T18:40:36.000Z
Requested Data:
--   body :  id : 9

**********
Event at 17:41:57 @ app.js line 48 GET:/urls/:id
WARNING - REQUEST RETURNED NULL
Returned URL based on ID
Returned Data:
--   data :null
Requested Data:
--   body :  id : 999999

**********
Event at 17:42:2 @ app.js line 180 POST:/urls/:id
ERROR
Could not update short URL by ID
Returned Data:
 TypeError: Cannot read property 'updateAttributes' of null
Requested Data:
--   body :  url : https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
     key : 43a995d29e
     id : 999999

```  
The messages created by the debugger are the same in the console and in the daily log file.
#### .msg(msg,loc)
This method acts like more of a traditional console.log. It displays a simple message and, if provided, location info. This feature and its log can both be turned off. The msg information is required and location is not.
```
log.msg('Hello World from app.listen')
log.msg('Server Active, port 3000', 'app.js')
```
The above examples will create the following output in the console:
```
MSG: Hello World from app.listen
-- @ No Location Info
MSG: Server Active, port 3000
-- @ app.js
```
Similar outputs will be created in the log file with the addition of the time of the event:
```
-- MSG @ 12:11:28 (No Location Info): Hello World from app.listen
-- MSG @ 12:11:28 (app.js): Server Active, port 3000
```
This method is an easy way to troubleshoot features and methods or to test if data is being passed. It could also
be used as strictly a log.

### Unit Tests

To run a Unit Test ensure you have Mocha and Istanbul installed and then in the Command Line run the following command to run tests and create a coverage report:

```
istanbul cover _mocha
```

## Style Guide
This project currently uses the Airbnb JS Style Guide found [here](https://github.com/airbnb/javascript).
The easiest way to ensure contributions adhere to the same style guide is to use an IDE that supports an
ESLint plugin. For example, [Atom](https://atom.io) supports ESLint with their package ['linter-eslint'](https://github.com/AtomLinter/linter-eslint). To ensure contributions adhere to the Airbnb style guide
install ESLint, and install the following dev dependencies:
```
"eslint": "^3.15.0",
"eslint-config-airbnb": "^14.1.0",
"eslint-plugin-import": "^2.2.0",
"eslint-plugin-jsx-a11y": "^4.0.0",
"eslint-plugin-react": "^6.9.0"
```

As well as adding a .eslintrc.json file with the following:
```
{
	"env": {
		"node": true
	},
	"extends": "airbnb",
	"plugins": [
        "react"
    ],
	"rules": {
		"new-cap": 0,
		"prefer-template": 0,
		"global-require": 0
	},
	"globals": {
		"describe": true,
		"it": true
	}
}
```
Installation information can also be found [here](https://www.npmjs.com/package/eslint-config-airbnb).

## Contributing
To contribute to this project please [create a new pull request](https://help.github.com/articles/creating-a-pull-request/). Additionally,
the following requirements should be met:
* A good description of the pull request, what it is and why it is needed.
* If creating a new feature please update the readme.md file with documentation
including endpoints and examples.
* Lastly, try to keep the coding style similar to the existing package.
