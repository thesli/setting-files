if (typeof Taplio.HostDefs == 'undefined') Taplio.HostDefs = {};

//-------------------------------
// CITYSEARCH HOST DEF
//-------------------------------
Taplio.HostDefs['citysearch.com'] = {
	id: '1',
	favicon: '/favicons/citysearch.ico',
	page_id_selector: '$pathname',
	profile: {
		id: '2',
		service: 'citysearch',
		service_id: 'citysearch_v1',
		page_state_selector: null,
		selectors: {
						'title': 'div#coreHeader > h1.fn.org',
						'phone_number': 'div#mapAddressWrapper > p.tel',
						'latitude': 'p#listingAddress > span.geo > span.latitude',
						'longitude': 'p#listingAddress > span.geo > span.longitude',
						'street-address': 'p#listingAddress > span.street-address',
						'locality': 'p#listingAddress > span.locality',
						'region': 'p#listingAddress > span.region',
						'postal-code': 'p#listingAddress > span.postal-code',
						'citysearch_v1':['$pathname', null, [ { rgx: '\/(profile)\/([a-zA-Z0-9\-_]+)\/..*', pos: 2 } ] ]
					},
			},
	valid_location: function(location) {
		if (location.pathname.search('profile') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('profile') != -1) return 'profile'
		else return null
	}
}

//-------------------------------
// FACEBOOK HOST DEF
//-------------------------------
Taplio.HostDefs['facebook.com'] = {
	id: '3',
	favicon: '/favicons/facebook.ico',
	page_id_selector: ['meta[property="og:type"]', 'content', []],
	restaurant_page: {
		id: '4',
		service: 'facebook',
		service_id: 'facebook_v1',
		page_state_selector: 'span.ginormousProfileName',
		selectors: {
						'facebook_v1':['$pathname', null, [ { rgx: '(\/)([0-9]+)($|\/$)', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search('pages') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string == 'restaurant' || id_string == 'other' || id_string == 'hotel') return 'restaurant_page';
		else return null;
	}
}

//-------------------------------
// FOODSPOTTING HOST DEF
//-------------------------------
Taplio.HostDefs['foodspotting.com'] = {
	id: '5',
	favicon: '/favicons/foodspotting.ico',
	page_id_selector: '$pathname',
	places: {
		id: '6',
		service: 'foodspotting',
		service_id: 'foodspotting_v1',
		page_state_selector: null,		
		selectors: {
						'title': ['input#place_name', 'value', []],
						'phone_number': ['input#place_phone_number', 'value', []],
						'latitude': ['input#place_latitude', 'value', []],
						'longitude': ['input#place_longitude', 'value', []],
						'street-address': ['input#place_street_address', 'value', []],
						'locality': ['input#place_city', 'value', []],
						'region': ['input#place_state', 'value', []],
						'postal-code': ['input#place_postal_code', 'value', []],
						'country': ['input#place_country', 'value', []],
						'foodspotting_v1':['$pathname', null, [ { rgx: '\/(places)\/([0-9]+)([a-zA-Z0-9\-]+)?($|\/$)', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search('places') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('places') != -1) return 'places'
		else return null
	}
}

//-------------------------------
// FOURSQUARE HOST DEF
//-------------------------------
Taplio.HostDefs['foursquare.com'] = {
	id: '7',
	favicon: '/favicons/foursquare.ico',
	page_id_selector: '$pathname',
	venue: {
		id: '8',
		service: 'foursquare',
		service_id: 'foursquare_v1',
		page_state_selector: null,
		selectors: { // has og tags
						'foursquare_v1': ['$pathname', null, [ { rgx: '^\/v\/(?:[a-zA-Z0-9\-_]+)\/(.*)($|\/$)', pos: 1 } ] ]	
					}
				},
	valid_location: function(location) {
		if (location.pathname.search('/v/') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('/v/') != -1) return 'venue'
		else return null
	}
}

//-------------------------------
// GOOGLE HOST DEF
//-------------------------------
Taplio.HostDefs['google.com'] = {
	id: '9',
	favicon: '/favicons/google.ico',
	page_id_selector: '$href',
	googlemaps: {
		id: 'A',
		service: 'googlemaps',
		service_id: 'googlemaps_v2',
		page_state_selector: 'span.pp-place-title',
		selectors: {
						'googlemaps_v2':['$href', null, [ {rgx: '(cid=)([0-9]+)(.*)', pos: 2 } ] ]
					}
			},
	googleplaces: {
		id: 'B',
		service: 'googleplaces',
		service_id: 'googleplaces_v2',
		page_state_selector: 'span.pp-place-title',
		selectors: {
						'title': ['#zrv-review-data', 'text', [ {rgx: '(business_name:")([^"]+)(".*)', pos: 2 } ] ],
						'phone_number': ['#zrv-review-data', 'text', [ {rgx: '(phone_1:")([^"]+)(".*)', pos: 2 } ] ],
						'latitude': ['#pp-marker-json', 'text', [ {rgx: '(lat:)((-)?([0-9]{1,3})(\.)([0-9]+))(.*)', pos: 2 } ] ],
						'longitude': ['#pp-marker-json', 'text', [ {rgx: '(lng:)((-)?([0-9]{1,3})(\.)([0-9]+))(.*)', pos: 2 } ] ],
						'street-address': ['div#pp-headline-details > div.pp-story > span.pp-headline-address-lhp2 > span', 'text', [ {rgx: '^([^,]+)', pos: 0 } ] ],
						'locality': ['div#pp-headline-details > div.pp-story > span.pp-headline-address-lhp2 > span', 'text', [ {rgx: '(,)([^,]+)(,)', pos: 2 } ] ],
						'postal-code': ['div#pp-headline-details > div.pp-story > span.pp-headline-address-lhp2 > span', 'text', [ {rgx: '[0-9]+$', pos: 0 } ] ],
						'country': ['#zrv-review-data', 'text', [ {rgx: '(country:")([^"]+)(".*)', pos: 2 } ] ],
						'googleplaces_v2':['#zrv-review-data', 'text', [ {rgx: '(cid:")([0-9]+)(".*)', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.host.search('maps') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('maps/place') != -1) return 'googleplaces';
		if (id_string.search(/(maps\?view=map&cid=)/) != -1) return 'googlemaps';
		else return null
	}	
}

//-------------------------------
// HUNCH HOST DEF
//-------------------------------
Taplio.HostDefs['hunch.com'] = {
	id: 'C',
	favicon: '/favicons/hunch.ico',
	page_id_selector: 'div.location-box > a.rec-location',
	location_item: {
		id: 'D',
		service: 'hunch',
		service_id: 'hunch_v1',
		page_state_selector: null,
		selectors: {
						'title':'h1.item-name',
						'street-address': ['a.rec-location', 'data-address', [ {rgx: '^([^,]+)', pos: 0 } ] ],
						'latitude': ['a.rec-location', 'data-lat', []],
						'longitude': ['a.rec-location', 'data-lng', []],
						'hunch_v1': ['$pathname', null, [ {rgx: '^(\/item\/)([^\/]+)', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search('item') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string != null && id_string != '') return 'location_item'
		else return null
	}	
}

//-------------------------------
// MENUPAGES HOST DEF
//-------------------------------
Taplio.HostDefs['menupages.com'] = {
	id: 'E',
	favicon: '/favicons/menupages.ico',
	page_id_selector: '$pathname',
	restaurants: {
		id: 'F',
		service: 'menupages',
		service_id: 'menupages_v1',
		page_state_selector: null,
		selectors: {	
						'title': 'div#restaurant-info h2.fn.org',
						'phone_number': 'div#restaurant-info li.phone > strong',
						'latitude': 'span.geo > span.latitude',
						'longitude': 'span.geo > span.longitude',
						'street-address': 'div#restaurant-info span.street-address',
						'locality': 'div#restaurant-info span.locality',
						'region': 'div#restaurant-info span.region',
						'postal-code': 'div#restaurant-info span.postal-code',
						'menupages_v1':['$pathname', null, [ { rgx: '\/(restaurants)\/([a-zA-Z0-9\-]+)($|\/$|(\/menu($|\/$)))', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search('restaurants') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('restaurants') != -1) return 'restaurants'
		else return null
	}	
}

//-------------------------------
// NYMAG HOST DEF
//-------------------------------
Taplio.HostDefs['nymag.com'] = {
	id: 'G',
	favicon: '/favicons/nymag.ico',
	page_id_selector: '$pathname',
	listing: {
		id: 'H',
		service: 'nymag',
		service_id: 'nymag_v1',
		page_state_selector: null,
		selectors: {	
						'latitude': ['meta[name="nyml_address_latitude"]', 'content', []],
						'longitude': ['meta[name="nyml_address_longitude"]', 'content', []],
						'street-address': ['meta[name="nyml_address"]', 'content', []],
						'locality': ['meta[name="nyml_address_city"]', 'content', []],
						'region': ['meta[name="nyml_address_state"]', 'content', []],
						'postal-code': ['meta[name="nyml_address_zip"]', 'content', []],
						'nymag_v1':['$pathname', null, [ { rgx: '\/(urr\/)?(listings)\/(([a-zA-Z]+)\/([a-zA-Z0-9\-_]+))', pos: 3 } ] ]
					}
			},
	reader_reviews: {
		id: 'J',
		service: 'nymag',
		service_id: 'nymag_v1',
		page_state_selector: null,
		selectors: {
						'latitude': ['meta[name="nyml_address_latitude"]', 'content', []],
						'longitude': ['meta[name="nyml_address_longitude"]', 'content', []],
						'street-address': ['meta[name="nyml_address"]', 'content', []],
						'locality': ['meta[name="nyml_address_city"]', 'content', []],
						'region': ['meta[name="nyml_address_state"]', 'content', []],
						'postal-code': ['meta[name="nyml_address_zip"]', 'content', []],
						'nymag_v1':['$pathname', null, [ { rgx: '\/(urr\/)?(listings)\/(([a-zA-Z]+)\/([a-zA-Z0-9\-_]+))', pos: 3 } ] ]
					}
			},
	menu: {
		id: 'K',
		service: 'nymag',
		service_id: 'nymag_v1',
		page_state_selector: null,
		selectors: {
						'latitude': ['meta[name="nyml_address_latitude"]', 'content', []],
						'longitude': ['meta[name="nyml_address_longitude"]', 'content', []],
						'street-address': ['meta[name="nyml_address"]', 'content', []],
						'locality': ['meta[name="nyml_address_city"]', 'content', []],
						'region': ['meta[name="nyml_address_state"]', 'content', []],
						'postal-code': ['meta[name="nyml_address_zip"]', 'content', []],
						'nymag_v1':['$pathname', null, [ { rgx: '\/(urr\/)?(listings)\/(([a-zA-Z]+)\/([a-zA-Z0-9\-_]+))', pos: 3 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search('listings') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('urr') != -1) return 'reader_reviews'
		if (id_string.search('menus') != -1) return 'menu'
		else if (id_string.search('listings') != -1) return 'listing'
		else return null
	}
}

//-------------------------------
// OPENTABLE HOST DEF
//-------------------------------
Taplio.HostDefs['opentable.com'] = {
	id: 'M',
	favicon: '/favicons/opentable.ico',
	page_id_selector: '#TopNav_lblBreadcrumbs',
	reservations: {
		id: 'N',
		service: 'opentable',
		service_id: 'opentable_v2',
		page_state_selector: null,
		selectors: {
						'title':'span#RestInfo_lblRestaurantName',
						'opentable_v2': ['$pathname', null, [ { rgx: '(\/)?([a-zA-Z0-9\-_]+)($|\/$)', pos: 2 } ] ]
					}
			},
	profile: {
		id: 'P',
		service: 'opentable',
		service_id: 'opentable_v2',
		page_state_selector: null,
		selectors: {
						'title':'h1.RestProfileTitle',
						'phone_number':'span#RestaurantProfile_RestaurantProfileInfo_lblPhone',
						'opentable_v2': ['a#RestaurantProfile_linkMakeReservation', 'href', [ { rgx: '\/([a-zA-X0-9\-_]+)($|\/$)', pos: 1 } ] ]
					}
			},
	valid_location: function(location) {
		return true;
	},
	identify_page: function(id_string) {
		if (id_string.split('>').length == 4) return 'profile'
		else if (id_string.split('>').length == 3) return 'reservations'
		else return null
	}	
}

//-------------------------------
// TRIPADVISOR HOST DEF
//-------------------------------
Taplio.HostDefs['tripadvisor.com'] = {
	id: 'Q',
	favicon: '/favicons/tripadvisor.ico',
	page_id_selector: '$pathname',
	restaurant_review: {
		id: 'R',
		service: 'tripadvisor',
		service_id: 'tripadvisor_v2',
		page_state_selector: null,
		selectors: {
						'title':'h1#HEADING',
						'street-address':'li.adr > span.street-address',
						'latitude':['div.js_floatContent[title="Map"] > script', 'text', [ {rgx: '(lat: )([0-9\.\-]+)', pos: 2 } ] ],
						'longitude':['div.js_floatContent[title="Map"] > script', 'text', [ {rgx: '(lng: )([0-9\.\-]+)', pos: 2 } ] ],
						'locality':'li.adr > span.locality > span[property="v:locality"]',
						'region':'li.adr > span.locality > span[property="v:region"]',
						'postal-code':'li.adr > span.locality > span[property="v:postal-code"]',
						'tripadvisor_v2':['$pathname', null, [ {rgx: '^(\/)?([^\.\/]+)(.html)$', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search('Restaurant_Review') != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		return 'restaurant_review';
	}	
}

//-------------------------------
// YELP HOST DEF
//-------------------------------
Taplio.HostDefs['yelp.com'] = {
	id: 'S',
	favicon: '/favicons/yelp.ico',
	page_id_selector: '$pathname',
	biz: {
		id: 'T',
		page_state_selector: null,
		service: 'yelp',
		service_id: 'yelp_v1',
		selectors: {	
						'title':  '#bizInfoHeader > h1',
						'phone_number': 'span#bizPhone',
						'street-address': 'span.street-address',
						'locality': 'span.locality',
						'region': 'span.region',
						'postal-code': 'span.postal-code',
						'yelp_v1': ['$pathname', null, [ { rgx: '\/(biz|biz_photos|map)\/([a-zA-Z0-9\-_]+)', pos: 2 } ] ]
					}
			},
	map: {
		id: 'V',
		page_state_selector: null,
		service: 'yelp',
		service_id: 'yelp_v2',
		selectors: {	
						'title': '#startBizInfo > h2 > a',
						'yelp_v2': ['$pathname', null, [ { rgx: '\/(biz|biz_photos|map)\/([a-zA-Z0-9\-_]+)', pos: 2 } ] ]
					}
			},
	biz_photos: {
		id: 'W',
		page_state_selector: null,
		service: 'yelp',
		service_id: 'yelp_v2',
		selectors: {	
						'title': 'div#photo-details-header > h2 > a',
						'yelp_v2': ['$pathname', null, [ { rgx: '\/(biz|biz_photos|map)\/([a-zA-Z0-9\-_]+)', pos: 2 } ] ]
					}
			},
	valid_location: function(location) {
		if (location.pathname.search(/(biz)|(map)/) != -1) return true;
		else return false;
	},
	identify_page: function(id_string) {
		if (id_string.search('biz_photos') != -1) return 'biz_photos';
		else if (id_string.search('map') != -1) return 'map';
		else if (id_string.search('biz') != -1) return 'biz';
		else return null;
	}
}
