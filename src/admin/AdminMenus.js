import React, { useState } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';

const AdminMenus = ({
  menuTypes,
  setMenuTypes,
  menuItems,
  addMenuType,
  deleteMenuType,
}) => {
  const [showAddMenuDialog, setShowAddMenuDialog] = useState(false);
  const [showEditMenuDialog, setShowEditMenuDialog] = useState(false);
  const [selectedMenuTypeEdit, setSelectedMenuTypeEdit] = useState(null);
  const [newMenuType, setNewMenuType] = useState('');
  const [newMenuName, setNewMenuName] = useState('');

  const handleAddMenu = () => {
    if (newMenuType && newMenuName) {
      addMenuType(newMenuType, newMenuName);
      setNewMenuType('');
      setNewMenuName('');
      setShowAddMenuDialog(false);
    }
  };

  const handleUpdateMenu = () => {
    if (newMenuName && selectedMenuTypeEdit) {
      setMenuTypes(
        menuTypes.map((menu) =>
          menu.id === selectedMenuTypeEdit.id
            ? { ...menu, name: newMenuName }
            : menu
        )
      );
      setShowEditMenuDialog(false);
      setSelectedMenuTypeEdit(null);
      setNewMenuName('');
    }
  };


  return (
    <div className="p-8 h-full overflow-y-auto bg-primary-bg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary-headline mb-3">
            Quản lý Menu
          </h1>
          <p className="text-primary-paragraph text-lg">
            Thêm, sửa, xóa các loại menu
          </p>
        </div>
        <button
          onClick={() => setShowAddMenuDialog(true)}
          className="bg-primary-button text-primary-main px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-highlight transition-colors shadow-lg"
        >
          <Plus size={20} />
          Thêm Menu Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuTypes.map((menu) => (
          <div key={menu.id} className="bg-primary-main rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-primary-headline">
                {menu.name}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedMenuTypeEdit(menu);
                    setNewMenuName(menu.name);
                    setShowEditMenuDialog(true);
                  }}
                  className="p-2 text-primary-button hover:bg-primary-secondary rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => deleteMenuType(menu.id)}
                  className="p-2 text-primary-tertiary hover:bg-primary-tertiary-light rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-primary-paragraph">
                Số món: {menuItems.filter((item) => item.menuType === menu.id).length}
              </p>
              <p className="text-sm text-primary-paragraph">ID: {menu.id}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Menu Dialog */}
      {showAddMenuDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-primary-headline mb-4">
              Thêm Menu Mới
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-paragraph mb-2">
                  ID Menu
                </label>
                <input
                  type="text"
                  value={newMenuType}
                  onChange={(e) => setNewMenuType(e.target.value)}
                  placeholder="vd: summer, winter..."
                  className="w-full p-3 bg-primary-secondary rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-paragraph mb-2">
                  Tên Menu
                </label>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="vd: Thực đơn mùa hè"
                  className="w-full p-3 bg-primary-secondary rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddMenu}
                className="flex-1 bg-primary-button text-primary-main py-2 rounded-xl font-bold shadow-md hover:bg-primary-highlight transition-colors"
              >
                Thêm
              </button>
              <button
                onClick={() => {
                  setShowAddMenuDialog(false);
                  setNewMenuType('');
                  setNewMenuName('');
                }}
                className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md hover:bg-primary-stroke transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Menu Dialog */}
      {showEditMenuDialog && selectedMenuTypeEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary-main rounded-2xl p-6 m-4 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-primary-headline mb-4">
              Sửa Menu
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-paragraph mb-2">
                  Tên Menu
                </label>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="w-full p-3 bg-primary-secondary rounded-xl text-primary-headline focus:ring-2 focus:ring-primary-highlight shadow-md"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateMenu}
                className="flex-1 bg-primary-button text-primary-main py-2 rounded-xl font-bold shadow-md hover:bg-primary-highlight transition-colors"
              >
                Cập nhật
              </button>
              <button
                onClick={() => {
                  setShowEditMenuDialog(false);
                  setSelectedMenuTypeEdit(null);
                  setNewMenuName('');
                }}
                className="flex-1 bg-primary-secondary text-primary-button py-2 rounded-xl font-bold shadow-md hover:bg-primary-stroke transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenus;