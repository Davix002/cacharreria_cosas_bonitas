import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import { getCategories, deleteCategory,createCategory } from '../../../config/api/apiUtils';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        await deleteCategory(id);
        setCategories(categories.filter(cat => cat._id !== id));
    }

    const handleFormSubmit = () => {
        setSelectedCategory(null);
        // Refetch the categories to reflect the changes.
    }

    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = async () => {
        if (newCategoryName.trim() === '') {
            alert('El nombre de la categoría no puede estar vacío.');
            return;
        }
        
        // Crea la nueva categoría
        const newCategory = await createCategory({ name: newCategoryName });
        
        // Actualiza el estado local con la nueva categoría
        setCategories([...categories, newCategory]);
        
        // Limpia el input
        setNewCategoryName('');
    }
    
    return (
        <div className="bg-gray-100 p-6 rounded-md place-items-center shadow-md w-full flex flex-col justify-center items-center">

            {selectedCategory ? (
                <CategoryForm
                    categoryToUpdate={selectedCategory}
                    onFormSubmit={handleFormSubmit}
                />
            ) : (
                <>
                    <div className="w-2/4 mb-4">
                        <input
                            className="border p-2 w-full"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nombre de la nueva categoría"
                        />
                        <button
                            className="bg-blue-600 text-white p-2 mt-2 rounded w-full"
                            onClick={handleAddCategory}
                        >
                            Agregar Categoría
                        </button>
                    </div>
                    <table className="bg-white  w-2/4 rounded-md shadow-md overflow-hidden">

                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4">Nombre de la categoria</th>
                                <th className="py-2 px-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat._id} className="hover:bg-gray-100">
                                    <td className="border-t py-2 px-4">{cat.name}</td>
                                    <td className="border-t py-2 px-4 just flex justify-around">
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className="mr-2 rounded-md shadow-md text-romTurquoise-600 hover:text-blue-800 focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat._id)}
                                            className=" rounded-md shadow-md text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}


export default CategoryList;