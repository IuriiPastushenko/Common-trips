The application allows to organize a trip between the points of departure and arrival for drivers and passengers.
The main role is Trip. Roles of customers: Driver, Passenger.
Each trip has one driver and several passengers (from 0 to the maximum, which is set by the driver)
Each customer can be either a driver (in the presence of a car) or a passenger on various trips.
The uniqueness of the user is ensured by checking for the uniqueness of his e-mail and phone number.

Illustration:
https://drive.google.com/file/d/1yvHQoY5DKfsVLIECVVIZCCglpgZdh7Og/view?usp=sharing

Endpoints:
1 Create customer: localhost:3000/customers/create;
2 Login customer: localhost:3000/customers/login;
3 Current customer: localhost:3000/customers/currentcustomer;

Commits
1 create_Trips_Drivers_Passengers:
    Modules Trips, Drivers, Passengers were created;
    PostgreSQL database and ORM Typeorm were connected;
    Entities Trips, Drivers, Passengers were migrated to the database.

2 create_Customer:
    Entities Driver and Passenger - merged into the entity Customer;
    For customer was created method Create;

3 create_Login:
    Changed response during registration - added token;
    For customer was created method Login.

4 create_Authentication:
    Added validation by DTO;
    Created Authentication:
      - added decorator CurrentCustomer;
      - added AuthGuard.


5 create_Get_customers_by_id:
    Update responses of server;
    Create 'Get customers by id';


6 сreated Authorization_updateCRUD_Customer:
    Created Authorization_CRUD:
      - added role to CustomersEntity;
      - added decorator CurrentCustomerRole;
      - added AuthGuard.
    Updated CRUD:
      - added decorator IsEmailUnique in create-customer.dto.ts;
      - added decorator IsPhoneNumberUnique in create-customer.dto.ts;
      - created update;
      - created remove;
    Created ConfigService  

 









<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


