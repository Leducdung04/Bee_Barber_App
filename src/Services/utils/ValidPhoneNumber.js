export function isValidPhoneNumber(phoneNumber) {
    // Định dạng: Bắt đầu bằng +84 hoặc 0, theo sau là 9-10 chữ số
    const phoneRegex = /^(?:\+84|0)(?:[3|5|7|8|9])\d{8,9}$/;
    return phoneRegex.test(phoneNumber);
  }