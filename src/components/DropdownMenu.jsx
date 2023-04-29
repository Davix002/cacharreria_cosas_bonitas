import React, { useState } from 'react';

const SubMenu = "block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm";

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-4 relative inline-block "
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button

            >
                Productos
            </button>
            {isOpen && (
                <div
                    className="flex absolute mt-2 w-max rounded bg-white shadow-lg py-1 z-10 -ml-36"
                    onClick={() => setIsOpen(false)}

                >
                    <div >
                        <a href="#" className={SubMenu}>
                            Aseo del hogar
                        </a>
                        <a href="#" className={SubMenu}>
                            Mascotas
                        </a>
                        <a href="#" className={SubMenu}>
                            Papelería
                        </a>
                        <a href="#" className={SubMenu}>
                            Plasticos
                        </a>

                    </div>
                    <div >
                        <a href="#" className={SubMenu}>
                            Aseo y cuidado personal
                        </a>
                        <a href="#" className={SubMenu}>
                            Jugueteria y fiestas
                        </a>
                        <a href="#" className={SubMenu}>
                            Electro y tecnología
                        </a>
                        <a href="#" className={SubMenu}>
                            DecoHogar
                        </a>
                    </div>
                    <div >
                        <a href="#" className={SubMenu}>
                            Variedades
                        </a>
                        <a href="#" className={SubMenu}>
                            Cocina
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
