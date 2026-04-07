# 🍕 Ứng dụng Đặt Pizza Trực Tuyến (Pizza Order App)

Dự án này là một ứng dụng web (Single Page Application) được xây dựng bằng **ReactJS**, cho phép người dùng xem danh sách sản phẩm, tùy chỉnh món ăn (kích cỡ, đế bánh, mua thêm món ăn kèm) và quản lý giỏ hàng.

## 👨‍🎓 Thông tin sinh viên
- **Họ và tên:** Nguyễn Tiến Đức Huy
- **Mã sinh viên:** 23810310127
- **Môn học:** Mobile Programming
- **Chuyên ngành:** Technology Information

---

## 🏗 Cấu trúc hệ thống (System Architecture)

Dự án áp dụng kiến trúc Component-Based của React, chia nhỏ giao diện thành các phần độc lập để dễ quản lý và tái sử dụng. Quản lý trạng thái (State Management) toàn cục được thực hiện thông qua **Context API**.

### 1. Sơ đồ thư mục (Folder Structure)
```text
src/
 ├── public/
 │    └── images/          # Chứa các file ảnh (pizza, đồ uống...)
 ├── src/
 │    ├── data.json        # Dữ liệu tĩnh (Mock API) chứa Danh mục, Sản phẩm, Options, Add-ons
 │    ├── CartContext.js   # Quản lý Global State cho Giỏ hàng (Thêm, Xóa, Tính tổng)
 │    ├── Home.js          # Màn hình Trang chủ (Hiển thị danh mục & lưới sản phẩm)
 │    ├── Order.js         # Màn hình Đặt món (Xử lý logic tính giá khi thay đổi Size/Addons)
 │    ├── Cart.js          # Màn hình Giỏ hàng (Review đơn hàng & Thanh toán)
 │    ├── App.js           # Root Component (Quản lý điều hướng - Routing giữa 3 màn hình)
 │    ├── App.css          # CSS Layout nền và Animations dùng chung
 │    ├── Buttons.css      # CSS UI System cho các nút bấm
 │    └── Home.css         # CSS Card sản phẩm và Grid layout cho trang chủ
```
 1. Màn hình Trang chủ (Home Screen)
<img width="599" height="1037" alt="trang_giao_dien" src="https://github.com/user-attachments/assets/dc326195-7b75-4fbc-a85f-e6116f6f9ec8" />

 2. Màn hình Đặt món (Order Screen)
<img width="606" height="1034" alt="trang_order" src="https://github.com/user-attachments/assets/f39c9120-8bc8-462e-81f3-7e531358fdf6" />

 3. Màn hình Giỏ hàng (Cart Screen)
<img width="613" height="1034" alt="gio_hang" src="https://github.com/user-attachments/assets/ff6f88e8-e225-4529-b14a-c55e0bb1194c" />
