/**
 * Structured Data Generator for SEO
 * This script dynamically generates JSON-LD structured data based on the page type
 */

(function() {
    // Determine page type and language
    let pageType = 'WebPage';
    let language = document.documentElement.lang || 'en';
    let isChinesePage = language === 'zh-TW';
    
    // Set page-specific information
    if (window.location.pathname === '/' || window.location.pathname === '/index.html' || 
        window.location.pathname === '/index-zh.html') {
        pageType = 'HomePage';
    } else if (window.location.pathname.includes('services')) {
        pageType = 'ServicePage';
    } else if (window.location.pathname.includes('contact')) {
        pageType = 'ContactPage';
    }
    
    // Company information
    const companyInfo = {
        name: isChinesePage ? 'Hygiene First' : 'Hygiene First',
        url: 'https://hygienefirst.com',
        logo: 'https://hygienefirst.com/images/logo.png',
        email: 'info@hygienefirst.com',
        telephone: '+1-800-123-4567',
        streetAddress: isChinesePage ? '台北市信義區松山路123號' : '123 Main Street',
        addressLocality: isChinesePage ? '台北市' : 'New York',
        addressRegion: isChinesePage ? '台灣' : 'NY',
        postalCode: isChinesePage ? '110' : '10001',
        addressCountry: isChinesePage ? 'TW' : 'US',
        priceRange: '$$'
    };
    
    // Services information
    const servicesInfo = {
        basicCare: {
            name: isChinesePage ? '基本醫療護理服務' : 'Basic Healthcare Service',
            description: isChinesePage ? 
                '我們的基本醫療護理服務包括基礎健康評估、生活協助和個人衛生護理，確保您得到必要的照顧。' : 
                'Our basic healthcare service includes fundamental health assessments, daily living assistance, and personal hygiene care to ensure you receive necessary care.',
            price: '$100'
        },
        advancedCare: {
            name: isChinesePage ? '進階醫療護理服務' : 'Advanced Healthcare Service',
            description: isChinesePage ? 
                '我們的進階醫療護理服務由專業醫護人員提供，包括專業健康評估、傷口護理和藥物管理。' : 
                'Our advanced healthcare service is provided by professional medical staff, including comprehensive health assessments, wound care, and medication management.',
            price: '$200'
        },
        specializedCare: {
            name: isChinesePage ? '專業醫療護理服務' : 'Specialized Healthcare Service',
            description: isChinesePage ? 
                '我們的專業醫療護理服務提供高級全天候照護，包括特殊醫療需求和專業醫護團隊支援。' : 
                'Our specialized healthcare service provides premium round-the-clock care, including special medical needs and professional medical team support.',
            price: '$300'
        }
    };
    
    // Create Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": companyInfo.url + "#organization",
        "name": companyInfo.name,
        "url": companyInfo.url,
        "logo": companyInfo.logo,
        "email": companyInfo.email,
        "telephone": companyInfo.telephone,
        "priceRange": companyInfo.priceRange,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": companyInfo.streetAddress,
            "addressLocality": companyInfo.addressLocality,
            "addressRegion": companyInfo.addressRegion,
            "postalCode": companyInfo.postalCode,
            "addressCountry": companyInfo.addressCountry
        },
        "sameAs": [
            "https://www.facebook.com/hygienefirst",
            "https://www.twitter.com/hygienefirst",
            "https://www.instagram.com/hygienefirst",
            "https://www.linkedin.com/company/hygienefirst"
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday"],
                "opens": "09:00",
                "closes": "16:00"
            }
        ]
    };
    
    // Create website schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": companyInfo.url + "#website",
        "url": companyInfo.url,
        "name": companyInfo.name,
        "description": isChinesePage ? 
            "Hygiene First提供專業的醫療護理服務，為您和您所愛的人提供最優質的照護。" : 
            "Hygiene First provides professional healthcare services to ensure the best care for you and your loved ones.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": companyInfo.url + "/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
    
    // Create page-specific schema
    let pageSchema = {
        "@context": "https://schema.org",
        "@type": pageType,
        "@id": window.location.href + "#webpage",
        "url": window.location.href,
        "name": document.title,
        "isPartOf": {
            "@id": companyInfo.url + "#website"
        },
        "about": {
            "@id": companyInfo.url + "#organization"
        },
        "inLanguage": language
    };
    
    // Add breadcrumbs for sub-pages
    if (pageType !== 'HomePage') {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": isChinesePage ? "首頁" : "Home",
                    "item": companyInfo.url
                }
            ]
        };
        
        // Add second level
        breadcrumbSchema.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageType === 'ServicePage' ? 
                (isChinesePage ? "服務" : "Services") : 
                (isChinesePage ? "聯絡我們" : "Contact Us"),
            "item": window.location.href
        });
        
        // Add breadcrumb schema to JSON-LD
        addJsonLdToPage(breadcrumbSchema);
    }
    
    // Service specific schema for services page
    if (pageType === 'ServicePage') {
        // Create service-specific schemas
        Object.values(servicesInfo).forEach(service => {
            const serviceSchema = {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": service.name,
                "description": service.description,
                "provider": {
                    "@id": companyInfo.url + "#organization"
                },
                "offers": {
                    "@type": "Offer",
                    "price": service.price.replace('$', ''),
                    "priceCurrency": "USD"
                },
                "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 40.712776,
                        "longitude": -74.005974
                    },
                    "geoRadius": "50000"
                }
            };
            
            // Add service schema to page
            addJsonLdToPage(serviceSchema);
        });
    }
    
    // FAQ schema for home page
    if (pageType === 'HomePage') {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": isChinesePage ? "您的醫療護理服務包括哪些內容？" : "What do your healthcare services include?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": isChinesePage ? 
                            "我們的醫療護理服務包括基礎健康評估、藥物管理、傷口護理、復健輔助和全天候專業照護。我們提供基本照護、進階護理和專業醫療服務選項。" : 
                            "Our healthcare services include basic health assessments, medication management, wound care, rehabilitation assistance, and round-the-clock professional care. We offer basic, advanced, and specialized healthcare options."
                    }
                },
                {
                    "@type": "Question",
                    "name": isChinesePage ? "如何預約您的服務？" : "How do I book your services?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": isChinesePage ? 
                            "您可以通過我們的網站在線預約，或致電我們的客戶服務團隊。我們提供靈活的時間選項，以適應您的日程安排。" : 
                            "You can book online through our website or call our customer service team. We offer flexible time slots to accommodate your schedule."
                    }
                },
                {
                    "@type": "Question",
                    "name": isChinesePage ? "您是否提供機構醫療服務？" : "Do you provide institutional healthcare services?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": isChinesePage ? 
                            "是的，我們為各種醫療機構提供專業醫護人員，包括醫院、養老院和安養中心。我們的專業團隊經過培訓，可以處理各種醫療護理需求。" : 
                            "Yes, we provide professional medical staff for various healthcare institutions, including hospitals, nursing homes, and care centers. Our professional team is trained to handle various healthcare needs."
                    }
                }
            ]
        };
        
        // Add FAQ schema to page
        addJsonLdToPage(faqSchema);
    }
    
    // Local business schema (added to all pages)
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": companyInfo.url + "#localbusiness",
        "name": companyInfo.name,
        "image": companyInfo.logo,
        "url": companyInfo.url,
        "telephone": companyInfo.telephone,
        "email": companyInfo.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": companyInfo.streetAddress,
            "addressLocality": companyInfo.addressLocality,
            "addressRegion": companyInfo.addressRegion,
            "postalCode": companyInfo.postalCode,
            "addressCountry": companyInfo.addressCountry
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.712776,
            "longitude": -74.005974
        },
        "openingHoursSpecification": organizationSchema.openingHoursSpecification,
        "priceRange": companyInfo.priceRange
    };
    
    // Add schemas to page
    addJsonLdToPage(organizationSchema);
    addJsonLdToPage(websiteSchema);
    addJsonLdToPage(pageSchema);
    addJsonLdToPage(localBusinessSchema);
    
    // Helper function to add schema to page
    function addJsonLdToPage(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }
})(); 