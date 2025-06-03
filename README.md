# 🧮 Hamming(13,8) SEC-DED Simülatörü

## 📌 Proje Tanımı

Bu proje, **Hamming(13,8) SEC-DED** (Single Error Correction – Double Error Detection) kodlama yöntemini görselleştiren ve simüle eden web tabanlı bir uygulamadır.

Kullanıcılar:
- 8 bitlik bir veri girdikten sonra, bu veriye ait Hamming kodunu oluşturabilir,
- Hata enjekte edebilir,
- Hata tespiti ve düzeltme süreçlerini gözlemleyebilir.

---

## 🧠 Temel Kavramlar

- **Hamming(13,8) Kodu**:  
  8 bitlik veri için 4 hata düzeltme parite biti + 1 genel parite biti eklenerek 13 bitlik bir kod elde edilir.

- **SEC-DED (Single Error Correction – Double Error Detection)**:  
  - **Tek bitlik hatayı düzeltir**
  - **Çift bitlik hatayı yalnızca tespit eder**

- **Syndrome**:  
  Parite kontrolleri sonucunda oluşan hata konum bilgisidir.

- **Genel Parite**:  
  Tüm bitlerin XOR'lanması ile elde edilen kontrol bitidir.

---

## 🖥️ Kullanıcı Arayüzü

HTML ile oluşturulmuş sade bir arayüz aşağıdaki bölümlerden oluşur:

1. **Veri Girişi**  
   Kullanıcıdan 8 bitlik ikili veri alınır (örn: `10101100`).

2. **Hamming Kodu Üretimi**  
   Girilen veriye ait Hamming(13,8) kodu hesaplanır ve gösterilir.

3. **Hata Enjeksiyonu**  
   1 ile 13 arasında bir bit konumu seçilerek bu bit terslenir.

4. **Hata Tespiti ve Düzeltme**  
   Kod taranır, hata varsa tespit edilir; tek bit hatasıysa düzeltilir.

---

## ⚙️ Fonksiyonlar

### 🔹 `generateHammingCode()`
- Kullanıcıdan alınan 8 bit veriyi işler.
- 4 parite biti + 1 genel parite biti hesaplanır.
- Oluşturulan 13 bitlik Hamming kodu arayüzde gösterilir.

### 🔹 `introduceError()`
- Kullanıcının belirlediği bit konumunda (1–13) hata oluşturur.
- İlgili biti tersler: `0 → 1` veya `1 → 0`.

### 🔹 `detectAndCorrectError()`
- Parite kontrolleri ile **syndrome** hesaplanır.
- Genel parite biti ile birlikte hata türü belirlenir:

| Syndrome | Genel Parite | Yorum |
|----------|---------------|--------|
| ≠ 0      | Hatalı         | **Tek bit hatası** → düzeltilebilir |
| = 0      | Hatalı         | **Çift bit hatası** → tespit edilebilir, düzeltilemez |
| = 0      | Doğru          | **Hata yok** |

---

## 🔍 Kullanım Senaryosu

1. Kullanıcı `"11010101"` gibi bir veri girer.  
2. **"Hamming Kodunu Oluştur"** butonuna basar.  
3. Uygulama 13 bitlik kodu üretir.  
4. Kullanıcı **"Hata Enjekte Et"** kısmına bir sayı girer (örn: `5`).  
5. Seçilen bit terslenir, hata enjekte edilir.  
6. **"Hata Tespit ve Düzeltme"** butonuna basılır.  
7. Sistem hatayı tespit eder ve gerekiyorsa düzeltir.

---


## 🛠️ Kullanılan Teknolojiler

- HTML5  
- JavaScript  
- Gömülü CSS  

---

## 🚀 Kurulum ve Çalıştırma

1. Aşağıdaki dosyaları aynı klasöre yerleştirin:
   - `index.html`
   - `hamming.js`
2. `index.html` dosyasını bir tarayıcıda açın.  
3. Uygulamayı kullanmaya başlayın!

---

## 🧑‍💻 Geliştirici Notları

Gelecekte yapılabilecek geliştirmeler:

- Koddan orijinal verinin geri çıkarılması (decoding)
- Hata istatistiklerinin tutulması
- Canlı animasyonlar veya görsel eğitim materyalleri eklenmesi

---

## 🎥 Demo & Kaynak

- 🔗 **Demo Videosu**: [https://youtu.be/EiaUfOrArAE](https://youtu.be/EiaUfOrArAE)  
- 🧷 **GitHub Linki**: https://github.com/RabiaCelep/Hamming_Code_Simulator

