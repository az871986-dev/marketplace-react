import { useLocalization } from '../context/LocalizationContext';
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LazyImage } from '../components/LazyImage';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';
import { EmptyState } from '../components/EmptyState';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const {
    products,
    setSelectedProduct,
    setCurrentPage,
    addToCart,
    addToWishlist,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const { lang, t } = useLocalization();
  
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const categories =
  lang === 'ar'
    ? ['الكل', 'الكتب', 'الحقائب', 'ادوات الفن', 'الأقلام', 'الدفاتر']
    : ['All', 'Books', 'Backpacks', 'Art Supplies', 'Pens', 'Notebooks'];


  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-12 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-400 rounded-2xl p-8 md:p-12 mb-8 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {lang === 'ar' ? 'مرحباً بكم في سوق التعليم' : 'Welcome to EduMart'}
      </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          {lang === 'ar' ? 'اكتشف منتجات مذهلة من بائعين موثوقين' : 'Discover amazing products from trusted vendors'}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm opacity-90">Free Shipping</p>
            <p className="font-semibold">On orders over 50 Riyal</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm opacity-90">24/7 Support</p>
            <p className="font-semibold">We're here to help</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm opacity-90">Secure Payment</p>
            <p className="font-semibold">100% Protected</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}   
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
        </h2>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          type="search"
          title={searchQuery ? "No products found" : "No products available"}
          description={searchQuery ? `No products match "${searchQuery}". Try adjusting your search.` : "Check back later for new products"}
          actionLabel="Clear Search"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden group cursor-pointer" onClick={() => handleProductClick(product)}>
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                  }}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className={`w-5 h-5 ${isInWishlist(product.id) ? 'text-secondary fill-current' : 'text-gray-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3
                  className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleProductClick(product)}
                >
                  {lang === 'ar' ? product.nameAr : product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {lang === 'ar' ? product.descriptionAr : product.description}
                </p>


                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                  {product.price.toFixed(2)} ريال
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`p-2 rounded-lg transition-colors ${
                      product.inStock
                        ? 'bg-primary hover:bg-primary-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
