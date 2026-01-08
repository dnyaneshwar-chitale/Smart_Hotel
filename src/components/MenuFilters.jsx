



import { Search, Leaf } from "lucide-react";
import "../MenuFilters.css";

export function MenuFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  dietFilter,
  onDietFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="filter-container">


      {/* Category Filters */}
      <div className="category">
        <label className="label">Categories</label>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
            >
              {category}
            </button>
          ))}
        </div>
    

      {/* Additional Filters */}
      <div className="grid-2">
        {/* Diet Filter */}
        <div>
          <label className="label icon-label">
            <Leaf className="icon-small" />
            Diet Type
          </label>

          <select
            value={dietFilter}
            onChange={(e) => onDietFilterChange(e.target.value)}
            className="select-box"
          >
            <option value="all">All</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
           
          </select>
            </div>
        </div>

        
  
       
      </div>
    
<div className="ai-section">
  <h4 className="ai-title">⭐ AI Recommended</h4>

  <div className="ai-cards">
    {/* CARD 1 */}
    <div className="ai-card">
      <img
        src="https://images.unsplash.com/photo-1601924582975-7aa0b2f0c3f3"
        alt="Margherita Pizza"
        className="ai-image"
      />  
      <div className="ai-content">
         
        <h5>Margherita Pizza</h5>
        <p>
          Classic pizza with tomato sauce, mozzarella, and fresh basil
        </p>
        <h4>Top rated dish  ⭐⭐⭐⭐</h4>
        
      </div>
    </div>

    {/* CARD 2 */}
    <div className="ai-card">
      <img
        src="https://images.unsplash.com/photo-1604908177522-040b46fbd1d2"
        alt="Grilled Chicken Steak"
        className="ai-image"
      />
      <div className="ai-content">
        <h5>Grilled Chicken Steak</h5>
        <p>
          Tender chicken breast with roasted vegetables and herbs
        </p>
        <h4>Top rated  dish  ⭐⭐⭐⭐</h4>
      </div>
    </div>
  </div>
</div>


    </div>
  
    
  );
}
