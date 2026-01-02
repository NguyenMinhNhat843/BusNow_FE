# CreatePaymentDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **number** | Số tiền thanh toán (VND) | [default to undefined]
**orderInfo** | **string** | Thông tin đơn hàng | [default to undefined]
**bookingInfo** | [**CreateTIcketDTO**](CreateTIcketDTO.md) |  | [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreatePaymentDto } from './api';

const instance: CreatePaymentDto = {
    amount,
    orderInfo,
    bookingInfo,
    userId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
