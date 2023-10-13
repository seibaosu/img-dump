const Dumper = require('./src/main.js');
const bot = new Dumper();

const fs = require('fs');

(async () => {

    if(!fs.existsSync('./data')) fs.mkdirSync('./data');

    const data = await bot.Faculty_Data();
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        
        const facultyName = data[i].faculty;
        const urlLength = data[i].url.length;
        for (let j = 0; j < urlLength; j++) {
            
            const years = data[i].url[j];
            const angkatan = years.match(/angkatan=(\d+)/)[1];
            const datas = await bot.Processing_Data(years);

            console.log(`[+] Processing ${facultyName} ${angkatan} - ${datas.length} data`);

            arr.push({
                faculty: facultyName,
                data: {
                    angkatan: angkatan,
                    info: datas
                }
            });
            
        }

    }

    fs.writeFileSync('./data/data.json', JSON.stringify(arr, null, 2));
    
})();