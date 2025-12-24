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
> tripControllerDeleteTripsBeforeDate(deleteTripBeforeDate)


### Example

```typescript
import {
    TripApi,
    Configuration,
    DeleteTripBeforeDate
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let deleteTripBeforeDate: DeleteTripBeforeDate; //

const { status, data } = await apiInstance.tripControllerDeleteTripsBeforeDate(
    deleteTripBeforeDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deleteTripBeforeDate** | **DeleteTripBeforeDate**|  | |


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
> tripControllerGenTrips(genTripDTO)


### Example

```typescript
import {
    TripApi,
    Configuration,
    GenTripDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TripApi(configuration);

let genTripDTO: GenTripDTO; //

const { status, data } = await apiInstance.tripControllerGenTrips(
    genTripDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **genTripDTO** | **GenTripDTO**|  | |


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

let vehicleId: string; //vehicleId (optional) (default to undefined)
let page: number; // (optional) (default to 1)
let limit: number; // (optional) (default to 10)

const { status, data } = await apiInstance.tripControllerGetTripsByVehicle(
    vehicleId,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | vehicleId | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 1|
| **limit** | [**number**] |  | (optional) defaults to 10|


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

