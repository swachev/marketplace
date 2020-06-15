Request URL:
```bash
GET http://evcharge-app-server2-dev.us-west-2.elasticbeanstalk.com/api/v1/store/all
```
Response:
```bash
{
    "content": [
        {
            "id": 2,
            "name": "Nageshwar mart",
            "address": {
                "line1": "Near Puma",
                "line2": "Opp Durga",
                "zipCode": 3333,
                "city": "Mumbai",
                "state": "Delhi",
                "country": "India",
                "lattitude": 66466446,
                "longitude": 64446466436
            },
            "category": "BAKERY",
            "subCategory": "ONSTORE",
            "products": [
                {
                    "name": "Cake",
                    "description": "Birthday cake",
                    "category": "Bakery",
                    "currency": "USD",
                    "unit": "lbs",
                    "rate": 5.33,
                    "attributes": [
                        {
                            "name": "size",
                            "value": "Normal"
                        },
                        {
                            "name": "color",
                            "value": "Pink"
                        }
                    ]
                },
                {
                    "name": "Pizza",
                    "description": "Without toppings",
                    "category": "Bakery",
                    "currency": "USD",
                    "unit": "lbs",
                    "rate": 3.33,
                    "attributes": [
                        {
                            "name": "size",
                            "value": "Large"
                        },
                        {
                            "name": "color",
                            "value": "NA"
                        }
                    ]
                }
            ]
        },
        {
            "id": 1,
            "name": "Chandan mart",
            "address": {
                "line1": "Near Dehu road",
                "line2": "Opp Priyadarshani",
                "zipCode": 12345,
                "city": "Pune",
                "state": "Delhi",
                "country": "India",
                "lattitude": 1311313131313,
                "longitude": 1421414124141
            },
            "category": "VEGETABLES",
            "subCategory": "ONSTORE",
            "products": [
                {
                    "name": "Allen Soly T shirt",
                    "description": "Clothes",
                    "category": "Garments",
                    "currency": "USD",
                    "unit": "lbs",
                    "rate": 13.33,
                    "attributes": [
                        {
                            "name": "size",
                            "value": "M"
                        },
                        {
                            "name": "color",
                            "value": "Blue"
                        }
                    ]
                },
                {
                    "name": "Chana Daal",
                    "description": "Chana Daal",
                    "category": "Grocery",
                    "currency": "USD",
                    "unit": "lbs",
                    "rate": 10.33,
                    "attributes": [
                        {
                            "name": "size",
                            "value": "Normal"
                        },
                        {
                            "name": "color",
                            "value": "Yellow"
                        }
                    ]
                }
            ]
        }
    ],
    "page": 0,
    "size": 30,
    "totalElements": 2,
    "totalPages": 1,
    "last": true
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
