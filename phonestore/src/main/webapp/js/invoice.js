async function loadMyInvoice() {
    var url = 'http://localhost:8080/api/invoice/user/find-by-user';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td onclick="loadDetailInvoice(${list[i].id})" data-bs-toggle="modal" data-bs-target="#modaldeail"><a class="yls pointer-event">#${list[i].id}</a></td>
                    <td class="floatr">${list[i].createdTime}<br>${list[i].createdDate}</td>
                    <td>${list[i].address}</td>
                    <td class="floatr"><span class="yls">${formatmoney(list[i].totalAmount)}</span></td>
                    <td class="floatr"><span class="yls">${formatmoney(list[i].shipCost)}</span></td>
                    <td><span class="span_pending">${list[i].payType == 'MOMO'?'<span class="dathanhtoan">Đã thanh toán</span>':'<span class="chuathanhtoan">Chưa thanh toán</span>'}</span></td>
                    <td class="floatr"><span class="span_">${list[i].statusInvoice}</span></td>
                    <td>
                    ${(list[i].statusInvoice == "DANG_CHO_XAC_NHAN" || list[i].statusInvoice== "DA_XAC_NHAN") && list[i].payType == 'COD'?
                    `<i onclick="cancelInvoice(${list[i].id})" class="fa fa-trash-o huydon"></i>`:''}
                    </td>
                </tr>`
    }
    document.getElementById("listinvoice").innerHTML = main
    document.getElementById("sldonhang").innerHTML = list.length+' đơn hàng'
}

async function loadDetailInvoice(id) {
    var url = 'http://localhost:8080/api/invoice-detail/user/find-by-invoice?idInvoice='+id;
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await res.json();
    var main = ''
    for(i=0; i< list.length; i++){
        main += `<tr>
                    <td><img src="${list[i].product.imageBanner}" class="imgdetailacc"></td>
                    <td>
                        <a href="detail?id=${list[i].product.id}">${list[i].product.name}</a><br>
                        <span>${list[i].productColor.name} / ${list[i].productStorage.ram} - ${list[i].productStorage.rom}</span><br>
                        <span>Mã sản phẩm: ${list[i].product.code}</span><br>
                        <span class="slmobile">SL: ${list[i].quantity}</span>
                    </td>
                    <td>${formatmoney(list[i].price)}</td>
                    <td class="sldetailacc">${list[i].quantity}</td>
                    <td class="pricedetailacc yls">${formatmoney(list[i].price * list[i].quantity)}</td>
                </tr>`
    }
    document.getElementById("listDetailinvoice").innerHTML = main

    var url = 'http://localhost:8080/api/invoice/user/find-by-id?idInvoice='+id;
    const resp = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var result = await resp.json();
    document.getElementById("ngaytaoinvoice").innerHTML = result.createdTime+" " + result.createdDate 
    document.getElementById("trangthaitt").innerHTML = result.payType=="MOMO"?"Đã thanh toán":"Thanh toán khi nhận hàng"
    document.getElementById("loaithanhtoan").innerHTML = result.payType=="MOMO"?"Thanh toán qua momo":"Thanh toán khi nhận hàng (COD)"
    document.getElementById("ttvanchuyen").innerHTML = result.statusInvoice
    document.getElementById("tennguoinhan").innerHTML = result.receiverName
    document.getElementById("addnhan").innerHTML = result.address
    document.getElementById("addnhan").innerHTML = result.address
    document.getElementById("phonenhan").innerHTML = result.phone
    document.getElementById("phonenhan").innerHTML = result.phone
    document.getElementById("ghichunh").innerHTML = result.note=="" ||result.note==null?'Không có ghi chú':result.note
}

async function cancelInvoice(id) {
    var con = confirm("xác nhận hủy đơn hàng này");
    if(con == false){
        return;
    }
    var url = 'http://localhost:8080/api/invoice/user/cancel-invoice?idInvoice='+id;
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(res.status < 300){
        toastr.success("Hủy đơn hàng thành công!");
        loadMyInvoice();
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}


async function timKiemDonHang() {
    var id = document.getElementById("madonhang").value
    var phone = document.getElementById("sodienthoai").value
    var url = 'http://localhost:8080/api/invoice/public/tim-kiem-don-hang?id='+id+'&phone='+phone;
    const response = await fetch(url, {
    });
    var result = await response.json();
    if(response.status == exceptionCode){
        toastr.warning(result.defaultMessage);
        return;
    }
    console.log(result);
    var  main = `<tr>
        <td><a class="yls pointer-event">#${result.id}</a></td>
        <td class="floatr">${result.createdTime} ${result.createdDate}</td>
        <td>${result.address}</td>
        <td class="floatr"><span class="yls">${formatmoney(result.totalAmount)}</span></td>
        <td><span class="span_pending">${result.payType == 'MOMO'?'<span class="dathanhtoan">Đã thanh toán</span>':'<span class="chuathanhtoan">Chưa thanh toán</span>'}</span></td>
        <td class="floatr"><span class="span_">${result.statusInvoice}</span></td>
    </tr>`
    document.getElementById("listinvoice").innerHTML = main
}