# TripApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**tripControllerCreateTrip**](#tripcontrollercreatetrip) | **POST** /trip/create | |
|[**tripControllerDeleteTrips**](#tripcontrollerdeletetrips) | **DELETE** /trip | |
|[**tripControllerDeleteTripsBeforeDate**](#tripcontrollerdeletetripsbeforedate) | **DELETE** /trip/delete-trips-before-date | |
|[**tripControllerGenTrips**](#tripcontrollergentrips) | **POST** /trip/gen-trips | |
|[**tripControllerGetTripsByVehicle**](#tripcontrollergettripsbyvehicle) | **GET** /trip/vehicle | |
|[**tripControllerSearchTrip**](#tripcontrollersearchtrip) | **GET** /trip/search-trip | |

# **tripControllerCreateTrip**
> tripControllerCreateTrip(body)


### Example

```typescript
import {
    TripApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let body: object; //

const { status, data } = await apiInstance.tripControllerCreateTrip(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripControllerDeleteTrips**
> tripControllerDeleteTrips(body)


### Example

```typescript
import {
    TripApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let body: object; //

const { status, data } = await apiInstance.tripControllerDeleteTrips(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripControllerDeleteTripsBeforeDate**
> tripControllerDeleteTripsBeforeDate(body)


### Example

```typescript
import {
    TripApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let body: object; //

const { status, data } = await apiInstance.tripControllerDeleteTripsBeforeDate(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripControllerGenTrips**
> tripControllerGenTrips(body)


### Example

```typescript
import {
    TripApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let body: object; //

const { status, data } = await apiInstance.tripControllerGenTrips(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripControllerGetTripsByVehicle**
> tripControllerGetTripsByVehicle()


### Example

```typescript
import {
    TripApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let vehicleId: string; // (default to undefined)

const { status, data } = await apiInstance.tripControllerGetTripsByVehicle(
    vehicleId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tripControllerSearchTrip**
> tripControllerSearchTrip()


### Example

```typescript
import {
    TripApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

const { status, data } = await apiInstance.tripControllerSearchTrip();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

