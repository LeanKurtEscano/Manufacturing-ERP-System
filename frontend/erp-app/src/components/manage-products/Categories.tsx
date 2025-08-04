import React from 'react'
import { useProductContext } from '../../contexts/ProductContext';
import type { Category } from '../../constants/interfaces/manageProducts';
interface CategoryProps {
  handleAddCategory: () => void;
  categories: Category[];
}
const Categories: React.FC<CategoryProps> = ({ handleAddCategory, categories }) => {


  const handleDeleteCategory = (id: string) => {

  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>+</span> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-slate-400 text-sm">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories