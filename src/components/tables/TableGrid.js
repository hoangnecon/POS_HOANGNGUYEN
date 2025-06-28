import React from 'react';

const TableGrid = ({
  tables,
  selectedTable,
  setSelectedTable,
  orders,
  tableFilter,
  setTableFilter,
  recentItems,
  menuItems,
  addToOrder,
}) => {
  const getRecentMenuItems = () => {
    return recentItems
      .map((id) => menuItems.find((item) => item.id === id))
      .filter(Boolean)
      .slice(0, 6);
  };

  const getFilteredTables = () => {
    const allTables = Object.values(tables);
    if (tableFilter === 'available') {
      return allTables.filter(
        (table) => !orders[table.id] || orders[table.id].length === 0
      );
    } else if (tableFilter === 'used') {
      return allTables.filter(
        (table) => orders[table.id] && orders[table.id].length > 0
      );
    }
    return allTables;
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-primary-bg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary-headline mb-3">CASHAA</h1>
        <p className="text-primary-paragraph text-lg">Quản lý bàn ăn hiện đại</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTableFilter('all')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
            tableFilter === 'all'
              ? 'bg-primary-button text-primary-main shadow-lg'
              : 'bg-primary-main text-primary-headline hover:bg-primary-highlight'
          }`}
        >
          Tất cả bàn
        </button>
        <button
          onClick={() => setTableFilter('available')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
            tableFilter === 'available'
              ? 'bg-primary-button text-primary-main shadow-lg'
              : 'bg-primary-main text-primary-headline hover:bg-primary-hightlight'
          }`}
        >
          Còn trống
        </button>
        <button
          onClick={() => setTableFilter('used')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-md ${
            tableFilter === 'used'
              ? 'bg-primary-button text-primary-main shadow-lg'
              : 'bg-primary-main text-primary-headline hover:bg-primary-secondary'
          }`}
        >
          Đã sử dụng
        </button>
      </div>

      {/* Recent Items Row */}
      {recentItems.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-primary-headline mb-4">
            Món gần đây
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {getRecentMenuItems().map((item) => (
              <button
                key={item.id}
                onClick={() => addToOrder(item)}
                className="flex-shrink-0 px-4 py-2 bg-primary-main rounded-xl hover:bg-primary-secondary transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="text-sm font-medium text-primary-headline whitespace-nowrap">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table Grid */}
      <div className="grid grid-cols-8 gap-4">
        {/* Takeaway Button - First position */}
        <button
          onClick={() => setSelectedTable('takeaway')}
          className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg ${
            selectedTable === 'takeaway'
              ? 'bg-primary-button text-primary-main shadow-xl'
              : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
          }`}
        >
          <div className="text-lg mb-1">📦</div>
          <div className="font-bold text-xs">Mang về</div>
        </button>

        {/* Regular Tables */}
        {getFilteredTables().map((table) => {
          const hasOrders = orders[table.id] && orders[table.id].length > 0;
          return (
            <button
              key={table.id}
              onClick={() => setSelectedTable(table.id)}
              className={`aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg ${
                selectedTable === table.id
                  ? 'bg-primary-button text-primary-main shadow-xl'
                  : hasOrders
                  ? 'bg-primary-button-light text-primary-button shadow-md'
                  : 'bg-primary-main text-primary-button hover:bg-primary-secondary'
              }`}
            >
              <div className="text-lg mb-1">{hasOrders ? '🟢' : '⚪'}</div>
              <div className="font-bold text-sm">{table.id}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableGrid;