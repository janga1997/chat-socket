This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) and [Socket.io](http://socket.io/) to authenticate users using a username and
password with [form-based authentication](https://en.wikipedia.org/wiki/HTTP%2BHTML_form-based_authentication), and exchange messages between users logged in through different accounts, akin to a social-networking websites.


## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone https://github.com/janga1997/NodeJS-Projects.git
$ cd NodeJS-Projects/chat-socket
$ npm install
```

Start the server.

```bash
$ node server.js
```

Open a web browser and navigate to [http://localhost:3000/](http://127.0.0.1:3000/)
to see the example in action.  Log in using username `jack` and password `password1`.
Now, using the IP of the computer on which the server was launched, head over to a different computer connected to the same network, and navigate to 'http://IP:3000', and login using username `jill` and `password2`.

The user logged in as `jill` can now chat with the user logged in as `jack` via the appropriate chatbox.
