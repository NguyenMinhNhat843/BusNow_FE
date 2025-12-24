# VehicleApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**vehicleControllerCreateVehicle**](#vehiclecontrollercreatevehicle) | **POST** /vehicle/create | |
|[**vehicleControllerDeleteVehicle**](#vehiclecontrollerdeletevehicle) | **DELETE** /vehicle/{id} | |
|[**vehicleControllerGetVehicleById**](#vehiclecontrollergetvehiclebyid) | **GET** /vehicle/{id} | |
|[**vehicleControllerGetVehicles**](#vehiclecontrollergetvehicles) | **GET** /vehicle | |

# **vehicleControllerCreateVehicle**
> vehicleControllerCreateVehicle(body)


### Example

```typescript
import {
    VehicleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehicleApi(configuration);

let body: object; //

const { status, data } = await apiInstance.vehicleControllerCreateVehicle(
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

# **vehicleControllerDeleteVehicle**
> vehicleControllerDeleteVehicle()


### Example

```typescript
import {
    VehicleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehicleApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.vehicleControllerDeleteVehicle(
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
|**200** | Xe đã bị xóa thành công |  -  |
|**404** | Xe không tồn tại |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **vehicleControllerGetVehicleById**
> object vehicleControllerGetVehicleById()


### Example

```typescript
import {
    VehicleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehicleApi(configuration);

let id: string; //vehicleId (default to undefined)

const { status, data } = await apiInstance.vehicleControllerGetVehicleById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | vehicleId | defaults to undefined|


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **vehicleControllerGetVehicles**
> vehicleControllerGetVehicles()


### Example

```typescript
import {
    VehicleApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VehicleApi(configuration);

let vehicleId: string; //Lọc theo vehicleId cụ thể (optional) (default to undefined)
let limit: number; //Số lượng item/trang, mặc định 10 (optional) (default to undefined)
let page: number; //Trang hiện tại, mặc định 1 (optional) (default to undefined)

const { status, data } = await apiInstance.vehicleControllerGetVehicles(
    vehicleId,
    limit,
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **vehicleId** | [**string**] | Lọc theo vehicleId cụ thể | (optional) defaults to undefined|
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

