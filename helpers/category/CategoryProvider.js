import React, { useEffect, useState } from "react";
import CategoryContext from "./CategoryContext";
import axios from "axios";

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState()
    const [subcategoriesMap, setSubcategoriesMap] = useState({});
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/getCategoryList`);
                if (response.data.Records) {
                    if (Array.isArray(response.data.Records)) {
                        setCategories(response.data.Records);
                    } else {
                        setCategories([response.data.Records]);
                    }
                } else {
                    setCategories([]);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async (categoryId) => {
            try {
                const response = await axios.get(`/api/getSubCategoryList?categoryId=${categoryId}`);
                const subcategories = response.data.Records || [];
                setSubcategoriesMap((prevMap) => ({
                    ...prevMap,
                    [categoryId]: subcategories,
                }));
            } catch (error) {
                console.error(`Error fetching subcategories for category ID ${categoryId}:`, error);
                setSubcategoriesMap((prevMap) => ({
                    ...prevMap,
                    [categoryId]: [],
                }));
            }
        };

        if (categories) { // Check if categories is not undefined
            categories.forEach((category) => {
                if (category.Have_child_categoryies === "Yes") {
                    fetchSubcategories(category.Category_id);
                }
            });
        }
    }, [categories]);
    
    return (
        <CategoryContext.Provider value={{ categories, loading, error, subcategoriesMap }}>
            {children}
        </CategoryContext.Provider>
    )

}

export default CategoryProvider