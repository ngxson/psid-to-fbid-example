### Lấy Facebook ID gốc từ PSID

**English translation: Coming Soon**

Các bác dev chatbot trước giờ chắc vẫn đau đầu về việc làm thế nào lấy đc id gốc của người dùng (id đầu 1000....), trong khi webhook hay Chatfuel chỉ cung cấp psid.

Vậy có id gốc để làm gì? Khi có id rồi các bác có mấy trò nghịch như
* Lấy đc nhiều thông tin hơn về user (trường học, nơi ở, danh sách bạn bè,...)
* Check xem user đã like page/post nào đó chưa
* Mở chatbot chỉ cho người trong group
* Dùng unofficial facebook API, ví dụ như [facebook-chat-api](https://github.com/Schmavery/facebook-chat-api)

Repo này chứ code mẫu cho package mới của mình, psid-to-fbid. Package này giúp truy ra id gốc từ webhook.

### Cách dùng

__Lưu ý__

* **access_token** dùng trong hướng dẫn là **token Android hoặc iOS**, chính là token Ctrl+U (hướng dẫn chi tiết [ở đây](https://github.com/ngxson/psid-to-fbid#getstarted))
* Bạn phải là **admin** hoặc **editor** của page
* Không hỗ trợ get id với tin nhắn là postback từ buttons (nhưng quick replies thì được)

Do code cũng khá ngắn nên các bác đã code chatbot đều hiểu hết. Trong code mẫu mình dùng database firebase, nhưng bạn có thể thay bằng cơ chế riêng của bạn.

__Với chatbot bên thứ 3 (như Chatfuel)__

1. Gộp code ở repo vào code có sẵn của bạn (trong code này mình dùng database firebase, bạn có thể thay bằng cơ chế riêng của bạn)
2. Tạo 1 app mới tại https://developers.facebook.com/
3. Vào phần Messenger của app, kết nối app vào page
4. Thêm webhook với messenger, tick chọn mục **messages** và **messaging_postbacks**. URL trong code mẫu là https://server-cua-ban.com/webhook, nhưng bạn có thể thay đổi sao thì tùy.

---------------------------------------
### Tác giả
* ngxson (Nui Nguyen)
* My website: https://ngxson.com