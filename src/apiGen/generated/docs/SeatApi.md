# SeatApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**seatControllerGetSeatIsBookedByTripId**](#seatcontrollergetseatisbookedbytripid) | **GET** /seat/get-seat-is-booked-by-trip-id | |

# **seatControllerGetSeatIsBookedByTripId**
> seatControllerGetSeatIsBookedByTripId()


### Example

```typescript
import {
    SeatApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeatApi(configuration);

const { status, data } = await apiInstance.seatControllerGetSeatIsBookedByTripId();
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

