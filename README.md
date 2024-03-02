**Note:** This project was made in response to an intership 

## Features

- Justify text: The API endpoint `/api/justify` accepts text in the request body and returns the justified text.
- Token-based authentication: Users need to obtain a token by sending their email to the `/api/token` endpoint before accessing other endpoints.
- Rate limiting: The API endpoint `/api/justify` has a rate limit of 80,000 words per day per user. **(not corectly implemented)**
- No external library for justification: The text justification is implemented without using any external library.
- Public URL: The API is deployed to a public URL for access.

## Structure

If any of the following are applicable to your project, then the directory structure should follow industry best practices by being named the following.

```
src
├── controllers
    ├── authentication.ts (Controller)
    ├── justifyText.ts (Controller)
    ├── users.ts  (Controller)
    └── wordcounter.ts  (Controller)
├── db
    └── users.ts
├── helpers
    └── index.ts
├── middleware 
    └── index.ts 
├── router
    ├── authentification.ts
    ├── index.ts
    ├── justifyText.ts
    └── users.ts
└── utils
    ├── wordCounter.ts
    └── justifyText.ts

.gitignore
nodemon.json
package-lock.json
package.json
README.md
tsconfig.json
```

## Getting started
Clone the repository:
```bash 
git clone
cd MYAPP
```
Install dependencies and run server:
**Note:** Change the ip  address to your own local IP if you are not using localhost or a VM.
```
npm install
npm start

```

## API Endpoints
**Note:** 
All query were made using PostMan 
### Authentication

- `POST /auth/register`: Obtain a account
    Exemple of json query
- `POST /auth/login` : Log in into an existing account

### Justify Text

- `POST /api/justify`: Justify text by sending the text in the request body. Requires authentication token. 

## Usage

1. Obtain a token by sending your email to `/api/token`.
2. Use the obtained token to authenticate requests to `/api/justify` and send the text you want to justify in the request body.


## Missing point 
I was focused on learning how to use NodeJS, Typescript, Express and .For the deadline the project is missing some features that would make it possible to make unlimited amount of word per day per token


Feel free to customize it according to your project's specific details and requirements.