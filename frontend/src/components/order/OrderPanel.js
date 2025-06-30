// frontend/src/components/order/OrderPanel.js
import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  X,
  Plus,
  Minus,
  MessageSquare,
  Edit3,
} from 'lucide-react';

const OrderPanel = ({
    selectedTable,
    orders,
    itemNotes,
    tableNotes,
    updateQuantity,
    clearTable,
    processPayment, // Sẽ dùng trong các bước sau
    openItemNoteDialog,
    openTableNoteDialog,
    openChangeTableDialog,
    handlePrint, // Sẽ dùng trong các bước sau
  }) => {
    const [showClearDialog, setShowClearDialog] = useState(false);
    // Các state cho dialog thanh toán sẽ được dùng sau
    // const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    
    const currentOrders = selectedTable ? orders[selectedTable] || [] : [];
    const totalAmount = currentOrders.reduce((total, item) => total + item.price * item.quantity, 0);
  
    return (
      <div className="w-96 bg-primary-main flex flex-col h-screen shadow-2xl">
        {/* Header: Hiển thị thông tin bàn */}
        <div className="p-6 bg-primary-main shadow-md">
            <div className="flex items-center justify-between mb-3">
              <button
                  onClick={openChangeTableDialog}
                  disabled={!selectedTable}
                  className="flex items-center gap-3 cursor-pointer disabled:cursor-not-allowed"
              >
                  <div className="w-10 h-10 bg-primary-button rounded-xl flex items-center justify-center">
                      <span className="text-primary-main font-bold text-lg">{selectedTable === 'takeaway' ? '📦' : selectedTable || '?'}</span>
                  </div>
                  <div>
                      <h2 className="text-xl font-bold text-primary-headline">{selectedTable === 'takeaway' ? 'MANG VỀ' : `BÀN ${selectedTable || '?'}`}</h2>
                      <p className="text-xs text-primary-paragraph">{selectedTable === 'takeaway' ? 'Đơn hàng mang về' : 'Đơn hàng tại bàn'}</p>
                  </div>
                  {selectedTable && (<Edit3 size={16} className="text-primary-paragraph ml-2" />)}
              </button>
  
            {currentOrders.length > 0 && (
              <button onClick={() => setShowClearDialog(true)} className="text-primary-paragraph hover:text-primary-tertiary transition-colors p-2">
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
  
        {/* Body: Danh sách các món trong đơn hàng */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={24} className="text-primary-button" />
              </div>
              <h3 className="text-lg font-bold text-primary-headline mb-1">
                Chưa có món nào
              </h3>
              <p className="text-primary-paragraph text-sm">
                {selectedTable ? 'Thêm món từ thực đơn' : 'Chọn bàn để bắt đầu'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentOrders.map((item) => (
                  <div key={item.orderItemId} className="bg-primary-secondary rounded-2xl p-4 shadow-md">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-primary-bg rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-primary-headline text-sm truncate">{item.name}</h4>
                          <button onClick={() => updateQuantity(item.orderItemId, 0)} className="text-primary-paragraph hover:text-primary-tertiary transition-colors ml-2 p-1">
                            <X size={14} />
                          </button>
                        </div>
                        {/* Logic hiển thị ghi chú món ăn (sẽ hoàn thiện sau) */}
                        <button onClick={() => openItemNoteDialog(item.orderItemId)} className="flex items-center gap-1 text-xs text-primary-paragraph hover:text-primary-highlight mb-2">
                          <MessageSquare size={12} />
                          Thêm ghi chú
                        </button>
                        <div className="flex items-center justify-between">
                          <p className="text-primary-headline font-bold text-lg">{item.price.toLocaleString('vi-VN')}đ</p>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.orderItemId, item.quantity - 1)} className="w-8 h-8 rounded-xl bg-primary-bg hover:bg-primary-stroke flex items-center justify-center transition-colors">
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-bold text-primary-headline">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.orderItemId, item.quantity + 1)} className="w-8 h-8 rounded-xl bg-primary-button hover:bg-primary-highlight text-primary-main flex items-center justify-center transition-all">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Footer: Tổng kết và nút Thanh toán */}
        {currentOrders.length > 0 && (
          <div className="bg-primary-secondary p-6 shadow-inner">
            <div className="bg-primary-main rounded-2xl p-4 mb-4 shadow-lg">
              <h3 className="text-lg font-bold text-center text-primary-headline mb-4">
                PHIẾU THANH TOÁN
              </h3>
  
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Bàn số:</span>
                  <span className="font-bold text-primary-button">#{String(selectedTable).padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Thời gian:</span>
                  <span className="font-bold text-primary-headline">{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Số món:</span>
                  <span className="font-bold text-primary-headline">{currentOrders.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-paragraph">Ghi chú:</span>
                  <button onClick={openTableNoteDialog} className="text-primary-button hover:text-primary-highlight flex items-center gap-1">
                    <Edit3 size={12} />
                    <span className="text-xs">Thêm ghi chú</span>
                  </button>
                </div>
              </div>
  
              <div className="border-t border-primary-stroke pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-headline">TỔNG CỘNG:</span>
                  <span className="text-xl font-bold text-primary-button">{totalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>
  
            <button className="w-full bg-primary-button hover:bg-primary-highlight text-primary-main py-3 rounded-xl font-bold text-lg transition-all shadow-lg">
                THANH TOÁN
            </button>
          </div>
        )}
  
        {/* Dialog xác nhận xóa */}
        {showClearDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
              <h3 className="text-lg font-bold text-primary-headline mb-4">Xác nhận xóa</h3>
              <p className="text-primary-paragraph mb-6">Bạn có chắc chắn muốn xóa tất cả món ăn trong {selectedTable === 'takeaway' ? 'đơn mang về' : `bàn ${selectedTable}`}?</p>
              <div className="flex gap-3">
                <button onClick={() => { clearTable(); setShowClearDialog(false); }} className="flex-1 bg-primary-tertiary text-primary-main py-2 rounded-xl font-bold shadow-md">Xóa</button>
                <button onClick={() => setShowClearDialog(false)} className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md">Hủy</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default OrderPanel;
