# RouteApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**routeControllerCreateRoute**](#routecontrollercreateroute) | **POST** /route/create | |
|[**routeControllerDeleteRoute**](#routecontrollerdeleteroute) | **DELETE** /route/{id} | |
|[**routeControllerGetRoutes**](#routecontrollergetroutes) | **GET** /route/list | |

# **routeControllerCreateRoute**
> routeControllerCreateRoute(createRouteDTO)


### Example

```typescript
import {
    RouteApi,
    Configuration,
    CreateRouteDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RouteApi(configuration);

let createRouteDTO: CreateRouteDTO; //

const { status, data } = await apiInstance.routeControllerCreateRoute(
    createRouteDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createRouteDTO** | **CreateRouteDTO**|  | |


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

# **routeControllerDeleteRoute**
> routeControllerDeleteRoute()


### Example

```typescript
import {
    RouteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RouteApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.routeControllerDeleteRoute(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **routeControllerGetRoutes**
> routeControllerGetRoutes()


### Example

```typescript
import {
    RouteApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RouteApi(configuration);

let limit: number; //Số lượng item/trang, mặc định 10 (optional) (default to undefined)
let page: number; //Trang hiện tại, mặc định 1 (optional) (default to undefined)

const { status, data } = await apiInstance.routeControllerGetRoutes(
    limit,
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] | Số lượng item/trang, mặc định 10 | (optional) defaults to undefined|
| **page** | [**number**] | Trang hiện tại, mặc định 1 | (optional) defaults to undefined|


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

