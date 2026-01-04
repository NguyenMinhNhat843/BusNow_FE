# RegisterDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **string** | Email đăng ký | [default to undefined]
**password** | **string** | Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt và tối thiểu 8 ký tự | [default to undefined]
**firstName** | **string** | Họ và tên đệm | [default to undefined]
**lastName** | **string** | Tên | [default to undefined]
**phoneNumber** | **string** | Số điện thoại (10 chữ số) | [optional] [default to undefined]
**address** | **string** | Địa chỉ | [optional] [default to undefined]
**otp** | **string** | Mã OTP xác thực | [optional] [default to undefined]
**role** | **string** | Vai trò người dùng | [default to undefined]
**isInternalAdminCreate** | **boolean** | Admin nội bộ tạo tài khoản | [optional] [default to undefined]

## Example

```typescript
import { RegisterDTO } from './api';

const instance: RegisterDTO = {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
    otp,
    role,
    isInternalAdminCreate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
