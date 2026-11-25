
import { useState } from 'react';
import { Search, PlusCircle, Tag, ShoppingBag, MessageCircle, Trash2, Sparkles } from 'lucide-react';

const INITIAL_LISTINGS = [
  {
    id: 1,
    title: 'Sarı Boyalı 1:24 Die-Cast Model Araba',
    category: 'Hobi & Koleksiyon',
    condition: 'İkinci El (Özenle Yenilendi)',
    price: 450,
    seller: 'Metehan',
    description: 'Boya sıyrılıp sarı renge boyandı, far ve stop detayları elle işlendi. Vitrinlik temiz kondisyonda.',
  },
  {
    id: 2,
    title: 'El Örgüsü Paraşüt İpi (Paracord) Bileklik',
    category: 'El Emeği & Aksesuar',
    condition: 'Sıfır',
    price: 120,
    seller: 'Atölye Çarşı',
    description: 'Sağlam dokuma, günlük ve doğa yürüyüşü kullanımına uygun el yapımı bileklik.',
  },
  {
    id: 3,
    title: 'Elektronik Devre Deney Seti (Breadboard + Jumper)',
    category: 'Elektronik',
    condition: 'İkinci El',
    price: 320,
    seller: 'DevreAtolyesi',
    description: 'Temel devre kurma ve test çalışmaları için sağlam durumda, eksiksiz set.',
  },
];

const CATEGORIES = ['Tümü', 'Elektronik', 'Hobi & Koleksiyon', 'El Emeği & Aksesuar', 'Diğer'];

export default function App() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Elektronik');
  const [condition, setCondition] = useState('İkinci El');
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('Çarşı Pazar yayına hazır! İlan ekleyip filtreleyebilirsin.');

  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function handleAddListing(e) {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      category,
      condition,
      price: Number(price),
      seller: seller.trim() || 'Misafir Satıcı',
      description: description.trim() || 'Açıklama eklenmedi.',
    };

    setListings([newItem, ...listings]);
    setTitle('');
    setPrice('');
    setSeller('');
    setDescription('');
    setShowForm(false);
    setNote(`"${newItem.title}" ilanı eklendi.`);
  }

  function handleDelete(id) {
    setListings(listings.filter((item) => item.id !== id));
    setNote('İlan listeden kaldırıldı.');
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ backgroundColor: '#f59e0b', color: '#fff', padding: 8, borderRadius: 10, display: 'flex' }}>
              <ShoppingBag size={22} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>Çarşı Pazar</h1>
              <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Sıfır & İkinci El Alım-Satım</p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <PlusCircle size={17} />
            {showForm ? 'Kapat' : 'İlan Ver'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '18px 16px 48px' }}>
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '10px 14px', borderRadius: 10, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} />
          <span>{note}</span>
        </div>

        {showForm && (
          <form onSubmit={handleAddListing} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16, marginBottom: 20, display: 'grid', gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 16 }}>Yeni İlan Oluştur</h2>
            <input
              type="text"
              placeholder="Ürün başlığı (ör. İkinci el kulaklık)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
                {CATEGORIES.filter((c) => c !== 'Tümü').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
                <option value="Sıfır">Sıfır</option>
                <option value="İkinci El">İkinci El</option>
                <option value="İkinci El (Özenle Yenilendi)">İkinci El (Yenilenmiş)</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input
                type="number"
                placeholder="Fiyat (₺)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                required
                style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
              />
              <input
                type="text"
                placeholder="Satıcı adı (isteğe bağlı)"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
              />
            </div>
            <textarea
              placeholder="Ürün durumu ve detayları..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, resize: 'vertical' }}
            />
            <button
              type="submit"
              style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            >
              İlanı Yayınla
            </button>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: 12, color: '#64748b' }} />
            <input
              type="text"
              placeholder="Ürün, açıklama veya satıcı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 14, backgroundColor: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '7px 13px',
                    borderRadius: 999,
                    border: active ? '1px solid #0f172a' : '1px solid #cbd5e1',
                    backgroundColor: active ? '#0f172a' : '#ffffff',
                    color: active ? '#ffffff' : '#334155',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {filteredListings.map((item) => (
            <article key={item.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, backgroundColor: '#f1f5f9', color: '#334155', padding: '4px 8px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Tag size={12} /> {item.category}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{item.condition}</span>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: 16 }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.45 }}>{item.description}</p>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{item.price} ₺</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Satıcı: {item.seller}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => setNote(`"${item.title}" için satıcı (${item.seller}) ile mesajlaşma seçildi.`)}
                    title="Mesaj Gönder"
                    style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex' }}
                  >
                    <MessageCircle size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="İlanı Sil"
                    style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 16px', color: '#64748b', backgroundColor: '#fff', borderRadius: 14, border: '1px solid #e2e8f0' }}>
            Aradığın kriterlere uygun ilan bulunamadı.
          </div>
        )}
      </main>
    </div>
  );
}
