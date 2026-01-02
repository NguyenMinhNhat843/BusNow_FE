# CreateTIcketDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tripId** | **string** | ID chuyến xe | [default to undefined]
**seatCode** | **Array&lt;number&gt;** | Danh sách mã ghế | [default to undefined]
**methodPayment** | **string** | Phương thức thanh toán | [default to undefined]
**statusPayment** | **string** | Trạng thái thanh toán | [optional] [default to undefined]
**firstName** | **string** | Tên khách (guest) | [optional] [default to undefined]
**lastName** | **string** | Họ khách (guest) | [optional] [default to undefined]
**phone** | **string** | Số điện thoại khách | [optional] [default to undefined]
**email** | **string** | Email khách | [optional] [default to undefined]

## Example

```typescript
import { CreateTIcketDTO } from './api';

const instance: CreateTIcketDTO = {
    tripId,
    seatCode,
    methodPayment,
    statusPayment,
    firstName,
    lastName,
    phone,
    email,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
