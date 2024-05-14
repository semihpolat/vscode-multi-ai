# Refactor with ChatGPT

Bu VSCode eklentisi, seçili metni ChatGPT ile yeniden yapılandırmanızı sağlar. Sağ tıklama menüsüne "Refactor with ChatGPT" seçeneğini ekler ve bu seçenek seçili metni Gemini API'ye göndererek yeniden yapılandırılmış metni geri alır.

## Kurulum

1. `vsce package` komutunu kullanarak eklentiyi paketleyin.
2. Paketlenen `.vsix` dosyasını VSCode'a yükleyin (`Extensions` panelinde `Install from VSIX...` seçeneğini kullanarak).

## Kullanım

1. VSCode'da bir metni seçin.
2. Sağ tıklayın ve "Refactor with ChatGPT" seçeneğini seçin.
3. Açılan giriş kutusuna refactoring talimatlarınızı girin ve Enter'a basın.
4. Seçili metin, girilen talimatlara göre yeniden yapılandırılacak.

## Geliştirme

Bu eklenti TypeScript ve VSCode Extension API kullanılarak geliştirilmiştir. Katkıda bulunmak isterseniz, lütfen projeyi forklayın ve pull request gönderin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.
