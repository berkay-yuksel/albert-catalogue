GORSEL KLASORU - KULLANIM TALIMATI
====================================

Bu klasore urun fotograflarini asagidaki isimlendirme kuraliyla ekleyin.
Hangi urunun hangi dosya adina karsilik geldigini
"product-image-list.csv" dosyasinda gorebilirsiniz.

ISIMLENDIRME KURALI:
  {kategori-kisaltmasi}{siradaki-numara}{gorunum-harfi}.jpg

Kategori kisaltmalari:
  Chain               -> chain
  Bracelet            -> bracelet
  Ring                -> ring
  Necklace            -> necklace
  8K Gold Collection  -> 8k
  Tobacco Pipe        -> pipe

Numara, o kategori icindeki siraya gore 1'den baslar (chain1, chain2, ...).
Gorunum harfi:
  a -> Ana/Standart fotograf (ZORUNLU - bu olmazsa metin yer tutucusu
       gosterilir)
  b -> Acili gorunum fotografi (OPSIYONEL)
  c -> Yakin plan / detay fotografi (OPSIYONEL)

ORNEK: Chain kategorisindeki ilk urun icin:
  images/chain1a.jpg
  images/chain1b.jpg   (opsiyonel)
  images/chain1c.jpg   (opsiyonel)

Bracelet kategorisindeki ilk urun icin:
  images/bracelet1a.jpg
  images/bracelet1b.jpg (opsiyonel)
  images/bracelet1c.jpg (opsiyonel)

Notlar:
- "b" veya "c" dosyasini eklemezseniz, sistem otomatik olarak ana
  fotografi (orn. chain1a.jpg) kullanir; hata vermez.
- Hicbir fotograf yoksa, kart uzerinde urun kategorisi ve adiyla sade
  bir metin kutusu gorunur (kirik resim ikonu cikmaz).
- Tum urunlerin tam listesi ve dosya adlari icin
  product-image-list.csv dosyasina bakin.
- Farkli bir dosya uzantisi (.png, .webp vb.) kullanmak isterseniz,
  albert.html icindeki IMAGE_EXT degiskenini degistirin.
- Klasoru tasimak isterseniz IMAGE_BASE_PATH degiskenini guncelleyin.
