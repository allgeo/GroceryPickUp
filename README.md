  <img src="https://github.com/allgeo/GroceryPickUp/assets/62227321/58d54a87-832e-495e-b504-b622dd995ce2" alt="grocery_pickup" width="100px"> <br>
# GroceryPickUp
An online inventory system where small local store owners can update stock information of products and consumers of those stores can browse or reserve and pick up goods from those stores.

## Required Models 


<span style="color: blue;">### Process Model</span>

The selected process model is the “Phased Development: Incremental Development”
process, model. The selected model fits well with our project plan, allowing us to provide various
feature/project requirements in pieces.

### Use Case Models

**Use Case**: Use Grocery Pickup Services <br>
**Scope**: Grocery Store <br>
**Level**: Summary <br>
**Intention in Context**: The intention of the *Customer* is to access the grocery store’s catalog of available items and place an order for pickup. <br>
**Multiplicity**: Multiple *Customers* can access the store and place pick-up orders at any given time. A given *Customer* can have multiple active sessions with the pickup service. <br>
**Primary Actor**: *Customer* <br>
**Main Success Scenario**: 
1. *Customer* informs the *System* of their location. 
2. *System* provides a list of available stores within a set distance, based on the geofencing of the user location.
3. *Customer* process to select an available store.
4. *System* provides a list of available products at the store.
5. *Customer* proceeds to add various products to their cart or remove items from their cart.

*Step 5 can be repeated as many times as desired.* <br>
6. *Customer* authenticates or signs up with the *System*. <br>
7. *Customer* proceeds to place an order for pickup.<br>
8. *System* informs *Customer* that the order was successful.<br>

**Extensions**:
2a. Locating the user/stores near the user is not successful. Use case ends in failure.
6a. Authentication or sign-up is *unsuccessful*. Use case ends in failure.

#### Use Case Diagram
#### Domain Model 
#### UI Design
