# BusCompanyRequestApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**busCompanyRequestControllerCreate**](#buscompanyrequestcontrollercreate) | **POST** /bus-company-requests | |
|[**busCompanyRequestControllerGetList**](#buscompanyrequestcontrollergetlist) | **GET** /bus-company-requests | |
|[**busCompanyRequestControllerUpdate**](#buscompanyrequestcontrollerupdate) | **PATCH** /bus-company-requests | |

# **busCompanyRequestControllerCreate**
> busCompanyRequestControllerCreate()


### Example

```typescript
import {
    BusCompanyRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BusCompanyRequestApi(configuration);

let companyName: string; // (default to undefined)
let address: string; // (default to undefined)
let phoneNumber: string; // (default to undefined)
let email: string; // (default to undefined)
let representativeName: string; // (default to undefined)
let licenseNumber: string; // (default to undefined)
let licenseFile: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.busCompanyRequestControllerCreate(
    companyName,
    address,
    phoneNumber,
    email,
    representativeName,
    licenseNumber,
    licenseFile
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **companyName** | [**string**] |  | defaults to undefined|
| **address** | [**string**] |  | defaults to undefined|
| **phoneNumber** | [**string**] |  | defaults to undefined|
| **email** | [**string**] |  | defaults to undefined|
| **representativeName** | [**string**] |  | defaults to undefined|
| **licenseNumber** | [**string**] |  | defaults to undefined|
| **licenseFile** | [**File**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **busCompanyRequestControllerGetList**
> busCompanyRequestControllerGetList()


### Example

```typescript
import {
    BusCompanyRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BusCompanyRequestApi(configuration);

let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let requestId: string; // (optional) (default to undefined)
let phone: string; // (optional) (default to undefined)
let email: string; // (optional) (default to undefined)
let status: 'PENDING' | 'APPROVED' | 'REJECTED'; // (optional) (default to undefined)
let fromDate: string; // (optional) (default to undefined)
let toDate: string; // (optional) (default to undefined)
let sortBy: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.busCompanyRequestControllerGetList(
    page,
    limit,
    requestId,
    phone,
    email,
    status,
    fromDate,
    toDate,
    sortBy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **requestId** | [**string**] |  | (optional) defaults to undefined|
| **phone** | [**string**] |  | (optional) defaults to undefined|
| **email** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;PENDING&#39; | &#39;APPROVED&#39; | &#39;REJECTED&#39;**]**Array<&#39;PENDING&#39; &#124; &#39;APPROVED&#39; &#124; &#39;REJECTED&#39;>** |  | (optional) defaults to undefined|
| **fromDate** | [**string**] |  | (optional) defaults to undefined|
| **toDate** | [**string**] |  | (optional) defaults to undefined|
| **sortBy** | [**string**] |  | (optional) defaults to undefined|


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

# **busCompanyRequestControllerUpdate**
> busCompanyRequestControllerUpdate(updateBusCompanyRequestDTO)


### Example

```typescript
import {
    BusCompanyRequestApi,
    Configuration,
    UpdateBusCompanyRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new BusCompanyRequestApi(configuration);

let updateBusCompanyRequestDTO: UpdateBusCompanyRequestDTO; //

const { status, data } = await apiInstance.busCompanyRequestControllerUpdate(
    updateBusCompanyRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateBusCompanyRequestDTO** | **UpdateBusCompanyRequestDTO**|  | |


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

