const API_VERSION = "v1";
const ADMIN = "admin"
const ADMINS = "admins"
const CASHIERS = "cashiers"
const CASHIER = "cashier"

export const API_URI = {
  adminSignInURI: `/${ADMINS}/sign_in.json`,
  cashierSignInURI: `/${CASHIERS}/sign_in.json`,
  citiesURI: `/${API_VERSION}/${ADMIN}/cities.json`,
  restaurantsURI: `/${API_VERSION}/${ADMIN}/restaurants.json`,
  restaurantsListURI: `/${API_VERSION}/${ADMIN}/restaurants/restaurant_list.json`,
  restaurantsIdURI: `/${API_VERSION}/${ADMIN}/restaurants/{id}.json`,
  cashiersURI: `/${API_VERSION}/${ADMIN}/cashiers.json`,
  cashiersIdURI: `/${API_VERSION}/${ADMIN}/cashiers/{id}.json`,
  cashierUserDetailsURI: `/${API_VERSION}/${CASHIER}/users/get_user_details.json`,
  cashierUpdateWalletPointsURI: `/${API_VERSION}/${CASHIER}/users/update_wallet_points.json`,
  eventsURI: `/${API_VERSION}/${ADMIN}/events.json`,
  eventsIdURI: `/${API_VERSION}/${ADMIN}/events/{id}.json`,
  eventsRedirectionListURI: `/events/redirection_lists.json`,
}
