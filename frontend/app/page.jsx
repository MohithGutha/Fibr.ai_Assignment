"use client"
import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0)

    const categories = ['Accessories', 'Home Appliances', 'Fitness', 'Electronics', 'Footwear', 'Bags', 'Home Decor', 'Furniture', 'Personal Care', 'Kitchen'];

    const fetchProductDetails = async () => {
        setLoading(true)
        try {
            const query = new URLSearchParams({
                page: page,
                ...(category && { category: category }),
                ...(search && { search: search }),
            })
            const response = await fetch(`http://localhost:5000/products?${query}`)
            const data = await response.json();
            setProducts(data.products)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching : ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductDetails();
    },[page, category, search])

    const handleNext = () =>{
        setPage(Math.min(totalPages, page+1))
    }
    const handlePrev = () => {
        setPage(Math.max(1, page-1))
    }

    return (
        <div className='max-w-5xl mx-auto mt-10'>
            <div className='flex items-center justify-between mb-10'>
                <SearchBar 
                    onSearch={setSearch}
                />
                <CategoryDropDown 
                    categories={categories}
                    selectedCategory={category}
                    onChangeCategory={setCategory}
                />
                <div className="flex items-center justify-between gap-2">
                    <div onClick={handlePrev} className='px-4 py-2 cursor-pointer border rounded-md'>Prev</div>
                    <div onClick={handleNext} className='px-4 py-2 cursor-pointer border rounded-md'>Next</div>
                </div>
            </div>
            <div>
                {loading 
                    ?   <div className='w-full flex items-center justify-between'>Loading</div>
                    :   <div className="grid grid-cols-3 gap-4">
                            {products.map((product)=>
                                <Product 
                                    key={product.id} 
                                    product={product}
                                />
                            )}
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductsPage

const CategoryDropDown = ({ categories, selectedCategory, onChangeCategory }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e)=>onChangeCategory(e.target.value)}
            className='border rounded-md p-1'
        >
            <option value="">All categories</option>
            {categories.map(category=>(
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    )
}

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query)
    }
    return (
        <form onSubmit={handleSearch}>
            <div className='border p-1 flex items-center gap-2 rounded-md'>
                <input 
                    type='text'
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                    placeholder='Search Products'
                    className='border rounded-md p-1'
                />
                <button type='submit' className='p-1 bg-gray-200 rounded-md'>Search</button>
            </div>
        </form>
    )
}

const Product = ({ product }) => {
    return (
        <div className='border rounded-md p-4'>
            <img src={product.image} alt={`${product.name} product image`} />
            <div className="flex items-center justify-between">
                <span>{product.name}</span>
                <span>{`$${product.price}`}</span>
            </div>
            <div>{product.category}</div>
        </div>
    )
}