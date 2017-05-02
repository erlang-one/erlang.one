#### special-author
Andy
#### special-addition
Erlang Applications
#### special-site
[erlang.one](http://erlang.one/)
#### special-title
Спецвыпуск: N2O для ненадёжных сетей и IoT периферии
#### special-date
May, 2017

# Спецвыпуск: N2O для ненадёжных сетей и IoT периферии

## Become more reliable

[N2O](https://github.com/synrc/n2o) - высокопроизводительный и компактный full-stack релей-сервер приложений на [Erlang](https://www.erlang.org/), форкнутый от 
фреймворка Nitrogen и вобравший в себя когда-то лучшие его идеи. Четыре года назад N2O избавился от ненужных зависимостей и 
стал одновременно мощным средством для создания web-приложений. А сегодня, начиная с версии N2O-4.5, протоколы данных 
переведены на более высокий уровень и становятся лежащими поверх протокола [MQTT 5.0](https://en.wikipedia.org/wiki/MQTT), обеспечивающего доставку сообщений в 
ненадёжных сетях с уровнями [QoS](https://en.wikipedia.org/wiki/Quality_of_service) 0, 1 и 2. 

## More compatibility with IoT

До этого N2O поддерживал передачу своих данных, кодированных в [BERT](http://bert-rpc.org/), **XML**, **JSON**, **MessagePack** и **TEXT** через 
протокол [WebSocket](https://en.wikipedia.org/wiki/WebSocket), теперь это возможно подключением по 
WebSocket, [MQTT](https://en.wikipedia.org/wiki/MQTT), [Stomp](https://stomp.github.io/), 
[CoAP](http://coap.technology/) и [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)/[UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) что связано 
с использованием [EMQ](http://emqtt.io/) - чистого и лаконичного MQTT-брокера, написанного также на Erlang.

## Forced changes

Мы создали [плагин к EMQ](https://github.com/synrc/mqtt), работающий полностью в рамках сессий [EMQ](http://emqtt.io/), подобно тому как N2O работал в сессиях [Ranch](https://github.com/ninenines/ranch).

## Features of N2O

- Бинарные протоколы и обновление контента сервером без задержек через [полнодуплексную связь](https://en.wikipedia.org/wiki/Duplex_(telecommunications)#Full_duplex).
- Шифрование [AES CBC 128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard).
- Приложения [SPA](https://en.wikipedia.org/wiki/Single-page_application), и классические [Dynamic Pages](https://en.wikipedia.org/wiki/Dynamic_web_page).
- Передача медиаданных на скорости до [200Мбит/с](http://5ht.co/ftp.htm) и возможностью паузы и докачки.
- Автоматические реконнекты
- [PubSub-роутинг](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) через [mqs](https://github.com/synrc/mqs), [Gproc](https://github.com/uwiger/gproc), [Syn](https://github.com/ostinelli/syn).
- Возможность упаковки приложений в единый исполняемый файл для Windows, Linux и Mac через rebar-совместимую утилиту сборки [mad](https://github.com/synrc/mad).
- HTML5, DSL, нет зависимостей от JS-библиотек.
