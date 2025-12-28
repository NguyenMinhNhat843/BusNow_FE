# RefundRequestApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**refundRequestControllerSearchRefundRequest**](#refundrequestcontrollersearchrefundrequest) | **POST** /refund-request/search | |
|[**refundRequestControllerUpdate**](#refundrequestcontrollerupdate) | **PATCH** /refund-request/{id} | |

# **refundRequestControllerSearchRefundRequest**
> refundRequestControllerSearchRefundRequest(searchRefundRequestDTO)


### Example

```typescript
import {
    RefundRequestApi,
    Configuration,
    SearchRefundRequestDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new RefundRequestApi(configuration);

let searchRefundRequestDTO: SearchRefundRequestDTO; //

const { status, data } = await apiInstance.refundRequestControllerSearchRefundRequest(
    searchRefundRequestDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **searchRefundRequestDTO** | **SearchRefundRequestDTO**|  | |


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

