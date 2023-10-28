import './footer.css'

export default function Footer() {
    return (
        <div id="footer">
            
            <div style={{ display: 'flex', textAlign: 'left', padding: '2em 0' }}>
            <div style={{ width: '50%' }}>
                <h3>Thông tin liên hệ:</h3>
                <p>Địa chỉ: 2A Trương Phước Phan, Phường Bình Trị Đông, Quận Bình Tân.</p>
                <p>Số điện thoại: 0964209830</p>
            </div>
            <hr style={{ margin: '0 2em' }} />
            <div style={{ width: '50%' }}>
                <h3>Về cửa hàng Diệu Thiện</h3>
                <p>Shop Diệu Thiện chuyên cung cấp các ấn phẩm, dụng cụ, thiết bị liên quan đến Phật giáo. Ngoài ra, trang web còn cung cấp, chia sẻ thư viện Kinh, sách, Phật pháp miễn phí.</p>
            </div>
            </div>
        </div>
    )
}