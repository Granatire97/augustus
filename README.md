# Augustus (frontend for Operation CandyJar)

The Frontend for a service that allows users to input any type of product identifier and get back the information that goes with that product identifier. 

README last updated: 8/02/2018

Angular app that communicates with an [Spring Boot Backend: Operation CandyJar](https://bitbucket.dcsg.com/projects/FUL/repos/operation-candyjar/browse).

## Getting Started

* Clone the repository using `git clone [repo_url]`.
* Run `npm install` in the root of the project you just cloned.
* Run `ng serve` from root of the pproject directory; you should be able to go to `http://localhost:4200` and view the page. That's it!

#### Importing the project into Spring Boot
If you would like to run the angular files in a Spring Boot server follow these steps:
* Run `ng build` or `ng build --prod` from the root of the project (depending on if you want production code or not).
* Open Sprng Tool Suite and start a new Spring Boot Starter Project by going to `File>New>Project...>Spring Boot>Spring Starter Project`.
* Fill out the the necessary fields to create the project.
* Create a folder called `static` in `src>main>resources>`.
* Copy and paste all of the files and folders from `augustus>dist>augustus` into the static folder you just created in Spring Tool Suite.
* Edit the `build.gradle` to change the jar name and version number to your liking.
* Edit the `src>main>resources>application.properties` to include the line `server.port=8011`. 
* You can build and run the project, and view it at `http://localhost:8011`. Remember to also add the backend to make the app usable. [Click Here](https://bitbucket.dcsg.com/projects/FUL/repos/operation-candyjar/browse) is for the backend repo.
***

## Project Architecture

#### Current Versioning
* Angular 6.0
* Angular Material 6.3.1
* Java 8 (Optional)

#### Angular Layout
```
augustus/src/app
|- components
|   |- error-message
|   |- home
|   |- navbar
|   |- product-display
|   |- product-info-table
|   |- search-bar
|   |- sku-availability-table
|   |- sku-bopis-display
|   |- sku-bopis-history-table
|   |- sku-esb-live-count
|   |- sku-history-table
|
|- models
|
|- services
|   |- candy-jar.service.ts
|   |- utility.service.ts
|
|- app-routing.module.ts

```
* __error-message__: component with its own route containing the `navbar`. `searchbar`, and an error message as a result of bad user input.
* __home__: componenet that is the default route containing the `navbar` and `searchbar`.
* __product-display__: component that is used to display any Network search results and contains the `navbar`, `searchbar`, `product-info-table`, `sku-esb-live-count`, `sku-history-table`, and `sku-availability-table`.
* __product-info-table__: component that displays high level product information.
* __search-bar__: component that contains a search bar for user input.
* __sku-availability-table__: component that displays the history of sku availability for the network level.
* __sku-bopis-display__: component that is used to display any Bopis search results and contains the `navbar`, `searchbar`, `product-info-table`, `sku-esb-live-count`, `sku-bopis-history-table`.
* __sku-bopis-history-table__: component that displays the history of the sku inventory of a product at store level.
* __sku-esb-live-count__: component that contains the live inventory count of a sku.
* __sku-history-table__: component that displays the history of the sku inventory of a product at network level.
* __models__: contains templates for how to receive data from `candy-jar.service.ts`.
* __candy-jar.service.ts__: service that queries the [CandyJar backend](https://bitbucket.dcsg.com/projects/FUL/repos/operation-candyjar/browse) and helps populate the table componenets.
* __utility.service.ts__: service that contains miscellaneous methods that are shared across components.
* __app-routing.module.ts__: module that contains routes for the components.
***

## Testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Authors
(shoutout to Angelo Trifanoff for the style guide)
* **Mark Granatire**
* **Tim Hartman**
* **Timotheus Hinton**

