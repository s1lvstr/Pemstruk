const dataTable = document.getElementById("dataTable");
const btnTambah = document.querySelector(".btn-tambah");
const activityList = document.getElementById("activityList");

// Modal elements
const modalTambah = document.getElementById("modalTambah");
const formTambah = document.getElementById("formTambah");
const modalEdit = document.getElementById("modalEdit");
const formEdit = document.getElementById("formEdit");

let inventori = JSON.parse(localStorage.getItem("inventori")) || [];
let aktivitas = JSON.parse(localStorage.getItem("aktivitas")) || [];
let editingIndex = null;

// Event listeners
btnTambah.addEventListener("click", openModalTambah);
formTambah.addEventListener("submit", submitTambahData);
formEdit.addEventListener("submit", submitEditData);

// Close modal when clicking outside
modalTambah.addEventListener("click", (e) => {
    if (e.target === modalTambah) closeModalTambah();
});

modalEdit.addEventListener("click", (e) => {
    if (e.target === modalEdit) closeModalEdit();
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModalTambah();
        closeModalEdit();
    }
});

tampilkanData();
updateStatistik();
updateActivity();

function updateStatistik() {
    const totalBarang = inventori.length;
    const barangAktif = inventori.filter(item => item.jumlah > 5).length;
    const stokMenipis = inventori.filter(item => item.jumlah <= 5 && item.jumlah > 0).length;

    document.getElementById("totalBarang").textContent = totalBarang;
    document.getElementById("barangAktif").textContent = barangAktif;
    document.getElementById("stokMenipis").textContent = stokMenipis;
}

function updateActivity() {
    if (aktivitas.length === 0) {
        activityList.innerHTML = '<p class="empty-activity">Belum ada aktivitas</p>';
        return;
    }

    activityList.innerHTML = "";
    
    // Tampilkan 10 aktivitas terbaru
    const recentActivities = aktivitas.slice(-10).reverse();
    
    recentActivities.forEach(item => {
        const activityItem = document.createElement("div");
        activityItem.className = "activity-item";
        activityItem.innerHTML = `
            <div class="activity-action">${item.aksi}</div>
            <div class="activity-time">${item.waktu}</div>
        `;
        activityList.appendChild(activityItem);
    });
}

function addActivity(aksi) {
    const waktu = new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    aktivitas.push({ aksi, waktu });
    
    // Simpan max 50 aktivitas
    if (aktivitas.length > 50) {
        aktivitas.shift();
    }
    
    localStorage.setItem("aktivitas", JSON.stringify(aktivitas));
    updateActivity();
}

function tampilkanData() {

    if (inventori.length === 0) {
        dataTable.innerHTML = `
            <tr>
                <td colspan="7">Belum ada data barang</td>
            </tr>
        `;
        return;
    }

    dataTable.innerHTML = "";

    inventori.forEach((item, index) => {

        let status = item.jumlah <= 5
            ? '<span class="status-menipis">Menipis</span>'
            : '<span class="status-aktif">Tersedia</span>';

        dataTable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.kategori}</td>
                <td>${item.lokasi || "-"}</td>
                <td>${item.jumlah}</td>
                <td>${status}</td>
                <td>
                    <button class="btn-edit"
                        onclick="openModalEdit(${index})">
                        Edit
                    </button>

                    <button class="btn-hapus"
                        onclick="hapusData(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });
}

// Modal functions for Tambah
function openModalTambah() {
    formTambah.reset();
    modalTambah.classList.add("active");
    document.getElementById("nama").focus();
}

function closeModalTambah() {
    modalTambah.classList.remove("active");
    formTambah.reset();
}

function submitTambahData(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const kategori = document.getElementById("kategori").value.trim();
    const lokasi = document.getElementById("lokasi").value.trim();
    const jumlah = parseInt(document.getElementById("jumlah").value);

    if (!nama || !kategori || isNaN(jumlah) || jumlah < 0) {
        alert("Harap isi semua field dengan benar!");
        return;
    }

    const barangBaru = {
        nama,
        kategori,
        lokasi,
        jumlah
    };

    inventori.push(barangBaru);
    addActivity(`Menambahkan barang: ${nama}`);
    simpanData();
    tampilkanData();
    updateStatistik();
    closeModalTambah();
    showNotification("Data barang berhasil ditambahkan!");
}

// Modal functions for Edit
function openModalEdit(index) {
    editingIndex = index;
    const barang = inventori[index];

    document.getElementById("editNama").value = barang.nama;
    document.getElementById("editKategori").value = barang.kategori;
    document.getElementById("editLokasi").value = barang.lokasi || "";
    document.getElementById("editJumlah").value = barang.jumlah;

    modalEdit.classList.add("active");
    document.getElementById("editNama").focus();
}

function closeModalEdit() {
    modalEdit.classList.remove("active");
    formEdit.reset();
    editingIndex = null;
}

function submitEditData(e) {
    e.preventDefault();

    if (editingIndex === null) return;

    const nama = document.getElementById("editNama").value.trim();
    const kategori = document.getElementById("editKategori").value.trim();
    const lokasi = document.getElementById("editLokasi").value.trim();
    const jumlah = parseInt(document.getElementById("editJumlah").value);

    if (!nama || !kategori || isNaN(jumlah) || jumlah < 0) {
        alert("Harap isi semua field dengan benar!");
        return;
    }

    inventori[editingIndex] = {
        nama,
        kategori,
        lokasi,
        jumlah
    };

    addActivity(`Mengedit barang: ${nama}`);
    simpanData();
    tampilkanData();
    updateStatistik();
    closeModalEdit();
    showNotification("Data barang berhasil diperbarui!");
}

function hapusData(index) {

    if (confirm("Yakin ingin menghapus data ini?")) {

        const namaBarang = inventori[index].nama;
        inventori.splice(index, 1);

        addActivity(`Menghapus barang: ${namaBarang}`);
        simpanData();
        tampilkanData();
        updateStatistik();
        showNotification("Data barang berhasil dihapus!");
    }
}

function simpanData() {
    localStorage.setItem(
        "inventori",
        JSON.stringify(inventori)
    );
}

function showNotification(message) {
    alert(message);
}