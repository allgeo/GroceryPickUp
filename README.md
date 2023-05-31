  <img src="https://github.com/allgeo/GroceryPickUp/assets/62227321/58d54a87-832e-495e-b504-b622dd995ce2" alt="grocery_pickup" width="100px"> <br>
# GroceryPickUp
An online inventory system where small local store owners can update stock information of products and consumers of those stores can browse or reserve and pick up goods from those stores.

## Required Models 

### Process Model

The selected process model is the “Phased Development: Incremental Development”
process, model. The selected model fits well with our project plan, allowing us to provide various
feature/project requirements in pieces.

### Use Case Models

> **Use Case**: Use Grocery Pickup Services <br>
> **Scope**: Grocery Store <br>
> **Level**: Summary <br>
> **Intention in Context**: The intention of the *Customer* is to access the grocery store’s catalog of available items and place an order for pickup. <br>
> **Multiplicity**: Multiple *Customers* can access the store and place pick-up orders at any given time. A given *Customer* can have multiple active sessions with the pickup service. <br>
> **Primary Actor**: *Customer* <br>
> **Main Success Scenario**: 
> 1. *Customer* informs the *System* of their location. 
> 2. *System* provides a list of available stores within a set distance, based on the geofencing of the user location.
> 3. *Customer* process to select an available store.
> 4. *System* provides a list of available products at the store.
> 5. *Customer* proceeds to add various products to their cart or remove items from their cart.
> 
> *Step 5 can be repeated as many times as desired.* <br>
> 6. *Customer* authenticates or signs up with the *System*. <br>
> 7. *Customer* proceeds to place an order for pickup.<br>
> 8. *System* informs *Customer* that the order was successful.<br>
> 
> **Extensions**: <br>
> 2a. Locating the user/stores near the user is not successful. Use case ends in failure. <br>
> 6a. Authentication or sign-up is *unsuccessful*. Use case ends in failure. 

> ---

> **Use Case**: Geofencing Users' Location <br>
> **Scope**: Grocery Store <br>
> **Level**: Subfunction <br>
> **Intention in Context**: The intention of the *Person* is to find the available stores within their area. **Multiplicity**: Multiple *Customers* can request a list of available stores. <br>
> **Primary Actor**: *Customer* <br>
> **Main Success Scenario**:
> 1. *Customer* provides their address/location information to *System.*
> 2. *System* calculates a list of available stores within a set distance of the address/location.
> 3. *System* informs the *Customer* of the available stores. <br>
> 
> **Extensions**: <br>
> 2a. Locating the stores near the user is not successful. Use case ends in failure.  <br>

> ---

> **Use Case**: Add Product to Cart  <br>
> **Scope**: Grocery Store <br>
> **Level**: User-Goal <br>
> **Intention in Context**: The intention of the *Customer* is to add/save certain products to purchase. <br>
> **Multiplicity**: Multiple *Customers* can add/save certain products to their cart at any given time.  <br>
> **Primary Actor**: *Customer* <br>
> **Main Success Scenario**:
> 1. *Customer* requests a specific product .
> 2. *System* provides information about the specific product.
> 3. *Customer* informs the *System* to add/save the specific product to their cart, and in what quantity he chooses. <br>
> **Extensions**: <br>
> 3a. *Customer* does not want the product. Use case ends in failure. <br>
> 3b. *System* informs the *Customer* that the item isn’t in stock at the location. Use case ends in failure. <br>

> ---
 
> **Use Case**: Remove Product from Cart <br>
> **Scope**: Grocery Store <br>
> **Level**: User-Goal <br>
> **Intention in Context**: The intention of the *Customer* is to remove certain products from their cart <br>
> **Multiplicity**: Multiple *Customers* can remove certain products from their cart at any given time.  <br>
> **Primary Actor**: *Customer* <br>
> **Main Success Scenario**:
> 1. *Customer* requests the removal of a specific product.
> 2. *System* informs the *Customer* that the specific product has been removed from their cart.

> ---
 
> **Use Case**: Place an order for pickup <br>
> **Scope**: Grocery Store <br>
> **Level**: User-Goal <br>
> **Intention in Context**: The intention of the *Customer* is to place an order for pick-up  <br>
> **Multiplicity**: Multiple *Customers* can place orders for pickup at a given time. <br>
> **Primary Actor**: *Customer* <br>
> **Main Success Scenario**:
> 1. *Customer* informs the *System* to check out the products in their cart.
> 2. *System* validates that the *Customer* is authenticated and has items in their cart.
> 3. *System* informs the *Customer* of the current items in their cart..
> 4. *Customer* informs the *System* that the cart is correct and places the order.
> 5. *System* sends an email to the store owner to prepare the specific product.
> 6. *System* sends a confirmation email to the customer for pick-up.
> 7. *System* processes stock information. <br>
> 
> **Extensions**: <br>
> (1-4)a. *Customer* informs the *System* that he wants to cancel the process of placing an order. <br>
> (1-4)a.1. *System* cancels the process of placing an order; use case ends in failure. <br>
> 2a. *System* informs *customer* that cannot place an order when the shopping cart is empty; use case ends in failure. <br>

> ---
 
> **Use Case**: Authenticate <br>
> **Scope**: Grocery Store <br>
> **Level**: Subfunction <br>
> **Intention in Context**: The intention of the *User* is to authenticate with the *System*  <br>
> **Multiplicity**: Multiple *Users* can authenticate simultaneously. <br>
> **Primary Actor**: *User* <br>
> **Main Success Scenario**:
> 1. *User* provides an email and password to the *System*.
> 2. *System* validates the email and password.
> 3. *System* informs *User* of a successful login.
> 
> **Extensions**: <br>
> 2a. *System* ascertains that the email or password is invalid/wrong.  <br>
> 2a.1. *System* prompts *User* to try again. Use case continues at step 1. <br>

> ---

> **Use Case**: Sign Up <br>
> **Scope**: Grocery Store <br>
> **Level**: Subfunction <br>
> **Intention in Context**: The intention of the *User* is to sign up with the *System <br>
> **Multiplicity**: Multiple *Users* can sign up simultaneously. A given *Customer* can only sign up once with the *System* at a given time <br>
> **Primary Actor**: *User* <br>
> **Main Success Scenario**:
> 1. *User* provides a brand new email and password to the *System*.
> 2. *System* validates and stores the email and password.
> 3. *System* informs *User* of successful signup. <br>

> **Extensions**: <br>
> 2a. *System* ascertains that the email or password is invalid/wrong. <br>
> 2a.1. *System* ascertains that the email is already in use. Use case ends. <br>
> 2a.2. *System* prompts *User* to try again. Use case continues at step 1. <br>

> ---

> **Use Case**: Manually Update Inventory Information <br>
> **Scope**: Grocery Store <br>
> **Level**: User-Goal <br>
> **Intention in Context**: The intention of the *Store owner* is to update inventory information when customers shop offline. <br>
> **Multiplicity**: Only one kind of product can be processed at a given time. <br>
> **Primary Actor**: *Store Owner* <br>
> **Main Success Scenario**: 
> 1. *Store owner* manually updates the stock information.
> 2. *System* process the updating of stock information.
> 
> **Extensions**: <br>
> 2a. *Store owner* informs the *system* that he/she wants to change the updating <br>
> 2a.1. *System* confirms the request of the *store owner*; use case continues at step  <br>
> 2. 2b. *Store owner* fill out an invalid number as a new stock number <br>
> 2b.1. *System* informs the *store owner* about the error; use case continues at step 2. <br>

> ---

> **Use Case**: Adding new products to inventory <br>
> **Scope**: Grocery Store <br>
> **Level**: User-Goal <br>
> **Intention in Context**: The intention of the *Store Owner* is to add new inventory items/products for the customer to shop from. <br>
> **Multiplicity**: The system should allow for simultaneous modifications of the inventory system. 
> **Primary Actor**: *Store Owner* <br>
> **Main Success Scenario**:
> 1. *Owner* informs *System* that they want to add a new type of item.
> 2. *System* displays a form for *Owner* to fill in product details. (Name, price, image, description)
> 3. *Owner* fills out the form and informs the *System* of its completion.
> 4. *System* validates the data and adds the new product.
> 
> **Extensions**: <br>
> 2a. *Owner* closes the form. The use case ends in failure. <br>
> 4a. *System* finds form missing certain fields. <br>
> 4a.1. Alert *Owner* what fields are invalid, return to step 2. <br>
> 4b. System finds the item already exists. <br>
> 4b.1. Alert *Owner* that the item exists, return to step 2. <br>

> ---

> **Use Case**: Register Store <br>
> **Scope**: Grocery Store <br>
> **Level**: User-Goal <br>
> **Intention in Context**: The intention of the *Store Owner* is to register their store on the system. <br> 
> **Multiplicity**: A *Store Owner* can only register one store at a time. Other *Store Owners* may register their store simultaneously <br>.
> **Primary Actor**: *Store Owner* <br>
> **Main Success Scenario**: 
> 1. *Owner* informs the *System* that they would like to register a store.
> 2. *System* authenticates if *Owner* is logged in.
> 3. If not, the *System* displays a form for *Owner* to fill in business and personal information to register.
> 4. *Owner* fills out the form and informs the *System* of its completion.
> 5. *System* validates the data and adds the new store.
> 
> **Extensions**: <br>
> 2a. *Owner* fails to authenticate. The use case ends in failure. <br>
> 3a. *Owner* closes the form. The use case ends in failure. <br>
> 5a. *System* finds form missing certain fields or wrongly formatted data. <br>
> 5a.1. Alert *Owner* what fields are invalid, return to step 3. <br>
> 5b. System finds the store already exists. <br>
> 5b.1. Alert *Owner* that the store exists, return to step 3.  <br>

> ---

#### Use Case Diagram
#### Domain Model 
#### UI Design
