"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  // Fetch stores from Firestore
  useEffect(() => {
    const fetchStores = async () => {
      const querySnapshot = await getDocs(collection(db, "stores"));
      const storesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStores(storesList);
      setFilteredStores(storesList);
    };
    fetchStores();
  }, []);

  // Add new store to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.length > 512) {
      alert("Deskripsi maksimal 512 karakter.");
      return;
    }
    try {
      await addDoc(collection(db, "stores"), { name, category, whatsapp, description });
      setName("");
      setCategory("");
      setWhatsapp("");
      setDescription("");
      alert("Toko berhasil ditambahkan!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Handle search
  useEffect(() => {
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchQuery, stores]);

  return (
    <div>
      <h1>Daftar Toko</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari Toko atau Kategori"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredStores.map(store => (
          <div key={store.id} style={cardStyle} onClick={() => setSelectedStore(store)}>
            <strong>{store.name}</strong>
            <p>{store.category}</p>
            <p>{store.description.substring(0, 100)}...</p>
            <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer">Hubungi via WhatsApp</a>
          </div>
        ))}
      </div>

      {/* Modal untuk menampilkan deskripsi lengkap */}
      {selectedStore && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>{selectedStore.name}</h2>
            <p><strong>Kategori:</strong> {selectedStore.category}</p>
            <p>{selectedStore.description}</p>
            <a href={`https://wa.me/${selectedStore.whatsapp}`} target="_blank" rel="noopener noreferrer">Hubungi via WhatsApp</a>
            <br />
            <button onClick={() => setSelectedStore(null)} style={{ marginTop: "10px" }}>Tutup</button>
          </div>
        </div>
      )}

      <h2>Tambah Toko</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Toko"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nomor WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <textarea
          placeholder="Deskripsi Toko (maksimal 512 karakter)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={512}
        />
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}

// Styling untuk card dan modal
const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  width: "250px",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "400px",
  textAlign: "center"
};
