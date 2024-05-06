import React, { useContext, useEffect, useState } from "react";
import FilterContext from "./FilterContext";
import { useRouter } from "next/router";
import { ProductsContext } from "../product/ProductContext";

const FilterProvider = (props) => {
  const router = useRouter();
  const brand = router.query.brand;
  const color = router.query.color;
  const size = router.query.size;
  const category = router.query.category;
  const min = router.query.min;
  const max = router.query.max;
  const sizeParam = size ? size.split(",") : null;
  const param = brand ? brand.split(",") : [];
  
  const { products } = useContext(ProductsContext);

  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedBrands, setSelectedBrands] = useState(param || []);
  const [selectedColor, setSelectedColor] = useState(color || "");
  const [selectedSize, setSelectedSize] = useState(sizeParam || []);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min || 500,
    max: max || 10000,
  });
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);
  const [selectedFilteredProducts, setSelectedFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter(product => {
        const isInSelectedCategory = selectedCategory ? product.Category === selectedCategory : true;
        const isInSelectedBrands = selectedBrands.length === 0 || selectedBrands.includes(product.Brand_name);
        const isInSelectedPriceRange = product.Price >= selectedPrice.min && product.Price <= selectedPrice.max;
        return isInSelectedCategory && isInSelectedBrands && isInSelectedPriceRange;
      });
      setSelectedFilteredProducts(filteredProducts);
    }
  }, [products, selectedCategory, selectedBrands, selectedPrice]);

  const handleBrands = (brand, checked) => {
    setSelectedBrands(prevBrands => {
      const index = prevBrands.indexOf(brand);
      const updatedBrands = [...prevBrands];
      if (index > -1) {
        updatedBrands.splice(index, 1);
      } else {
        updatedBrands.push(brand);
      }
      return updatedBrands;
    });
  };

  const handleSizes = (size, checked) => {
    setSelectedSize(prevSizes => {
      const index = prevSizes.indexOf(size);
      const updatedSizes = [...prevSizes];
      if (index > -1) {
        updatedSizes.splice(index, 1);
      } else {
        updatedSizes.push(size);
      }
      return updatedSizes;
    });
  };

  const handlePriceRange = (minPrice, maxPrice) => {
    setSelectedPrice({ min: minPrice, max: maxPrice });
  };
  
  return (
    <FilterContext.Provider
      value={{
        ...props,
        state: selectedCategory,
        setSelectedColor,
        setSelectedCategory,
        setSelectedBrands,
        selectedBrands,
        selectedColor,
        selectedPrice,
        isChecked,
        filterChecked,
        selectedSize,
        setSelectedSize,
        setSelectedPrice,
        handleBrands,
        handleSizes,
        handlePriceRange,
        selectedFilteredProducts
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
