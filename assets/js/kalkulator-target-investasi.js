const kalkulatorTargetInvestasi = document.getElementById('kalkulator-target-investasi');
let resikoTab3 = document.getElementById('profil-resiko-tab3');
let returnPertahunTab3 = document.getElementById('return-pertahun-tab3');
let investasiSaatIni = document.getElementById('investasi-saat-ini');
let investasiPerbulan = document.getElementById('investasi-perbulan');
let targetInvestasi = document.getElementById('target-investasi');
let waktuTab3 = document.getElementById('jangka-waktu-tab3');
let tingkatInflasiTab3 = document.getElementById('inflasi-tab3');
let rangeTahunTab3 = document.getElementById('range-tahun-tab3');


resikoTab3.addEventListener('change', function () {
    let resikoSelectedTab3 = resikoTab3.options[resikoTab3.selectedIndex].value;
    switch (resikoSelectedTab3) {
        case "1":
            returnPertahunTab3.value = "6";
            break;
        case "2":
            returnPertahunTab3.value = "7";
            break;
        case "3":
            returnPertahunTab3.value = "10";
            break;
        case "4":
            returnPertahunTab3.value = "15";
            break;
        default:
            break;
    }
})

rangeTahunTab3.addEventListener('input', function () {
    waktuTab3.value = rangeTahunTab3.value;
})

waktuTab3.addEventListener('change', function () {
    rangeTahunTab3.value = waktuTab3.value;
})

kalkulatorTargetInvestasi.addEventListener('change', function () {
    let targetInvestasiTab3 = clearFormat(targetInvestasi.value);
    let danaInvestasi = 0;
    let bunga = 1 + (returnPertahunTab3.value / 100);
    bunga -= tingkatInflasiTab3.value / 100;
    bunga = Math.pow(bunga, waktuTab3.value);
    // console.log(bunga);

    danaInvestasi = targetInvestasiTab3 / bunga;
    investasiSaatIni.innerHTML = "Rp. " + formatRupiah(Math.round(danaInvestasi).toString(), "Rp. ");

    let returnPerbulan = returnPertahunTab3.value / 12;
    let inflasiPerbulan = tingkatInflasiTab3.value / 12;
    let bulan = waktuTab3.value * 12;
    let danaInvestasiPerbulan = 0;

    let bungaPerbulan = 1 + (returnPerbulan / 100);
    bungaPerbulan = Math.pow(bungaPerbulan, bulan);
    console.clear();
    console.log('return perbulan ' + returnPerbulan);
    console.log('inflasi  ' + inflasiPerbulan);
    console.log('bunga  ' + bungaPerbulan);
    danaInvestasiPerbulan = targetInvestasiTab3 / bungaPerbulan;
    // investasiPerbulan.innerHTML = "Rp. " + formatRupiah(Math.round(danaInvestasiPerbulan).toString(), "Rp. ");


})

targetInvestasi.addEventListener("keyup", function (e) {
    targetInvestasi.value = formatRupiah(this.value, "Rp. ");
});


function clearFormat(angka) {
    return angka.replace(/[.]/g, '').toString();
}

function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? rupiah : "";
}