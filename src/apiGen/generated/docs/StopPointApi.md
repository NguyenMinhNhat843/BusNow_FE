# StopPointApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**stopPointControllerCreate**](#stoppointcontrollercreate) | **POST** /stop-point | |
|[**stopPointControllerDeleteStopPoint**](#stoppointcontrollerdeletestoppoint) | **DELETE** /stop-point/{stopPointId} | |
|[**stopPointControllerGetStopPoints**](#stoppointcontrollergetstoppoints) | **GET** /stop-point | |
|[**stopPointControllerGetStopPointsByRoute**](#stoppointcontrollergetstoppointsbyroute) | **GET** /stop-point/by-route/{routeId} | |
|[**stopPointControllerUpdateStopPoint**](#stoppointcontrollerupdatestoppoint) | **PUT** /stop-point | |

# **stopPointControllerCreate**
> stopPointControllerCreate(createStopPointDto)


### Example

```typescript
import {
    StopPointApi,
    Configuration,
    CreateStopPointDto
} from './api';

const configuration = new Configuration();
const apiInstance = new StopPointApi(configuration);

let createStopPointDto: CreateStopPointDto; //

const { status, data } = await apiInstance.stopPointControllerCreate(
    createStopPointDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createStopPointDto** | **CreateStopPointDto**|  | |


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

# **stopPointControllerDeleteStopPoint**
> stopPointControllerDeleteStopPoint()


### Example

```typescript
import {
    StopPointApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StopPointApi(configuration);

let stopPointId: string; // (default to undefined)

const { status, data } = await apiInstance.stopPointControllerDeleteStopPoint(
    stopPointId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **stopPointId** | [**string**] |  | defaults to undefined|


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

# **stopPointControllerGetStopPoints**
> stopPointControllerGetStopPoints()


### Example

```typescript
import {
    StopPointApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StopPointApi(configuration);

const { status, data } = await apiInstance.stopPointControllerGetStopPoints();
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

# **stopPointControllerGetStopPointsByRoute**
> stopPointControllerGetStopPointsByRoute()


### Example

```typescript
import {
    StopPointApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StopPointApi(configuration);

let routeId: string; // (default to undefined)

const { status, data } = await apiInstance.stopPointControllerGetStopPointsByRoute(
    routeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **routeId** | [**string**] |  | defaults to undefined|


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

# **stopPointControllerUpdateStopPoint**
> stopPointControllerUpdateStopPoint(updateStopPointDto)


### Example

```typescript
import {
    StopPointApi,
    Configuration,
    UpdateStopPointDto
} from './api';

const configuration = new Configuration();
const apiInstance = new StopPointApi(configuration);

let updateStopPointDto: UpdateStopPointDto; //

const { status, data } = await apiInstance.stopPointControllerUpdateStopPoint(
    updateStopPointDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateStopPointDto** | **UpdateStopPointDto**|  | |


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

