``` Steps to Run ```

1. ` npm install `.
2. if any dependencies not installed then install it manually.
3. after install everything then change database configuration in .env file.
4. now just type ` npm start `
5. once evething ok then you will see 'MongoDB Connected ! ' message in console.
6. app will started on port 1858.


if there is any issue then contact me
mobile : +91 8000641661
email : hmahajan.dmi@gmail.com


 ```CREATE USER```
 * METHOD : POST 
 * http://localhost:1858/signUp
 * {
    "email": "hmahajan.dmi@gmail.com",
    "mobile": "8000641661",
    "password": "admin123",
   }

 ```UPDATE USER```
 * METHOD : PUT 
 * http://localhost:1858/api/user
 * {
    "name": "harish",
    "_id": "5fdda178528580052ce083ad",
    "address": " surat",
    "phoneNumber": "123345"
   }

```GET ALL USER```
* METHOD : GET
* http://localhost:1858/api/user?userid=5eeb35ce30012c1660ee6aa9

``` DELETE USER ```
* METHOD : DELETE 
* http://localhost:1858/api/user?userid=5e6b2abb8dd3ca15d060f56a

``` REGENERATE TOKEN ```
