import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LocalizationContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const translations = {
  en: {
    // Brand
    'brand.name': 'EduMart',
    'brand.tagline': 'Your Educational Marketplace',
    
    // Navigation
    'nav.search': 'Search products...',
    'nav.wishlist': 'Wishlist',
    'nav.cart': 'Cart',
    'nav.profile': 'Profile',
    'nav.orders': 'Orders',
    'nav.vendor': 'Vendor Dashboard',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    
    // Common
    'common.viewDetails': 'View Details',
    'common.addToCart': 'Add to Cart',
    'common.addToWishlist': 'Add to Wishlist',
    'common.removeFromWishlist': 'Remove from Wishlist',
    'common.inStock': 'In Stock',
    'common.outOfStock': 'Out of Stock',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.continue': 'Continue Shopping',
    'common.checkout': 'Proceed to Checkout',
    'common.placeOrder': 'Place Order',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.remove': 'Remove',
    'common.update': 'Update',
    'common.backToHome': 'Back to Home',
    'common.loading': 'Loading...',
    
    // Categories
    'category.books': 'Books',
    'category.notebooks': 'Notebooks',
    'category.pens': 'Pens & Pencils',
    'category.art': 'Art Supplies',
    'category.backpacks': 'Backpacks',
    'category.calculators': 'Calculators',
    'category.folders': 'Folders & Binders',
    'category.all': 'All Categories',
    
    // Home Page
    'home.hero.title': 'Welcome to EduMart',
    'home.hero.subtitle': 'Quality Educational Supplies for Students',
    'home.featured': 'Featured Products',
    'home.categories': 'Shop by Category',
    'home.newArrivals': 'New Arrivals',
    'home.bestSellers': 'Best Sellers',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Add items to your cart to get started',
    'cart.items': 'items',
    'cart.clearCart': 'Clear Cart',
    
    // Wishlist
    'wishlist.title': 'My Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Save your favorite items here',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shippingInfo': 'Shipping Information',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.orderSummary': 'Order Summary',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.zipCode': 'ZIP Code',
    
    // Orders
    'orders.title': 'Order History',
    'orders.empty': 'No orders yet',
    'orders.emptyDesc': 'Start shopping to see your orders here',
    'orders.orderNumber': 'Order',
    'orders.date': 'Date',
    'orders.status': 'Status',
    'orders.items': 'Items',
    'orders.viewDetails': 'View Details',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.changePassword': 'Change Password',
    'profile.name': 'Name',
    
    // Footer
    'footer.about': 'About EduMart',
    'footer.aboutDesc': 'Your trusted educational marketplace',
    'footer.quickLinks': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.faqs': 'FAQs',
    'footer.shipping': 'Shipping Info',
    'footer.customerService': 'Customer Service',
    'footer.helpCenter': 'Help Center',
    'footer.returns': 'Returns',
    'footer.trackOrder': 'Track Order',
    'footer.terms': 'Terms & Conditions',
    'footer.connect': 'Connect With Us',
    'footer.copyright': '© 2025 EduMart. All rights reserved.',
    'footer.tagline': 'Made with ❤️ for better learning experiences'
  },
  ar: {
    // Brand
    'brand.name': 'سوق التعليم',
    'brand.tagline': 'سوقك التعليمي المتكامل',
    
    // Navigation
    'nav.search': 'ابحث عن المنتجات...',
    'nav.wishlist': 'المفضلة',
    'nav.cart': 'السلة',
    'nav.profile': 'الملف الشخصي',
    'nav.orders': 'الطلبات',
    'nav.vendor': 'لوحة البائع',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    
    // Common
    'common.viewDetails': 'عرض التفاصيل',
    'common.addToCart': 'أضف للسلة',
    'common.addToWishlist': 'أضف للمفضلة',
    'common.removeFromWishlist': 'إزالة من المفضلة',
    'common.inStock': 'متوفر',
    'common.outOfStock': 'غير متوفر',
    'common.price': 'السعر',
    'common.quantity': 'الكمية',
    'common.total': 'المجموع',
    'common.subtotal': 'المجموع الفرعي',
    'common.continue': 'متابعة التسوق',
    'common.checkout': 'إتمام الطلب',
    'common.placeOrder': 'تأكيد الطلب',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.remove': 'إزالة',
    'common.update': 'تحديث',
    'common.backToHome': 'العودة للرئيسية',
    'common.loading': 'جاري التحميل...',
    
    // Categories
    'category.books': 'الكتب',
    'category.notebooks': 'الدفاتر',
    'category.pens': 'الأقلام',
    'category.art': 'أدوات الفن',
    'category.backpacks': 'حقائب المدرسة',
    'category.calculators': 'الآلات الحاسبة',
    'category.folders': 'الملفات والأغلفة',
    'category.all': 'جميع الفئات',
    
    // Home Page
    'home.hero.title': 'مرحباً بك في سوق التعليم',
    'home.hero.subtitle': 'مستلزمات تعليمية عالية الجودة للطلاب',
    'home.featured': 'المنتجات المميزة',
    'home.categories': 'تسوق حسب الفئة',
    'home.newArrivals': 'الوافدات الجديدة',
    'home.bestSellers': 'الأكثر مبيعاً',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.emptyDesc': 'أضف منتجات لسلتك للبدء',
    'cart.items': 'عنصر',
    'cart.clearCart': 'إفراغ السلة',
    
    // Wishlist
    'wishlist.title': 'قائمة المفضلة',
    'wishlist.empty': 'قائمة المفضلة فارغة',
    'wishlist.emptyDesc': 'احفظ منتجاتك المفضلة هنا',
    
    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.shippingInfo': 'معلومات الشحن',
    'checkout.paymentMethod': 'طريقة الدفع',
    'checkout.orderSummary': 'ملخص الطلب',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'الاسم الأخير',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'الهاتف',
    'checkout.address': 'العنوان',
    'checkout.city': 'المدينة',
    'checkout.zipCode': 'الرمز البريدي',
    
    // Orders
    'orders.title': 'سجل الطلبات',
    'orders.empty': 'لا توجد طلبات بعد',
    'orders.emptyDesc': 'ابدأ التسوق لرؤية طلباتك هنا',
    'orders.orderNumber': 'الطلب',
    'orders.date': 'التاريخ',
    'orders.status': 'الحالة',
    'orders.items': 'العناصر',
    'orders.viewDetails': 'عرض التفاصيل',
    
    // Profile
    'profile.title': 'الملف الشخصي',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.changePassword': 'تغيير كلمة المرور',
    'profile.name': 'الاسم',
    
    // Footer
    'footer.about': 'عن سوق التعليم',
    'footer.aboutDesc': 'سوقك التعليمي الموثوق',
    'footer.quickLinks': 'روابط سريعة',
    'footer.aboutUs': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.faqs': 'الأسئلة الشائعة',
    'footer.shipping': 'معلومات الشحن',
    'footer.customerService': 'خدمة العملاء',
    'footer.helpCenter': 'مركز المساعدة',
    'footer.returns': 'المرتجعات',
    'footer.trackOrder': 'تتبع الطلب',
    'footer.terms': 'الشروط والأحكام',
    'footer.connect': 'تواصل معنا',
    'footer.copyright': '© 2025 سوق التعليم. جميع الحقوق محفوظة.',
    'footer.tagline': 'صنع بـ ❤️ لتجارب تعليمية أفضل'
  }
};

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    //return translations[lang][key] || key;
    return (translations[lang] as Record<string, string>)[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) throw new Error('useLocalization must be used within LocalizationProvider');
  return context;
};
