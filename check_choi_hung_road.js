// Check specific address classification
const fs = require('fs');

// Read the collection points data
const data = JSON.parse(fs.readFileSync('Collection points database/collectionpoints.json', 'utf8'));

// Current region classification logic
function classifyRegion(address) {
    let region = '新界'; // Default
    
    if (address.includes('香港島') || 
        address.includes('中區') || 
        address.includes('中環') || 
        address.includes('上環') || 
        address.includes('灣仔') || 
        address.includes('銅鑼灣') || 
        address.includes('北角') || 
        address.includes('太古') || 
        address.includes('西環') || 
        address.includes('西營盤') || 
        address.includes('西區') || 
        address.includes('香港仔') || 
        address.includes('柴灣') || 
        address.includes('堅尼地城') || 
        address.includes('淺水灣') || 
        address.includes('清水灣') || 
        address.includes('跑馬地') || 
        address.includes('黃竹坑') || 
        address.includes('筲箕灣') || 
        address.includes('鴨脷洲') || 
        address.includes('鰂魚涌') || 
        address.includes('半山') || 
        address.includes('西半山') || 
        address.includes('添美道') || 
        address.includes('添馬') || 
        address.includes('金鐘') || 
        address.includes('金鐘道') || 
        address.includes('大潭')) {
        region = '香港島';
    } else if (address.includes('九龍') || 
               address.includes('尖沙咀') || 
               address.includes('旺角') || 
               address.includes('油麻地') || 
               address.includes('油蔴地') || 
               address.includes('深水埗') || 
               address.includes('長沙灣') || 
               address.includes('荔枝角') || 
               address.includes('紅磡') || 
               address.includes('何文田') || 
               address.includes('土瓜灣') || 
               address.includes('九龍城') || 
               address.includes('九龍塘') || 
               address.includes('九龍灣') || 
               address.includes('觀塘') || 
               address.includes('牛頭角') || 
               address.includes('黃大仙') || 
               address.includes('鑽石山') || 
               address.includes('慈雲山') || 
               address.includes('新蒲崗') || 
               address.includes('秀茂坪') || 
               address.includes('啟德') || 
               address.includes('深水灣') || 
               address.includes('清水灣道') || 
               address.includes('藍田') || 
               address.includes('調景嶺') || 
               address.includes('東頭邨') || 
               address.includes('橫頭磡') || 
               address.includes('延文禮士道') || 
               address.includes('彩虹道')) {
        region = '九龍';
    }
    
    return region;
}

// Find the specific entry
const targetAddress = "彩虹道242號采頤花園地下107號舖";
const targetEntry = data.find(item => 
    item.回收點地址 && item.回收點地址.includes("彩虹道242號采頤花園地下107號舖")
);

console.log('='.repeat(80));
console.log('CHECKING SPECIFIC ADDRESS CLASSIFICATION');
console.log('='.repeat(80));

if (targetEntry) {
    const classifiedRegion = classifyRegion(targetEntry.回收點地址);
    
    console.log('Found Entry:');
    console.log(`Organization: ${targetEntry.支持機構}`);
    console.log(`Name: ${targetEntry.回收過期藥物點}`);
    console.log(`Address: ${targetEntry.回收點地址}`);
    console.log(`Current Classification: ${classifiedRegion}`);
    console.log('');
    
    // Check if this is correct
    console.log('Geographical Analysis:');
    console.log('彩虹道 (Choi Hung Road) is located in Wong Tai Sin District, Kowloon');
    console.log('采頤花園 (Choi Yee Garden) is a housing estate in Wong Tai Sin');
    console.log('');
    
    if (classifiedRegion === '九龍') {
        console.log('✅ CORRECT CLASSIFICATION: This address is properly classified as Kowloon');
    } else {
        console.log('❌ INCORRECT CLASSIFICATION: This address should be classified as Kowloon');
        console.log('The address contains "彩虹道" which should trigger Kowloon classification');
    }
    
    console.log('');
    console.log('Expected Table: 九龍回收點列表 (Kowloon Recycling Points List)');
    console.log(`Current Table: ${classifiedRegion === '九龍' ? '九龍回收點列表' : classifiedRegion === '香港島' ? '香港島回收點列表' : '新界回收點列表'}`);
    
} else {
    console.log('Entry not found in database');
}

console.log('='.repeat(80));
