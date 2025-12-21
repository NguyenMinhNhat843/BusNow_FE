# LocationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**locationControllerCreateLocation**](#locationcontrollercreatelocation) | **POST** /location | |
|[**locationControllerDeleteLocationDto**](#locationcontrollerdeletelocationdto) | **DELETE** /location | |
|[**locationControllerGetAllLocation**](#locationcontrollergetalllocation) | **GET** /location/get-all | |
|[**locationControllerGetLocationDetail**](#locationcontrollergetlocationdetail) | **GET** /location/get-location-detail | |

# **locationControllerCreateLocation**
> locationControllerCreateLocation(createLocationDto)


### Example

```typescript
import {
    LocationApi,
    Configuration,
    CreateLocationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

let createLocationDto: CreateLocationDto; //

const { status, data } = await apiInstance.locationControllerCreateLocation(
    createLocationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLocationDto** | **CreateLocationDto**|  | |


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

# **locationControllerDeleteLocationDto**
> locationControllerDeleteLocationDto(deleteLocationDto)


### Example

```typescript
import {
    LocationApi,
    Configuration,
    DeleteLocationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

let deleteLocationDto: DeleteLocationDto; //

const { status, data } = await apiInstance.locationControllerDeleteLocationDto(
    deleteLocationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deleteLocationDto** | **DeleteLocationDto**|  | |


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

# **locationControllerGetAllLocation**
> Array<CreateLocationDto> locationControllerGetAllLocation()


### Example

```typescript
import {
    LocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

const { status, data } = await apiInstance.locationControllerGetAllLocation();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<CreateLocationDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **locationControllerGetLocationDetail**
> locationControllerGetLocationDetail()


### Example

```typescript
import {
    LocationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LocationApi(configuration);

const { status, data } = await apiInstance.locationControllerGetLocationDetail();
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

