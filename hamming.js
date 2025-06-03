let originalData = '';
let hammingCode = [];

// 8 bitlik veriden Hamming(13,8) kodu üretir
function generateHammingCode() {
    const data = document.getElementById('dataInput').value.trim();
    if (!/^[01]{8}$/.test(data)) {
        document.getElementById('hammingCodeOutput').innerText = 'Lütfen 8 bitlik ikili sayı giriniz (örn: 11010101)';
        return;
    }

    originalData = data;
    const d = data.split('').map(bit => parseInt(bit, 2));
    let h = [];

    // Hamming(13,8) bit yerleşimi (1-indexed)
    // Parite bitleri: 1, 2, 4, 8 → p1, p2, p4, p8
    // Veri bitleri: 3,5,6,7,9,10,11,12
    h[2] = d[0]; // d1
    h[4] = d[1]; // d2
    h[5] = d[2]; // d3
    h[6] = d[3]; // d4
    h[8] = d[4]; // d5
    h[9] = d[5]; // d6
    h[10] = d[6]; // d7
    h[11] = d[7]; // d8

    // Parite bitlerini hesapla (pozisyonlar 0-index değil!)
    h[0] = h[2] ^ h[4] ^ h[6] ^ h[8] ^ h[10];      // p1
    h[1] = h[2] ^ h[5] ^ h[6] ^ h[9] ^ h[10];       // p2
    h[3] = h[4] ^ h[5] ^ h[6] ^ h[11];              // p4
    h[7] = h[8] ^ h[9] ^ h[10] ^ h[11];             // p8

    // Genel parite biti (bit 13, index 12)
    h[12] = h.slice(0, 12).reduce((acc, bit) => acc ^ bit, 0);

    hammingCode = h;
    document.getElementById('hammingCodeOutput').innerText = 'Hamming(13,8) Kodu:\n' + h.join('\n');
    document.getElementById('errorOutput').innerText = '';
    document.getElementById('correctionOutput').innerText = '';
}

// Belirtilen konumdaki biti ters çevirir
function introduceError() {
    const pos = parseInt(document.getElementById('errorBit').value);
    if (isNaN(pos) || pos < 1 || pos > 13) {
        document.getElementById('errorOutput').innerText = 'Lütfen 1 ile 13 arasında bir bit konumu giriniz.';
        return;
    }

    hammingCode[pos - 1] ^= 1;
    document.getElementById('errorOutput').innerText = `Hata enjekte edildi. Yeni Hamming Kodu:\n${hammingCode.join('\n')}`;
    document.getElementById('correctionOutput').innerText = '';
}

// Hata tespiti ve düzeltme
function detectAndCorrectError() {
    let h = [...hammingCode];
    let s1 = h[0] ^ h[2] ^ h[4] ^ h[6] ^ h[8] ^ h[10];
    let s2 = h[1] ^ h[2] ^ h[5] ^ h[6] ^ h[9] ^ h[10];
    let s4 = h[3] ^ h[4] ^ h[5] ^ h[6] ^ h[11];
    let s8 = h[7] ^ h[8] ^ h[9] ^ h[10] ^ h[11];
    let syndrome = s1 * 1 + s2 * 2 + s4 * 4 + s8 * 8;

    const overallParity = h.slice(0, 12).reduce((acc, bit) => acc ^ bit, 0) ^ h[12];

    if (syndrome === 0 && overallParity === 0) {
        document.getElementById('correctionOutput').innerText = '✅ Hata yok. Kod doğru.';
    } else if (syndrome !== 0 && overallParity === 1) {
        // Tek bit hatası → düzeltilebilir
        h[syndrome - 1] ^= 1;
        hammingCode = h;
        document.getElementById('correctionOutput').innerText = `✅ Tek bit hatası bulundu ve düzeltildi. Pozisyon: ${syndrome}\nDüzeltilmiş Kod:\n${h.join('\n')}`;
    } else if ((syndrome !== 0 && overallParity === 0) || (syndrome === 0 && overallParity === 1)) {
        // Çift bit hatası → düzeltilemez
        document.getElementById('correctionOutput').innerText = '❌ Çift bit hatası tespit edildi. Düzeltilemez.';
    }
}

