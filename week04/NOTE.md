## 学习笔记
本周学习了浏览器的工作原理，浏览器的工作流程主要有

* 通过 URL 发送请求获取 HTML 
* 对 HTML 进行文本分析，把 HTML 解析为 DOM 树 
* CSS computing：计算 DOM 上对应的 CSS 规则，哪些 CSS 规则会叠加，哪些规则会覆盖，得到一颗带样式的 DOM 树
* layout：把 DOM 树上所有元素产生的盒的位置计算出来
* render： 生成 Bitmap

本周主要学习并实现了 Toy Browser 的前面两个步骤。本周大量运用了状态机的技巧，无论是解析 HTTP response 还是解析 HTML，都需要使用状态机进行处理。在使用状态机进行解析的过程中，对 HTTP 协议的内容以及 HTML 的词法都加深了印象。