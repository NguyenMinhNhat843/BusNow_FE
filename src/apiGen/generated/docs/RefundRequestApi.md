# RefundRequestApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**refundRequestControllerFilter**](#refundrequestcontrollerfilter) | **GET** /refund-request/filter | |
|[**refundRequestControllerGetLimit**](#refundrequestcontrollergetlimit) | **GET** /refund-request/limit | |
|[**refundRequestControllerUpdate**](#refundrequestcontrollerupdate) | **PATCH** /refund-request/{id} | |

# **refundRequestControllerFilter**
> refundRequestControllerFilter()


### Example

```typescript
import {
    RefundRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RefundRequestApi(configuration);

const { status, data } = await apiInstance.refundRequestControllerFilter();
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

# **refundRequestControllerGetLimit**
> refundRequestControllerGetLimit()


### Example

```typescript
import {
    RefundRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RefundRequestApi(configuration);

let page: number; // (default to undefined)
let limit: number; // (default to undefined)

const { status, data } = await apiInstance.refundRequestControllerGetLimit(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | defaults to undefined|
| **limit** | [**number**] |  | defaults to undefined|


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

# **refundRequestControllerUpdate**
> refundRequestControllerUpdate(body)


### Example

```typescript
import {
    RefundRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RefundRequestApi(configuration);

let id: string; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.refundRequestControllerUpdate(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**string**] |  | defaults to undefined|


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

