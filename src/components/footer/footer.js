import './footer.css'

export default function Footer() {
    return (
        <div id="footer">
            <hr style={{ marginBottom: '2em' }} />
            <div id='footerChild' >
                <div style={{ display: 'flex' }}>
                    <img alt='logo' src='logo.png' style={{ width: '20%' }} />
                    <div style={{ width: '80%', padding: '0 0.5em' }}>
                        <h3>Về cửa hàng Diệu Thiện</h3>
                        <p>Shop Diệu Thiện chuyên cung cấp các ấn phẩm, dụng cụ, thiết bị liên quan đến Phật giáo. Ngoài ra, trang web còn cung cấp, chia sẻ thư viện Kinh, sách, Phật pháp miễn phí.</p>
                    </div>
                </div>
                <div>
                    <h3>Thông tin liên hệ:</h3>
                    <p>Địa chỉ: 2A Trương Phước Phan, Phường Bình Trị Đông, Quận Bình Tân.</p>
                    <p>Số điện thoại: 0964209830</p>
                    <h3>Thanh toán qua:</h3>
                    <div style={{ display: 'flex' }}>
                        <img alt='momo' src='momo.png' />
                        <img alt='cod' src='cod.png' />
                        <img alt='visa' src='visa.png' />
                    </div>
                </div>
            
            </div>
        </div>
    )
}