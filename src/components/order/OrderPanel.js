import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  X,
  Plus,
  Minus,
  MessageSquare,
  Edit3,
  ArrowLeft,
  Check,
  Percent,
  DollarSign,
  Banknote,
  CreditCard,
} from 'lucide-react';


const PaymentDialog = ({
    setShowPaymentDialog,
    selectedTable,
    getCurrentOrders,
    getTotalAmount,
    processPayment,
  }) => {
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'transfer'
    const [discountType, setDiscountType] = useState('none'); // 'none', 'percent', 'amount'
    const [discountValue, setDiscountValue] = useState(0);
    const [partialPayment, setPartialPayment] = useState(false);
    const [paidAmount, setPaidAmount] = useState(0);
  
    const subtotal = getTotalAmount();
  
    const getDiscountAmount = () => {
      if (discountType === 'percent') {
        return (subtotal * discountValue) / 100;
      } else if (discountType === 'amount') {
        return discountValue;
      }
      return 0;
    };
  
    const discountAmount = getDiscountAmount();
    const finalAmount = subtotal - discountAmount;
  
    const getRemainingAmount = () => {
      if (partialPayment) {
        return Math.max(0, finalAmount - paidAmount);
      }
      return 0;
    };
  
    const handleProcessPayment = () => {
      const paymentData = {
        paymentMethod,
        discountType,
        discountValue,
        discountAmount,
        subtotal,
        total: finalAmount,
        partialPayment,
        paidAmount: partialPayment ? paidAmount : finalAmount,
        remainingAmount: getRemainingAmount(),
      };
      processPayment(paymentData);
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-primary-main rounded-3xl w-full max-w-5xl max-h-[90vh] shadow-2xl flex overflow-hidden">
          {/* Left side - Order details */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="w-12 h-12 bg-primary-secondary rounded-xl flex items-center justify-center hover:bg-primary-highlight transition-colors"
              >
                <ArrowLeft size={20} className="text-primary-button" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-primary-headline">Thanh toán</h1>
                <p className="text-primary-paragraph">
                  {selectedTable === 'takeaway' ? 'Đơn mang về' : `Bàn ${selectedTable}`}
                </p>
              </div>
            </div>
  
            {/* Order Items - Scrollable */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-headline mb-4">Chi tiết đơn hàng</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {getCurrentOrders().map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-primary-secondary rounded-xl shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-bg rounded-xl overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-headline">{item.name}</h4>
                        <p className="text-sm text-primary-paragraph">Số lượng: {item.quantity}</p>
                        <p className="text-sm text-primary-button font-medium">{item.price.toLocaleString('vi-VN')}đ x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-button">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Discount Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-headline mb-4">Giảm giá</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  onClick={() => setDiscountType('none')}
                  className={`p-3 rounded-xl font-medium transition-all shadow-md ${
                    discountType === 'none'
                      ? 'bg-primary-button text-primary-main'
                      : 'bg-primary-secondary text-primary-button'
                  }`}
                >
                  Không giảm
                </button>
                <button
                  onClick={() => setDiscountType('percent')}
                  className={`p-3 rounded-xl font-medium transition-all shadow-md ${
                    discountType === 'percent'
                      ? 'bg-primary-button text-primary-main'
                      : 'bg-primary-secondary text-primary-button'
                  }`}
                >
                  <Percent size={16} className="inline mr-1" />
                  Theo %
                </button>
                <button
                  onClick={() => setDiscountType('amount')}
                  className={`p-3 rounded-xl font-medium transition-all shadow-md ${
                    discountType === 'amount'
                      ? 'bg-primary-button text-primary-main'
                      : 'bg-primary-secondary text-primary-button'
                  }`}
                >
                  <DollarSign size={16} className="inline mr-1" />
                  Số tiền
                </button>
              </div>
  
              {discountType !== 'none' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    placeholder={discountType === 'percent' ? 'Nhập % giảm' : 'Nhập số tiền giảm'}
                    className="flex-1 p-3 bg-primary-secondary rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                  />
                  <span className="text-primary-paragraph">
                    {discountType === 'percent' ? '%' : 'VND'}
                  </span>
                </div>
              )}
            </div>
  
            {/* Price Summary */}
            <div className="bg-primary-secondary rounded-xl p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-primary-paragraph">Tạm tính:</span>
                  <span className="font-bold text-primary-headline">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
  
                {discountAmount > 0 && (
                  <div className="flex justify-between text-lg text-red-600">
                    <span>Giảm giá:</span>
                    <span className="font-bold">-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
  
                <div className="border-t border-primary-stroke pt-3">
                  <div className="flex justify-between text-2xl">
                    <span className="font-bold text-primary-headline">Tổng cộng:</span>
                    <span className="font-bold text-primary-button">{finalAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right side - Payment options */}
          <div className="w-80 bg-primary-secondary p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-primary-headline mb-6">Phương thức thanh toán</h2>
  
            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-primary-headline mb-3">Hình thức</h3>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl font-medium transition-all shadow-md ${
                    paymentMethod === 'cash'
                      ? 'bg-primary-button text-primary-main'
                      : 'bg-primary-main text-primary-button'
                  }`}
                >
                  <Banknote size={20} className="inline mr-2" />
                  Tiền mặt
                </button>
                <button
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-4 rounded-xl font-medium transition-all shadow-md ${
                    paymentMethod === 'transfer'
                      ? 'bg-primary-button text-primary-main'
                      : 'bg-primary-main text-primary-button'
                  }`}
                >
                  <CreditCard size={20} className="inline mr-2" />
                  Chuyển khoản
                </button>
              </div>
            </div>
  
            {/* Partial Payment */}
            <div className="mb-6">
              <label className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={partialPayment}
                  onChange={(e) => setPartialPayment(e.target.checked)}
                  className="w-5 h-5 text-primary-button"
                />
                <span className="text-lg font-bold text-primary-headline">Thanh toán một phần</span>
              </label>
  
              {partialPayment && (
                <div className="space-y-3">
                  <input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    placeholder="Số tiền thanh toán"
                    className="w-full p-3 bg-primary-main rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                  />
                  <div className="text-sm text-primary-paragraph">
                    <p>Còn lại: <span className="font-bold text-primary-tertiary">{getRemainingAmount().toLocaleString('vi-VN')}đ</span></p>
                  </div>
                </div>
              )}
            </div>
  
            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-primary-headline mb-3">Số tiền nhanh</h3>
              <div className="grid grid-cols-2 gap-2">
                {[50000, 100000, 200000, 500000, 1000000, 2000000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => partialPayment ? setPaidAmount(amount) : null}
                    className="p-2 bg-primary-main hover:bg-primary-button hover:text-primary-main rounded-lg text-sm font-medium transition-all shadow-md"
                  >
                    {(amount / 1000).toLocaleString('vi-VN')}k
                  </button>
                ))}
              </div>
            </div>
  
            {/* Payment Actions */}
            <div className="space-y-3">
              <button
                onClick={handleProcessPayment}
                disabled={partialPayment && (paidAmount <= 0 || paidAmount > finalAmount)}
                className="w-full bg-primary-button hover:bg-primary-highlight text-primary-main py-4 rounded-xl font-bold text-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={20} className="inline mr-2" />
                {partialPayment ? 'Thanh toán một phần' : 'Hoàn tất thanh toán'}
              </button>
  
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="w-full bg-primary-main hover:bg-primary-paragraph text-primary-button py-3 rounded-xl font-bold transition-all shadow-md"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

const OrderPanel = ({
  selectedTable,
  orders,
  itemNotes,
  tableNotes,
  updateQuantity,
  clearTable,
  processPayment,
  openItemNoteDialog,
  openTableNoteDialog,
}) => {
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const getCurrentOrders = () =>
    selectedTable ? orders[selectedTable] || [] : [];
  const getTotalAmount = () => {
    return getCurrentOrders().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const currentOrders = getCurrentOrders();
  const totalAmount = getTotalAmount();

  return (
    <div className="w-[480px] bg-primary-main flex flex-col h-screen shadow-2xl">
      {/* Header - Fixed */}
      <div className="p-6 bg-primary-main shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-button rounded-xl flex items-center justify-center">
              <span className="text-primary-main font-bold text-lg">
                {selectedTable === 'takeaway' ? '📦' : selectedTable || '?'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-headline">
                {selectedTable === 'takeaway'
                  ? 'MANG VỀ'
                  : `BÀN ${selectedTable || '?'}`}
              </h2>
              <p className="text-xs text-primary-paragraph">
                {selectedTable === 'takeaway'
                  ? 'Đơn hàng mang về'
                  : 'Đơn hàng tại bàn'}
              </p>
            </div>
          </div>

          {currentOrders.length > 0 && (
            <button
              onClick={() => setShowClearDialog(true)}
              className="text-primary-paragraph hover:text-primary-tertiary transition-colors p-2"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Order Items - Scrollable */}
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
            {currentOrders.map((item) => {
              const itemKey = `${selectedTable}-${item.id}`;
              const itemNote = itemNotes[itemKey];
              return (
                <div
                  key={item.id}
                  className="bg-primary-secondary rounded-2xl p-4 shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary-bg rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-primary-headline text-sm truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => updateQuantity(item.id, 0)}
                          className="text-primary-paragraph hover:text-primary-tertiary transition-colors ml-2 p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      {itemNote ? (
                        <div className="rounded-lg p-2 mb-2 shadow-sm">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-primary-headline">
                              {itemNote}
                            </p>
                            <button
                              onClick={() => openItemNoteDialog(item.id)}
                              className="text-primary-button hover:text-primary-highlight"
                            >
                              <Edit3 size={12} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => openItemNoteDialog(item.id)}
                          className="flex items-center gap-1 text-xs text-primary-paragraph hover:text-primary-highlight mb-2"
                        >
                          <MessageSquare size={12} />
                          Thêm ghi chú
                        </button>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-primary-headline font-bold text-lg">
                          {item.price.toLocaleString('vi-VN')}đ
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-xl bg-primary-bg hover:bg-primary-stroke flex items-center justify-center transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center font-bold text-primary-headline">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-xl bg-primary-button hover:bg-primary-highlight text-primary-main flex items-center justify-center transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Section - Fixed */}
      {currentOrders.length > 0 && (
        <div className="bg-primary-secondary p-6 shadow-inner">
          <div className="bg-primary-main rounded-2xl p-4 mb-4 shadow-lg">
            <h3 className="text-lg font-bold text-center text-primary-headline mb-4">
              PHIẾU THANH TOÁN
            </h3>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between items-center">
                <span className="text-primary-paragraph">
                  {selectedTable === 'takeaway' ? 'Mang về:' : 'Bàn số:'}
                </span>
                <span className="font-bold text-primary-button">
                  {selectedTable === 'takeaway'
                    ? 'Mang về'
                    : `#${String(selectedTable).padStart(2, '0')}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-paragraph">Thời gian:</span>
                <span className="font-bold text-primary-headline">
                  {new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-paragraph">Số món:</span>
                <span className="font-bold text-primary-headline">
                  {currentOrders.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              {/* Table Note */}
              <div className="flex justify-between items-center">
                <span className="text-primary-paragraph">Ghi chú:</span>
                <button
                  onClick={openTableNoteDialog}
                  className="text-primary-button hover:text-primary-highlight flex items-center gap-1"
                >
                  {tableNotes[selectedTable] ? (
                    <span className="font-medium text-xs max-w-32 truncate">
                      {tableNotes[selectedTable]}
                    </span>
                  ) : (
                    <>
                      <Edit3 size={12} />
                      <span className="text-xs">Thêm ghi chú</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-primary-stroke pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary-headline">
                  TỔNG CỘNG:
                </span>
                <span className="text-xl font-bold text-primary-button">
                  {totalAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              className="w-full bg-primary-button hover:bg-primary-highlight text-primary-main py-3 rounded-xl font-bold text-lg transition-all shadow-lg"
              onClick={() => setShowPaymentDialog(true)}
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      )}

      {/* Clear Table Dialog */}
      {showClearDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-primary-headline mb-4">
              Xác nhận xóa
            </h3>
            <p className="text-primary-paragraph mb-6">
              Bạn có chắc chắn muốn xóa tất cả món ăn trong{' '}
              {selectedTable === 'takeaway'
                ? 'đơn mang về'
                : `bàn ${selectedTable}`}
              ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  clearTable();
                  setShowClearDialog(false);
                }}
                className="flex-1 bg-primary-tertiary text-primary-main py-2 rounded-xl font-bold shadow-md"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowClearDialog(false)}
                className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Dialog Modal */}
      {showPaymentDialog && (
        <PaymentDialog
          setShowPaymentDialog={setShowPaymentDialog}
          selectedTable={selectedTable}
          getCurrentOrders={getCurrentOrders}
          getTotalAmount={getTotalAmount}
          processPayment={processPayment}
        />
      )}
    </div>
  );
};

export default OrderPanel;