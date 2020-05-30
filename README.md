Request URL:
```bash
GET http://evcharge-app-server2-dev.us-west-2.elasticbeanstalk.com/api/v1/store/2
```
Response:
```bash
{
    "createdAt": "2020-05-25T19:26:56Z",
    "updatedAt": "2020-05-25T19:26:56Z",
    "id": 2,
    "address": {
        "createdAt": "2020-05-25T19:26:56Z",
        "updatedAt": "2020-05-25T19:26:56Z",
        "id": 2,
        "line1": "Near Dehu road",
        "line2": "Opp Priyadarshani",
        "zipCode": 12345,
        "city": "Pune",
        "state": "Delhi",
        "country": "India",
        "lattitude": 1311313131313,
        "longitude": 1421414124141
    },
    "products": [
        {
            "createdAt": "2020-05-25T19:29:16Z",
            "updatedAt": "2020-05-25T19:29:16Z",
            "id": 1,
            "name": "Hand sanitizer",
            "category": "Grocery",
            "isActive": null,
            "currency": "USD",
            "unit": "Pounds",
            "quantity": 50,
            "rate": 13.12
        },
        {
            "createdAt": "2020-05-25T19:34:57Z",
            "updatedAt": "2020-05-25T19:34:57Z",
            "id": 2,
            "name": "Hand sanitizer",
            "category": "Grocery",
            "isActive": null,
            "currency": "USD",
            "unit": "Pounds",
            "quantity": 50,
            "rate": 13
        },
        {
            "createdAt": "2020-05-25T19:43:40Z",
            "updatedAt": "2020-05-25T19:43:40Z",
            "id": 3,
            "name": "Hand sanitizer",
            "category": "Grocery",
            "isActive": null,
            "currency": "USD",
            "unit": "Pounds",
            "quantity": 50,
            "rate": 13
        }
    ],
    "name": "Nageshwar Station 3",
    "category": "VEGETABLES",
    "subCategory": "ONSTORE",
    "active": true
}
```
# marketplace
Marketplace

## Steps to Setup the Spring Boot Back end app (evliion-app-server)

1. **Clone the application**

	```bash
	git clone git@github.com:swachev/swachev-api.git
	cd evliion-app-server
	```

2. **Create MySQL database**

	```bash
	create database evliion_app
	```

3. **Change MySQL username and password as per your MySQL installation**

	+ open `src/main/resources/application.properties` file.

	+ change `spring.datasource.username` and `spring.datasource.password` properties as per your mysql installation

4. **Run the app**

	You can run the spring boot app by typing the following command -

	```bash
	mvn spring-boot:run
	```

	The server will start on port 8080.

	You can also package the application in the form of a `jar` file and then run it like so -

	```bash
	mvn package
	java -jar target/ev-0.0.1-SNAPSHOT.jar
	```
5. **Default Roles**
	
	The spring boot app uses role based authorization powered by spring security. To add the default roles in the database, I have added the following sql queries in `src/main/resources/data.sql` file. Spring boot will automatically execute this script on startup -

	```sql
	INSERT IGNORE INTO roles(name) VALUES('ROLE_USER');
	INSERT IGNORE INTO roles(name) VALUES('ROLE_ADMIN');
	```

	Any new user who signs up to the app is assigned the `ROLE_USER` by default.

## Steps to setup the React Front end app (evliion-app-client)

Clone the application

```bash
git clone git@github.com:swachev/marketplace.git
cd evliion-app-server
```

First go to the `evliion-app-client` folder -

```bash
cd evliion-app-client
```

Then type the following command to install the dependencies and start the application -

```bash
npm install && npm start
```

The front-end server will start on port `3000`.
