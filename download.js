const fetch = require('node-fetch');
const fs = require('fs');

(async () => {

    if(!fs.existsSync('./result')) fs.mkdirSync('./result');

    const data = fs.readFileSync('./data/data.json');
    const json = JSON.parse(data);

    for (let i = 0; i < json.length; i++) {
        
        const facultyName = json[i].faculty;
        const angkatan = json[i].data.angkatan;
        const ingfo = json[i].data.info;

        for (let j = 0; j < ingfo.length; j++) {
            
            const name_mentah = ingfo[j].name;
            const naming = name_mentah.replace(/\s/g, '_');
            const name = naming.replace(/[^a-zA-Z_]/g, '');
            const nim = ingfo[j].nim;
            const image = ingfo[j].img;

            if(!fs.existsSync(`./result/${facultyName}`)) fs.mkdirSync(`./result/${facultyName}`);
            if(!fs.existsSync(`./result/${facultyName}/${angkatan}`)) fs.mkdirSync(`./result/${facultyName}/${angkatan}`);

            const req = await fetch(image);
            if(req.status === 200) {
                await fetch(image)
                .then(res =>
                    res.body.pipe(fs.createWriteStream(`./result/${facultyName}/${angkatan}/${name}_${nim}.jpg`))
                );

                console.log(`[+] Downloading ${facultyName} ${angkatan} => ${image}`);

            } else {

                console.log(`[-] Skipping ${facultyName} ${angkatan} => ${image}`);

            }

        }

    }

})();