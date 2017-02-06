# email-existence

Checks existence of email addresses

## Installation

To install via npm:

    npm install email-existence

### Requirements

A valid email address to check the existence of. Use [node-validator](https://github.com/chriso/node-validator) to check validity.

## Usage

*  Check existence:
	```
		emailExistence.check('email@domain.com', function(error, response){
			console.log('res: '+response);
		});
	```

* The check function will return a boolean in response callback function to indicate existence of an email address. Existence is determined by telnetting to the MX server of the email domain and attempting to send an email to the supplied address. MX servers return 250 if the email address exists and 550 if it does not. This test email is not ever sent.
