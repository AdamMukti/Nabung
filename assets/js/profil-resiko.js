let currentTab = 0;
let x = document.getElementsByClassName("step");
showTab(currentTab);

document.getElementById('nextBtn').addEventListener('click', function () {
    nextPrev(1);
    if (currentTab < x.length) {
        x[currentTab].classList.add('animate__animated', 'animate__fadeInRight');
    }
})

document.getElementById('prevBtn').addEventListener('click', function () {
    nextPrev(-1);
    x[currentTab].classList.replace('animate__fadeInRight', 'animate__fadeInLeft');
})

function showTab(n) {

    let alert = document.getElementById('alert');
    x[n].style.display = "block";
    x[n].addEventListener('change', function () {
        let checkRadio = document.querySelectorAll(`input[name="pt-${n + 1}"]:checked`);
        if (!checkRadio) {
            alert.classList.remove('d-none');
        } else {
            alert.classList.add('d-none');
        }
    })


    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Selesai";
    } else {
        document.getElementById("nextBtn").innerHTML = "Selanjutnya";
    }
}

function nextPrev(n) {
    let x = document.getElementsByClassName("step");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        showHasilInvestasi();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    let step, valid = true;
    step = document.getElementsByClassName("step");

    let checkRadio = document.querySelector(`input[name="pt-${currentTab + 1}"]:checked`);
    if (!checkRadio) {
        let alert = document.getElementById('alert');
        alert.classList.remove('d-none');
        valid = false;
    }

    return valid;
}

function showHasilInvestasi() {
    step = document.getElementsByClassName('step');
    profilResiko = document.getElementById('profil-resiko');
    caption = document.getElementById('profil-resiko-caption');
    document.getElementById('pertanyaan-resiko').classList.add('d-none');
    document.getElementById('hasil-profil-resiko').classList.remove('d-none');;
    let pt = [];


    const SangatKonservatif = {
        profilResiko: "Sangat Konservatif",
        caption: "Kamu lebih mengutamakan keutuhan nilai pokok investasi dan tidak keberatan untuk melepaskan potensi keuntungan yang lebih besar. Kamu tidak bisa menoleransi risiko kehilangan nilai pokok investasi sehingga Kamu cenderung memilih investasi dalam bentuk tabungan/deposito dan Reksa Dana Pasar Uang yang bisa dicairkan setiap saat.",
        alokasi: [
            ['Kas/Deposito', '65%'],
            ['Pasar Uang', '35%'],
            ['Jangka Waktu', '< 1 Tahun']
        ]
    };

    const Konservatif = {
        profilResiko: "Konservatif",
        caption: "Kamu mengharapkan pertumbuhan nilai investasi yang stabil dan penerimaan hasil investasi secara periodik. Kamu hanya bersedia menoleransi risiko yang minimal dan cenderung akan melakukan pencairan dana investasi Kamu jika terjadi penurunan nilai investasi/kerugian.",
        alokasi: [
            ['Kas/Deposito', '30%'],
            ['Pasar Uang', '35%'],
            ['Jangka Waktu', '1 - 3 Tahun']
        ]
    };

    const Moderat = {
        profilResiko: "Moderat",
        caption: "Kamu berinvestasi dengan tujuan mendapatkan pendapatan secara periodik dan pertumbuhan modal dalam jangka menengah sampai panjang. Kamu dapat menerima risiko penurunan nilai investasi dalam jangka pendek untuk memperoleh potensi pertumbuhan modal yang lebih tinggi dalam jangka menengah sampai panjang. Kamu cenderung tidak mencairkan investasi Kamu apabila terjadi penurunan nilai, namun Kamu akan lebih memonitor investasi Kamu.",
        alokasi: [
            ['Kas/Deposito', '10%'],
            ['Pasar Uang', '25%'],
            ['Pendapatan Tetap', '35%'],
            ['Saham', '30%'],
            ['Jangka Waktu', '3 - 4 Tahun']
        ]
    };

    const Agresif = {
        profilResiko: "Agresif",
        caption: "Kamu bertujuan mengembangkan pokok investasi dalam jangka panjang dengan tingkat imbal hasil yang maksimal. Kamu bersedia mengambil risiko yang lebih tinggi untuk memperoleh pertumbuhan nilai investasi yang lebih tinggi dalam jangka panjang. Kamu cenderung tidak akan mencairkan investasi Kamu sekalipun sedang terjadi penurunan atas nilai investasi Kamu.",
        alokasi: [
            ['Kas/Deposito', '10%'],
            ['Pasar Uang', '10%'],
            ['Pendapatan Tetap', '20%'],
            ['Saham', '60%'],
            ['Jangka Waktu', '> 4 Tahun']
        ]
    };



    let value = 0;
    for (let i = 0; i < step.length; i++) {
        pt[i] = document.querySelector(`input[name="pt-${i + 1}"]:checked`);
        value += parseInt(pt[i].value);
    }

    function showAlokasi(alokasi) {
        const parent = document.getElementById('alokasi-investasi');
        for (let i = 0; i < alokasi.length; i++) {
            let div = document.createElement('div');
            let p = document.createElement('p');
            let h2 = document.createElement('h2');
            div.className = 'col-lg-6 col-md-6 col-sm-6 mb-3';
            p.className = 'text-muted';
            p.innerHTML = alokasi[i][0];
            h2.innerHTML = alokasi[i][1];
            div.appendChild(p);
            div.appendChild(h2);
            parent.appendChild(div);
        }
    }


    if (value > 5 && value < 11) {
        profilResiko.innerHTML = SangatKonservatif.profilResiko;
        caption.innerHTML = SangatKonservatif.caption;
        showAlokasi(SangatKonservatif.alokasi);
    } else if (value > 10 && value < 16) {
        profilResiko.innerHTML = Konservatif.profilResiko;
        caption.innerHTML = Konservatif.caption;
        showAlokasi(Konservatif.alokasi);
    } else if (value > 15 && value < 21) {
        profilResiko.innerHTML = Moderat.profilResiko;
        caption.innerHTML = Moderat.caption;
        showAlokasi(Moderat.alokasi);
    } else if (value > 20 && value < 25) {
        profilResiko.innerHTML = Agresif.profilResiko;
        caption.innerHTML = Agresif.caption;
        showAlokasi(Agresif.alokasi);
    }

}