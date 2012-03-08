# email-existence

Checks existence of email addresses

## Installation

To install via npm:

    npm install email-existence

## Usage

### Requirements

dns, net

### Getting Started

1.  Check existence:
    ```javascript
	emailExistence.check('nmanousos123123fd@yahoo.com', function(err,res){
		console.log('res: '+res);
	});
    ```	