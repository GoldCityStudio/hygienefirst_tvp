const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/images/news';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// News data storage (replace with database in production)
let newsData = [
    {
        id: 1,
        title: 'Hygiene First首衛 海上護理培訓工作坊圓滿結束！',
        category: 'events',
        date: '2024-04-24',
        excerpt: '感謝各位首衛會員熱情參與！當日我們不單止聆聽了大家的寶貴意見和需求，還一起重溫了護理工作的專業技巧！更精彩的是，我們模擬了海上突發情況——如乘客或船員不適時的急救場景，實戰演練應變措施及處理方法！',
        image: '/images/news/news1.jpg'
    },
    {
        id: 2,
        title: 'Hygiene First 現已開通化廢收集服務',
        category: 'services',
        date: '2024-03-31',
        excerpt: 'Hygiene First 首衛🛡️ 由即日起除咗可以收集處理醫療廢物（Sharp Box 、針頭等）以外，仲可以幫大家收集處理化學廢物（DDA、過期藥物等）。',
        image: '/images/news/news2.jpg'
    },
    {
        id: 3,
        title: '公司制服尺寸參考表',
        category: 'updates',
        date: '2024-04-10',
        excerpt: '各位首衛人，以下係我哋嘅公司制服尺寸參考表。隨時可以上嚟我哋Office購買，記得我哋係不設試身室的。',
        image: '/images/news/news3.jpg'
    },
    {
        id: 4,
        title: '長者健康講座：預防跌倒與居家安全',
        category: 'events',
        date: '2024-04-15',
        excerpt: '我們舉辦了專為長者設計的健康講座，分享預防跌倒的實用技巧和居家安全知識，幫助長者建立更安全的生活環境。',
        image: '/images/news/news4.jpg'
    },
    {
        id: 5,
        title: '居家護理服務全面升級',
        category: 'services',
        date: '2024-04-05',
        excerpt: '我們推出了全新的居家護理服務計劃，提供更全面的照護方案，包括專業護理、康復治療和營養諮詢等服務。',
        image: '/images/news/news5.jpg'
    },
    {
        id: 6,
        title: '新辦公室開幕典禮圓滿舉行',
        category: 'updates',
        date: '2024-03-25',
        excerpt: '我們的新辦公室正式開幕，提供更寬敞的空間和更完善的設施，為客戶提供更優質的服務體驗。',
        image: '/images/news/news6.jpg'
    },
    {
        id: 7,
        title: '護理人員專業培訓課程開始報名',
        category: 'events',
        date: '2024-03-20',
        excerpt: '我們推出了一系列專業護理培訓課程，幫助護理人員提升專業技能，為客戶提供更優質的護理服務。',
        image: '/images/news/news7.jpg'
    },
    {
        id: 8,
        title: '社區健康檢查服務啟動',
        category: 'services',
        date: '2024-03-15',
        excerpt: '我們推出社區健康檢查服務，為居民提供便捷的健康評估和疾病預防服務，促進社區健康發展。',
        image: '/images/news/news8.jpg'
    },
    {
        id: 9,
        title: 'Hygiene First榮獲最佳醫療服務獎',
        category: 'updates',
        date: '2024-03-10',
        excerpt: '我們很榮幸獲得2024年度最佳醫療服務獎，這是對我們服務質量和專業水平的肯定。',
        image: '/images/news/news9.jpg'
    }
];

// Get all news
app.get('/api/news', (req, res) => {
    console.log('GET /api/news - Sending news data:', newsData);
    res.json(newsData);
});

// Get single news item
app.get('/api/news/:id', (req, res) => {
    const news = newsData.find(n => n.id === parseInt(req.params.id));
    if (!news) {
        return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
});

// Add new news
app.post('/api/news', upload.single('image'), (req, res) => {
    try {
        const { title, category, date, excerpt } = req.body;
        const imagePath = req.file ? `/images/news/${req.file.filename}` : null;

        const newNews = {
            id: newsData.length > 0 ? Math.max(...newsData.map(n => n.id)) + 1 : 1,
            title,
            category,
            date,
            excerpt,
            image: imagePath
        };

        newsData.push(newNews);
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create news' });
    }
});

// Update news
app.put('/api/news/:id', upload.single('image'), (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, date, excerpt } = req.body;
        const newsIndex = newsData.findIndex(n => n.id === parseInt(id));

        if (newsIndex === -1) {
            return res.status(404).json({ error: 'News not found' });
        }

        // If new image is uploaded, delete old image
        if (req.file) {
            const oldImagePath = newsData[newsIndex].image;
            if (oldImagePath) {
                const fullPath = path.join(__dirname, 'public', oldImagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
            newsData[newsIndex].image = `/images/news/${req.file.filename}`;
        }

        // Update news data
        newsData[newsIndex] = {
            ...newsData[newsIndex],
            title,
            category,
            date,
            excerpt
        };

        res.json(newsData[newsIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update news' });
    }
});

// Delete news
app.delete('/api/news/:id', (req, res) => {
    try {
        const { id } = req.params;
        const newsIndex = newsData.findIndex(n => n.id === parseInt(id));

        if (newsIndex === -1) {
            return res.status(404).json({ error: 'News not found' });
        }

        // Delete associated image
        const imagePath = newsData[newsIndex].image;
        if (imagePath) {
            const fullPath = path.join(__dirname, 'public', imagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        newsData.splice(newsIndex, 1);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete news' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 