# VNPAYApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**vnpayControllerCreatePaymentUrl**](#vnpaycontrollercreatepaymenturl) | **POST** /vnpay/create-payment-url | |
|[**vnpayControllerVnpayCallback**](#vnpaycontrollervnpaycallback) | **GET** /vnpay/callback | |

# **vnpayControllerCreatePaymentUrl**
> vnpayControllerCreatePaymentUrl(createPaymentDto)


### Example

```typescript
import {
    VNPAYApi,
    Configuration,
    CreatePaymentDto
} from './api';

const configuration = new Configuration();
const apiInstance = new VNPAYApi(configuration);

let createPaymentDto: CreatePaymentDto; //

const { status, data } = await apiInstance.vnpayControllerCreatePaymentUrl(
    createPaymentDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPaymentDto** | **CreatePaymentDto**|  | |


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

# **vnpayControllerVnpayCallback**
> vnpayControllerVnpayCallback()


### Example

```typescript
import {
    VNPAYApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VNPAYApi(configuration);

const { status, data } = await apiInstance.vnpayControllerVnpayCallback();
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

