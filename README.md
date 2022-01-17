# Guidde

[Heroku base url](https://guidde-backend.herokuapp.com/)

## Setting Up The Application

### A. Clone the Application

1. Open your terminal

2. Run `clone https://github.com/b0nbon1/Guidde-Backend.git`

### B. Setting up the environment

1. **rename** a `.env.example` to `.env` file

2. Then add the values to all environmental variables in `.env` file

3. Install postgres

4. When the server is running, create a database on your new PG server. Ensure your new development database is the same name as your `DATABASE_DEV_URL`

5. Ensure you have Postgres running

### B. Running the application

In your terminal:

1. Run `npm install` to install all dependencies

2. Migrate database `npm run migrate`

3. For **Development**: run `npm run dev`

## ENDPONTS

POST : Signup `api/auth/signup`

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

POST : Signin `api/auth/signin`

```json
{
  "email": "string",
  "password": "string"
}
```

PUT : Edit profile `api/users/edit-profile`

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "profileImage": "<An image should be uploaded>"
}
```

POST : Forgot password `api/auth/forgot-password`

```json
{
  "email": "string"
}
```

POST : Reset password `api/auth/reset-password/:token`

```json
{
  "password": "string"
}
```

POST : Invite a user `api/companies/invite/:companyId`

```json
{
  "email": "EMAIL"
}
```

GET : Accept invitation `api/companies/accept/:token`

GET : Fetch all users `api/users/`

GET : Fetch user by id `api/users/`

POST : Create company `api/auth/signup`

```json
{
  "companyName": "evenhelp",
  "brandColor": "string",
  "supportEmail": "evenhelp@gmail.com"
}
```

PUT : Edit company `api/companies/edit/companyId`

```json
{
  "companyName": "string",
  "brandColor": "string",
  "supportEmail": "EMAIL",
  "websiteUrl": "URL",
  "google": "URLURL",
  "twitter": "URL",
  "facebook": "URL",
  "customDomain": "URL",
  "subDomain": "URL",
  "widgetLauncherIconColor": "string",
  "widgetLauncherBackgroundColor": "string",
  "widgetNavbarColor2": "string",
  "widgetNavbarColor1": "string",
  "widgetPrimaryColor": "string",
  "companyFavicon": "<UPLOAD COMPANY FAVICON>",
  "companyLogo": "<UPLOAD COMPANY LOGO>",
  "companySocialCover": "<UPLOAD COMPANY SOCIAL COVER>"
}
```

POST : Create Article `api/articles/create/companyId`

```json
{
  "articleStatus": " string",
  "articleBody": " string",
  "articleTitle": "string"
}
```

POST : Create category `api/categories/create/`

```json
{
  "categoryName": "string",
  "categoryDescription": "string"
}
```

## Author :computer:

## Hezron Kimutai
