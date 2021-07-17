## monitor-sdk
一个前端监控SDK，目标是能够统计网站PV、UV和前端性能以及一些前端错误。

---
目前一期规划为：
1. 完成SDK各个模块的编写，分别为：send、build、monitor。
其中send模块调用sendBeacon方法以及重试等功能，build模块对监控到的信息进行构建，monitor是整个sdk的核心部分负责采集相关信息。
2. 对于后端内容，一期目标是对统计信息进行简单的落库即可，同时对SDK请求进行204响应。目前打算使用koa完成。

一期目标完成时间：8月18日前完成。

---
二期规划:
完成前端平台侧、后端（后端使用主流后端语言编写）的编写，完善SDK功能。
二期完成时间：年内完成