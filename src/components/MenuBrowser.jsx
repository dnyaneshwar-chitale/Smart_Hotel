




import React, { useState } from "react";
import { menuData } from "../data/menuData";
import { MenuItemCard } from "./MenuItemCard";
import { MenuFilters } from "./MenuFilters";
import "../styles/menu.css";

export default function MenuBrowser({
  language,
  onAddToCart,
  searchQuery,
  tableNumber,
  setTableNumber,
}) {
  const categories = [...new Set(menuData.map((item) => item.category))];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState("all");
  const [spiceFilter, setSpiceFilter] = useState("all");

  const filteredMenu = menuData.filter((item) => {
    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    const matchDiet = dietFilter === "all" || item.dietType === dietFilter;
    const matchSpice =
      spiceFilter === "all" || item.spiceLevel === spiceFilter;

    const matchSearch =
      item.nameTranslations?.[language]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchCategory && matchDiet && matchSpice && matchSearch;
  });

  return (
    <div className="menu-container">
      <MenuFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        dietFilter={dietFilter}
        onDietFilterChange={setDietFilter}
        spiceFilter={spiceFilter}
        onSpiceFilterChange={setSpiceFilter}
      />

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            language={language}
            onAddToCart={onAddToCart}
            tableNumber={tableNumber}          // ✅ ADDED
            setTableNumber={setTableNumber}    // ✅ ADDED
          />
        ))}

        {filteredMenu.length === 0 && (
          <p className="no-items">No items found</p>
        )}
      </div>
    </div>
  );
}
