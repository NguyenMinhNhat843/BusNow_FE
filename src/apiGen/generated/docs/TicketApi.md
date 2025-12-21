# TicketApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**ticketControllerCancleTicket**](#ticketcontrollercancleticket) | **PUT** /ticket/send-mail-cancle-ticket | |
|[**ticketControllerConfirmCancleTicket**](#ticketcontrollerconfirmcancleticket) | **POST** /ticket/confirm-cancle | |
|[**ticketControllerCreateTicket**](#ticketcontrollercreateticket) | **POST** /ticket | |
|[**ticketControllerFilterTicket**](#ticketcontrollerfilterticket) | **POST** /ticket/filter-ticket | |
|[**ticketControllerFindTicketById**](#ticketcontrollerfindticketbyid) | **GET** /ticket/ticket-by-id/{ticketId} | |
|[**ticketControllerFindTicketByPhone**](#ticketcontrollerfindticketbyphone) | **GET** /ticket/by-phone/{phone} | |
|[**ticketControllerGetMyTicket**](#ticketcontrollergetmyticket) | **GET** /ticket/my-ticket | |
|[**ticketControllerGetTicketsByTrip**](#ticketcontrollergetticketsbytrip) | **GET** /ticket/by-trip/{tripId} | |

# **ticketControllerCancleTicket**
> ticketControllerCancleTicket()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

const { status, data } = await apiInstance.ticketControllerCancleTicket();
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

# **ticketControllerConfirmCancleTicket**
> ticketControllerConfirmCancleTicket()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

const { status, data } = await apiInstance.ticketControllerConfirmCancleTicket();
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
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ticketControllerCreateTicket**
> ticketControllerCreateTicket(body)


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let body: object; //

const { status, data } = await apiInstance.ticketControllerCreateTicket(
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

# **ticketControllerFindTicketById**
> ticketControllerFindTicketById()


### Example

```typescript
import {
    TicketApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TicketApi(configuration);

let ticketId: string; // (default to undefined)

const { status, data } = await apiInstance.ticketControllerFindTicketById(
    ticketId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ticketId** | [**string**] |  | defaults to undefined|


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

const { status, data } = await apiInstance.ticketControllerGetMyTicket();
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

