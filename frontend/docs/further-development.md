# Further Development

There are many ways that DFCorp could extend the Skyward website to make it a one-stop platform for travel information for their customers. The first way to improve it would be to have it offer more personalised travel information, and allowing users to have an account on the website so their data can persist between different devices. DFCorp could also offer additional features related to travelling to the location that the user searches for, as detailed below.

## Additional travel features

The hotel carousel for each location could be adapted to allow customers to see more detailed information about hotels in their selected location. This could be achieved through integration of a hotel booking API, either in addition to the Priceline API that would currently be used to obtain hotel images, or a more comprehensive API in replacement.

Possible options are:

- Booking.com Demand API
- Hotels API by Api Dojo
- APItude Hotel APIs suite by Hotelbeds

The best choice would likely be the Booking.com Demand API. It offers access to Booking.com's extensive inventory of properties that should widely cover many different destinations, and can be integrated in four different application flows depending on how the stakeholder chooses to model the booking experience, ranging from simply browsing (similar to the current design) to providing the whole searching and booking experience directly from the application. Furthermore, Booking.com is a popular and trusted travel marketplace so partnering with them would provide assurance to DFCorp's customers that the booking they are making is genuine and their information is safe.

The application flow that is most in scope for the Skyward website would be a "Search and look" flow, in which customers can search for hotels in the location they have searched. The website could allow them to apply search filters so they can find ones that match their requirements, they would be able to see full details for these hotels, including prices and current availability, and could then be redirected to Booking.com to actually make the bookings. This feature can be below the weather forecast information as the hotel carousel currently is. This would allow the website to offer more personalised travel information while also making sure that DFCorp does not have to take on the burden of facilitating hotel bookings, as that is out of the scope of this current website.

### Risks

There are general concerns that come with integrating more external APIs into the application, primarily:

- dependency on a third-party - the application could be affected by any outages on Booking.com's side.
- data privacy - should DFCorp choose to offer hotel booking directly from the website, customers will have to share sensitive data with both DFCorp and Booking.com.
- costs - gaining access to the Demand API requires becoming an Affiliate Partner with Booking.com, and it could incur higher costs as more customers use the Skyward website.
