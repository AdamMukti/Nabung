const tab1 = document.getElementById('dana-investasi');
let resikoTab1 = document.getElementById('profil-resiko-tab1');
let returnPertahunTab1 = document.getElementById('return-pertahun-tab1');
let hasilInvestasiTab1 = document.getElementById('hasil-investasi-tab1');
let danaTab1 = document.getElementById('dana-investasi-tab1');
let waktuTab1 = document.getElementById('jangka-waktu-tab1');
let tingkatInflasiTab1 = document.getElementById('inflasi-tab1');
let rangeTahunTab1 = document.getElementById('range-tahun-tab1');

resikoTab1.addEventListener('change', function () {
    let resikoSelectedTab1 = resikoTab1.options[resikoTab1.selectedIndex].value;
    switch (resikoSelectedTab1) {
        case "1":
            returnPertahunTab1.value = "6";
            break;
        case "2":
            returnPertahunTab1.value = "7";
            break;
        case "3":
            returnPertahunTab1.value = "10";
            break;
        case "4":
            returnPertahunTab1.value = "15";
            break;
        default:
            break;
    }
});

rangeTahunTab1.addEventListener('input', function () {
    waktuTab1.value = rangeTahunTab1.value;
});

waktuTab1.addEventListener('change', function () {
    rangeTahunTab1.value = waktuTab1.value;
});

tab1.addEventListener('change', function () {
    let danaInvestasiTab1 = clearFormat(danaTab1.value);
    let inflasiTab1 = 0;
    let hasilInvestasi = 0;

    for (let i = 0; i < waktuTab1.value; i++) {
        inflasiTab1 = danaInvestasiTab1 * (tingkatInflasiTab1.value / 100);
        danaInvestasiTab1 *= (1 + returnPertahunTab1.value / 100);
        hasilInvestasi = danaInvestasiTab1 - inflasiTab1;
    }

    hasilInvestasiTab1.innerHTML = "Rp. " + formatRupiah(Math.round(hasilInvestasi).toString(), "Rp. ");
});

danaTab1.addEventListener("keyup", function (e) {
    danaTab1.value = formatRupiah(this.value, "Rp. ");
});


const tab2 = document.getElementById('investasi-berkala');
let resikoTab2 = document.getElementById('profil-resiko-tab2');
let returnPertahunTab2 = document.getElementById('return-pertahun-tab2');
let hasilInvestasiTab2 = document.getElementById('hasil-investasi-tab2');
let danaTab2 = document.getElementById('dana-investasi-tab2');
let waktuTab2 = document.getElementById('jangka-waktu-tab2');
let tingkatInflasiTab2 = document.getElementById('inflasi-tab2');
let rangeTahunTab2 = document.getElementById('range-tahun-tab2');

resikoTab2.addEventListener('change', function () {
    let resikoSelectedTab2 = resikoTab2.options[resikoTab2.selectedIndex].value;
    switch (resikoSelectedTab2) {
        case "1":
            returnPertahunTab2.value = "6";
            break;
        case "2":
            returnPertahunTab2.value = "7";
            break;
        case "3":
            returnPertahunTab2.value = "10";
            break;
        case "4":
            returnPertahunTab2.value = "15";
            break;
        default:
            break;
    }
});

rangeTahunTab2.addEventListener('input', function () {
    waktuTab2.value = rangeTahunTab2.value;
});

waktuTab2.addEventListener('change', function () {
    rangeTahunTab2.value = waktuTab2.value;
});

tab2.addEventListener('change', function () {
    let danaInvestasiTab2 = 0;
    let inflasiTab2 = 0;
    let bulan = waktuTab2.value;
    let returnPerBulan = returnPertahunTab2.value / 12;
    let inflasiPerBulan = tingkatInflasiTab2.value / 12;
    let hasilInvestasi = 0;

    for (let i = 0; i < bulan; i++) {
        danaInvestasiTab2 += parseInt(clearFormat(danaTab2.value));
        inflasiTab2 = danaInvestasiTab2 * (inflasiPerBulan / 100);
        danaInvestasiTab2 *= (1 + returnPerBulan / 100);
        danaInvestasiTab2 -= inflasiTab2;

        hasilInvestasi = danaInvestasiTab2;
    }

    hasilInvestasiTab2.innerHTML = "Rp. " + formatRupiah(Math.round(hasilInvestasi).toString(), "Rp. ");
});

danaTab2.addEventListener("keyup", function (e) {
    danaTab2.value = formatRupiah(this.value, "Rp. ");
});
