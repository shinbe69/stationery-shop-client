import './footer.css'

export default function Footer() {
    return (
        <div id="footer">
            <div id='footerChild' >
            <div>
                <h3>Thông tin liên hệ:</h3>
                <p>Địa chỉ: 2A Trương Phước Phan, Phường Bình Trị Đông, Quận Bình Tân.</p>
                <p>Số điện thoại: 0964209830</p>
                {/* <a href='https://zalo.me/0868931400' target='blank'><img src='/zalo.png' alt='zalo' id='linkZalo' /></a> */}
            </div>
            
            <div>
                <h3>Về cửa hàng Diệu Thiện</h3>
                <p>Shop Diệu Thiện chuyên cung cấp các ấn phẩm, dụng cụ, thiết bị liên quan đến Phật giáo. Ngoài ra, trang web còn cung cấp, chia sẻ thư viện Kinh, sách, Phật pháp miễn phí.</p>
            </div>
            </div>
        </div>
    )
}