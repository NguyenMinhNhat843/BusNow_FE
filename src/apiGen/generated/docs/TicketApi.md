# TicketApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**ticketControllerCancleTicket**](#ticketcontrollercancleticket) | **PUT** /ticket/cancle-ticket | |
|[**ticketControllerConfirmCancleTicket**](#ticketcontrollerconfirmcancleticket) | **POST** /ticket/confirm-cancle | |
|[**ticketControllerCreateTicket**](#ticketcontrollercreateticket) | **POST** /ticket | |
|[**ticketControllerDeleteTicket**](#ticketcontrollerdeleteticket) | **DELETE** /ticket/{id} | |
|[**ticketControllerFilterTicket**](#ticketcontrollerfilterticket) | **POST** /ticket/filter-ticket | |
|[**ticketControllerFindTicketByPhone**](#ticketcontrollerfindticketbyphone) | **GET** /ticket/by-phone/{phone} | |
|[**ticketControllerGetMyTicket**](#ticketcontrollergetmyticket) | **GET** /ticket/my-ticket | |
|[**ticketControllerGetTicketsByTrip**](#ticketcontrollergetticketsbytrip) | **GET** /ticket/by-trip/{tripId} | |
|[**ticketControllerSearchTicket**](#ticketcontrollersearchticket) | **POST** /ticket/search | |
|[**ticketControllerUpdateTicket**](#ticketcontrollerupdateticket) | **PUT** /ticket | |

# **ticketControllerCancleTicket**
> ticketControllerCancleTicket(cancleTicketDTO)


### Example

```typescript
import {
    TicketApi,
    Configuration,
    CancleTicketDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let cancleTicketDTO: CancleTicketDTO; //

const { status, data } = await apiInstance.ticketControllerCancleTicket(
    cancleTicketDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cancleTicketDTO** | **CancleTicketDTO**|  | |


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

# **ticketControllerConfirmCancleTicket**
> ticketControllerConfirmCancleTicket(confirmCancleTicketDTO)


### Example

```typescript
import {
    TicketApi,
    Configuration,
    ConfirmCancleTicketDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let confirmCancleTicketDTO: ConfirmCancleTicketDTO; //

const { status, data } = await apiInstance.ticketControllerConfirmCancleTicket(
    confirmCancleTicketDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **confirmCancleTicketDTO** | **ConfirmCancleTicketDTO**|  | |


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

# **ticketControllerCreateTicket**
> ticketControllerCreateTicket(createTIcketDTO)


### Example

```typescript
import {
    TicketApi,
    Configuration,
    CreateTIcketDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let createTIcketDTO: CreateTIcketDTO; //

const { status, data } = await apiInstance.ticketControllerCreateTicket(
    createTIcketDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTIcketDTO** | **CreateTIcketDTO**|  | |


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

# **ticketControllerDeleteTicket**
> ticketControllerDeleteTicket()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.ticketControllerDeleteTicket(
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

# **ticketControllerFilterTicket**
> ticketControllerFilterTicket(body)


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let body: object; //

const { status, data } = await apiInstance.ticketControllerFilterTicket(
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

# **ticketControllerFindTicketByPhone**
> ticketControllerFindTicketByPhone()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let phone: string; // (default to undefined)

const { status, data } = await apiInstance.ticketControllerFindTicketByPhone(
    phone
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **phone** | [**string**] |  | defaults to undefined|


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

# **ticketControllerGetMyTicket**
> ticketControllerGetMyTicket()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let ticketId: string; // (optional) (default to undefined)
let providerId: string; // (optional) (default to undefined)
let providerPhone: string; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let phone: string; // (optional) (default to undefined)
let status: 'USED' | 'NOT_USED'; // (optional) (default to undefined)
let vehicleId: string; // (optional) (default to undefined)
let vehicleCode: string; // (optional) (default to undefined)
let tripId: string; // (optional) (default to undefined)
let statusPayment: 'PAID' | 'UNPAID' | 'CANCELLED'; // (optional) (default to undefined)

const { status, data } = await apiInstance.ticketControllerGetMyTicket(
    ticketId,
    providerId,
    providerPhone,
    page,
    limit,
    phone,
    status,
    vehicleId,
    vehicleCode,
    tripId,
    statusPayment
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ticketId** | [**string**] |  | (optional) defaults to undefined|
| **providerId** | [**string**] |  | (optional) defaults to undefined|
| **providerPhone** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **phone** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;USED&#39; | &#39;NOT_USED&#39;**]**Array<&#39;USED&#39; &#124; &#39;NOT_USED&#39;>** |  | (optional) defaults to undefined|
| **vehicleId** | [**string**] |  | (optional) defaults to undefined|
| **vehicleCode** | [**string**] |  | (optional) defaults to undefined|
| **tripId** | [**string**] |  | (optional) defaults to undefined|
| **statusPayment** | [**&#39;PAID&#39; | &#39;UNPAID&#39; | &#39;CANCELLED&#39;**]**Array<&#39;PAID&#39; &#124; &#39;UNPAID&#39; &#124; &#39;CANCELLED&#39;>** |  | (optional) defaults to undefined|


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

# **ticketControllerGetTicketsByTrip**
> ticketControllerGetTicketsByTrip()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let tripId: string; // (default to undefined)

const { status, data } = await apiInstance.ticketControllerGetTicketsByTrip(
    tripId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tripId** | [**string**] |  | defaults to undefined|


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

# **ticketControllerSearchTicket**
> ticketControllerSearchTicket(searchTicketDTO)


### Example

```typescript
import {
    TicketApi,
    Configuration,
    SearchTicketDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let searchTicketDTO: SearchTicketDTO; //

const { status, data } = await apiInstance.ticketControllerSearchTicket(
    searchTicketDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **searchTicketDTO** | **SearchTicketDTO**|  | |


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

# **ticketControllerUpdateTicket**
> ticketControllerUpdateTicket(updateTicketDTO)


### Example

```typescript
import {
    TicketApi,
    Configuration,
    UpdateTicketDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let updateTicketDTO: UpdateTicketDTO; //

const { status, data } = await apiInstance.ticketControllerUpdateTicket(
    updateTicketDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTicketDTO** | **UpdateTicketDTO**|  | |


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

