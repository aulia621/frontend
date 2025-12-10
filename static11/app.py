from flask import Flask, render_template, request, redirect, session
# Impor PyMongo dan BSON ObjectId untuk bekerja dengan ID MongoDB
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
app.secret_key = "aulia28"

# 🛠️ 1. KONFIGURASI KONEKSI MONGODB
# Ganti dengan string koneksi MongoDB Anda
client = MongoClient('mongodb://localhost:27017/') 
db = client['crud_db'] # Mengakses database 'crud_db'
products_collection = db['products'] # Mengakses koleksi 'products'

# Fungsi pembantu untuk mengonversi ObjectId ke string agar bisa diserialisasi
def serialize_mongo_id(item):
    if item and '_id' in item:
        # Konversi ObjectId ke string untuk ditampilkan di HTML/template
        item['id'] = str(item['_id'])
        del item['_id']
    return item

@app.route("/")
def index():
    # 🔎 Mengambil semua dokumen dari koleksi 'products'
    # Menggunakan list comprehension untuk mengonversi hasil menjadi list
    products = [serialize_mongo_id(p) for p in products_collection.find()]
    return render_template("index.html", products=products)

@app.route("/product/<id>")
def product_detail(id):
    # 🔎 Mengambil satu dokumen berdasarkan ID
    try:
        # MongoDB menggunakan ObjectId, jadi kita harus mengonversi string ID menjadi ObjectId
        product = products_collection.find_one({"_id": ObjectId(id)})
        product = serialize_mongo_id(product)
    except:
        # Tangani jika ID tidak valid
        product = None
    
    return render_template("product_detail.html", product=product)

@app.route("/cart/add/<id>")
def add_to_cart(id):
    if "cart" not in session:
        session["cart"] = []
    
    # Simpan ID produk (sebagai string) di sesi
    session["cart"].append(id)
    return redirect("/cart")

@app.route("/cart")
def cart():
    if "cart" not in session:
        session["cart"] = []

    cart_items = []
    # Mengumpulkan semua ID unik di keranjang
    product_ids_to_fetch = [ObjectId(pid) for pid in set(session["cart"])]
    
    # 🔎 Mengambil semua produk sekaligus menggunakan $in operator
    # Hanya mengambil produk yang ID-nya ada di daftar
    fetched_products = products_collection.find({"_id": {"$in": product_ids_to_fetch}})
    
    # Buat dictionary untuk mapping ID ke data produk
    product_map = {str(p['_id']): serialize_mongo_id(p) for p in fetched_products}
    
    # Bangun daftar item keranjang, mempertahankan urutan dan duplikat
    for pid_str in session["cart"]:
        if pid_str in product_map:
            # Gunakan salinan produk dari map untuk menghindari masalah referensi
            # (Bergantung pada bagaimana Anda menampilkan duplikat di template)
            cart_items.append(product_map[pid_str].copy()) 
    
    return render_template("cart.html", cart_items=cart_items)

@app.route("/checkout")
def checkout():
    # Di aplikasi nyata, Anda akan memproses pembayaran di sini
    # Setelah berhasil, Anda dapat mengosongkan keranjang
    session.pop("cart", None)
    return render_template("checkout.html")

if __name__ == "__main__":
    app.run(debug=True)