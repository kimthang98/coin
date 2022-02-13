export const IS_ACTIVE = {
  ACTIVE: 1,
  INACTIVE: 0,
};

export const _ROLE = {
  ADMIN: 1,
  USER: 2,
};

export const STATUS_USRE = {
  ACTIVE: 1,
  INACTIVE: 0,
};
export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

export const EMAIL = {
  TITLE: `Khôi phục mật khẩu`,
};

export const PAGING_DEFAULT = {
  PAGE: 1,
  LIMIR: 20,
};

export const ERROR_MESSAGE = {
  EMAIL_PHONE_FAIL: 'Số điện thoại hoặc email đã tồn tại',
  LOGIN_PHONE_FAIL: 'Số điện thoại không đúng',
  LOGIN_PASSWORD_FAIL: 'Mật khẩu không đúng',
  AUTH_USER_FAIL: 'Tài khoản của bạn đang được nhập nơi khác',
  AUTH_TOKEN_FAIL: 'Vui lòng đăng nhập',
  AUTH_ROLE_FAIL: 'Bạn không quyền truy cập',
  AUTH_STATUS_FAIL: 'Tài khoản của bạn bị khóa vui lòng liên hệ với admin để được hỗ trợ',
  AUTH_ACTIVE_FAIL: 'Tài khoản của bạn chưa được kích hoạt vui lòng kích hoạt',
  FORGOT_PASSWORD_FAIL: 'Đổi mật khẩu không thành công',
  USER_FAIL: 'Tài khoản không tồn tại',
};

export const conterEmil = (data: { name: string; link: string | number; phone: string }) => {
  return `<div
  style="background:white;padding:32px 20px 48px 20px;max-width:680px;margin-right:auto;margin-left:auto;box-sizing:border-box">
  <h1 style="font-size:16px;color:#${'000000'};font-weight:600;margin-top:0;margin-bottom:19px;line-height:25px">
      Xin chào
      <strong>${data.name}</strong>,
  </h1>
  <p style="margin-top:0;margin-bottom:0">Bạn (hoặc ai đó) đã yêu cầu khôi phục mật khẩu cho tài khoản ${
    data.phone
  }. Mã
      khôi phục mật khẩu của bạn là:</p>
  <p style="font-size:28px;line-height:22px;margin-top:38px;margin-bottom:38px;color:#${'0068ff'};font-weight:600">

   <a href="${data.link}">${data.link}</a>
  </p>
  <p style="margin-top:0;margin-bottom:28px">Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.
  </p>
  <p style="margin-top:0;margin-bottom:28px"><strong>Lưu ý không chia sẻ mã này cho bất cứ ai.</strong></p>
  <h3 style="margin-top:0;margin-bottom:0">Trân trọng!</h3>
</div>`;
};
