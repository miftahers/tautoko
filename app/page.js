import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Fetch stores from Firestore
  useEffect(() => {
    const fetchStores = async () => {
      const querySnapshot = await getDocs(collection(db, "stores"));
      setStores(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchStores();
  }, []);

  // Add new store to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "stores"), { name, category, whatsapp });
      setName("");
      setCategory("");
      setWhatsapp("");
      alert("Toko berhasil ditambahkan!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h1>Daftar Toko</h1>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            <strong>{store.name}</strong> - {store.category} -{" "}
            <a href={`https://wa.me/${store.whatsapp}`}>Hubungi via WhatsApp</a>
          </li>
        ))}
      </ul>

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
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}
