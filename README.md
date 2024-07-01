# Stage one HNG Project

## About 
A basic web server with a single endpoint that returns the requester's location

Endpoint: GET api/hello?visitor_name=Mark

Response:

	{
		"client_id": "127.0.0.1", // The Ip address of the requester
		"location": "New York", // The vity of the requester
		"greeting": "Hello Mark! the temperature is 11 degree Celcius in New York" 
	}

