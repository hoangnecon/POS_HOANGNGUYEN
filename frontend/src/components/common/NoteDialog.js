import React from 'react';

/**
 * Component hiển thị dialog để nhập ghi chú cho bàn hoặc món ăn.
 */
const NoteDialog = ({ isOpen, noteType, noteInput, setNoteInput, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
                <h3 className="text-lg font-bold text-primary-headline mb-4">
                    {noteType === 'table' ? 'Ghi chú đơn hàng' : 'Ghi chú món ăn'}
                </h3>
                <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Nhập ghi chú..."
                    className="w-full h-24 p-3 rounded-xl bg-primary-secondary text-primary-headline resize-none focus:ring-2 focus:ring-primary-highlight shadow-md"
                    autoFocus
                />
                <div className="flex gap-3 mt-4">
                    <button onClick={onSubmit} className="flex-1 bg-primary-button text-primary-main py-2 rounded-xl font-bold shadow-md">
                        Lưu
                    </button>
                    <button onClick={onClose} className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteDialog;