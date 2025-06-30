import { useState, useEffect } from 'react';

/**
 * Hook quản lý các trạng thái giao diện người dùng (UI state).
 */
export const useUI = (selectedTable, autoOpenMenu) => {
    const [activeSection, setActiveSection] = useState('tables');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedMenuType, setSelectedMenuType] = useState('regular');
    const [tableFilter, setTableFilter] = useState('all');
    
    // Dialogs State
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [currentNoteType, setCurrentNoteType] = useState('table'); // 'table' or 'item'
    const [currentNoteTarget, setCurrentNoteTarget] = useState(null); // tableId or itemId
    const [noteInput, setNoteInput] = useState('');
    const [showChangeTableDialog, setShowChangeTableDialog] = useState(false);

    // Effect to auto-open menu when a table is selected
    useEffect(() => {
        if (selectedTable && autoOpenMenu) {
            setActiveSection('menu');
        }
    }, [selectedTable, autoOpenMenu]);

    // Note Dialog Handlers
    const handleNoteSubmit = ({ setTableNotes, setItemNotes, selectedTable }) => {
        if (currentNoteType === 'table') {
            setTableNotes(prev => ({ ...prev, [selectedTable]: noteInput }));
        } else if (currentNoteType === 'item') {
            const itemKey = `${selectedTable}-${currentNoteTarget}`;
            setItemNotes(prev => ({ ...prev, [itemKey]: noteInput }));
        }
        setNoteInput('');
        setShowNoteDialog(false);
    };

    const openTableNoteDialog = (tableNotes, selectedTable) => {
        setCurrentNoteType('table');
        setNoteInput(tableNotes[selectedTable] || '');
        setShowNoteDialog(true);
    };

    const openItemNoteDialog = (itemId, itemNotes, selectedTable) => {
        setCurrentNoteType('item');
        setCurrentNoteTarget(itemId);
        const itemKey = `${selectedTable}-${itemId}`;
        setNoteInput(itemNotes[itemKey] || '');
        setShowNoteDialog(true);
    };
    
    return {
        activeSection, searchTerm, selectedCategory, selectedMenuType, tableFilter,
        setActiveSection, setSearchTerm, setSelectedCategory, setSelectedMenuType, setTableFilter,
        showNoteDialog, setShowNoteDialog, noteInput, setNoteInput, currentNoteType,
        showChangeTableDialog, setShowChangeTableDialog,
        handleNoteSubmit, openTableNoteDialog, openItemNoteDialog,
    };
};