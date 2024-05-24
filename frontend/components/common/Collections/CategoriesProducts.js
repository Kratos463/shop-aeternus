import React, { useContext } from 'react';
import Paragraph from '../Paragraph';
import CategoryCollection from './Collection4';
import CategoryContext from '../../../helpers/category/CategoryContext';
import { Product4 } from '../../../services/script';

const CategoriesProducts = () => {
    const { frontCategories } = useContext(CategoryContext);

    return (
        <>
            {frontCategories?.map(category => (
                <div key={category.Category_id}>
                        <Paragraph
                            heading="Explore our"
                            category={category.Category_name}
                            title="title1 section-t-space"
                            inner="title-inner1"
                            hrClass={false}
                        />
                    <CategoryCollection
                        key={category.Category_id}
                        // type="fashion"
                        noTitle="null"
                        backImage={true}
                        title={category.Category}
                        subtitle="explore our"
                        productSlider={Product4}
                        designClass="section-b-space p-t-0 ratio_asos px-2"
                        noSlider="false"
                        cartClass="cart-info cart-wrap"
                        categories={[category.Category_id]}
                    />
                </div>
            ))}
        </>
    );
};

export default CategoriesProducts;
